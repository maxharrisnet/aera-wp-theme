<?php

/**
 * Front page template.
 *
 * @package Aera_Technology
 */

get_header();

$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/home/';

$hero = function_exists('get_field') ? (array) call_user_func('get_field', 'home_hero') : array();
$hero = wp_parse_args(
  $hero,
  array(
    'title'       => __('Hello, I’m Aera.', 'aera'),
    'tagline'     => __('Your Decision Intelligence Agent™', 'aera'),
    'description' => __('Aera understands how your business works, makes real-time recommendations, takes action autonomously, and learns from every decision made.', 'aera'),
    'cta_label'   => __('Schedule Demo', 'aera'),
    'cta_link'    => home_url('/demo'),
  )
);

$technology_sections = function_exists('get_field') ? (array) call_user_func('get_field', 'home_technology_sections') : array();

if (empty($technology_sections)) {
  $technology_sections = array(
    array(
      'title'       => __('Aera understands.', 'aera'),
      'description' => __('Aera continuously crawls enterprise systems; refines, indexes, and augments data; and delivers real-time visibility into your operations.', 'aera'),
      'video'       => $assets_base . 'technology-loop-vpsales.mp4',
      'background_image' => '',
      'messages'    => array(
        array(
          'speaker' => 'user',
          'text'    => __('Aera, what’s my forecast?', 'aera'),
        ),
        array(
          'speaker' => 'aera',
          'text'    => __('On track at $1.2B with an additional $134M revenue opportunity. Do you want the regional breakdown?', 'aera'),
        ),
      ),
    ),
    array(
      'title'       => __('Aera recommends.', 'aera'),
      'description' => __('Aera uses real-time data and AI to predict risks and opportunities accurately, then recommends the best course of action.', 'aera'),
      'video'       => $assets_base . 'technology-loop-csco.mp4',
      'background_image' => $assets_base . 'technology-truck.jpg',
      'messages'    => array(
        array(
          'speaker' => 'user',
          'text'    => __('Aera, how can I reduce my working capital?', 'aera'),
        ),
        array(
          'speaker' => 'aera',
          'text'    => __('Transferring excess inventory from Santiago to São Paulo will reduce working capital by $22.1M.', 'aera'),
        ),
      ),
    ),
    array(
      'title'       => __('Aera acts.', 'aera'),
      'description' => __('Aera proactively engages relevant users and autonomously drives the execution of decisions.', 'aera'),
      'video'       => $assets_base . 'technology-loop-ceo.mp4',
      'background_image' => '',
      'messages'    => array(
        array(
          'speaker' => 'aera',
          'text'    => __('I predict a competitor stock-out for the Logo product in Germany.', 'aera'),
        ),
        array(
          'speaker' => 'user',
          'text'    => __('Aera, do we have excess inventory that we can ship?', 'aera'),
        ),
        array(
          'speaker' => 'aera',
          'text'    => __('Yes, I found excess inventory to fill 53% of the projected stock-out.', 'aera'),
        ),
      ),
    ),
    array(
      'title'       => __('Aera learns.', 'aera'),
      'description' => __('Aera learns from decisions made and their outcomes in order to improve future recommendations.', 'aera'),
      'video'       => $assets_base . 'technology-loop-vpmanufacturing.mp4',
      'background_image' => '',
      'cta_link'    => home_url('/aera-decision-cloud'),
      'cta_label'   => __('More About the technology', 'aera'),
      'messages'    => array(
        array(
          'speaker' => 'aera',
          'text'    => __('I found capacity for 100,000 units of Logo product in plant P23 for this month. Shall we launch production?', 'aera'),
        ),
        array(
          'speaker' => 'user',
          'text'    => __('Let’s do it!', 'aera'),
        ),
      ),
    ),
  );
}

$additional_text = function_exists('get_field') ? call_user_func('get_field', 'home_additional_text') : '';
$additional_text = $additional_text ? $additional_text : __('With Decision Intelligence, your business is agile, scalable, and continuously learning.', 'aera');

$cta = function_exists('get_field') ? (array) call_user_func('get_field', 'home_cta') : array();
$cta = wp_parse_args(
  $cta,
  array(
    'title' => __('See Aera in action.', 'aera'),
    'text'  => __('Schedule Demo', 'aera'),
    'link'  => home_url('/demo'),
  )
);

?>

<main id="primary" class="site-main site-main--home">
  <section class="intro fullHeight" id="hero">
    <div class="intro__container">
      <h1 class="intro__title"><?php echo esc_html($hero['title']); ?></h1>
      <h2 class="intro__subtitle"><?php echo esc_html($hero['tagline']); ?></h2>
      <p class="intro__text"><?php echo esc_html($hero['description']); ?></p>
    </div>
    <?php /* <button class="intro__scrollBtn" id="scrollDownBtn" type="button" data-scroll-to="#sectionTechnology">
      <img src="<?php echo esc_url($assets_base . 'downArrow.png'); ?>" alt="<?php esc_attr_e('Scroll down', 'aera'); ?>" loading="lazy" width="35" height="35" />
    </button> */ ?>
  </section>

  <section class="technology" id="sectionTechnology" data-technology>
    <div class="technology__sceneWrapper" data-technology-scene-wrapper>
      <?php foreach ($technology_sections as $index => $section) : ?>
        <?php
        $video = $section['video'] ?? '';
        $messages = $section['messages'] ?? array();
        $background_image = $section['background_image'] ?? '';
        $last_aera_index = -1;
        foreach ($messages as $message_index => $message) {
          if ('aera' === ($message['speaker'] ?? '')) {
            $last_aera_index = $message_index;
          }
        }
        ?>
        <div class="technologyScene scene-<?php echo esc_attr($index); ?><?php echo 0 === $index ? ' isVisible' : ''; ?>" data-technology-scene="<?php echo esc_attr($index); ?>">
          <div class="technologyScene__container">
            <div class="technologyScene__videoContainer">
              <div class="technologyScene__videoWrap">
                <?php if (! empty($video)) : ?>
                  <video class="technologyScene__video" autoplay muted loop playsinline preload="metadata" src="<?php echo esc_url($video); ?>" width="1280" height="720"></video>
                <?php endif; ?>
              </div>
            </div>
            <?php if (! empty($background_image)) : ?>
              <div class="technologyScene__prop">
                <img src="<?php echo esc_url($background_image); ?>" alt="" loading="lazy" />
              </div>
            <?php endif; ?>
            <div class="technologyScene__messages">
              <div class="technologyScene__messagesRow">
                <div class="technologyScene__messagesCol">
                  <div class="technologyMessages scene-<?php echo esc_attr($index); ?>">
                    <?php foreach ($messages as $message_index => $message) : ?>
                      <?php
                      $speaker = 'aera' === ($message['speaker'] ?? '') ? 'aera' : 'user';
                      $is_last_aera = ($speaker === 'aera' && $message_index === $last_aera_index);
                      ?>
                      <div class="technologyMessagesItem <?php echo esc_attr($speaker); ?> pos-<?php echo esc_attr($message_index); ?><?php echo $is_last_aera ? ' lastAera' : ''; ?>">
                        <div class="technologyMessagesItem__panel">
                          <?php echo esc_html($message['text'] ?? ''); ?>
                        </div>
                      </div>
                    <?php endforeach; ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="technology__container">
      <div class="technology__row">
        <div class="technology__colItems">
          <?php foreach ($technology_sections as $index => $section) : ?>
            <?php
            $title = $section['title'] ?? '';
            $description = $section['description'] ?? '';
            $video = $section['video'] ?? '';
            $cta_link = $section['cta_link'] ?? '';
            $cta_label = $section['cta_label'] ?? '';
            ?>
            <article class="technologyItem pos-<?php echo esc_attr($index); ?><?php echo 0 === $index ? ' isActive' : ''; ?>" data-technology-item data-technology-index="<?php echo esc_attr($index); ?>">
              <div class="technologyItem__scene">
                <?php if (! empty($video)) : ?>
                  <video autoplay muted loop playsinline preload="metadata" src="<?php echo esc_url($video); ?>"></video>
                <?php endif; ?>
              </div>
              <span class="technology__badge"><?php printf(esc_html__('0%d', 'aera'), $index + 1); ?></span>
              <h2 class="technologyItem__title"><?php echo esc_html($title); ?></h2>
              <div class="technologyItem__text">
                <?php echo wp_kses_post($description); ?>
              </div>
              <?php if ($cta_link && $cta_label) : ?>
                <a class="technology__link" href="<?php echo esc_url($cta_link); ?>"><?php echo esc_html($cta_label); ?></a>
              <?php endif; ?>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </section>

  <section class="additionalsection">
    <div class="additionalsection__container">
      <p class="additionalsection__text"><?php echo esc_html($additional_text); ?></p>
    </div>
  </section>

  <?php
  get_template_part('template-parts/components/cta', null, array('cta' => $cta));
  ?>
</main>

<?php
get_footer();
