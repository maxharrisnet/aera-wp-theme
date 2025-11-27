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

  wp_enqueue_script('aera-technology-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true);
  wp_enqueue_script('aera-theme-site', get_template_directory_uri() . '/js/site.js', array(), _S_VERSION, true);

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
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
  require get_template_directory() . '/inc/jetpack.php';
}
