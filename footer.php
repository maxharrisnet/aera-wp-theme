<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Aera_Technology
 */

?>

<footer id="colophon" class="footer">
  <div class="footer__container">
    <div class="footer__row">
      <a class="footer__logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php esc_attr_e('Aera Technology', 'aera'); ?>">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/aera-logo.svg'); ?>" alt="<?php esc_attr_e('Aera Technology', 'aera'); ?>" loading="lazy" width="160" height="36" />
      </a>
    </div>

    <div class="footer__row footer__row--navigation">
      <?php
      $footer_columns = array(
        'footer-aera'      => __('Aera Decision Cloud™', 'aera'),
        'footer-skills'    => __('Aera Skills™', 'aera'),
        'footer-company'   => __('Company', 'aera'),
        'footer-resources' => __('Resources', 'aera'),
        'footer-customers' => __('Customers', 'aera'),
        'footer-events'    => __('Events', 'aera'),
        'footer-cta'       => __('Test Drive', 'aera'),
      );

      foreach ($footer_columns as $location => $heading) :
        if (! has_nav_menu($location)) {
          continue;
        }
      ?>
        <div class="footer__column">
          <p class="footer__columnTitle"><?php echo esc_html($heading); ?></p>
          <?php
          wp_nav_menu(
            array(
              'theme_location' => $location,
              'container'      => false,
              'menu_class'     => 'footer__list',
              'depth'          => 1,
              'fallback_cb'    => false,
            )
          );
          ?>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="footer__row footer__row--meta">
      <div class="footer__social">
        <?php
        if (has_nav_menu('footer-social')) {
          wp_nav_menu(
            array(
              'theme_location' => 'footer-social',
              'container'      => false,
              'menu_class'     => 'footer__socialList',
              'depth'          => 1,
              'fallback_cb'    => false,
            )
          );
        }
        ?>
      </div>
      <p class="footer__copyright">&copy; <?php echo esc_html(date_i18n('Y')); ?> Aera Technology&reg; · <?php esc_html_e('All Rights Reserved.', 'aera'); ?></p>
    </div>
  </div>
</footer>
</div><!-- #app -->
<!-- Loading -->
<?php get_template_part('template-parts/components/loading'); ?>

<?php wp_footer(); ?>

</body>

</html>