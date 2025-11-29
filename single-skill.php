<?php

/**
 * The template for displaying single skill posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

$tagline = get_field('skill_tagline');
$description = get_field('skill_description') ?: get_the_excerpt();
$benefits = get_field('skill_benefits');
$featured_skills = get_field('featured_skills');
$key_decisions_needed = get_field('key_decisions_needed');
$how_aera_helps = get_field('how_aera_helps');
$needed_decisions_mobile = get_field('needed_decisions_and_aera_helps_mobile');
$demo_video_form = get_field('demo_video_form');
$related_skills = get_field('related_skills');
$related_resources = get_field('related_resources');
$benefits_text_and_image = get_field('benefits_text_and_image');
?>

<main id="primary" class="site-main site-main--skill">
  <?php
  while (have_posts()) :
    the_post();
    ?>

    <!-- Intro Section -->
    <section class="skills-intro">
      <div class="skills-intro__container">
        <h1 class="skills-intro__title"><?php the_title(); ?></h1>
        <?php if ($tagline) : ?>
          <p class="skills-intro__tagline"><i><?php echo esc_html($tagline); ?></i></p>
        <?php endif; ?>
        <?php if ($description) : ?>
          <?php
          $paragraphs = array_filter(
            array_map('trim', explode("\n", $description)),
            function ($p) {
              return ! empty($p);
            }
          );
          foreach ($paragraphs as $paragraph) :
            ?>
            <p class="skills-intro__text"><?php echo esc_html($paragraph); ?></p>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    </section>

    <!-- Benefits Section -->
    <?php
    // Handle benefits - could be repeater (ACF Pro) or group field (ACF Free)
    $benefits_display = array();
    if ($benefits_text_and_image && is_array($benefits_text_and_image)) {
      // Check if it's a repeater array
      if (isset($benefits_text_and_image[0]) && is_array($benefits_text_and_image[0])) {
        $benefits_display = $benefits_text_and_image;
      } else {
        // It's a group field, convert to array format
        $benefits_section = get_field('benefits_section');
        if ($benefits_section) {
          if (!empty($benefits_section['benefit_1_percentage']) || !empty($benefits_section['benefit_1_title'])) {
            $benefits_display[] = array(
              'benefits_percentage' => $benefits_section['benefit_1_percentage'] ?? '',
              'benefits_title' => $benefits_section['benefit_1_title'] ?? '',
            );
          }
          if (!empty($benefits_section['benefit_2_percentage']) || !empty($benefits_section['benefit_2_title'])) {
            $benefits_display[] = array(
              'benefits_percentage' => $benefits_section['benefit_2_percentage'] ?? '',
              'benefits_title' => $benefits_section['benefit_2_title'] ?? '',
            );
          }
        }
      }
    }
    ?>
    <?php if (!empty($benefits_display)) : ?>
      <section class="skills__benefitsWrapper">
        <div class="skills__container">
          <h3><?php esc_html_e('Benefits', 'aera'); ?></h3>
          <div class="skills__row">
            <?php
            foreach ($benefits_display as $benefit) :
              $percentage = $benefit['benefits_percentage'] ?? '';
              $title = $benefit['benefits_title'] ?? '';
              if ($percentage || $title) :
                ?>
                <div class="skills__benefitsBox">
                  <?php if ($percentage) : ?>
                    <h2><?php echo esc_html($percentage); ?></h2>
                  <?php endif; ?>
                  <?php if ($title) : ?>
                    <p><?php echo esc_html($title); ?></p>
                  <?php endif; ?>
                </div>
              <?php endif; ?>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Featured Skills Section -->
    <?php if ($featured_skills) : ?>
      <section class="skills__featuredSkills" id="featured-skills">
        <div class="skills__sliderContainer">
          <div class="skills__featuredSkillsWrapper">
            <h3><?php esc_html_e('Featured Skills', 'aera'); ?></h3>
            <div class="skills__featuredSkillsSlider" id="videoWrapper">
              <div id="bx-featuredpager" class="skills__featuredSkillsSliderPager">
                <?php
                foreach ($featured_skills as $index => $featured_skill) :
                  $title = $featured_skill['featured_skill_title'] ?? '';
                  if ($title) :
                    ?>
                    <a href="#" data-slide-index="<?php echo esc_attr($index); ?>" data-slide-name="<?php echo esc_attr(strtolower(str_replace('-', ' ', $title))); ?>">
                      <?php echo esc_html($title); ?>
                    </a>
                  <?php endif; ?>
                <?php endforeach; ?>
              </div>
              <div id="bx-featuredslider">
                <?php
                foreach ($featured_skills as $index => $featured_skill) :
                  $title = $featured_skill['featured_skill_title'] ?? '';
                  $description = $featured_skill['featured_skill_description'] ?? '';
                  $image_video = $featured_skill['featured_skill_image_video'] ?? '';
                  $demo_link = $featured_skill['featured_skill_demo_link'] ?? '';
                  $body_content = $featured_skill['featured_skill_body_content'] ?? '';
                  ?>
                  <div class="skills__sliderRow">
                    <div class="skills__slideCol">
                      <?php if ($title) : ?>
                        <div class="skills__sliderTitle" data-title="<?php echo esc_attr($title); ?>">
                          <?php echo esc_html($title); ?>
                        </div>
                      <?php endif; ?>
                      <?php if ($description) : ?>
                        <p class="skills__sliderDescription"><?php echo esc_html($description); ?></p>
                      <?php endif; ?>
                      <?php if ($image_video) : ?>
                        <img src="<?php echo esc_url($image_video['url']); ?>" alt="<?php echo esc_attr($image_video['alt'] ?? $title); ?>" />
                      <?php elseif ($demo_link) : ?>
                        <div class="skills__overlayWrapper">
                          <div class="skills__overlay" id="hide-me" data-name="overlay">
                            <img id="gatedVideo" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/newskills/playbtn.png'); ?>" alt="Play button" data-name="showForm" />
                          </div>
                          <iframe id="videoFrame" class="video-iframe" width="100%" height="350" src="<?php echo esc_url($demo_link); ?>" title="Aera Technology" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                      <?php endif; ?>
                    </div>
                    <div class="skills__slideCol">
                      <?php if ($body_content) : ?>
                        <div class="skills__content">
                          <?php echo wp_kses_post($body_content); ?>
                        </div>
                      <?php endif; ?>
                    </div>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>

            <?php if ($demo_video_form) : ?>
              <div class="skills__sliderFormWrapper" id="slideForm">
                <div class="skills__closebtn" id="closeBtn" data-name="closeForm">X</div>
                <div class="skills__formWrapper">
                  <?php echo wp_kses_post($demo_video_form); ?>
                </div>
              </div>
            <?php endif; ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Key Decisions Needed / How Aera Helps Section -->
    <?php if ($key_decisions_needed || $how_aera_helps) : ?>
      <section class="skills__needAndHelp">
        <div class="skills__xlVisible">
          <div class="skills__container">
            <div class="skills__needAndHelpWrapper">
              <?php if ($key_decisions_needed) : ?>
                <div class="skills__listNeeded">
                  <h2><?php esc_html_e('Key Decisions Needed', 'aera'); ?></h2>
                  <div class="skills__content">
                    <?php echo wp_kses_post($key_decisions_needed); ?>
                  </div>
                </div>
              <?php endif; ?>
              <?php if ($how_aera_helps) : ?>
                <div class="skills__listHelp">
                  <h2><?php esc_html_e('How Aera Helps', 'aera'); ?></h2>
                  <div class="skills__content">
                    <?php echo wp_kses_post($how_aera_helps); ?>
                  </div>
                </div>
              <?php endif; ?>
            </div>
          </div>
        </div>

        <?php if ($needed_decisions_mobile) : ?>
          <div class="skills__xsVisible">
            <div class="skills__container">
              <div class="skills__needAndHelpWrapperMobile">
                <div class="skills__listNeededMobile">
                  <h2><?php esc_html_e('Key Decisions Needed', 'aera'); ?></h2>
                  <div class="skills__content">
                    <?php echo wp_kses_post($needed_decisions_mobile); ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <?php endif; ?>
      </section>
    <?php endif; ?>

    <!-- Related Skills Section -->
    <?php if ($related_skills) : ?>
      <section class="skills__relatedSkills">
        <div class="skills__relatedSkillsContainer">
          <h2><?php esc_html_e('Related Skills', 'aera'); ?></h2>
          <div class="skills__relatedSkillsRow">
            <?php
            foreach ($related_skills as $related_skill) :
              $title = $related_skill['related_skill_title'] ?? '';
              $description = $related_skill['related_skill_description'] ?? '';
              $link = $related_skill['related_skills_link'] ?? '';
              $icon = $related_skill['skills_icon'] ?? '';
              ?>
              <a href="<?php echo esc_url($link); ?>" class="skills__relatedSkillsBox">
                <?php if ($icon) : ?>
                  <p><img src="<?php echo esc_url($icon['url']); ?>" alt="<?php echo esc_attr($icon['alt'] ?? $title); ?>" class="skills__skillIcon" /></p>
                <?php endif; ?>
                <?php if ($title) : ?>
                  <h3><?php echo esc_html(str_replace('-', ' ', $title)); ?></h3>
                <?php endif; ?>
                <?php if ($description) : ?>
                  <p><?php echo esc_html($description); ?></p>
                <?php endif; ?>
                <div class="skills__relatedSkillsArrow">
                  <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/newskills/rightArrow.png'); ?>" alt="Arrow" />
                </div>
              </a>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Related Resources Section -->
    <?php if ($related_resources) : ?>
      <section class="skills__relatedResources">
        <div class="skills__relatedResourcesContainer">
          <h2><?php esc_html_e('Related Resources', 'aera'); ?></h2>
          <div class="skills__relatedResourcesRow">
            <?php
            foreach ($related_resources as $resource) :
              $title = $resource['title'] ?? '';
              $text = $resource['text'] ?? '';
              $link = $resource['link'] ?? '';
              $type = $resource['type'] ?? '';
              $image = $resource['image'] ?? '';
              ?>
              <a href="<?php echo esc_url($link); ?>" target="_blank" class="skills__relatedResourceCard">
                <?php if ($image) : ?>
                  <div class="skills__relatedResourceImage" style="background-image: url(<?php echo esc_url($image['url']); ?>)"></div>
                <?php endif; ?>
                <div class="skills__relatedResourcesCardWrapper">
                  <?php if ($type) : ?>
                    <div class="skills__relatedResourceType"><?php echo esc_html($type); ?></div>
                  <?php endif; ?>
                  <?php if ($title) : ?>
                    <h3 class="skills__relatedResourceTitle"><?php echo esc_html($title); ?></h3>
                  <?php endif; ?>
                  <?php if ($text) : ?>
                    <p class="skills__relatedResourceDescription"><?php echo esc_html($text); ?></p>
                  <?php endif; ?>
                </div>
              </a>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    <?php endif; ?>

    <!-- Call to Action Section -->
    <section class="skills__callToAction">
      <div class="skills__container">
        <div class="skills__formWrapper">
          <h2><?php esc_html_e('Schedule A Live Demo Today', 'aera'); ?></h2>
          <a href="<?php echo esc_url(home_url('/demo')); ?>" class="skills__scheduleDemoBtn">
            <?php esc_html_e('Schedule Demo', 'aera'); ?>
          </a>
        </div>
      </div>
    </section>

  <?php endwhile; ?>
</main>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality (using bxSlider if available, or implement custom)
    if (typeof jQuery !== 'undefined' && jQuery.fn.bxSlider) {
      jQuery(function($) {
        var slider = $('#bx-featuredslider').bxSlider({
          auto: false,
          pause: 3000,
          controls: false,
          pager: true,
          adaptiveHeight: $(window).width() < 720 ? true : false,
          moveSlides: 1,
          pagerCustom: '#bx-featuredpager',
          touchEnabled: false,
        });

        $('#bx-featuredpager a[data-slide-index="0"]').css({
          'backgroundColor': '#dee8fb',
          'backgroundImage': 'linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)'
        });

        $('#bx-featuredpager a').on('click touchstart', function(e) {
          e.preventDefault();
          var thumbIndex = $('#bx-featuredpager a').index(this);
          $('#bx-featuredpager a').css({
            'backgroundColor': '#fff',
            'border': '2px solid #bee9f3',
            'borderColor': 'rgba(138,196,232,.5)',
            'backgroundImage': 'linear-gradient(white, white)'
          });
          $(this).css({
            'backgroundColor': '#dee8fb',
            'backgroundImage': 'linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)'
          });
        });
      });
    }

    // Form overlay functionality
    if (typeof jQuery !== 'undefined') {
      jQuery(function($) {
        $('[data-name="showForm"]').on('click', function() {
          $('#slideForm').show();
        });
        $('[data-name="closeForm"]').on('click', function() {
          $('#slideForm').hide();
        });
      });
    }
  });
</script>

<?php
get_footer();

