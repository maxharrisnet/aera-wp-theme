<?php

/**
 * Aera Technology functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Aera_Technology
 */

if (! defined('_S_VERSION')) {
  // Replace the version number of the theme on each release.
  define('_S_VERSION', '1.0.0');
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function aera_technology_setup()
{
  /*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on Aera Technology, use a find and replace
		* to change 'aera-technology' to the name of your theme in all the template files.
		*/
  load_theme_textdomain('aera-technology', get_template_directory() . '/languages');

  // Add default posts and comments RSS feed links to head.
  add_theme_support('automatic-feed-links');

  /*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
  add_theme_support('title-tag');

  /*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
  add_theme_support('post-thumbnails');
  add_image_size('resource_card', 720, 405, true);

  // This theme uses wp_nav_menu() in one location.
  register_nav_menus(
    array(
      'primary'          => esc_html__('Primary Navigation', 'aera'),
      'primary-utility'  => esc_html__('Utility Navigation', 'aera'),
      'footer-aera'      => esc_html__('Footer: Aera Decision Cloud', 'aera'),
      'footer-skills'    => esc_html__('Footer: Aera Skills', 'aera'),
      'footer-company'   => esc_html__('Footer: Company', 'aera'),
      'footer-resources' => esc_html__('Footer: Resources', 'aera'),
      'footer-customers' => esc_html__('Footer: Customers', 'aera'),
      'footer-events'    => esc_html__('Footer: Events', 'aera'),
      'footer-cta'       => esc_html__('Footer: CTA', 'aera'),
      'footer-social'    => esc_html__('Footer: Social Links', 'aera'),
    )
  );

  /*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
  add_theme_support(
    'html5',
    array(
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
      'style',
      'script',
    )
  );

  // Set up the WordPress core custom background feature.
  add_theme_support(
    'custom-background',
    apply_filters(
      'aera_technology_custom_background_args',
      array(
        'default-color' => 'ffffff',
        'default-image' => '',
      )
    )
  );

  // Add theme support for selective refresh for widgets.
  add_theme_support('customize-selective-refresh-widgets');

  /**
   * Add support for core custom logo.
   *
   * @link https://codex.wordpress.org/Theme_Logo
   */
  add_theme_support(
    'custom-logo',
    array(
      'height'      => 250,
      'width'       => 250,
      'flex-width'  => true,
      'flex-height' => true,
    )
  );
}
add_action('after_setup_theme', 'aera_technology_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function aera_technology_content_width()
{
  $GLOBALS['content_width'] = apply_filters('aera_technology_content_width', 640);
}
add_action('after_setup_theme', 'aera_technology_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function aera_technology_widgets_init()
{
  register_sidebar(
    array(
      'name'          => esc_html__('Sidebar', 'aera-technology'),
      'id'            => 'sidebar-1',
      'description'   => esc_html__('Add widgets here.', 'aera-technology'),
      'before_widget' => '<section id="%1$s" class="widget %2$s">',
      'after_widget'  => '</section>',
      'before_title'  => '<h2 class="widget-title">',
      'after_title'   => '</h2>',
    )
  );
}
add_action('widgets_init', 'aera_technology_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function aera_technology_scripts()
{
  wp_enqueue_style('aera-technology-style', get_stylesheet_uri(), array(), _S_VERSION);
  wp_style_add_data('aera-technology-style', 'rtl', 'replace');
  wp_enqueue_style('aera-theme-components', get_template_directory_uri() . '/assets/css/aera.css', array('aera-technology-style'), _S_VERSION);

  // Enqueue GSAP from CDN (jsDelivr)
  wp_enqueue_script(
    'gsap',
    'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js',
    array(),
    '3.12.2',
    false // Load in header so it's available for site.js
  );

  wp_enqueue_script('aera-technology-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);
  wp_enqueue_script('aera-theme-site', get_template_directory_uri() . '/js/site.js', array('gsap'), _S_VERSION, true);

  $background_bundle_path = get_template_directory() . '/assets/js/dist/background.js';
  if (file_exists($background_bundle_path)) {
    wp_enqueue_script(
      'aera-background',
      get_template_directory_uri() . '/assets/js/dist/background.js',
      array(),
      filemtime($background_bundle_path),
      true
    );
  }

  if (is_singular() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

  // Enqueue Decision Intelligence page scripts and styles
  if (is_page_template('page-what-is-decision-intelligence.php')) {
    $decision_intelligence_js_path = get_template_directory() . '/js/decision-intelligence.js';
    if (file_exists($decision_intelligence_js_path)) {
      wp_enqueue_script(
        'aera-decision-intelligence',
        get_template_directory_uri() . '/js/decision-intelligence.js',
        array(),
        filemtime($decision_intelligence_js_path),
        true
      );
    }
  }

  // Enqueue Skill Detail page scripts
  if (is_singular('skill')) {
    $skill_detail_js_path = get_template_directory() . '/js/skill-detail.js';
    if (file_exists($skill_detail_js_path)) {
      wp_enqueue_script(
        'aera-skill-detail',
        get_template_directory_uri() . '/js/skill-detail.js',
        array(),
        filemtime($skill_detail_js_path),
        true
      );
    }
  }

  // Enqueue Skills Video Modal scripts for skill function taxonomy pages
  if (is_tax('skill_function')) {
    $skills_video_modal_js_path = get_template_directory() . '/js/skills-video-modal.js';
    if (file_exists($skills_video_modal_js_path)) {
      wp_enqueue_script(
        'aera-skills-video-modal',
        get_template_directory_uri() . '/js/skills-video-modal.js',
        array(),
        filemtime($skills_video_modal_js_path),
        true
      );
    }
  }

  // Enqueue AeraHub 2025 page scripts
  if (is_page_template('page-aerahub-2025.php')) {
    $aerahub_2025_js_path = get_template_directory() . '/js/aerahub-2025.js';
    if (file_exists($aerahub_2025_js_path)) {
      wp_enqueue_script(
        'aera-aerahub-2025',
        get_template_directory_uri() . '/js/aerahub-2025.js',
        array(),
        filemtime($aerahub_2025_js_path),
        true
      );
    }
  }

  // Preload HubSpot forms script on all pages for faster form loading
  // This prevents the "LOADING" message delay when clicking Schedule Demo buttons
  add_action('wp_head', function() {
    echo '<link rel="preload" href="https://js.hsforms.net/forms/embed/v2.js" as="script" crossorigin="anonymous">' . "\n";
  }, 1);
}
add_action('wp_enqueue_scripts', 'aera_technology_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Custom post types.
 */
require get_template_directory() . '/inc/post-types.php';

/**
 * Custom taxonomies.
 */
require get_template_directory() . '/inc/taxonomies.php';

/**
 * Resource helpers.
 */
require get_template_directory() . '/inc/resources.php';

/**
 * Lever API integration.
 */
require get_template_directory() . '/inc/lever.php';

/**
 * Admin enhancements.
 */
require get_template_directory() . '/inc/admin.php';

/**
 * Advanced Custom Fields helpers.
 */
require get_template_directory() . '/inc/acf.php';

/**
 * Custom navigation walker.
 */
require get_template_directory() . '/inc/class-navigation-walker.php';

/**
 * Custom footer walker.
 */
require get_template_directory() . '/inc/class-footer-walker.php';

/**
 * Custom footer social walker.
 */
require get_template_directory() . '/inc/class-footer-social-walker.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
  require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Modify partner archive query to order by menu_order.
 *
 * @param WP_Query $query The WordPress query object.
 */
function aera_technology_partner_archive_order($query)
{
  if (!is_admin() && $query->is_main_query() && is_post_type_archive('partner')) {
    $query->set('orderby', 'menu_order');
    $query->set('order', 'ASC');
    $query->set('posts_per_page', -1);
  }
}
add_action('pre_get_posts', 'aera_technology_partner_archive_order');

/**
 * ============================================
 * ICON SELECTOR FUNCTIONALITY
 * ============================================
 * Populates ACF select fields with icons from assets/images/icons/ folder
 * and adds preview functionality
 */

/**
 * Populate icon select fields with icons from assets folder
 *
 * @param array $field The ACF field array
 * @return array Modified field array with icon choices
 */
function aera_populate_icon_choices($field)
{
  // Reset choices
  $field['choices'] = array();

  // Path to icons folder
  $icons_dir = get_template_directory() . '/assets/images/icons/';
  $icons_url = get_template_directory_uri() . '/assets/images/icons/';

  // Get all SVG and PNG icons
  $icons = glob($icons_dir . '*.{svg,png}', GLOB_BRACE);

  if ($icons) {
    // Sort alphabetically
    sort($icons);

    foreach ($icons as $icon_path) {
      $filename = basename($icon_path);
      $icon_url = $icons_url . $filename;

      // Create readable label from filename
      $label = ucwords(str_replace(['-', '_', '.svg', '.png'], [' ', ' ', '', ''], $filename));

      // Use URL as value, readable name as label
      $field['choices'][$icon_url] = $label;
    }
  }

  return $field;
}

// Apply to skill icon fields
add_filter('acf/load_field/name=skill_icon', 'aera_populate_icon_choices');
add_filter('acf/load_field/name=icon_1_icon', 'aera_populate_icon_choices');
add_filter('acf/load_field/name=icon_2_icon', 'aera_populate_icon_choices');
add_filter('acf/load_field/name=icon_3_icon', 'aera_populate_icon_choices');
add_filter('acf/load_field/name=icon_4_icon', 'aera_populate_icon_choices');

/**
 * Add icon preview to select fields in ACF admin
 *
 * @param array $field The ACF field array
 */
function aera_add_icon_preview($field)
{
  // Only apply to icon fields
  $icon_fields = array('skill_icon', 'icon_1_icon', 'icon_2_icon', 'icon_3_icon', 'icon_4_icon');

  if (!in_array($field['name'], $icon_fields)) {
    return;
  }

  // Only in admin
  if (!is_admin()) {
    return;
  }

  ?>
  <style>
    .acf-field[data-name="<?php echo esc_attr($field['name']); ?>"] .icon-preview-container {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-top: 10px;
    }
    .acf-field[data-name="<?php echo esc_attr($field['name']); ?>"] .icon-preview {
      width: 60px;
      height: 60px;
      padding: 10px;
      background: #f7f9fa;
      border: 2px solid #ddd;
      border-radius: 6px;
      object-fit: contain;
    }
  </style>
  <script>
    (function($) {
      $(document).ready(function() {
        var $field = $('.acf-field[data-name="<?php echo esc_js($field['name']); ?>"]');
        var $select = $field.find('select');

        // Create preview container
        var $previewContainer = $('<div class="icon-preview-container"></div>');
        var $preview = $('<img class="icon-preview" style="display:none;">');
        $previewContainer.append($preview);
        $select.after($previewContainer);

        // Update preview on change
        $select.on('change', function() {
          var iconUrl = $(this).val();

          if (iconUrl) {
            $preview.attr('src', iconUrl).show();
          } else {
            $preview.hide();
          }
        }).trigger('change');
      });
    })(jQuery);
  </script>
  <?php
}

add_action('acf/render_field/type=select', 'aera_add_icon_preview', 10, 1);
