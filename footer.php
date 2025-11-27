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

<footer class="footer" id="footer">
  <div class="footer__container">
    <div class="footer__row">
      <div class="footer__logo">
        <a class="footer__logoLink" aria-label="<?php esc_attr_e('Aera', 'aera'); ?>" href="<?php echo esc_url(home_url('/')); ?>">
          <svg height="47" width="110.59" viewBox="0 0 110.59 47" class="footer__logoImage">
            <path d="M40.44 18.55C37.53 6.66 30.4 0 27.5 0a7.86 7.86 0 0 0-3.45 2.88c8.16 9.08 7 24.43 5.53 26.28-1.81 2.33 5.25 3.74 9.42 3.74 3.37 0 3.37-6.5 1.44-14.35z" fill="#4b8bb5"></path>
            <path d="M32.75 28.6c-1.4.12-2.56 1.67-4 4.3h10.19c-2.47 0-3.32-4.28-6.19-4.3z" fill="#00619e"></path>
            <path d="M4.19 42.93a99.52 99.52 0 0 0 12.21 3.84s-4.85-2.39-3.6-13.2S21.64 1.79 27.5 0H19C15 0 8.9 9.05 4.26 19.77-.61 31-2.15 40.28 4.19 42.93z" fill="#bbe1fa"></path>
            <path d="M15.75 36.87a11.75 11.75 0 0 1-2.94 3.2c.69 4.52 2.79 6.19 3.41 6.6l.18.1s4.31 2 8.24-5.65 5.67-12.53 8.3-12.53h-9.23c-4.06 0-6.07 5.41-7.96 8.28z" fill="#8ac4e8"></path>
            <path d="M65.54 28.49h-8.93L55 33h-2.82l7.4-19.85h3L70 33h-2.85zM64.63 26l-3.57-9.78L57.51 26zm13.77 5a4.64 4.64 0 0 0 4.08-2.07l2.1 1.19a7.63 7.63 0 0 1-13.84-4.25 7.2 7.2 0 0 1 7.43-7.46c4.28 0 7.06 3.52 7.06 7.49a6.89 6.89 0 0 1-.09 1.1H73.26a4.87 4.87 0 0 0 5.14 4zm-5.14-6.15h9.47a4.48 4.48 0 0 0-4.56-4.11 4.71 4.71 0 0 0-4.91 4.1zm21.61-6.34v2.58c-2.13-.08-4.42 1-4.42 4.34V33H88V18.77h2.47v2.38a4.5 4.5 0 0 1 4.4-2.64zm15.72.26V33h-2.47v-2.49a6.12 6.12 0 0 1-5.36 2.8 7.28 7.28 0 0 1-7.17-7.45 7.28 7.28 0 0 1 7.17-7.46 6.13 6.13 0 0 1 5.36 2.81v-2.44zm-2.47 7.09a5 5 0 1 0-5.05 5.07 5 5 0 0 0 5.05-5.07z"></path>
          </svg>
        </a>
      </div>
    </div>
    <div class="footer__row">
      <div class="footer__navigation">
        <div class="footer__navigationCol">
          <?php
          $footer_menus = array(
            'footer-aera'      => array('has_children' => false),
            'footer-skills'    => array('has_children' => true),
            'footer-company'   => array('has_children' => true),
            'footer-resources' => array('has_children' => true),
            'footer-customers' => array('has_children' => false),
            'footer-events'    => array('has_children' => true),
            'footer-cta'       => array('has_children' => false),
          );

          foreach ($footer_menus as $location => $config) :
            if (!has_nav_menu($location)) {
              continue;
            }

            // Get menu items to check if it has children
            $menu_items = wp_get_nav_menu_items(get_nav_menu_locations()[$location]);
            $has_children = false;
            if ($menu_items) {
              foreach ($menu_items as $menu_item) {
                if ($menu_item->menu_item_parent != 0) {
                  $has_children = true;
                  break;
                }
              }
            }

            // Add class to ul if menu has children (except first menu)
            $ul_class = ($has_children && $location !== 'footer-aera') ? 'footer__w15_2lLXd' : '';
          ?>
            <ul<?php echo $ul_class ? ' class="' . esc_attr($ul_class) . '"' : ''; ?>>
              <?php
              wp_nav_menu(
                array(
                  'theme_location' => $location,
                  'container'      => false,
                  'menu_class'     => '',
                  'items_wrap'     => '%3$s',
                  'depth'          => 2,
                  'fallback_cb'    => false,
                  'walker'         => new \Aera\Footer_Walker(),
                )
              );
              ?>
              </ul>
            <?php endforeach; ?>
        </div>
      </div>
      <div class="footer__social">
        <div>
          <?php
          if (has_nav_menu('footer-social')) {
            wp_nav_menu(
              array(
                'theme_location' => 'footer-social',
                'container'      => false,
                'menu_class'     => 'Social_social__list_25ja3',
                'depth'          => 1,
                'fallback_cb'    => false,
                'walker'         => new \Aera\Footer_Social_Walker(),
              )
            );
          }
          ?>
        </div>
      </div>
    </div>
    <p class="footer__copyright">© <?php echo esc_html(date_i18n('Y')); ?> Aera Technology® · <?php esc_html_e('All Rights Reserved.', 'aera'); ?></p>
  </div>
</footer>
</div><!-- #app -->
<!-- Loading -->
<?php get_template_part('template-parts/components/loading'); ?>

<?php wp_footer(); ?>

</body>

</html>