<?php

/**
 * Template Name: What is Decision Intelligence
 *
 * @package Aera_Technology
 */

get_header();

while (have_posts()) :
  the_post();

  $assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';

  // Hero section - use ACF fields or defaults
  $hero_title = function_exists('get_field') ? \get_field('hero_title') : null;
  if (!$hero_title) {
    $hero_title = __('What is Decision Intelligence?', 'aera');
  }
  $hero_text = function_exists('get_field') ? \get_field('hero_text') : null;
  if (!$hero_text) {
    $hero_text = __('This guide introduces decision intelligence — what it does, why it\'s different, and where it delivers value across the enterprise.', 'aera');
  }
  $hero_full_height = function_exists('get_field') ? \get_field('hero_full_height') : true;

?>
  <main id="primary" class="site-main site-main--decision-intelligence">
    <?php
    get_template_part(
      'template-parts/components/hero',
      null,
      array(
        'hero_title'      => $hero_title,
        'hero_text'       => $hero_text,
        'hero_full_height' => $hero_full_height,
      )
    );
    ?>

    <div class="di" id="outerSection">
      <div class="di__section" id="sectionWrapper">
        <div class="di__scrollWrapper">
          <div class="contentRow">
            <nav class="nav" id="navMobile">
              <div id="hamburgerToggle">
                <div id="tableTitle"><?php esc_html_e('Table of Contents', 'aera'); ?></div>
                <div id="toggleIcon">▼</div>
              </div>
              <div class="listTitle"><?php esc_html_e('Table of Contents', 'aera'); ?></div>
              <ul id="menu" class="accordion">
                <li class="main">
                  <a href="#section1"><?php esc_html_e('What is decision intelligence?', 'aera'); ?></a>
                </li>
                <li class="main">
                  <a href="#section2"><?php esc_html_e('Benefits, Capabilities, Use Cases', 'aera'); ?></a>
                  <span class="toggle-btn">▼</span>
                  <ul class="submenu">
                    <li>
                      <a href="#section2"><?php esc_html_e('Why is decision intelligence important? What are its benefits?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section2-1"><?php esc_html_e('What is a decision intelligence platform?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section2-2"><?php esc_html_e('What are the key capabilities of a decision intelligence platform?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section2-3"><?php esc_html_e('Who uses decision intelligence, and what problems does it solve across industries?', 'aera'); ?></a>
                    </li>
                  </ul>
                </li>
                <li class="main">
                  <a href="#section3"><?php esc_html_e('Differences from Other Tools & Disciplines', 'aera'); ?></a>
                  <span class="toggle-btn">▼</span>
                  <ul class="submenu">
                    <li>
                      <a href="#section3"><?php esc_html_e('How is decision intelligence different from other analytical tools?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section3-1"><?php esc_html_e('How are planning solutions different from decision intelligence platforms?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section3-2"><?php esc_html_e('What is the difference between decision intelligence and data science?', 'aera'); ?></a>
                    </li>
                  </ul>
                </li>
                <li class="main">
                  <a href="#section4"><?php esc_html_e('The Role of Artificial Intelligence in Decision Intelligence', 'aera'); ?></a>
                  <span class="toggle-btn">▼</span>
                  <ul class="submenu">
                    <li>
                      <a href="#section4"><?php esc_html_e('How is artificial intelligence related to decision intelligence?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section4-1"><?php esc_html_e('What is agentic AI, and how does it enhance decision intelligence beyond other AI methods?', 'aera'); ?></a>
                    </li>
                  </ul>
                </li>
                <li class="main">
                  <a href="#section5"><?php esc_html_e('Deploying Decision Intelligence with a Platform', 'aera'); ?></a>
                  <span class="toggle-btn">▼</span>
                  <ul class="submenu">
                    <li>
                      <a href="#section5"><?php esc_html_e('How can companies get started with decision intelligence?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section5-1"><?php esc_html_e('What is a decision intelligence skill?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section5-2"><?php esc_html_e('What is self-service decision intelligence?', 'aera'); ?></a>
                    </li>
                    <li>
                      <a href="#section5-3"><?php esc_html_e('Where does decision intelligence fit in the enterprise stack?', 'aera'); ?></a>
                    </li>
                  </ul>
                </li>
                <li class="main">
                  <a href="#section6"><?php esc_html_e('Ready to Make Smarter Decisions?', 'aera'); ?></a>
                </li>
              </ul>
            </nav>
            <div class="mainLeft" id="leftWrapper">
              <?php
              // Output content from WordPress editor
              the_content();

              wp_link_pages(
                array(
                  'before' => '<div class="page-links">' . esc_html__('Pages:', 'aera'),
                  'after'  => '</div>',
                )
              );
              ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

<?php
endwhile; // End of the loop.

get_footer();
