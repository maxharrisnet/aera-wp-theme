<?php
/**
 * Template part for displaying columns content section
 *
 * @package Aera_Technology
 *
 * @param array $args {
 *   Optional. Array of column data and options.
 *   @type array $columns Array of column arrays. Each column can have:
 *                        - 'column_title' or 'title' (required)
 *                        - 'column_content' or 'text' or 'content' (optional)
 *   @type bool $fetch_from_acf If true, will fetch columns 1-6 from ACF fields. Default: false
 *   @type string $heading_level Heading level to use (h2, h3, etc.). Default: 'h2'
 *   @type string $section_class CSS class for the section wrapper. Default: 'about'
 *   @type string $content_class CSS class for content wrapper. Default: 'columnContentItem__content'
 * }
 */

defined('ABSPATH') || exit;

$fetch_from_acf = $args['fetch_from_acf'] ?? false;
$heading_level = $args['heading_level'] ?? 'h2';
$section_class = $args['section_class'] ?? 'about';
$content_class = $args['content_class'] ?? 'columnContentItem__content';

// If fetch_from_acf is true, get columns from ACF fields
if ($fetch_from_acf && function_exists('get_field')) {
  $column_1_title = get_field('column_1_title') ?: '';
  $column_1_content = get_field('column_1_content') ?: '';
  $column_2_title = get_field('column_2_title') ?: '';
  $column_2_content = get_field('column_2_content') ?: '';
  $column_3_title = get_field('column_3_title') ?: '';
  $column_3_content = get_field('column_3_content') ?: '';
  $column_4_title = get_field('column_4_title') ?: '';
  $column_4_content = get_field('column_4_content') ?: '';
  $column_5_title = get_field('column_5_title') ?: '';
  $column_5_content = get_field('column_5_content') ?: '';
  $column_6_title = get_field('column_6_title') ?: '';
  $column_6_content = get_field('column_6_content') ?: '';

  // Build columns array - only include columns that have at least a title
  $columns = array();
  if (!empty($column_1_title)) {
    $columns[] = array(
      'title' => $column_1_title,
      'text' => $column_1_content,
    );
  }
  if (!empty($column_2_title)) {
    $columns[] = array(
      'title' => $column_2_title,
      'text' => $column_2_content,
    );
  }
  if (!empty($column_3_title)) {
    $columns[] = array(
      'title' => $column_3_title,
      'text' => $column_3_content,
    );
  }
  if (!empty($column_4_title)) {
    $columns[] = array(
      'title' => $column_4_title,
      'text' => $column_4_content,
    );
  }
  if (!empty($column_5_title)) {
    $columns[] = array(
      'title' => $column_5_title,
      'text' => $column_5_content,
    );
  }
  if (!empty($column_6_title)) {
    $columns[] = array(
      'title' => $column_6_title,
      'text' => $column_6_content,
    );
  }
} else {
  $columns = $args['columns'] ?? array();
}

// Normalize column data - support different field name variations
$normalized_columns = array();
foreach ($columns as $column) {
  // Support both 'column_title'/'title' and 'title'
  $title = $column['column_title'] ?? $column['title'] ?? '';

  // Support 'column_content', 'text', or 'content'
  $content = $column['column_content'] ?? $column['text'] ?? $column['content'] ?? '';

  if (!empty($title)) {
    $normalized_columns[] = array(
      'title' => $title,
      'content' => $content,
    );
  }
}

// Don't display if no valid columns
if (empty($normalized_columns)) {
  return;
}
?>

<section class="<?php echo esc_attr($section_class); ?>">
  <div class="columnContent">
    <div class="columnContent__container">
      <div class="columnContent__row">
        <?php foreach ($normalized_columns as $column) : ?>
          <div class="columnContent__col">
            <div class="columnContentItem">
              <<?php echo esc_html($heading_level); ?> class="columnContentItem__title"><?php echo esc_html($column['title']); ?></<?php echo esc_html($heading_level); ?>>
              <?php if (!empty($column['content'])) : ?>
                <div class="<?php echo esc_attr($content_class); ?>"><?php echo wp_kses_post($column['content']); ?></div>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

