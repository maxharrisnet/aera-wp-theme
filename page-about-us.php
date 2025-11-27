<?php

/**
 * Template Name: About Us
 *
 * @package Aera_Technology
 */

get_header();

$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';

// Intro section - get from ACF or use defaults
$intro_title = function_exists('get_field') ? get_field('about_intro_title') : '';
$intro_title_line_two = function_exists('get_field') ? get_field('about_intro_title_line_two') : '';
$intro_text = function_exists('get_field') ? get_field('about_intro_text') : __('Our belief, at our core, is helping companies transform. We believe in driving beyond digital transformation so that organizations can operate at internet speed and scale in the era of Decision Intelligence.', 'aera');

// About section content
$about_challenge = function_exists('get_field') ? get_field('about_challenge') : __('The digital economy has created a paradox. Enterprises now have more data than ever before, which should make decision-making easier. Yet the volume, velocity, and complexity of information have outpaced human capacity to act with the speed and precision the digital era demands. That\'s why, in the age of AI, the ability to make high-quality decisions rapidly has become a competitive necessity.', 'aera');
$about_solution = function_exists('get_field') ? get_field('about_solution') : __('The answer is decision intelligence, empowering enterprises to optimize and automate decisions at scale. It marks a profound shift: from people making decisions supported by machines to machines making decisions guided by people. Aera makes this shift possible, delivering an enterprise-wide decision intelligence agent that drives consistent, real-time decisions.', 'aera');
$about_people = function_exists('get_field') ? get_field('about_people') : __('Behind Aera is a team of product innovators, industry experts, and experienced leaders, supported by an accomplished board. United by a common mission, we\'re shaping a future where decision intelligence becomes the operating system of global enterprises. The AI era has arrived — and the future of decision-making starts now.', 'aera');

// Get team members by group
$leadership_group = get_term_by('slug', 'leadership', 'team_group');
$board_group = get_term_by('slug', 'board-members', 'team_group');

// Fetch leadership team members
$leadership_args = array(
  'post_type'      => 'team_member',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order',
  'order'          => 'ASC',
  'post_status'    => 'publish',
);

if ($leadership_group) {
  $leadership_args['tax_query'] = array(
    array(
      'taxonomy' => 'team_group',
      'field'    => 'term_id',
      'terms'    => $leadership_group->term_id,
    ),
  );
}

$leadership_query = new WP_Query($leadership_args);

// Fetch board members
$board_args = array(
  'post_type'      => 'team_member',
  'posts_per_page' => -1,
  'orderby'        => 'menu_order',
  'order'          => 'ASC',
  'post_status'    => 'publish',
);

if ($board_group) {
  $board_args['tax_query'] = array(
    array(
      'taxonomy' => 'team_group',
      'field'    => 'term_id',
      'terms'    => $board_group->term_id,
    ),
  );
}

$board_query = new WP_Query($board_args);

// Investors data - could be from ACF repeater or hardcoded
$investors = function_exists('get_field') ? get_field('about_investors') : array();
if (empty($investors)) {
  // Default investors data
  $investors = array(
    array(
      'name' => 'NEA',
      'logo' => $assets_base . 'images/company/investors-nea.png',
      'description' => __('New Enterprise Association (NEA) is a global venture capital firm partnering with entrepreneurs to build transformational businesses across multiple stages and sectors, with more than 210 IPOs and 360 acquisitions since the firm\'s founding in 1977. For more information, visit', 'aera'),
      'link' => 'https://www.nea.com/',
    ),
    array(
      'name' => 'Georgian Partners',
      'logo' => $assets_base . 'images/company/investors-gp.png',
      'description' => __('Georgian Partners is a thesis-driven growth equity firm investing in SaaS-based business software companies exploiting applied artificial intelligence, security first and conversational business. Founded by successful entrepreneurs and technology executives, Georgian Partners leverages our global software expertise to be able to directly impact the success of companies. For more information, visit', 'aera'),
      'link' => 'https://georgianpartners.com',
    ),
    array(
      'name' => 'New View Capital',
      'logo' => $assets_base . 'images/company/investors-nvcap.png',
      'description' => __('NewView Capital is a venture firm based in Burlingame, California. In 2018, NewView Capital spun out of New Enterprise Associates (NEA) and has developed a new model in venture capital to drive sustainable growth for entrepreneurs, venture capital firms, and limited partners in this changing venture landscape. The firm\'s first fund is a $1.35 billion portfolio of diverse, growth-stage technology companies. For more information, visit', 'aera'),
      'link' => 'https://www.nvc.vc/',
    ),
    array(
      'name' => 'DFJ Growth',
      'logo' => $assets_base . 'images/company/investor-dfjgrowth.png',
      'description' => __('DFJ Growth is a venture capital firm that partners with extraordinary entrepreneurs who set out to change the world. Their investments include Anaplan (NYSE: PLAN), Box (NYSE: BOX), Coinbase, Cylance (BlackBerry), Ring (Amazon), SpaceX, Tesla (NASDAQ: TSLA), Twitter (NYSE:TWTR), Unity, and Yammer (Microsoft). The firm works with companies at the growth stage, with the goal of creating iconic and lasting businesses in consumer, enterprise, and disruptive technologies. For more information, visit', 'aera'),
      'link' => 'https://dfjgrowth.com/',
    ),
    array(
      'name' => 'Silver Lake Waterman',
      'logo' => $assets_base . 'images/partners/SilverLakeWaterman.jpg',
      'description' => __('Silver Lake Waterman focuses on providing flexible expansion capital to later-stage growth companies in the technology and technology-enabled industries. For more information, visit', 'aera'),
      'link' => 'http://silverlake.com/',
    ),
  );
}

// Offices data
$offices = function_exists('get_field') ? get_field('about_offices') : array();
if (empty($offices)) {
  // Default offices data
  $offices = array(
    array(
      'title'   => __('Mountain View', 'aera'),
      'address' => "707 California Street\nMountain View, CA 94041",
      'country' => __('United States', 'aera'),
      'phone'   => '+1 (408) 524 2222',
      'email'   => 'info@aeratechnology.com',
    ),
    array(
      'title'   => __('San Francisco', 'aera'),
      'address' => "171 2nd Street\n5th Floor\nSan Francisco, CA 94105",
      'country' => __('United States', 'aera'),
    ),
    array(
      'title'   => __('Paris', 'aera'),
      'address' => "24-26 Rue de la Pépinière,\n75008 Paris",
      'country' => __('France', 'aera'),
    ),
    array(
      'title'   => __('Bucharest', 'aera'),
      'address' => "201 Barbu Vacarescu Street,\n10th Floor\nBucharest, 020276",
      'country' => __('Romania', 'aera'),
    ),
    array(
      'title'   => __('Cluj-Napoca', 'aera'),
      'address' => "48 Calea Dorobantilor\n1st Floor\nCluj - Napoca 400121",
      'country' => __('Romania', 'aera'),
    ),
    array(
      'title'   => __('Pune', 'aera'),
      'address' => "Manikchand Icon\nC Wing, Ground floor\nDhole Patil Rd, Pune 411001",
      'country' => __('India', 'aera'),
    ),
    array(
      'title'   => __('Sydney', 'aera'),
      'address' => "Level 16, 1 Denison Street\nNorth Sydney, NSW 2060",
      'country' => __('Australia', 'aera'),
    ),
    array(
      'title'   => __('Singapore', 'aera'),
      'address' => "18 Robinson Road #02-03\nSingapore 048547",
      'country' => __('Singapore', 'aera'),
    ),
    array(
      'title'   => __('York', 'aera'),
      'address' => "Westminster Business Centre\nYork Business Park\n10 Great North Way\nNether Poppleton, York\nYO26 6RB",
      'country' => __('United Kingdom', 'aera'),
    ),
  );
}

$offices_map_image = $assets_base . 'images/company/offices-map.png';

?>

<main id="primary" class="site-main site-main--about-us">
  <!-- Intro Section -->
  <section class="intro">
    <div class="intro__container">
      <?php if (!empty($intro_title)) : ?>
        <h1 class="intro__title">
          <?php echo esc_html($intro_title); ?>
          <?php if (!empty($intro_title_line_two)) : ?>
            <br><?php echo esc_html($intro_title_line_two); ?>
          <?php endif; ?>
        </h1>
      <?php endif; ?>
      <?php if (!empty($intro_text)) : ?>
        <p class="intro__text"><?php echo esc_html($intro_text); ?></p>
      <?php endif; ?>
    </div>
  </section>

  <!-- About Section -->
  <section class="about">
    <div class="about__container">
      <div class="column-content">
        <div class="column-content__item">
          <h3 class="column-content__title"><?php esc_html_e('The Challenge', 'aera'); ?></h3>
          <div class="column-content__text">
            <p><?php echo esc_html($about_challenge); ?></p>
          </div>
        </div>

        <div class="column-content__item">
          <h3 class="column-content__title"><?php esc_html_e('The Solution', 'aera'); ?></h3>
          <div class="column-content__text">
            <p><?php echo esc_html($about_solution); ?></p>
          </div>
        </div>

        <div class="column-content__item">
          <h3 class="column-content__title"><?php esc_html_e('The People', 'aera'); ?></h3>
          <div class="column-content__text">
            <p><?php echo esc_html($about_people); ?></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Leadership Section -->
  <?php if ($leadership_query->have_posts()) : ?>
    <section class="executive-team">
      <div class="executive-team__container">
        <h2 class="executive-team__title"><?php esc_html_e('Leadership', 'aera'); ?></h2>
        <div class="executive-team__list">
          <?php
          while ($leadership_query->have_posts()) :
            $leadership_query->the_post();
            $member_image = function_exists('get_field') ? get_field('team_member_image') : null;
            $member_name = function_exists('get_field') ? get_field('team_member_name') : get_the_title();
            $member_title = function_exists('get_field') ? get_field('team_member_title') : '';
            $member_linkedin = function_exists('get_field') ? get_field('team_member_linkedin') : '';

            if (!$member_image && has_post_thumbnail()) {
              $member_image = array('url' => get_the_post_thumbnail_url(get_the_ID(), 'full'));
            }
            ?>
            <article class="executive-team__item">
              <?php if (!empty($member_image['url'])) : ?>
                <div class="executive-team__item-image">
                  <?php if (!empty($member_linkedin)) : ?>
                    <a href="<?php echo esc_url($member_linkedin); ?>" target="_blank" rel="noopener noreferrer">
                      <img src="<?php echo esc_url($member_image['url']); ?>" alt="<?php echo esc_attr($member_name); ?>" loading="lazy" />
                    </a>
                  <?php else : ?>
                    <img src="<?php echo esc_url($member_image['url']); ?>" alt="<?php echo esc_attr($member_name); ?>" loading="lazy" />
                  <?php endif; ?>
                </div>
              <?php endif; ?>
              <div class="executive-team__item-content">
                <?php if (!empty($member_linkedin)) : ?>
                  <a href="<?php echo esc_url($member_linkedin); ?>" target="_blank" rel="noopener noreferrer" class="executive-team__item-link">
                    <p class="executive-team__item-name"><?php echo esc_html($member_name); ?></p>
                    <?php if (!empty($member_title)) : ?>
                      <p class="executive-team__item-designation"><?php echo esc_html($member_title); ?></p>
                    <?php endif; ?>
                  </a>
                <?php else : ?>
                  <p class="executive-team__item-name"><?php echo esc_html($member_name); ?></p>
                  <?php if (!empty($member_title)) : ?>
                    <p class="executive-team__item-designation"><?php echo esc_html($member_title); ?></p>
                  <?php endif; ?>
                <?php endif; ?>
              </div>
            </article>
          <?php
          endwhile;
          wp_reset_postdata();
          ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Board Members Section -->
  <?php if ($board_query->have_posts()) : ?>
    <section class="executive-team">
      <div class="executive-team__container">
        <h2 class="executive-team__title"><?php esc_html_e('Board Members', 'aera'); ?></h2>
        <div class="executive-team__list">
          <?php
          while ($board_query->have_posts()) :
            $board_query->the_post();
            $member_image = function_exists('get_field') ? get_field('team_member_image') : null;
            $member_name = function_exists('get_field') ? get_field('team_member_name') : get_the_title();
            $member_title = function_exists('get_field') ? get_field('team_member_title') : '';
            $member_linkedin = function_exists('get_field') ? get_field('team_member_linkedin') : '';

            if (!$member_image && has_post_thumbnail()) {
              $member_image = array('url' => get_the_post_thumbnail_url(get_the_ID(), 'full'));
            }
            ?>
            <article class="executive-team__item">
              <?php if (!empty($member_image['url'])) : ?>
                <div class="executive-team__item-image">
                  <?php if (!empty($member_linkedin)) : ?>
                    <a href="<?php echo esc_url($member_linkedin); ?>" target="_blank" rel="noopener noreferrer">
                      <img src="<?php echo esc_url($member_image['url']); ?>" alt="<?php echo esc_attr($member_name); ?>" loading="lazy" />
                    </a>
                  <?php else : ?>
                    <img src="<?php echo esc_url($member_image['url']); ?>" alt="<?php echo esc_attr($member_name); ?>" loading="lazy" />
                  <?php endif; ?>
                </div>
              <?php endif; ?>
              <div class="executive-team__item-content">
                <?php if (!empty($member_linkedin)) : ?>
                  <a href="<?php echo esc_url($member_linkedin); ?>" target="_blank" rel="noopener noreferrer" class="executive-team__item-link">
                    <p class="executive-team__item-name"><?php echo esc_html($member_name); ?></p>
                    <?php if (!empty($member_title)) : ?>
                      <p class="executive-team__item-designation"><?php echo esc_html($member_title); ?></p>
                    <?php endif; ?>
                  </a>
                <?php else : ?>
                  <p class="executive-team__item-name"><?php echo esc_html($member_name); ?></p>
                  <?php if (!empty($member_title)) : ?>
                    <p class="executive-team__item-designation"><?php echo esc_html($member_title); ?></p>
                  <?php endif; ?>
                <?php endif; ?>
              </div>
            </article>
          <?php
          endwhile;
          wp_reset_postdata();
          ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Investors Section -->
  <?php if (!empty($investors)) : ?>
    <section class="investors">
      <div class="investors__container">
        <h2 class="investors__title"><?php esc_html_e('Investors', 'aera'); ?></h2>
        <div class="investors__list">
          <?php foreach ($investors as $investor) : ?>
            <?php
            $investor_name = $investor['name'] ?? '';
            $investor_logo = $investor['logo'] ?? '';
            $investor_description = $investor['description'] ?? '';
            $investor_link = $investor['link'] ?? '';
            ?>
            <article class="investors__item">
              <?php if (!empty($investor_logo)) : ?>
                <div class="investors__item-logo">
                  <?php if (!empty($investor_link)) : ?>
                    <a href="<?php echo esc_url($investor_link); ?>" target="_blank" rel="noopener noreferrer">
                      <img src="<?php echo esc_url($investor_logo); ?>" alt="<?php echo esc_attr($investor_name); ?>" loading="lazy" />
                    </a>
                  <?php else : ?>
                    <img src="<?php echo esc_url($investor_logo); ?>" alt="<?php echo esc_attr($investor_name); ?>" loading="lazy" />
                  <?php endif; ?>
                </div>
              <?php endif; ?>
              <div class="investors__item-content">
                <?php if (!empty($investor_name)) : ?>
                  <h3 class="investors__item-name"><?php echo esc_html($investor_name); ?></h3>
                <?php endif; ?>
                <?php if (!empty($investor_description)) : ?>
                  <div class="investors__item-text">
                    <p>
                      <?php echo esc_html($investor_description); ?>
                      <?php if (!empty($investor_link)) : ?>
                        <a href="<?php echo esc_url($investor_link); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html(parse_url($investor_link, PHP_URL_HOST)); ?></a>
                      <?php endif; ?>
                    </p>
                  </div>
                <?php endif; ?>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Offices Section -->
  <?php if (!empty($offices)) : ?>
    <section class="offices">
      <div class="offices__container">
        <h2 class="offices__title"><?php esc_html_e('Offices', 'aera'); ?></h2>
        <?php
        $main_phone = $offices[0]['phone'] ?? '+1 (408) 524 2222';
        $main_email = $offices[0]['email'] ?? 'info@aeratechnology.com';
        ?>
        <?php if (!empty($main_phone) || !empty($main_email)) : ?>
          <div class="offices__contact">
            <?php if (!empty($main_phone)) : ?>
              <p class="offices__phone"><?php echo esc_html($main_phone); ?></p>
            <?php endif; ?>
            <?php if (!empty($main_email)) : ?>
              <p class="offices__email">
                <a href="mailto:<?php echo esc_attr($main_email); ?>"><?php echo esc_html($main_email); ?></a>
              </p>
            <?php endif; ?>
          </div>
        <?php endif; ?>

        <?php if (!empty($offices_map_image)) : ?>
          <div class="offices__map">
            <img src="<?php echo esc_url($offices_map_image); ?>" alt="<?php esc_attr_e('Office locations map', 'aera'); ?>" loading="lazy" />
          </div>
        <?php endif; ?>

        <div class="offices__list">
          <?php foreach ($offices as $office) : ?>
            <?php
            $office_title = $office['title'] ?? '';
            $office_address = $office['address'] ?? '';
            $office_country = $office['country'] ?? '';
            ?>
            <?php if (!empty($office_title)) : ?>
              <article class="offices__item">
                <h3 class="offices__item-title"><?php echo esc_html($office_title); ?></h3>
                <?php if (!empty($office_address)) : ?>
                  <div class="offices__item-address">
                    <?php echo wp_kses_post(nl2br(esc_html($office_address))); ?>
                  </div>
                <?php endif; ?>
                <?php if (!empty($office_country)) : ?>
                  <p class="offices__item-country"><?php echo esc_html($office_country); ?></p>
                <?php endif; ?>
              </article>
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>
</main>

<?php
get_footer();

