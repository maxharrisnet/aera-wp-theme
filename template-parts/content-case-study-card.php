<?php

/**
 * Template part for displaying case study cards
 * Based on the original ResourceItem.js Case Study card structure
 *
 * @package Aera_Technology
 */

defined('ABSPATH') || exit;

$type = get_field('case_study_type') ?: 'Case Study';
$company_type = get_field('case_study_company_type') ?: get_the_title();
$icon = get_field('case_study_icon');
$employees = get_field('case_study_employees');
$revenue = get_field('case_study_revenue');
$business_statement = get_field('case_study_business_statement');
$link = get_permalink();
?>

<article class="resource-card resource-card--case-study" data-resource-type="case-study" data-resource-class="resources">
  <div class="resource-card__wrapper">
    <a href="<?php echo esc_url($link); ?>">
      <div class="case-study-card__content">
        <div class="case-study-card__header">
          <div class="case-study-card__icon-wrapper">
            <?php if ($icon) : ?>
              <?php
              $att = is_array($icon) ? ($icon['ID'] ?? $icon['id'] ?? null) : null;
              $alt = is_array($icon) ? ($icon['alt'] ?: $company_type) : $company_type;
              if ($att) {
                // Use a small size (resource_card_image) for icons to keep layout consistent
                echo wp_get_attachment_image($att, 'resource_card_image', false, array('class' => 'case-study-card__icon', 'alt' => $alt));
              } else {
                if ($company_type === 'Pharmaceutical') {
                  echo '<img src="' . esc_url($icon['url']) . '" alt="' . esc_attr($alt) . '" class="case-study-card__icon" style="width: 40px; margin-top: -5.5px;" />';
                } elseif ($company_type === 'Health & Hygiene') {
                  echo '<img src="' . esc_url($icon['url']) . '" alt="' . esc_attr($alt) . '" class="case-study-card__icon" style="width: 45px;" />';
                } else {
                  echo '<img src="' . esc_url($icon['url']) . '" alt="' . esc_attr($alt) . '" class="case-study-card__icon" />';
                }
              }
              ?>
            <?php endif; ?>
          </div>
          <div class="case-study-card__company-type">
            <?php echo esc_html($company_type); ?>
          </div>
        </div>
        <div class="resource-card__row">
          <div class="resource-card__type"><?php echo esc_html($type); ?></div>
        </div>
        <?php if ($revenue && $employees) : ?>
          <div class="case-study-card__company-details">
            <div class="case-study-card__detail-item">
              <div class="case-study-card__detail-label"><?php esc_html_e('Revenue', 'aera'); ?></div>
              <div class="case-study-card__detail-value"><?php echo esc_html($revenue); ?></div>
            </div>
            <div class="case-study-card__detail-item">
              <div class="case-study-card__detail-label"><?php esc_html_e('Employees', 'aera'); ?></div>
              <div class="case-study-card__detail-value"><?php echo esc_html($employees); ?></div>
            </div>
          </div>
        <?php endif; ?>
        <?php if ($business_statement) : ?>
          <div class="case-study-card__business-problem">
            <div class="case-study-card__detail-label"><?php esc_html_e('Business Problem', 'aera'); ?></div>
            <div class="case-study-card__problem-text"><?php echo esc_html($business_statement); ?></div>
          </div>
        <?php endif; ?>
        <div class="case-study-card__learn-more">
          <?php esc_html_e('Learn More', 'aera'); ?> &rarr;
        </div>
      </div>
    </a>
  </div>
</article>