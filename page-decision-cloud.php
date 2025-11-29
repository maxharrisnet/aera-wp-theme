<?php

/**
 * Template Name: Decision Cloud
 *
 * @package Aera_Technology
 */

get_header();

$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';

// Asset paths - adjust based on actual file locations
$adc_intro_video = $assets_base . 'images/decision-cloud/IntrovideoNew.mp4';
$chipset_image_mobile = $assets_base . 'images/decision-cloud/chipsetimagemobile.png';
$chip_scroll_video = $assets_base . 'images/decision-cloud/chipscrollanimation.mp4';
$explore_arrow = $assets_base . 'images/decision-cloud/explorearrow.png';
$what_is_di_image = $assets_base . 'images/decision-cloud/whatIsDI.jpg';
$idc_image = $assets_base . 'images/decision-cloud/IDC.jpg';
$customers_tile_image = $assets_base . 'images/decision-cloud/customers.jpg';

?>

<main id="primary" class="site-main site-main--decision-cloud">
  <?php get_template_part('template-parts/components/hero'); ?>

  <div class="decisioncloud">
    <!-- Featured Skills Section -->
    <div class="decisioncloud__featuredSkills" id="featured-skills">
      <div class="decisioncloud__sliderContainer">
        <div class="decisioncloud__featuredSkillsWrapper">
          <video muted autoplay loop>
            <source src="<?php echo esc_url($adc_intro_video); ?>" type="video/mp4">
          </video>
        </div>
      </div>
    </div>

    <!-- Chipset Section with Scroll Video -->
    <div class="decisioncloud__chipSet">
      <div class="decisioncloud__chipsetContainer">
        <div class="container-videoscroll">
          <div class="decisioncloud__chipSetImageMobile">
            <img src="<?php echo esc_url($chipset_image_mobile); ?>" alt="<?php esc_attr_e('Chipset illustration', 'aera'); ?>" loading="lazy" />
          </div>
          <div class="video-container">
            <video id="scrollVideo" muted>
              <source src="<?php echo esc_url($chip_scroll_video); ?>" type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'>
            </video>
          </div>

          <div class="text-container" id="scrollArea">
            <div class="scroll-btn" id="scrollBtn">&darr;</div>

            <!-- Section 1: Introduction -->
            <div class="section-videoscroll" id="sec1">
              <div class="text-section">
                <div class="decisioncloud__sectionTitle">
                  <?php esc_html_e('Explore the Core Components of', 'aera'); ?> <br class="decisioncloud__hiddenXS" /> <?php esc_html_e('Aera Decision Cloud', 'aera'); ?>
                </div>
                <div class="decisioncloud__sectionDescription">
                  <?php esc_html_e('Aera Decision Cloud combines four essential cores that enable Aera to deliver fast decisions and turn them into actions.', 'aera'); ?>
                </div>
              </div>
            </div>

            <!-- Section 2: Decision Data Model -->
            <div class="section-videoscroll" id="sec2">
              <div class="text-section" data-index="0">
                <h5 class="blue">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#F0F6F9" />
                    <path d="M7.78799 12.7891L7.72266 12.7984L7.74799 12.8597" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M7.95703 13.3545L12.5944 24.2892L19.8544 33.8958" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.0195 34.1113L20.0595 34.1647L20.1022 34.1127" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.4414 33.692L28.0387 24.2893L32.2761 13.1133" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M32.3669 12.8611L32.3896 12.7984L32.3242 12.7891" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M31.792 12.7149L20.1467 11.0869L8.05469 12.7536" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M32.3398 27.0775L32.3972 27.0442V26.9775" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M32.3945 26.4347V13.1387" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M32.3972 12.8666V12.7999L32.3398 12.7666" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M31.8662 12.4957L20.3516 5.84766" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.1147 5.71107L20.0573 5.67773L20 5.71107" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M19.5264 5.98242L8.01172 12.6304" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M7.77999 12.7666L7.72266 12.7999V12.8666" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M7.72266 13.4092V26.7052" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M7.72266 26.9775V27.0442L7.77999 27.0775" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M8.25391 27.3477L19.7686 33.9957" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20 34.1309L20.0573 34.1642L20.1147 34.1309" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.5898 33.8599L32.1045 27.2119" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M12.6643 24.2901H12.5977L12.631 24.2314" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M12.8945 23.7717L19.9865 11.373" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.1133 11.1443L20.1466 11.0869L20.1813 11.1429" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.457 11.6025L27.865 24.0025" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M28.0047 24.2314L28.0393 24.2888H27.9727" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M27.431 24.2891H12.9297" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.0625 5.67773L20.0638 5.7444" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.0742 6.28613L20.1489 10.7501" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M20.1523 11.0205L20.1537 11.0872" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M7.72266 27.0421L7.77999 27.0088" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M8.26953 26.7333L12.2962 24.46" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M12.5391 24.3211L12.5964 24.2891" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M28.0352 24.2891L28.0912 24.3237" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M28.5312 24.6006L32.1219 26.8699" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M32.3398 27.0068L32.3958 27.0428" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <circle cx="20.1271" cy="11.1202" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="20.0802" cy="5.59974" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="20.0802" cy="34.3224" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="12.6036" cy="24.2433" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="27.9201" cy="24.2433" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="32.5333" cy="27.1232" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="7.60365" cy="27.1232" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="7.60365" cy="12.7208" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="32.5333" cy="12.7208" r="0.5334" fill="#F0F6F9" stroke="#00619E" stroke-width="0.5" stroke-miterlimit="10" />
                  </svg>
                  <?php esc_html_e('Decision Data Model™', 'aera'); ?>
                </h5>
                <p>
                  <?php echo wp_kses(__('The <strong>Aera Decision Data Model™</strong> unifies real-time data from your systems and outside sources into a decision-ready model. It records every decision made along with its details and outcomes. Over time, this decision memory enables Aera to learn, provide deeper insights, and make smarter, more optimized recommendations.', 'aera'), array('strong' => array())); ?><br />
                  <a href="<?php echo esc_url(home_url('/decision-data-model')); ?>" class="text-section-link"><?php esc_html_e('Learn More', 'aera'); ?></a>
                  <a href="javascript:;" class="toggleBtn"><?php esc_html_e('Show Details', 'aera'); ?> <span class="icon">&darr;</span></a>
                <div class="accordion-content">
                  <div class="box grey">
                    <h3><?php esc_html_e('Comprehensive Integration', 'aera'); ?></h3>
                    <p><?php esc_html_e('Unify data across the enterprise, including transactions, analytics, planning data, unstructured inputs, and IoT signals, as well as external sources, through over 250 prebuilt connectors.', 'aera'); ?></p>
                  </div>
                  <div class="box grey">
                    <h3><?php esc_html_e('Advanced Modeling', 'aera'); ?></h3>
                    <p><?php esc_html_e('Compose analytical, graph, mathematical, AI/ML, simulations, and decision models to deliver contextual recommendations.', 'aera'); ?></p>
                  </div>
                  <div class="box grey">
                    <h3><?php esc_html_e('Data Quality and Connectivity', 'aera'); ?></h3>
                    <p><?php esc_html_e('Ensure trusted, decision-ready data with normalization, bi-directional integration, robust connection management, and comprehensive governance.', 'aera'); ?></p>
                  </div>
                </div>
                </p>
              </div>
            </div>

            <!-- Section 3: Decision Engines -->
            <div class="section-videoscroll" id="sec3">
              <div class="text-section" data-index="1">
                <h5 class="green">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#F0F8F9" />
                    <circle cx="13.3216" cy="19.9994" r="8.7784" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <circle cx="23.3454" cy="19.9997" r="11.6813" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <circle cx="6.4513" cy="25.504" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="5.75208" cy="15.7384" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="34.9201" cy="21.4601" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="22.1193" cy="19.2794" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="28.256" cy="30.6867" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="11.6661" cy="19.4865" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="31.2013" cy="11.422" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="15.3302" cy="11.4757" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="15.6115" cy="28.3927" r="0.5334" fill="#F0F8F9" stroke="#00818E" stroke-width="0.5" stroke-miterlimit="10" />
                  </svg>
                  <?php esc_html_e('Decision Engines', 'aera'); ?>
                </h5>
                <p>
                  <?php echo wp_kses(__('Comprehensive <strong>decision engines</strong> support all types of decisions, from advised to assisted to fully automated. Together, they quickly analyze data, apply logic, run simulations, and generate recommendations and actions.', 'aera'), array('strong' => array())); ?><br />
                  <a href="<?php echo esc_url(home_url('/decision-engines')); ?>" class="text-section-link"><?php esc_html_e('Learn More', 'aera'); ?></a>
                  <a href="javascript:;" class="toggleBtn"><?php esc_html_e('Show Details', 'aera'); ?> <span class="icon">&darr;</span></a>
                <div class="accordion-content">
                  <div class="box lightGreen">
                    <h3><?php esc_html_e('Decision Process and Execution', 'aera'); ?></h3>
                    <p><?php esc_html_e('Compose and model decision processes visually by embedding business rules, scenarios, optimization logic, AI/ML models, and agent teams.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/process-builder')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box lightGreen">
                    <h3><?php esc_html_e('AI Engines', 'aera'); ?></h3>
                    <p><?php esc_html_e('Rapidly build and deploy machine learning pipelines, domain-specific algorithms, and flexible AI/ML models into decision workflows.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/cortex-ai-ml')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box lightGreen">
                    <h3><?php esc_html_e('Data Workbench', 'aera'); ?></h3>
                    <p><?php esc_html_e('Harmonize data across internal and external systems, and orchestrate data workloads to build and maintain the Decision Data Model.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/data-workbench')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box lightGreen">
                    <h3><?php esc_html_e('Learning Engines', 'aera'); ?></h3>
                    <p><?php esc_html_e('Continuously improve decision quality by learning from feedback and context to adapt to changing business conditions in real time.', 'aera'); ?></p>
                  </div>
                </div>
                </p>
              </div>
            </div>

            <!-- Section 4: Agentic Ambient Orchestration -->
            <div class="section-videoscroll" id="sec4">
              <div class="text-section" data-index="2">
                <h5 class="aqua">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#F0FAF8" />
                    <path d="M22.2734 15.1494L24.8268 17.7041" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M24.5033 20.4506L19.5273 15.4746" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M23.5598 22.578L17.3984 16.418" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M21.9071 23.9966L15.9805 18.0713" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M19.1494 24.3125L15.6641 20.8271" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M32.4304 13.0231L26.957 7.5498" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M29.674 13.3377L26.6406 10.3057" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M11.1875 25.7852L14.3062 28.9051" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M13.8707 31.5386L8.55469 26.2227" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" />
                    <path d="M27.0002 5.21387C25.6562 6.55787 25.8668 9.46453 25.9655 12.9752C25.9735 13.2685 26.0002 14.3272 26.0002 14.3272C26.0788 17.9885 25.9602 21.8272 23.9562 23.8299C22.1628 25.6232 19.0135 25.3445 15.6802 25.0499C15.5562 25.0392 14.8415 24.9765 14.8415 24.9765C11.2628 24.6739 7.66418 24.5499 5.21484 26.9979" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <path d="M13 34.7854C15.448 32.3374 15.324 28.7374 15.0213 25.1587C15.0213 25.1587 14.9587 24.4427 14.948 24.32C14.6533 20.9867 14.3747 17.8373 16.168 16.044C18.1707 14.0413 22.0093 13.9227 25.6707 14C25.6707 14 26.7293 14.0267 27.0227 14.0347C30.5333 14.1333 33.44 14.344 34.784 13" stroke="#009D95" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                  </svg>
                  <?php esc_html_e('Agentic Ambient Orchestration™', 'aera'); ?>
                </h5>
                <p>
                  <?php echo wp_kses(__('<strong>Agentic Ambient Orchestration</strong> lets you blend structured and unstructured data, your expertise, and the reasoning power of AI agents (through LLMs) in your decision processes. Instead of coding decision rules, you can simply prompt and guide agents to automate decisions.', 'aera'), array('strong' => array())); ?>
                  <br />
                  <a href="<?php echo esc_url(home_url('/agentic-ambient-orchestration')); ?>" class="text-section-link"><?php esc_html_e('Learn More', 'aera'); ?></a>
                  <a href="javascript:;" class="toggleBtn"><?php esc_html_e('Show Details', 'aera'); ?> <span class="icon">&darr;</span></a>
                <div class="accordion-content">
                  <div class="box AAO">
                    <h3><?php esc_html_e('Agent & Agent Team Creation', 'aera'); ?></h3>
                    <p><?php esc_html_e('Define, configure, embed, and publish individual agents with defined roles, and organize them into teams to coordinate decision tasks.', 'aera'); ?></p>
                  </div>
                  <div class="box AAO">
                    <h3><?php esc_html_e('Agent Functions', 'aera'); ?></h3>
                    <p><?php esc_html_e('Convert specific decision processes and external logic into reusable, executable components that agents can leverage (as tools) to reason and orchestrate tasks.', 'aera'); ?></p>
                  </div>
                  <div class="box AAO">
                    <h3><?php esc_html_e('Integrated Decision Flows', 'aera'); ?></h3>
                    <p><?php esc_html_e('Embed agents seamlessly into end-to-end decision flows to drive increased levels of agency and automation.', 'aera'); ?></p>
                  </div>
                  <div class="box AAO">
                    <h3><?php esc_html_e('LLM Integration Management', 'aera'); ?></h3>
                    <p><?php esc_html_e('Configure and manage secure connections to large language models of your choice and map them to specific agents.', 'aera'); ?></p>
                  </div>
                </div>
                </p>
              </div>
            </div>

            <!-- Section 5: Decision Engagement -->
            <div class="section-videoscroll" id="sec5">
              <div class="text-section" data-index="3">
                <h5 class="violet">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="#F0F4F9" />
                    <circle cx="19.999" cy="20.2451" r="14.1552" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <circle cx="20.0013" cy="20.2445" r="8.7784" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" stroke-dasharray="0.5 0.5" />
                    <circle cx="20.0138" cy="11.4093" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="19.9669" cy="5.88783" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="19.9669" cy="29.09" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="12.4865" cy="24.5304" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="27.8068" cy="24.5304" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="32.4201" cy="27.4103" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="7.48646" cy="27.4103" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="12.4005" cy="15.9249" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                    <circle cx="27.5216" cy="15.9249" r="0.5334" fill="#F0F4F9" stroke="#4237B8" stroke-width="0.5" stroke-miterlimit="10" />
                  </svg>
                  <?php esc_html_e('Decision Engagement', 'aera'); ?>
                </h5>
                <p>
                  <?php echo wp_kses(__('<strong>Decision Engagement</strong> enables you to interact with Aera through an intuitive, natural language interface, available via chat, voice, desktop, or mobile. You can explore data, get timely guidance, and act on real-time recommendations.', 'aera'), array('strong' => array())); ?><br />
                  <a href="<?php echo esc_url(home_url('/decision-engagement')); ?>" class="text-section-link"><?php esc_html_e('Learn More', 'aera'); ?></a>
                  <a href="javascript:;" class="toggleBtn"><?php esc_html_e('Show Details', 'aera'); ?> <span class="icon">&darr;</span></a>
                <div class="accordion-content">
                  <div class="box DE">
                    <h3><?php esc_html_e('Chat', 'aera'); ?></h3>
                    <p><?php esc_html_e('Ask open-ended questions and receive instant, explainable, personalized answers supported by dynamic visualizations and contextual actions.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/aera-chat')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box DE">
                    <h3><?php esc_html_e('Inbox', 'aera'); ?></h3>
                    <p><?php esc_html_e('Receive prescriptive, explainable, and personalized recommendations in real-time. Understand context, impact, trade-offs, and take immediate action.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/aera-inbox')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box DE">
                    <h3><?php esc_html_e('Discovery', 'aera'); ?></h3>
                    <p><?php esc_html_e('Explore and analyze data (from your DDM) through a visual, drillable interface designed to uncover new insights and embed them in recommendations.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/aera-discovery')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box DE">
                    <h3><?php esc_html_e('Workspaces', 'aera'); ?></h3>
                    <p><?php esc_html_e('A unified, secure space for teams to collaborate, organize, and manage decision intelligence. Ask questions, analyze data, run simulations, and publish insights and Skills.', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/aera-workspaces')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                  <div class="box DE">
                    <h3><?php esc_html_e('Control Room', 'aera'); ?></h3>
                    <p><?php esc_html_e('Monitor the activity, performance, and impacts of your decisions. Identify and continually fine-tune decision logic to optimize decision-making across your enterprise (your decision intelligence network).', 'aera'); ?></p>
                    <a href="<?php echo esc_url(home_url('/aera-control-room')); ?>"><?php esc_html_e('Explore', 'aera'); ?> <img src="<?php echo esc_url($explore_arrow); ?>" alt="" loading="lazy" /></a>
                  </div>
                </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Benefits Section -->
    <div class="decisioncloud__benefits">
      <div class="decisioncloud__container">
        <h2><?php esc_html_e('Built for How Business Works Today', 'aera'); ?></h2>
        <div class="decisioncloud__benefitsWrapper">
          <div class="decisioncloud__benefitsBox">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" rx="8" fill="#B6C8E3" />
              <rect width="120" height="120" rx="8" fill="white" fill-opacity="0.8" />
              <circle cx="28.3205" cy="48.9997" r="4.6983" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="46.0808" cy="33.9167" r="3.4059" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="71.7253" cy="33.9167" r="3.4059" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="89.56" cy="46.299" r="2.2366" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="93.3048" cy="65.5227" r="2.7006" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="79.1082" cy="74.8864" r="3.4059" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="85.8986" cy="85.959" r="4.6983" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="65.03" cy="77.3093" r="3.4059" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="70.4636" cy="50.8298" r="3.4059" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="31.6567" cy="62.8014" r="2.2366" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="57.6408" cy="65.1281" r="4.6983" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="75.3975" cy="63.7939" r="2.2366" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="43.2683" cy="71.1941" r="3.4059" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <circle cx="49.9086" cy="47.0065" r="2.2366" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="46.3359" y1="69.9012" x2="54.5871" y2="66.418" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="63.3082" y1="74.4674" x2="59.3711" y2="67.9658" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="75.8359" y1="75.4463" x2="68.2969" y2="76.7456" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="89.3889" y1="67.127" x2="81.7617" y2="72.8847" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="91.6336" y1="61.8269" x2="90.0039" y2="48.6133" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="68.4006" y1="33.9141" x2="49.4023" y2="33.9141" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="86.7954" y1="43.5285" x2="74.5312" y2="35.7031" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="40.551" y1="69.2849" x2="34.0078" y2="64.6943" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="30.588" y1="59.5415" x2="29.0195" y2="52.252" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="43.5537" y1="36.0674" x2="30.8516" y2="46.8561" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="88.7327" y1="64.8636" x2="78.7344" y2="64.0732" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="78.0554" y1="71.7345" x2="76.4648" y2="66.9629" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="84.1618" y1="83.127" x2="80.8438" y2="77.7168" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="82.8279" y1="84.6867" x2="68.0898" y2="78.5791" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="49.4093" y1="45.707" x2="46.9844" y2="37.1133" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="67.1574" y1="50.5312" x2="53.0898" y2="49.2539" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="69.0123" y1="35.8301" x2="52.6641" y2="47.3675" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="46.4507" y1="49.0078" x2="31.6367" y2="49.0078" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="71.4793" y1="37.2275" x2="70.7109" y2="47.5195" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="72.1049" y1="64.0537" x2="60.9492" y2="64.8686" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="86.3991" y1="46.2373" x2="73.6602" y2="49.9102" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="87.5651" y1="47.9502" x2="77.4297" y2="61.1761" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="74.2388" y1="60.7088" x2="71.6523" y2="53.9355" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="54.3221" y1="65.162" x2="34.6094" y2="62.6514" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="56.1431" y1="62.1642" x2="51.582" y2="51.7988" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="91.1" y1="68.3115" x2="86.8398" y2="82.7731" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="61.8244" y1="76.4083" x2="46.4648" y2="72.0918" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="68.2451" y1="53.3018" x2="59.8594" y2="62.6516" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
              <line x1="47.1115" y1="50.9893" x2="33.9492" y2="60.804" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" />
            </svg>
            <h3><?php esc_html_e('Comprehensive', 'aera'); ?></h3>
            <p><?php esc_html_e('Aera provides everything you need to support any type of decision — from advised, to assisted, to fully automated.', 'aera'); ?></p>
          </div>

          <div class="decisioncloud__benefitsBox">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" rx="8" fill="#B6E4DB" />
              <rect width="120" height="120" rx="8" fill="white" fill-opacity="0.8" />
              <path d="M83.9258 43.834H88.6855C90.6921 43.834 92.3176 45.4595 92.3176 47.463V83.6113" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M28.8125 83.6113V47.463C28.8125 45.4595 30.438 43.834 32.4445 43.834H36.2087" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M25.7908 86.6846C25.0872 86.6846 24.5156 87.2561 24.5156 87.9598V88.0028C24.5156 92.8424 28.4396 96.7664 33.2792 96.7664H87.8551C92.6947 96.7664 96.6187 92.8424 96.6187 88.0028V87.9598C96.6187 87.2561 96.0472 86.6846 95.3435 86.6846H25.7939H25.7908Z" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M35 80.2568V50.6289H40.1131" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M86.5116 80.2568V50.6289H81.3984" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M78.6984 43.9081V38.838L74.4149 38.205C74.0554 36.6256 73.4347 35.1476 72.5959 33.8171L75.177 30.3387L71.591 26.7527L68.1127 29.3339C66.7821 28.4981 65.3041 27.8774 63.7247 27.5178L63.0917 23.2344H58.0216L57.3886 27.5178C55.8092 27.8774 54.3312 28.4981 53.0007 29.3339L49.5223 26.7527L45.9363 30.3387L48.5175 33.8171C47.6817 35.1476 47.061 36.6256 46.7014 38.205L42.418 38.838V43.9081L46.7014 44.5411C47.061 46.1205 47.6817 47.5985 48.5175 48.9291L45.9363 52.4075L49.5223 55.9934L53.0007 53.4123C54.3312 54.2481 55.8092 54.8688 57.3886 55.2314L58.0216 59.5148H63.0917L63.7247 55.2314C65.3041 54.8718 66.7821 54.2511 68.1127 53.4123L71.591 55.9934L75.177 52.4075L72.5959 48.9291C73.4317 47.5985 74.0524 46.1205 74.4149 44.5411L78.6984 43.9081Z" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="60.5559" cy="41.3622" r="6.8242" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="72.8672" y1="70.4014" x2="77.3135" y2="70.4014" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="43.8203" y1="70.4014" x2="59.6913" y2="70.4014" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="58.5273" y1="79.3135" x2="77.2775" y2="79.3135" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="43.7773" y1="79.3135" x2="45.9006" y2="79.3135" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="66.216" cy="70.4016" r="1.69" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="52.0754" cy="79.3127" r="1.69" stroke="#009D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h3><?php esc_html_e('Composable', 'aera'); ?></h3>
            <p><?php esc_html_e('Easy to build, adjust, and expand, Aera evolves as your business does.', 'aera'); ?></p>
          </div>

          <div class="decisioncloud__benefitsBox">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" rx="8" fill="#B6C8E3" />
              <rect width="120" height="120" rx="8" fill="white" fill-opacity="0.8" />
              <path d="M60.6235 23.8584C60.6235 23.8584 39.4999 32.4767 28.5312 33.1089V58.1287C28.5312 77.6399 45.2716 92.5833 60.6235 96.1408C75.9724 92.5833 92.7158 77.6399 92.7158 58.1287V33.1089C81.7471 32.4767 60.6235 23.8584 60.6235 23.8584Z" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M60.6216 90.8384C54.0755 89.0537 47.5657 85.0154 42.5987 79.6309C38.527 75.2144 33.6719 67.8999 33.6719 58.1291V37.6377C43.3247 35.9195 55.8421 31.255 60.6216 29.3916C65.4011 31.255 77.9186 35.9195 87.5714 37.6377V58.1291C87.5714 67.8999 82.7162 75.2144 78.6446 79.6309C73.6806 85.0154 67.1708 89.0507 60.6216 90.8384Z" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M48.3086 61.236L57.3382 68.0513L73.5401 51.9492" stroke="#4237B8" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h3><?php esc_html_e('Trusted', 'aera'); ?></h3>
            <p><?php esc_html_e('Aera is transparent and explainable. You always know where the data comes from, why recommendations are given, and how decisions are made.', 'aera'); ?></p>
          </div>

          <div class="decisioncloud__benefitsBox">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" rx="8" fill="#B6D2E3" />
              <rect width="120" height="120" rx="8" fill="white" fill-opacity="0.8" />
              <path d="M80.6556 41.9531H89.8496C91.096 41.9531 92.1046 42.9616 92.1046 44.208V95.6714C92.1046 96.9177 91.096 97.9263 89.8496 97.9263H30.2705C29.0241 97.9263 28.0156 96.9177 28.0156 95.6714V44.208C28.0156 42.9616 29.0241 41.9531 30.2705 41.9531H39.0872" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M81.4844 51.9365H92.1056" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M28.0156 51.9365H39.084" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32.8906 47.208H35.0155" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M85.7054 86.2552C85.7054 83.9305 83.8216 82.0435 81.4937 82.0435C79.8953 82.0435 78.5062 82.9347 77.7926 84.2445C76.7936 83.2042 75.3918 82.5541 73.8378 82.5541C72.2045 82.5541 70.7393 83.274 69.7339 84.4062C68.9632 83.4357 67.7739 82.8078 66.4356 82.8078C64.6532 82.8078 63.1341 83.9178 62.5188 85.4782C61.875 85.0817 61.1202 84.8471 60.3115 84.8471C60.2132 84.8471 60.118 84.8566 60.0197 84.8629C59.1666 82.7602 57.1052 81.276 54.698 81.276C52.4368 81.276 50.4831 82.5826 49.5444 84.4823C48.8942 84.07 48.1236 83.829 47.2958 83.829C46.4681 83.829 45.7228 84.0637 45.079 84.4665C44.3368 82.3162 42.3008 80.7686 39.8968 80.7686C36.868 80.7686 34.4102 83.2264 34.4102 86.2552" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M51.5832 53.0059L50.3685 54.5567C49.0048 56.301 47.1083 57.5537 44.9707 58.1278C42.8046 58.7113 40.889 59.9926 39.519 61.7686C39.2335 62.1428 39.0781 62.5995 39.0781 63.0689V67.4487H48.9255" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M68.9805 53.0059L70.1951 54.5567C71.5589 56.301 73.4554 57.5537 75.593 58.1278C77.7591 58.7113 79.6746 59.9926 81.0447 61.7686C81.3301 62.1428 81.4855 62.5995 81.4855 63.0689V67.4487H71.3686" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M74.2408 53.0054V42.8599C74.2408 41.4422 73.0895 40.291 71.6719 40.291" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M46.1641 53.0054V42.8599C46.1641 41.4422 47.3153 40.291 48.733 40.291" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="60.1941" cy="43.7734" r="1.2587" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M67.4976 62.6436L68.6805 51.3595C69.3655 44.8326 68.56 38.2804 66.3749 32.1817C65.2141 28.9373 63.6633 25.8229 61.735 22.9051C61.3703 22.3501 60.7804 22.0742 60.1905 22.0742C59.6006 22.0742 59.0076 22.3533 58.6397 22.9115L58.6111 22.9527C56.7146 25.8514 55.1828 28.95 54.0379 32.169C51.8749 38.2455 51.0789 44.766 51.7608 51.2644L52.9564 62.6436" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M54.0391 32.1689C55.6629 32.8889 57.8353 33.3297 60.2234 33.3297C62.6115 33.3297 64.7554 32.8952 66.3729 32.1816" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M67.0368 65.4883H53.4122C52.5697 65.4883 51.8867 66.1713 51.8867 67.0138V71.2381C51.8867 72.0806 52.5697 72.7636 53.4122 72.7636H67.0368C67.8793 72.7636 68.5623 72.0806 68.5623 71.2381V67.0138C68.5623 66.1713 67.8793 65.4883 67.0368 65.4883Z" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="54.8789" y1="79.1259" x2="56.4742" y2="75.4121" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <line x1="63.6445" y1="75.4121" x2="65.947" y2="80.7687" stroke="#00619E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <h3><?php esc_html_e('Scalable', 'aera'); ?></h3>
            <p><?php esc_html_e('From routine tasks to complex strategies, Aera keeps learning and growing with your business.', 'aera'); ?></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Resources Section -->
    <div class="decisioncloud__relatedResources">
      <div class="decisioncloud__relatedResourcesContainer">
        <h2><?php esc_html_e('Resources', 'aera'); ?></h2>
        <div class="decisioncloud__relatedResourcesRow">
          <a href="<?php echo esc_url(home_url('/what-is-decision-intelligence')); ?>" target="_blank" class="decisioncloud__relatedResourceCard">
            <img src="<?php echo esc_url($what_is_di_image); ?>" alt="<?php esc_attr_e('What is Decision Intelligence', 'aera'); ?>" loading="lazy" />
            <div class="decisioncloud__relatedResourcesCardWrapper">
              <h3 class="decisioncloud__relatedResourceTitle"><?php esc_html_e('What is Decision Intelligence', 'aera'); ?></h3>
              <p class="decisioncloud__relatedResourceDescription"><?php esc_html_e('This guide introduces decision intelligence — what it does, why it\'s different, and where it delivers value across the enterprise.', 'aera'); ?></p>
            </div>
          </a>
          <a href="https://meet.aeratechnology.com/whitepaper/idc-marketscape-worldwide-decision-intelligence-platforms-2024" target="_blank" class="decisioncloud__relatedResourceCard">
            <img src="<?php echo esc_url($idc_image); ?>" alt="<?php esc_attr_e('IDC Marketscape for Decision Intelligence Platforms', 'aera'); ?>" loading="lazy" />
            <div class="decisioncloud__relatedResourcesCardWrapper">
              <h3 class="decisioncloud__relatedResourceTitle"><?php esc_html_e('IDC Marketscape for Decision Intelligence Platforms', 'aera'); ?></h3>
              <p class="decisioncloud__relatedResourceDescription"><?php esc_html_e('Aera Technology has been named a Leader in the IDC MarketScape for Decision Intelligence Platforms 2024.', 'aera'); ?></p>
            </div>
          </a>
          <a href="<?php echo esc_url(home_url('/customers')); ?>" target="_blank" class="decisioncloud__relatedResourceCard">
            <img src="<?php echo esc_url($customers_tile_image); ?>" alt="<?php esc_attr_e('Aera Technology Customers', 'aera'); ?>" loading="lazy" />
            <div class="decisioncloud__relatedResourcesCardWrapper">
              <h3 class="decisioncloud__relatedResourceTitle"><?php esc_html_e('Aera Technology Customers', 'aera'); ?></h3>
              <p class="decisioncloud__relatedResourceDescription"><?php esc_html_e('Leaders at some of the world\'s biggest and fastest-growing companies trust Aera to digitize and automate thousands of decisions every day.', 'aera'); ?></p>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Request/CTA Section -->
    <div class="request">
      <div class="request__container">
        <h2 class="request__title"><?php esc_html_e('See Aera in action.', 'aera'); ?></h2>
        <p>
          <a href="<?php echo esc_url(home_url('/skills')); ?>" class="request__button" data-event-category="Section" data-event-action="Click" data-event-name="Learn about Aera Skills">
            <?php esc_html_e('Learn about Aera Skills', 'aera'); ?>
          </a>
          <a href="<?php echo esc_url(home_url('/demo')); ?>" class="request__button request__filled" data-event-category="Section" data-event-action="Click" data-event-name="SCHEDULE DEMO">
            <?php esc_html_e('SCHEDULE DEMO', 'aera'); ?>
          </a>
        </p>
      </div>
    </div>
  </div>
</main>

<script>
  (function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }

    function init() {
      const video = document.getElementById('scrollVideo');
      const scrollArea = document.getElementById('scrollArea');
      const scrollBtn = document.getElementById('scrollBtn');
      const middleSections = document.querySelectorAll('#sec1, #sec2, #sec3, #sec4, #sec5');

      let index = 0;
      let direction = 'down';

      // Scroll-triggered video playback
      if (video && scrollArea) {
        const duration = 6; // Fallback duration in seconds

        // Try to get actual duration when video loads
        video.addEventListener('loadedmetadata', function() {
          const actualDuration = video.duration;
          if (actualDuration && actualDuration > 0) {
            window.scrollVideoDuration = actualDuration;
          }
        });

        window.addEventListener('scroll', function() {
          const scrollTop = window.scrollY;
          const containerTop = scrollArea.offsetTop - 210;
          const scrollHeight = scrollArea.scrollHeight - window.innerHeight;
          const scrollPercent = Math.min(Math.max((scrollTop - containerTop) / scrollHeight, 0), 1);

          const videoDuration = window.scrollVideoDuration || duration;
          if (video && video.readyState >= 2) { // HAVE_CURRENT_DATA or better
            video.currentTime = scrollPercent * videoDuration;
          }
        });
      }

      // Helper: find nearest section to viewport top
      function updateIndex() {
        let closest = Infinity;
        middleSections.forEach(function(sec, i) {
          const offset = Math.abs(sec.getBoundingClientRect().top);
          if (offset < closest) {
            closest = offset;
            index = i;
          }
        });
      }

      // Click logic for scroll button
      if (scrollBtn) {
        scrollBtn.addEventListener('click', function() {
          if (direction === 'down') {
            if (index < middleSections.length - 1) {
              index++;
              middleSections[index].scrollIntoView({
                behavior: 'smooth'
              });
            }
          } else {
            if (index > 0) {
              index--;
              middleSections[index].scrollIntoView({
                behavior: 'smooth'
              });
            }
          }

          // Update arrow after click
          if (index === middleSections.length - 1) {
            direction = 'up';
            scrollBtn.innerHTML = '&uarr;';
          } else if (index === 0) {
            direction = 'down';
            scrollBtn.innerHTML = '&darr;';
          } else {
            scrollBtn.innerHTML = direction === 'down' ? '&darr;' : '&uarr;';
          }
        });
      }

      // Scroll detection
      window.addEventListener('scroll', function() {
        if (scrollBtn && middleSections.length > 0) {
          // Show button only if inside middle sections
          const middleTop = middleSections[0].offsetTop;
          const middleBottom = middleSections[middleSections.length - 1].offsetTop + middleSections[middleSections.length - 1].offsetHeight;

          if (window.scrollY >= middleTop && window.scrollY < middleBottom) {
            scrollBtn.classList.add('is-visible');
          } else {
            scrollBtn.classList.remove('is-visible');
          }

          // Update nearest index while scrolling
          updateIndex();

          // Update arrow direction
          if (index === middleSections.length - 1) {
            direction = 'up';
            if (scrollBtn) scrollBtn.innerHTML = '&uarr;';
          } else if (index === 0) {
            direction = 'down';
            if (scrollBtn) scrollBtn.innerHTML = '&darr;';
          }
        }
      });

      // Accordion functionality
      const toggleBtns = document.querySelectorAll('.toggleBtn');
      toggleBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const content = this.nextElementSibling;

          if (!content || !content.classList.contains('accordion-content')) {
            return;
          }

          // Toggle display
          if (content.classList.contains('is-open')) {
            content.classList.remove('is-open');
            this.querySelector('.icon').innerHTML = '&darr;';
            const textNode = this.childNodes[0];
            if (textNode && textNode.nodeType === 3) {
              textNode.textContent = 'Show Details ';
            }
          } else {
            content.classList.add('is-open');
            this.querySelector('.icon').innerHTML = '&uarr;';
            const textNode = this.childNodes[0];
            if (textNode && textNode.nodeType === 3) {
              textNode.textContent = 'Hide Details ';
            }
          }
        });
      });
    }
  })();
</script>

<?php
get_footer();
