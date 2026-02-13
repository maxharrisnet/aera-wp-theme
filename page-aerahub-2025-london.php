<?php

/**
 * Template Name: AeraHub 2025 London (On-Demand)
 *
 * Static template for AeraHub 25 London On-Demand page.
 * Hides main header/footer; gated email form; video keynotes; sponsors; CTA.
 *
 * @package Aera_Technology
 */

get_header();

$assets_2025 = get_template_directory_uri() . '/assets/images/aerahub2025/';
$assets_2024 = get_template_directory_uri() . '/assets/images/aerahub2024/';

$has_direct_access = isset($_GET['access']) && $_GET['access'] === 'direct';
?>

<main id="primary" class="site-main site-main--aerahub-2025-london">
  <div class="aerahub-2025-london">

    <!-- Video popups (one per keynote) -->
    <div class="aerahub-2025-london__videoPopup" id="videoPopupUnilever" aria-hidden="true">
      <div class="aerahub-2025-london__videoContainer">
        <button type="button" class="aerahub-2025-london__closeBtn" id="closePopupUnilever" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">&times;</button>
        <iframe id="vimeoVideoUnilever" src="https://player.vimeo.com/video/1093289093?h=ffe19c7819&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="<?php esc_attr_e('Video: Unilever', 'aera'); ?>"></iframe>
      </div>
    </div>
    <div class="aerahub-2025-london__videoPopup" id="videoPopupPMI" aria-hidden="true">
      <div class="aerahub-2025-london__videoContainer">
        <button type="button" class="aerahub-2025-london__closeBtn" id="closePopupPMI" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">&times;</button>
        <iframe id="vimeoVideoPMI" src="https://player.vimeo.com/video/1093195380?h=c7e06d0b90&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="<?php esc_attr_e('Video: PMI', 'aera'); ?>"></iframe>
      </div>
    </div>
    <div class="aerahub-2025-london__videoPopup" id="videoPopupCastrol" aria-hidden="true">
      <div class="aerahub-2025-london__videoContainer">
        <button type="button" class="aerahub-2025-london__closeBtn" id="closePopupCastrol" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">&times;</button>
        <iframe id="vimeoVideoCastrol" src="https://player.vimeo.com/video/1093239524?h=9f83f76092&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="<?php esc_attr_e('Video: Castrol', 'aera'); ?>"></iframe>
      </div>
    </div>
    <div class="aerahub-2025-london__videoPopup" id="videoPopupFred" aria-hidden="true">
      <div class="aerahub-2025-london__videoContainer">
        <button type="button" class="aerahub-2025-london__closeBtn" id="closePopupFred" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">&times;</button>
        <iframe id="vimeoVideoFred" src="https://player.vimeo.com/video/1094181529?h=06861f8915&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="<?php esc_attr_e('Video: Fred Laluyaux', 'aera'); ?>"></iframe>
      </div>
    </div>
    <div class="aerahub-2025-london__videoPopup" id="videoPopupAccenture" aria-hidden="true">
      <div class="aerahub-2025-london__videoContainer">
        <button type="button" class="aerahub-2025-london__closeBtn" id="closePopupAccenture" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">&times;</button>
        <iframe id="vimeoVideoAccenture" src="https://player.vimeo.com/video/1094218563?h=2dc135ea3b&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="<?php esc_attr_e('Video: Accenture', 'aera'); ?>"></iframe>
      </div>
    </div>
    <div class="aerahub-2025-london__videoPopup" id="videoPopupAstraZeneca" aria-hidden="true">
      <div class="aerahub-2025-london__videoContainer">
        <button type="button" class="aerahub-2025-london__closeBtn" id="closePopupAstraZeneca" aria-label="<?php esc_attr_e('Close video', 'aera'); ?>">&times;</button>
        <iframe id="vimeoVideoAstraZeneca" src="https://player.vimeo.com/video/1093938881?h=d549b5fd3f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="<?php esc_attr_e('Video: AstraZeneca', 'aera'); ?>"></iframe>
      </div>
    </div>

    <!-- Gated overlay -->
    <div class="aerahub-2025-london__overlaywrapper" id="hideMe">
      <div class="aerahub-2025-london__overlay">
        <div class="aerahub-2025-london__overlayFormWrapper">
          <div class="aerahub-2025-london__overlayForm">
            <p><?php esc_html_e('Enter your email below to receive full access to the complete library of AeraHub 25 video content.', 'aera'); ?></p>
            <div class="aerahub-2025-london__formBox">
              <div id="stickyform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main content (blurred when overlay is shown) -->
    <div class="aerahub-2025-london__bluroverlay" id="removeBlurr">
      <header class="aerahub-2025-london__header" id="aeraLogo">
        <div class="aerahub-2025-london__headerContainer">
          <a href="<?php echo esc_url(home_url('/')); ?>" class="aerahub-2025-london__headerLogo">
            <img src="<?php echo esc_url($assets_2025 . 'AERAHUB25.png'); ?>" alt="<?php esc_attr_e('AeraHub 25', 'aera'); ?>" class="aerahub-2025-london__headerLogoImage" />
            <span><?php esc_html_e('London, UK', 'aera'); ?></span>
          </a>
        </div>
      </header>

      <section class="aerahub-2025-london__section1">
        <div class="aerahub-2025-london__imgbox" aria-hidden="true"></div>
        <div class="aerahub-2025-london__container">
          <div class="aerahub-2025-london__section1wrapper">
            <div class="aerahub-2025-london__section1lefttext">
              <div class="aerahub-2025-london__flexwrapper">
                <img src="<?php echo esc_url($assets_2025 . 'AeraHUB25logowhite.svg'); ?>" alt="<?php esc_attr_e('AeraHub 25', 'aera'); ?>" />
              </div>
              <div class="aerahub-2025-london__subtitle">
                <h2><?php esc_html_e('The Decision Intelligence Summit', 'aera'); ?></h2>
                <h3><?php esc_html_e('Watch On-Demand', 'aera'); ?></h3>
                <div class="aerahub-2025-london__footerbutton">
                  <a href="#keynote" class="aerahub-2025-london__saveyourseat" id="register"><?php esc_html_e('Watch Now', 'aera'); ?></a>
                </div>
              </div>
            </div>
            <div class="aerahub-2025-london__clearfix"></div>
          </div>
        </div>
      </section>

      <section class="aerahub-2025-london__section2">
        <div class="aerahub-2025-london__container">
          <div class="aerahub-2025-london__section2div1">
            <h1 class="aerahub-2025-london__darkBlue"><?php esc_html_e('Welcome to AeraHUB 25 On-Demand', 'aera'); ?></h1>
            <p><?php esc_html_e('AeraHUB 25 brought together innovators, thought leaders, and business pioneers leading the charge in digitizing and automating business decision-making with AI. Explore the full suite of on-demand content from the event, including keynote presentations, fireside chats, and sessions showcasing Aera\'s cutting-edge innovations, real-world business impact, and skills demos.', 'aera'); ?></p>
          </div>
        </div>
      </section>

      <div class="aerahub-2025-london__clearfix"></div>

      <section class="aerahub-2025-london__keynotes" id="keynote">
        <div class="aerahub-2025-london__container">
          <div class="aerahub-2025-london__keynotewrapper">
            <h2><?php esc_html_e('Highlights from the Keynote: Stories and Perspectives on the Impact of Decision Intelligence', 'aera'); ?></h2>
            <p><?php esc_html_e('In a series of fireside chats, these business champions and thought leaders highlighted the transformative potential of decision intelligence across industries, emphasizing innovation, scalability, and rapid time to value. Through their shared insights, discover the capacity of decision intelligence to revolutionize decision-making processes by enabling faster, smarter, and more accurate decisions across a wide array of applications.', 'aera'); ?></p>
            <div class="aerahub-2025-london__keynotesboxwrapper">
              <a href="#keynote" class="aerahub-2025-london__keynotesbox" id="openPopupUnilever">
                <img src="<?php echo esc_url($assets_2025 . 'Unilever_tile.png'); ?>" alt="" />
                <h4><?php esc_html_e('How Unilever is envisioning the Autonomous Supply Chain with Agentic AI', 'aera'); ?></h4>
              </a>
              <a href="#keynote" class="aerahub-2025-london__keynotesbox" id="openPopupPMI">
                <img src="<?php echo esc_url($assets_2025 . 'PMI_tile.png'); ?>" alt="" />
                <h4><?php esc_html_e('Warp-Speed Supply Chain: Decision Intelligence Powering PMI\'s Smoke-Free Future', 'aera'); ?></h4>
              </a>
              <a href="#keynote" class="aerahub-2025-london__keynotesbox" id="openPopupCastrol">
                <img src="<?php echo esc_url($assets_2025 . 'Castrol_tile.png'); ?>" alt="" />
                <h4><?php esc_html_e('Accelerating Cross-Functional Agility BP-Castrol\'s AI-Driven Supply Chain Transformation', 'aera'); ?></h4>
              </a>
              <a href="#keynote" class="aerahub-2025-london__keynotesbox" id="openPopupAstraZeneca">
                <img src="<?php echo esc_url($assets_2025 . 'AZ_tile.png'); ?>" alt="" />
                <h4><?php esc_html_e('Advancing Clinical Trials with Decision Intelligence at AstraZeneca', 'aera'); ?></h4>
              </a>
              <a href="#keynote" class="aerahub-2025-london__keynotesbox" id="openPopupAccenture">
                <img src="<?php echo esc_url($assets_2025 . 'Accenture_tile.png'); ?>" alt="" />
                <h4><?php esc_html_e('Next-Gen Supply Chain with Accenture - From Automation to Full Autonomy', 'aera'); ?></h4>
              </a>
              <a href="#keynote" class="aerahub-2025-london__keynotesbox" id="openPopupFred">
                <img src="<?php echo esc_url($assets_2025 . 'Fred_tile.png'); ?>" alt="" />
                <h4><?php esc_html_e('Fred Laluyaux provides insights on the future of decision intelligence', 'aera'); ?></h4>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div class="aerahub-2025-london__clearfix"></div>

      <section class="aerahub-2025-london__registersection">
        <div class="aerahub-2025-london__container">
          <div class="aerahub-2025-london__registersectionwrapper">
            <h2><?php esc_html_e('Schedule a Demo of the Aera Decision Cloud', 'aera'); ?></h2>
            <div class="aerahub-2025-london__footerbutton">
              <a href="<?php echo esc_url(home_url('/demo')); ?>" class="aerahub-2025-london__registerbtnblue" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Schedule Now', 'aera'); ?></a>
            </div>
          </div>
        </div>
      </section>

      <section class="aerahub-2025-london__sponsors">
        <div class="aerahub-2025-london__container">
          <h2><?php esc_html_e('Thank You to our Sponsors', 'aera'); ?></h2>
          <div class="aerahub-2025-london__sponsorswrapper">
            <div class="aerahub-2025-london__sponsor">
              <img src="<?php echo esc_url($assets_2024 . 'Accenture_logo.png'); ?>" alt="<?php esc_attr_e('Accenture', 'aera'); ?>" />
            </div>
            <div class="aerahub-2025-london__sponsor">
              <img src="<?php echo esc_url($assets_2025 . 'zs_logo_sponsor.png'); ?>" alt="<?php esc_attr_e('ZS', 'aera'); ?>" />
            </div>
            <div class="aerahub-2025-london__sponsor">
              <img src="<?php echo esc_url($assets_2024 . 'Deloittesponsor.png'); ?>" alt="<?php esc_attr_e('Deloitte', 'aera'); ?>" />
            </div>
          </div>
        </div>
      </section>

      <div class="aerahub-2025-london__clearfix"></div>

      <div class="aerahub-2025-london__ctasection">
        <div class="aerahub-2025-london__container">
          <div class="aerahub-2025-london__socialIcons">
            <a href="https://www.linkedin.com/company/aera-technology/" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('LinkedIn', 'aera'); ?>"><img src="<?php echo esc_url($assets_2024 . 'LinkedIn.png'); ?>" alt="" /></a>
            <a href="https://x.com/Aera_Technology" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('X (Twitter)', 'aera'); ?>"><img src="<?php echo esc_url($assets_2024 . 'Twitter.png'); ?>" alt="" /></a>
            <a href="https://www.youtube.com/@AeraTechnology" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e('YouTube', 'aera'); ?>"><img src="<?php echo esc_url($assets_2024 . 'Youtube.png'); ?>" alt="" /></a>
          </div>
          <p>
            <a href="<?php echo esc_url(home_url('/')); ?>"><?php esc_html_e('Aera Technology', 'aera'); ?></a> | 707 California St, Mountain View, CA 94041
          </p>
        </div>
      </div>
    </div>
  </div>
</main>

<?php
get_footer();
