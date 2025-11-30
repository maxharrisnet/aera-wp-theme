<?php

/**
 * Customer card partial.
 *
 * @package Aera_Technology
 */

$is_demo = ! empty($args['is_demo']);
$post_id = $args['post_id'] ?? get_the_ID();

// Get card title (separate from post title for backend naming)
$card_title = '';
if (!$is_demo && function_exists('get_field')) {
  $acf_card_title = get_field('customer_card_title', $post_id);
  if (!empty($acf_card_title)) {
    $card_title = $acf_card_title;
  }
}
if (empty($card_title) && isset($args['card_title'])) {
  $card_title = $args['card_title'];
}
if (empty($card_title)) {
  $card_title = get_the_title($post_id);
}

// Get hero image (background image)
$hero_image_url = '';
$hero_image_data = null;
if (!$is_demo && function_exists('get_field')) {
  $hero_image_data = get_field('customer_hero_image', $post_id);
  if ($hero_image_data && !empty($hero_image_data['url'])) {
    $hero_image_url = $hero_image_data['url'];
  }
}

// Get company name
$company_name = '';
if (!$is_demo && function_exists('get_field')) {
  $company_name = get_field('customer_company_name', $post_id);
}

// Get company logo
$logo_url = '';
$logo_data = null;
if (!$is_demo && function_exists('get_field')) {
  $logo_data = get_field('customer_logo', $post_id);
  if ($logo_data && !empty($logo_data['url'])) {
    $logo_url = $logo_data['url'];
  }
}

// Get display title (the title that displays on the card)
// Use card title first, then fallback to post title
$display_title = '';
if (!$is_demo && function_exists('get_field')) {
  $display_title = get_field('customer_card_title', $post_id);
}
if (empty($display_title) && isset($args['card_title'])) {
  $display_title = $args['card_title'];
}
if (empty($display_title)) {
  $display_title = get_the_title($post_id);
}

// Get industry taxonomy
$industries = array();
if (!$is_demo && function_exists('get_field')) {
  $industry_ids = get_field('customer_industry_taxonomy', $post_id);
  if (!empty($industry_ids)) {
    if (!is_array($industry_ids)) {
      $industry_ids = array($industry_ids);
    }
    foreach ($industry_ids as $industry_id) {
      $term = get_term($industry_id, 'industry');
      if ($term && !is_wp_error($term)) {
        $industries[] = $term->name;
      }
    }
  }
}

// Get type/tag
$type = '';
if (!$is_demo && function_exists('get_field')) {
  $type = get_field('customer_type', $post_id);
}
if (empty($type) && isset($args['type'])) {
  $type = $args['type'];
}

// Get assets (two sets for now, will be a repeater later)
$assets = array();

// Asset 1
$asset_1_title = '';
$asset_1_cta = '';
$asset_1_url = '';
if (!$is_demo && function_exists('get_field')) {
  $asset_1_title = get_field('customer_asset_1_title', $post_id);
  $asset_1_cta = get_field('customer_asset_1_cta', $post_id);
  $asset_1_url = get_field('customer_asset_1_url', $post_id);
}
if (!empty($asset_1_url)) {
  $assets[] = array(
    'title' => $asset_1_title,
    'cta'   => $asset_1_cta,
    'url'   => $asset_1_url,
  );
}

// Asset 2
$asset_2_title = '';
$asset_2_cta = '';
$asset_2_url = '';
if (!$is_demo && function_exists('get_field')) {
  $asset_2_title = get_field('customer_asset_2_title', $post_id);
  $asset_2_cta = get_field('customer_asset_2_cta', $post_id);
  $asset_2_url = get_field('customer_asset_2_url', $post_id);
}
if (!empty($asset_2_url)) {
  $assets[] = array(
    'title' => $asset_2_title,
    'cta'   => $asset_2_cta,
    'url'   => $asset_2_url,
  );
}

// Get link (permalink)
$link = get_permalink($post_id);
if (isset($args['link'])) {
  $link = $args['link'];
}

?>

<div class="feature-card__card">
  <div class="feature-card__components" id="mainCard">
    <?php if ($hero_image_url) : ?>
      <div class="feature-card__cosImage feature-card__imageRow" id="companyimage">
        <img src="<?php echo esc_url($hero_image_url); ?>" alt="companyImage" />
      </div>
    <?php endif; ?>

    <div class="feature-card__companydetails">
      <?php if ($logo_url && !$company_name) : ?>
        <div class="feature-card__title">
          <img src="<?php echo esc_url($logo_url); ?>" alt="companyLogo" />
        </div>
      <?php elseif ($company_name && !$logo_url) : ?>
        <div class="feature-card__info">
          <div class="feature-card__title feature-card__companyText"><?php echo esc_html($company_name); ?></div>
        </div>
      <?php endif; ?>
    </div>

    <?php if ($display_title) : ?>
      <div class="feature-card__businessproblem">
        <div><?php echo esc_html($display_title); ?></div>
      </div>
    <?php endif; ?>

    <?php if ($type || !empty($industries)) : ?>
      <div class="feature-card__tags" id="tags">
        <?php if ($type) : ?>
          <span><?php echo esc_html($type); ?></span>
        <?php endif; ?>
        <?php if (!empty($industries)) : ?>
          <?php foreach ($industries as $industry) : ?>
            <span><?php echo esc_html($industry); ?></span>
          <?php endforeach; ?>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <?php if (!empty($assets)) : ?>
      <div class="feature-card__assetholder" id="items">
        <?php foreach ($assets as $index => $asset) : ?>
          <?php if (!empty($asset['url'])) : ?>
            <?php
            $asset_cta = $asset['cta'];
            $asset_cta_lower = strtolower($asset_cta);
            $has_watch = (strpos($asset_cta_lower, 'watch') !== false && strpos($asset_cta_lower, 'read') === false);
            $has_read = (strpos($asset_cta_lower, 'read') !== false && strpos($asset_cta_lower, 'watch') === false);
            ?>
            <div class="feature-card__assetwrapper">
              <div class="feature-card__assettype">
                <a href="<?php echo esc_url($asset['url']); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html($asset_cta); ?></a>
                <?php if ($has_watch) : ?>
                  <a href="<?php echo esc_url($asset['url']); ?>" target="_blank" rel="noopener noreferrer">
                    <img alt="Watch Now" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/icons/watchnow.png'); ?>" class="feature-card__playReadBtn" />
                  </a>
                <?php elseif ($has_read) : ?>
                  <a href="<?php echo esc_url($asset['url']); ?>" target="_blank" rel="noopener noreferrer">
                    <img alt="Read Now" src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/customers/icons/readnow.png'); ?>" class="feature-card__playReadBtn" />
                  </a>
                <?php endif; ?>
              </div>
              <?php if (!empty($asset['title'])) : ?>
                <ul>
                  <li><a href="<?php echo esc_url($asset['url']); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html($asset['title']); ?></a></li>
                </ul>
              <?php endif; ?>
            </div>
          <?php endif; ?>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</div>