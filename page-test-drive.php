<?php

/**
 * Template Name: Test Drive
 *
 * @package Aera_Technology
 */

get_header();

$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/images/';

?>

<div class="testdrive">
  <div class="testdrive__section1">
    <div class="testdrive__container">
      <div class="testdrive__headlinewrapper">
        <h1 class="testdrive__title"><?php esc_html_e('Test Drive the Aera Decision Cloud™', 'aera'); ?></h1>
        <p><?php esc_html_e('Experience the value of Decision Intelligence in just 2 to 4 weeks. Our hands-on Test Drive gives you actionable insights and recommendations generated from your data.', 'aera'); ?></p>
      </div>
      <div class="testdrive__section1wrapper">
        <div class="testdrive__section1lefttext">
          <p><?php esc_html_e('With the Aera Test Drive, you experience the powerful capabilities of the Aera Decision Cloud platform, including harmonized data, AI-enabled insights, and actionable recommendations.', 'aera'); ?></p>
          <p><?php esc_html_e('See the benefits of Decision Intelligence in the context of your business. Gain an understanding of the commercial and technical requirements – and potential value to your company – of deploying decision-making AI.', 'aera'); ?></p>
          <p><?php esc_html_e('Assess your organization\'s readiness to start your Decision Intelligence journey. Schedule a meeting to learn more about an Aera Test Drive today.', 'aera'); ?></p>
        </div>
        <div class="testdrive__section1rightimg">
          <div class="testdrive__formwrapper" id="form-wrapper">
            <?php
            // Get HubSpot form configuration from ACF or use defaults
            $hubspot_portal_id = function_exists('get_field') ? get_field('hubspot_portal_id') : '';
            if (empty($hubspot_portal_id)) {
              $hubspot_portal_id = '4455954';
            }

            $hubspot_form_id = function_exists('get_field') ? get_field('hubspot_form_id') : '';
            if (empty($hubspot_form_id)) {
              // Default test drive form ID - update this with your actual form ID
              $hubspot_form_id = '9fa1d4a1-4c89-44d5-add1-37df812fc7bd';
            }
            ?>
            <div id="testdriveHubspotForm"></div>
          </div>
        </div>
        <div class="testdrive__clearfix"></div>
      </div>
    </div>
  </div>
  <div class="testdrive__section2">
    <div class="testdrive__container">
      <div class="testdrive__section2div1">
        <h2><?php esc_html_e('What do you get as part of the Aera Test Drive?', 'aera'); ?></h2>
        <p><?php esc_html_e('We guide you through the process of deploying an AI-powered Decision Intelligence platform that understands your business capabilities, makes real-time recommendations, acts to execute decisions, and learns from the outcomes of decisions made. You will experience firsthand how Aera harmonizes data, applies intelligence, engages with users, and executes decisions.', 'aera'); ?></p>
      </div>
    </div>
    <div class="testdrive__sliderwrapper">
      <div id="bx-pager" class="testdrive__pager">
        <a href="#" data-slide-index="0" class="testdrive__default"><?php esc_html_e('Aera Skills™', 'aera'); ?></a>
        <a href="#" data-slide-index="1"><?php esc_html_e('Data-Driven Recommendations', 'aera'); ?></a>
        <a href="#" data-slide-index="2"><?php esc_html_e('Decision Data Model', 'aera'); ?></a>
        <a href="#" data-slide-index="3"><?php esc_html_e('Insights', 'aera'); ?></a>
      </div>
      <div id="testdriveSlider" class="testdrive__slider">
        <div class="testdrive__slide">
          <div class="testdrive__slidercontentwrapper">
            <div class="testdrive__sliderimg">
              <?php
              $aeraskills_img = $assets_base . 'test-drive/aeraskills.jpg';
              if (file_exists(get_template_directory() . '/assets/images/test-drive/aeraskills.jpg')) {
                echo '<img src="' . esc_url($aeraskills_img) . '" alt="' . esc_attr__('Aera Skills™', 'aera') . '" />';
              } else {
                echo '<div class="testdrive__imagePlaceholder">' . esc_html__('Aera Skills Image', 'aera') . '</div>';
              }
              ?>
            </div>
            <div class="testdrive__slidercontent">
              <h3><?php esc_html_e('Aera Skills™', 'aera'); ?></h3>
              <ul>
                <li><?php esc_html_e('Address specific use cases, called skills, with composable data science and machine learning models. Select from a menu of skills that solve critical business decision-making challenges.', 'aera'); ?></li>
                <li><?php esc_html_e('Learn how your team can develop new Aera Skills to meet your changing business needs.', 'aera'); ?></li>
              </ul>
            </div>
            <div class="testdrive__clearfix"></div>
          </div>
        </div>
        <div class="testdrive__slide">
          <div class="testdrive__slidercontentwrapper">
            <div class="testdrive__sliderimg">
              <?php
              $recommendations_img = $assets_base . 'test-drive/TD_recommendation_screen.jpg';
              if (file_exists(get_template_directory() . '/assets/images/test-drive/TD_recommendation_screen.jpg')) {
                echo '<img src="' . esc_url($recommendations_img) . '" alt="' . esc_attr__('Data-Driven Recommendations', 'aera') . '" />';
              } else {
                echo '<div class="testdrive__imagePlaceholder">' . esc_html__('Recommendations Image', 'aera') . '</div>';
              }
              ?>
            </div>
            <div class="testdrive__slidercontent">
              <h3><?php esc_html_e('Data-Driven Recommendations', 'aera'); ?></h3>
              <ul>
                <li><?php esc_html_e('Execute decisions at the moment of maximum impact with timely recommendations delivered to your inbox, along with the context and data required to understand each decision.', 'aera'); ?></li>
                <li><?php esc_html_e('Dive into the data behind each recommendation using Aera\'s rich analysis and visualization tools.', 'aera'); ?></li>
              </ul>
            </div>
            <div class="testdrive__clearfix"></div>
          </div>
        </div>
        <div class="testdrive__slide">
          <div class="testdrive__slidercontentwrapper">
            <div class="testdrive__sliderimg">
              <?php
              $ddm_img = $assets_base . 'test-drive/DDM_CIRLCES.png';
              if (file_exists(get_template_directory() . '/assets/images/test-drive/DDM_CIRLCES.png')) {
                echo '<img src="' . esc_url($ddm_img) . '" alt="' . esc_attr__('Decision Data Model', 'aera') . '" />';
              } else {
                echo '<div class="testdrive__imagePlaceholder">' . esc_html__('DDM Image', 'aera') . '</div>';
              }
              ?>
            </div>
            <div class="testdrive__slidercontent">
              <h3><?php esc_html_e('Decision Data Model', 'aera'); ?></h3>
              <ul>
                <li><?php esc_html_e('Rapidly ingest and harmonize your enterprise data to get real-time insights and improve data quality.', 'aera'); ?></li>
                <li><?php esc_html_e('Map over 170 data sets to generate over 80 pre-populated KPIs and measures with Aera Data Crawlers.', 'aera'); ?></li>
                <li><?php esc_html_e('Learn how Aera\'s Data Workbench enables continuous learning by writing back to source systems, capturing the context and outcome of every decision.', 'aera'); ?></li>
              </ul>
            </div>
            <div class="testdrive__clearfix"></div>
          </div>
        </div>
        <div class="testdrive__slide">
          <div class="testdrive__slidercontentwrapper">
            <div class="testdrive__sliderimg">
              <?php
              $insights_img = $assets_base . 'test-drive/TD_Insights_screen.jpg';
              if (file_exists(get_template_directory() . '/assets/images/test-drive/TD_Insights_screen.jpg')) {
                echo '<img src="' . esc_url($insights_img) . '" alt="' . esc_attr__('Insights', 'aera') . '" />';
              } else {
                echo '<div class="testdrive__imagePlaceholder">' . esc_html__('Insights Image', 'aera') . '</div>';
              }
              ?>
            </div>
            <div class="testdrive__slidercontent">
              <h3><?php esc_html_e('Insights', 'aera'); ?></h3>
              <ul>
                <li><?php esc_html_e('Gain insights across procurement, inventory, manufacturing, and customer metrics with Aera\'s dashboards, data science, and Graph DB capabilities.', 'aera'); ?></li>
                <li><?php esc_html_e('Empower users with the ability to go from high-level insights to transaction-level details for deep-dive analysis.', 'aera'); ?></li>
                <li><?php esc_html_e('Identify and quantify the value that Decision Intelligence can deliver for your organization.', 'aera'); ?></li>
              </ul>
            </div>
            <div class="testdrive__clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="testdrive__quotesection">
    <div class="testdrive__overlay"></div>
    <div class="testdrive__container testdrive__quoteflex">
      <div class="testdrive__quote">
        <h2><?php esc_html_e('"Through the Aera Test Drive, we experienced the ability of Decision Intelligence to empower the people in our organization with the technology and capabilities to accelerate our impact. It\'s been a privilege to be part of the Aera journey and we look forward to achieving new milestones in the future."', 'aera'); ?></h2>
        <div class="testdrive__signaturewrapper">
          <div class="testdrive__signature">
            <div class="testdrive__dash"><?php esc_html_e('Kevin Callanan,', 'aera'); ?></div>
            <div><?php esc_html_e('Vice President of Supply Chain and Procurement,', 'aera'); ?></div>
            <div class="testdrive__bold"><?php esc_html_e('Lucid Motors', 'aera'); ?></div>
          </div>
        </div>
      </div>
      <div class="testdrive__clearfix"></div>
    </div>
  </div>
  <div class="testdrive__benefits testdrive__padding">
    <div class="testdrive__container">
      <div class="testdrive__benefitswrapper">
        <h2><?php esc_html_e('Benefits of the Aera Test Drive', 'aera'); ?></h2>
        <div class="testdrive__pointerwrapper">
          <div class="testdrive__linepointers"><?php esc_html_e('Actionable, AI-powered recommendations, harmonized data, and insights delivered in your business context.', 'aera'); ?></div>
          <div class="testdrive__linepointers"><?php esc_html_e('Firsthand experience of how AI accelerates your business and digital strategies, and introduces your team to a new way of working.', 'aera'); ?></div>
          <div class="testdrive__linepointers"><?php esc_html_e('A Decision Intelligence value-based roadmap for your organization, created in collaboration with your executive team and subject-matter experts.', 'aera'); ?></div>
          <div class="testdrive__linepointers"><?php esc_html_e('Hands-on workshops and training with your end users to educate them on the benefits of our self-service platform.', 'aera'); ?></div>
          <div class="testdrive__clearfix"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="testdrive__ctasection" id="cta-section">
    <div class="testdrive__container">
      <h2><?php esc_html_e('Talk to us to learn more', 'aera'); ?></h2>
      <div class="testdrive__footerbutton">
        <a href="javascript:;" class="testdrive__testdrivebutton" id="testdrivebtn"><?php esc_html_e('Schedule Meeting', 'aera'); ?></a>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Load HubSpot form for test drive page
    const hubspotPortalId = '<?php echo esc_js($hubspot_portal_id); ?>';
    const hubspotFormId = '<?php echo esc_js($hubspot_form_id); ?>';

    if (hubspotPortalId && hubspotFormId) {
      // Check if script is already loaded
      if (document.querySelector('script[src*="js.hsforms.net"]')) {
        // Script already exists, create form directly
        if (window.hbspt && window.hbspt.forms) {
          window.hbspt.forms.create({
            portalId: hubspotPortalId,
            formId: hubspotFormId,
            target: '#testdriveHubspotForm'
          });
        }
      } else {
        // Load HubSpot forms script
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        script.charset = 'utf-8';
        script.type = 'text/javascript';

        script.addEventListener('load', function() {
          if (window.hbspt && window.hbspt.forms) {
            window.hbspt.forms.create({
              portalId: hubspotPortalId,
              formId: hubspotFormId,
              target: '#testdriveHubspotForm'
            });
          } else {
            console.error('🔴 HubSpot forms library failed to load');
          }
        });

        script.addEventListener('error', function() {
          console.error('🔴 Failed to load HubSpot forms script');
        });

        document.body.appendChild(script);
      }
    } else {
      console.error('🔴 HubSpot form error: Portal ID or Form ID is missing');
    }

    // Slider functionality
    const slides = document.querySelectorAll('.testdrive__slide');
    const pagerLinks = document.querySelectorAll('#bx-pager a');
    let currentSlide = 0;

    // Hide all slides except first
    slides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = 'none';
      }
    });

    // Pager click handlers
    pagerLinks.forEach((link, index) => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        goToSlide(index);
      });
    });

    function goToSlide(index) {
      // Hide current slide
      slides[currentSlide].style.display = 'none';

      // Remove active class from all pager links
      pagerLinks.forEach(link => {
        link.style.backgroundColor = '#fff';
        link.style.border = '1px solid rgba(138,196,232,.5)';
        link.style.borderColor = 'rgba(138,196,232,.5)';
        link.style.backgroundImage = 'linear-gradient(white, white)';
      });

      // Show new slide
      currentSlide = index;
      slides[currentSlide].style.display = 'block';

      // Add active class to clicked pager
      pagerLinks[index].style.backgroundColor = '#dee8fb';
      pagerLinks[index].style.borderColor = '#dee8fb';
      pagerLinks[index].style.backgroundImage = 'linear-gradient(rgba(224,249,255,0) 0%,#e0f9ff 90%)';
    }

    // Scroll to form button
    const testDriveBtn = document.getElementById('testdrivebtn');
    const formWrapper = document.getElementById('form-wrapper');
    if (testDriveBtn && formWrapper) {
      testDriveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        formWrapper.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Offset for header if needed
        window.scrollBy(0, -200);
      });
    }

    // Hide CTA section when form is submitted
    const hubspotFormContainer = document.querySelector('#testdriveHubspotForm');
    if (hubspotFormContainer) {
      const checkInterval = setInterval(function() {
        const submittedMessage = formWrapper.querySelector('.submitted-message, .hs-form-success-message');
        if (submittedMessage) {
          const ctaSection = document.getElementById('cta-section');
          if (ctaSection) {
            ctaSection.remove();
          }
          clearInterval(checkInterval);
        }
      }, 500);
    }
  });
</script>

<?php
get_footer();
