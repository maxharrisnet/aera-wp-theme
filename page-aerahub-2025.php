<?php

/**
 * Template Name: AeraHub 2025
 *
 * @package Aera_Technology
 */

get_header();

// Image paths - assuming images are in assets/images/aerahub2025/
$assets_uri = get_template_directory_uri() . '/assets/images/aerahub2025/';

?>

<main id="primary" class="site-main site-main--aerahub-2025">
  <div class="aerahub-2025">
    <?php
    // Check for direct access parameter
    $has_direct_access = isset($_GET['access']) && $_GET['access'] === 'direct';
    ?>

    <!-- Gated Form Overlay -->
    <div class="aerahub-2025__overlaywrapper" id="hideMe" style="<?php echo $has_direct_access ? 'display: none;' : 'display: none;'; ?>">
      <div class="aerahub-2025__overlay">
        <div class="aerahub-2025__overlayFormWrapper">
          <div class="aerahub-2025__overlayForm">
            <section class="aerahub-2025__overlayFormHeader">
              <img
                alt="<?php esc_attr_e('AeraHub Logo', 'aera'); ?>"
                src="<?php echo esc_url($assets_uri . 'AERAHUB25OD.png'); ?>"
                class="aerahub-2025__overlayLogo" />
              <p><?php esc_html_e('Enter your email below to receive full access to the complete library of AeraHub 25 video content.', 'aera'); ?></p>
            </section>
            <div class="aerahub-2025__formBox">
              <div id="stickyform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content (with blur overlay when form is active) -->
    <div class="aerahub-2025__bluroverlay" id="removeBlurr" style="filter: <?php echo $has_direct_access ? 'blur(0px)' : 'none'; ?>;">
      <div class="aerahub-2025__header" id="aeraLogo"></div>

      <!-- Hero Section -->
      <div class="aerahub-2025__section1" id="aboutSection">
        <img
          src="<?php echo esc_url($assets_uri . 'aeraHubHeroOD.webp'); ?>"
          alt="<?php esc_attr_e('Hero Image', 'aera'); ?>"
          class="aerahub-2025__heroImage"
          loading="eager"
          fetchpriority="high" />
        <div class="aerahub-2025__heroSection" id="hero-section">
          <div class="aerahub-2025__heroRow">
            <div class="aerahub-2025__herotagline">
              <img
                alt="<?php esc_attr_e('AeraHub Logo', 'aera'); ?>"
                src="<?php echo esc_url($assets_uri . 'AERAHUB25OD.png'); ?>"
                class="aerahub-2025__heroLogo"
                loading="eager"
                fetchpriority="high" />
              <h1><?php esc_html_e('The Decision Intelligence Global Summit', 'aera'); ?></h1>
              <p><?php esc_html_e('AeraHUB 25 brought together C-level executives, business leaders, and technology pioneers who are digitizing and transforming decisions at scale.', 'aera'); ?></p>
              <div class="aerahub-2025__heroButtonWrapper">
                <a href="#onDemandSection" class="aerahub-2025__heroButton" id="onDemandBtn">
                  <?php esc_html_e('Watch On-Demand', 'aera'); ?>
                </a>
              </div>
            </div>
            <div class="aerahub-2025__heroVideoWrapper">
              <img
                src="<?php echo esc_url($assets_uri . 'onDemandSessions.webp'); ?>"
                alt="<?php esc_attr_e('On-Demand Sessions', 'aera'); ?>"
                loading="eager"
                fetchpriority="high" />
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Sessions Section -->
      <div class="aerahub-2025__featuredsession" id="onDemandSection">
        <div class="aerahub-2025__container">
          <div class="aerahub-2025__featuredboxwrapper" id="faeturedSessions">
            <?php get_template_part('template-parts/aerahub-2025', 'featured-sessions', array('assets_uri' => $assets_uri)); ?>
            <?php get_template_part('template-parts/aerahub-2025', 'product-sessions', array('assets_uri' => $assets_uri)); ?>
            <?php get_template_part('template-parts/aerahub-2025', 'partner-sessions', array('assets_uri' => $assets_uri)); ?>
          </div>
        </div>
      </div>

      <!-- Sponsors Section -->
      <div class="aerahub-2025__sponsors">
        <div class="aerahub-2025__container">
          <h2><?php esc_html_e('Thank You to Our Sponsors', 'aera'); ?></h2>
          <div class="aerahub-2025__sponsorswrapper">
            <div class="aerahub-2025__sponsor">
              <img
                src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/aerahub2024/Accenture_logo.png'); ?>"
                alt="<?php esc_attr_e('Accenture', 'aera'); ?>" />
            </div>
            <div class="aerahub-2025__sponsor">
              <img
                src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/aerahub2024/Deloittesponsor.png'); ?>"
                alt="<?php esc_attr_e('Deloitte', 'aera'); ?>" />
            </div>
            <div class="aerahub-2025__sponsor">
              <img
                src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/aerahub2024/eylogosponsor.png'); ?>"
                alt="<?php esc_attr_e('EY', 'aera'); ?>" />
            </div>
            <div class="aerahub-2025__sponsor">
              <img
                src="<?php echo esc_url($assets_uri . 'zs_logo_sponsor.png'); ?>"
                alt="<?php esc_attr_e('ZS', 'aera'); ?>" />
            </div>
          </div>
        </div>
      </div>

      <?php
      // Request Demo component would go here if it exists
      // For now, we'll add a simple CTA section
      ?>
      <div class="aerahub-2025__ctasection">
        <div class="aerahub-2025__container">
          <h2><?php esc_html_e('See Aera in action.', 'aera'); ?></h2>
          <a href="<?php echo esc_url(home_url('/demo')); ?>" class="aerahub-2025__requestbutton">
            <?php esc_html_e('Request for Demo', 'aera'); ?>
          </a>
        </div>
      </div>

      <div class="aerahub-2025__clearfix"></div>
    </div>

    <!-- Video Pop-Up -->
    <div class="aerahub-2025__videoPopup" id="videoPopup">
      <div class="aerahub-2025__videoContainer">
        <button class="aerahub-2025__closeBtn" id="closePopup" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">
          &times;
        </button>
        <div class="aerahub-2025__videoContainer__videoWrapper">
          <iframe
            id="vimeoVideo"
            name="vimeoVideo"
            src=""
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            title="<?php esc_attr_e('Video player', 'aera'); ?>"></iframe>
        </div>
      </div>
    </div>
  </div>
</main>

<?php
get_footer();
