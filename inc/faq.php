<?php

/**
 * FAQ utilities and shortcode helpers.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Retrieve FAQ data stored on the FAQ page.
 *
 * @param int|null $post_id Page ID to load the FAQ fields from.
 * @return array
 */
function get_company_faq_data(?int $post_id = null): array
{
  $data = array(
    'title'    => '',
    'intro'    => '',
    'sections' => array(),
  );

  if (function_exists('get_field')) {
    if ($post_id === null) {
      $post_id = (int) get_the_ID();
    }

    if ($post_id <= 0) {
      return $data;
    }

    $data['title'] = (string) get_field('company_faq_title', $post_id);
    $data['intro'] = (string) get_field('company_faq_intro', $post_id);

    $sections = get_field('company_faq_sections', $post_id);
    if (is_array($sections)) {
      foreach ($sections as $section) {
        $section_title = isset($section['section_title']) ? (string) $section['section_title'] : '';
        $section_description = isset($section['section_description']) ? (string) $section['section_description'] : '';
        $faqs = isset($section['faq_items']) && is_array($section['faq_items']) ? $section['faq_items'] : array();

        $normalized_items = array();
        foreach ($faqs as $faq) {
          $question = isset($faq['question']) ? (string) $faq['question'] : '';
          $answer = isset($faq['answer']) ? (string) $faq['answer'] : '';
          if ($question === '' && $answer === '') {
            continue;
          }
          $normalized_items[] = array(
            'question' => $question,
            'answer'   => $answer,
          );
        }

        if ($section_title !== '' || $section_description !== '' || !empty($normalized_items)) {
          $data['sections'][] = array(
            'title'       => $section_title,
            'description' => $section_description,
            'items'       => $normalized_items,
          );
        }
      }
    }
  }

  return $data;
}

/**
 * Render FAQ accordion markup.
 *
 * @param array $faq_data Data from get_company_faq_data.
 * @param array $args Optional args: wrapper_classes, heading_tag, id_prefix.
 *
 * @return string
 */
function render_faq_markup(array $faq_data, array $args = array()): string
{
  $defaults = array(
    'wrapper_classes' => 'faq',
    'heading_tag'     => 'h2',
    'id_prefix'       => 'faq',
  );
  $args = wp_parse_args($args, $defaults);

  $heading_tag = in_array($args['heading_tag'], array('h2', 'h3', 'h4', 'h5'), true) ? $args['heading_tag'] : 'h2';
  $wrapper_classes = esc_attr($args['wrapper_classes']);
  $id_prefix = sanitize_html_class($args['id_prefix']);

  $title = $faq_data['title'] ?? '';
  $intro = $faq_data['intro'] ?? '';
  $sections = $faq_data['sections'] ?? array();

  if (empty($sections) || !is_array($sections)) {
    return '';
  }

  ob_start();
?>
  <div class="<?php echo $wrapper_classes; ?>" data-faq-root>
    <?php if (!empty($title)) : ?>
      <<?php echo tag_escape($heading_tag); ?> class="faq__title"><?php echo esc_html($title); ?></<?php echo tag_escape($heading_tag); ?>>
    <?php endif; ?>

    <?php if (!empty($intro)) : ?>
      <div class="faq__intro"><?php echo wp_kses_post($intro); ?></div>
    <?php endif; ?>

    <?php foreach ($sections as $section_index => $section) :
      $section_title = $section['title'] ?? '';
      $section_description = $section['description'] ?? '';
      $items = isset($section['items']) && is_array($section['items']) ? $section['items'] : array();
      $section_id = $id_prefix . '-section-' . ($section_index + 1);

      if (empty($items)) {
        continue;
      }
    ?>
      <div class="faq__section" id="<?php echo esc_attr($section_id); ?>">
        <?php if (!empty($section_title)) : ?>
          <h3 class="faq__sectionTitle"><?php echo esc_html($section_title); ?></h3>
        <?php endif; ?>

        <?php if (!empty($section_description)) : ?>
          <div class="faq__sectionDescription"><?php echo wp_kses_post($section_description); ?></div>
        <?php endif; ?>

        <div class="faq__list" role="list">
          <?php foreach ($items as $item_index => $item) :
            $question = $item['question'] ?? '';
            $answer = $item['answer'] ?? '';
            if ($question === '' && $answer === '') {
              continue;
            }
            $item_id = $section_id . '-item-' . ($item_index + 1);
            $button_id = $item_id . '-button';
            $panel_id = $item_id . '-panel';
          ?>
            <div class="faq__item" id="<?php echo esc_attr($item_id); ?>" role="listitem">
              <button class="faq__question" id="<?php echo esc_attr($button_id); ?>" type="button" aria-expanded="false" aria-controls="<?php echo esc_attr($panel_id); ?>">
                <span class="faq__questionText"><?php echo esc_html($question); ?></span>
                <span class="faq__icon" aria-hidden="true">&#8964;</span>
              </button>
              <div class="faq__answer" id="<?php echo esc_attr($panel_id); ?>" role="region" aria-labelledby="<?php echo esc_attr($button_id); ?>" hidden>
                <?php echo wp_kses_post($answer); ?>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
<?php

  return trim(ob_get_clean());
}

/**
 * Shortcode to render Company FAQ data.
 * Usage: [aera_faq heading="h2" class="faq" id="faq"]
 *
 * @param array $atts Shortcode attributes.
 * @return string
 */
function faq_shortcode(array $atts = array()): string
{
  $atts = shortcode_atts(
    array(
      'heading' => 'h2',
      'class'   => 'faq',
      'id'      => 'faq',
    ),
    $atts,
    'aera_faq'
  );

  $faq_data = get_company_faq_data();
  if (empty($faq_data['sections'])) {
    return '';
  }

  return render_faq_markup($faq_data, array(
    'wrapper_classes' => $atts['class'],
    'heading_tag'     => $atts['heading'],
    'id_prefix'       => $atts['id'],
  ));
}
add_shortcode('aera_faq', __NAMESPACE__ . '\\faq_shortcode');

/**
 * Enqueue FAQ script for toggle behavior when shortcode or template is used.
 */
function enqueue_faq_assets(): void
{
  if (!is_page_template('page-faq.php') && !has_shortcode(get_post_field('post_content', get_the_ID() ?? 0), 'aera_faq')) {
    return;
  }

  $faq_js_path = get_template_directory() . '/js/faq.js';
  if (file_exists($faq_js_path)) {
    wp_enqueue_script(
      'aera-faq',
      get_template_directory_uri() . '/js/faq.js',
      array(),
      filemtime($faq_js_path),
      true
    );
  }
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_faq_assets');
