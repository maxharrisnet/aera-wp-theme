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
  // add_image_size('resource_card', 720, 405, true);   // TODO: check if used?

  // Project-specific image sizes
  add_image_size('logo', 480, 204, false); // 2x for 240x102 display (retina)
  // add_image_size('author_image', 120, 120, true);
  add_image_size('resource_card_image', 342, 96);
  add_image_size('webinar_card_image', 333, 180);
  add_image_size('webinar_featured', 800, 450, true);
  add_image_size('card_logo', 150, 150, false);
  add_image_size('blog_hero', 890, 0);
  add_image_size('skill_hero', 738, 0);

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
 * Make custom image sizes available in the media selector.
 *
 * @param array $sizes Existing sizes.
 * @return array
 */
function aera_technology_image_sizes($sizes)
{
  return array_merge($sizes, array(
    'author_image' => __('Author Image (160x160)', 'aera'),
    'resource_card_image'   => __('Resource Card (342x96)', 'aera'),
    // Use this generic "Card Image" label for webinar/resource/customer cards
    'webinar_card_image'    => __('Card Image (333x190)', 'aera'),
    'blog_hero'    => __('Blog Hero (890x670)', 'aera'),
    'skill_hero'   => __('Skill Hero (738x620)', 'aera'),
  ));
}
add_filter('image_size_names_choose', 'aera_technology_image_sizes');

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
 * Get the URL and version for a theme script, preferring the minified build.
 *
 * Falls back to the source file in js/ if the minified version doesn't exist
 * (e.g. before running the build).
 *
 * @param string $script_name The script filename without extension (e.g. 'site').
 * @return array{url: string, version: string} The script URL and version string.
 */
function aera_get_script($script_name)
{
  $min_path = get_template_directory() . '/assets/js/min/' . $script_name . '.min.js';

  if (file_exists($min_path)) {
    return array(
      'url'     => get_template_directory_uri() . '/assets/js/min/' . $script_name . '.min.js',
      'version' => (string) filemtime($min_path),
    );
  }

  $src_path = get_template_directory() . '/js/' . $script_name . '.js';
  return array(
    'url'     => get_template_directory_uri() . '/js/' . $script_name . '.js',
    'version' => file_exists($src_path) ? (string) filemtime($src_path) : _S_VERSION,
  );
}

/**
 * Enqueue scripts and styles.
 */
function aera_technology_scripts()
{
  // style.css contains only the WP theme header comment (no actual rules).
  // Enqueue aera.css directly without the empty dependency to eliminate a render-blocking request.
  wp_enqueue_style('aera-theme-components', get_template_directory_uri() . '/assets/css/aera.css', array(), _S_VERSION);

  // Enqueue GSAP from CDN — loaded in footer since its dependents (site.js) also load in footer
  wp_enqueue_script(
    'gsap',
    'https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js',
    array(),
    '3.12.2',
    true
  );

  $nav = aera_get_script('navigation');
  wp_enqueue_script('aera-technology-navigation', $nav['url'], array(), $nav['version'], true);

  $site = aera_get_script('site');
  wp_enqueue_script('aera-theme-site', $site['url'], array('gsap'), $site['version'], true);

  // Only load the Three.js background bundle on pages that actually use it
  if (aera_is_background_active()) {
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
  }

  if (is_singular() && comments_open() && get_option('thread_comments')) {
    wp_enqueue_script('comment-reply');
  }

  // Enqueue Decision Intelligence page scripts
  if (is_page_template('page-what-is-decision-intelligence.php')) {
    $script = aera_get_script('decision-intelligence');
    wp_enqueue_script('aera-decision-intelligence', $script['url'], array(), $script['version'], true);
  }

  // Enqueue Landing Page scripts
  if (is_page_template('page-landing-page.php')) {
    $script = aera_get_script('landing-page');
    wp_enqueue_script('aera-landing-page', $script['url'], array(), $script['version'], true);
  }

  // Enqueue Skill Detail page scripts
  if (is_singular('skill')) {
    $script = aera_get_script('skill-detail');
    wp_enqueue_script('aera-skill-detail', $script['url'], array(), $script['version'], true);
  }

  // Enqueue Skills Video Modal scripts for skill function taxonomy pages
  if (is_tax('skill_function')) {
    $script = aera_get_script('skills-video-modal');
    wp_enqueue_script('aera-skills-video-modal', $script['url'], array(), $script['version'], true);
  }

  // Enqueue Skills Archive filtering script
  if (is_post_type_archive('skill')) {
    $script = aera_get_script('skills-filter');
    wp_enqueue_script('aera-skills-filter', $script['url'], array(), $script['version'], true);
  }

  // Enqueue AeraHub 2025 page scripts
  if (is_page_template('page-aerahub-2025.php')) {
    $script = aera_get_script('aerahub-2025');
    wp_enqueue_script('aera-aerahub-2025', $script['url'], array(), $script['version'], true);
  }

  // Enqueue AeraHub 2025 London On-Demand page scripts
  if (is_page_template('page-aerahub-2025-london.php')) {
    $script = aera_get_script('aerahub-2025-london');
    wp_enqueue_script('aera-aerahub-2025-london', $script['url'], array(), $script['version'], true);
  }

  // Enqueue Resources page filtering scripts
  if (is_page_template('page-resources.php')) {
    $script = aera_get_script('resources-filter');
    wp_enqueue_script('aera-resources-filter', $script['url'], array(), $script['version'], true);
  }
}
add_action('wp_enqueue_scripts', 'aera_technology_scripts');

/**
 * Determine if the animated background should be active for the current page.
 *
 * Mirrors the logic in header.php to avoid loading the 622KB Three.js bundle
 * on pages that don't use it.
 *
 * @return bool
 */
function aera_is_background_active()
{
  if (
    is_page_template('page-demo.php') ||
    is_page_template('page-contact-us.php') ||
    (is_page() && get_page_template_slug() === 'page-demo.php') ||
    (is_page() && get_page_template_slug() === 'page-contact-us.php') ||
    is_page('contact-us') ||
    is_post_type_archive('partner')
  ) {
    return false;
  }

  if (
    is_front_page() ||
    is_page_template('page-resources.php') ||
    is_page_template('page-aerahub-2025.php') ||
    is_page_template('page-aerahub-2025-london.php') ||
    is_page_template('page-decision-cloud.php') ||
    is_page_template('page-skills-home.php') ||
    (is_page() && get_page_template_slug() === 'page-resources.php') ||
    (is_page() && get_page_template_slug() === 'page-aerahub-2025.php') ||
    (is_page() && get_page_template_slug() === 'page-aerahub-2025-london.php') ||
    (is_page() && get_page_template_slug() === 'page-decision-cloud.php') ||
    (is_page() && get_page_template_slug() === 'page-skills-home.php') ||
    is_page(array('resources', 'about-us', 'careers', 'webinars', 'aera-decision-cloud', 'test-drive', 'aerahub-2025', 'aerahub-2025-london', 'decision-cloud')) ||
    is_post_type_archive('webinar') ||
    is_post_type_archive('event') ||
    is_post_type_archive('skill')
  ) {
    return true;
  }

  return false;
}

/**
 * Determine if the current page has a HubSpot form.
 *
 * @return bool
 */
function aera_has_hubspot_form()
{
  return is_page_template('page-demo.php') ||
    is_page_template('page-landing-page.php') ||
    is_page_template('page-test-drive.php') ||
    (is_page() && get_page_template_slug() === 'page-demo.php') ||
    is_tax('skill_function') ||
    is_post_type_archive('webinar');
}

/**
 * Add defer attribute to specific scripts for better performance.
 *
 * @param string $tag    The script tag HTML.
 * @param string $handle The script handle.
 * @param string $src    The script source URL.
 * @return string Modified script tag.
 */
function aera_script_loader_tag($tag, $handle, $src)
{
  $defer_handles = array('gsap', 'aera-technology-navigation', 'aera-theme-site', 'aera-background');

  if (in_array($handle, $defer_handles, true)) {
    $tag = str_replace(' src=', ' defer src=', $tag);
  }

  return $tag;
}
add_filter('script_loader_tag', 'aera_script_loader_tag', 10, 3);

/**
 * Keep page author and slug controls in the sidebar (classic editor layout).
 *
 * @return void
 */
function aera_move_page_meta_boxes_to_sidebar(): void
{
  add_post_type_support('page', 'author');

  remove_meta_box('slugdiv', 'page', 'normal');
  add_meta_box('slugdiv', __('Slug'), 'post_slug_meta_box', 'page', 'side', 'default');

  remove_meta_box('authordiv', 'page', 'normal');
  add_meta_box('authordiv', __('Author'), 'post_author_meta_box', 'page', 'side', 'default');
}
add_action('admin_menu', 'aera_move_page_meta_boxes_to_sidebar', 99);

/**
 * Ensure archive pages that are meant to be fully browsable are not paginated.
 *
 * @param WP_Query $query The query object.
 * @return void
 */
function aera_force_unlimited_archive_posts(WP_Query $query): void
{
  if (is_admin() || !$query->is_main_query()) {
    return;
  }

  if (
    is_post_type_archive(array('partner', 'customer', 'event', 'webinar', 'skill')) ||
    is_tax('skill_function')
  ) {
    $query->set('posts_per_page', -1);
  }
}
add_action('pre_get_posts', 'aera_force_unlimited_archive_posts', 50);

/**
 * Add resource hints for performance: preconnect, dns-prefetch, and font preloading.
 * Also conditionally preloads HubSpot forms script only on pages that use forms.
 */
function aera_resource_hints()
{
  $theme_uri = get_template_directory_uri();
?>
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="dns-prefetch" href="//cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="//js.hsforms.net">
  <link rel="preload" href="<?php echo esc_url($theme_uri . '/assets/fonts/FreightSans-Pro-Book.woff2'); ?>" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="<?php echo esc_url($theme_uri . '/assets/fonts/Gilroy-Semibold.woff2'); ?>" as="font" type="font/woff2" crossorigin>
  <?php
  if (aera_has_hubspot_form()) {
    echo '<link rel="preconnect" href="https://js.hsforms.net" crossorigin>' . "\n";
    echo '<link rel="dns-prefetch" href="//js.hs-scripts.com">' . "\n";
    echo '<link rel="preload" href="https://js.hsforms.net/forms/embed/v2.js" as="script" crossorigin="anonymous">' . "\n";
  }
}
add_action('wp_head', 'aera_resource_hints', 1);

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
 * FAQ helpers and shortcode.
 */
require get_template_directory() . '/inc/faq.php';

/**
 * Advanced Custom Fields helpers.
 */
require get_template_directory() . '/inc/acf.php';

/**
 * ACF Content Analysis for Yoast SEO integration.
 */
require get_template_directory() . '/inc/yoast-acf.php';

/**
 * HubSpot page tracking (setPath/trackPageView) so form submissions have correct URL context.
 */
require get_template_directory() . '/inc/hubspot-tracker.php';

/**
 * Head meta and favicons (match original site).
 */
require get_template_directory() . '/inc/head-meta.php';

/**
 * Announcement banner helpers.
 */
require get_template_directory() . '/inc/banner.php';

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
 * Skills archive: search/sort only. Category filtering is client-side (no reload).
 * Load all skills on one page so JS can filter by data-category-ids.
 *
 * @param WP_Query $query The WordPress query object.
 */
function aera_technology_skill_archive_pre_get_posts($query)
{
  if (is_admin() || !$query->is_main_query() || !is_post_type_archive('skill')) {
    return;
  }

  // No category tax_query: categories are filtered client-side via js/skills-filter.js
  $query->set('posts_per_page', -1);

  if (!empty($_GET['skill_search'])) {
    $search = is_array($_GET['skill_search']) ? $_GET['skill_search'][0] : $_GET['skill_search'];
    $query->set('s', sanitize_text_field($search));
  }

  $sort = isset($_GET['sort']) ? sanitize_text_field(is_array($_GET['sort']) ? $_GET['sort'][0] : $_GET['sort']) : 'menu_order';
  switch ($sort) {
    case 'title':
      $query->set('orderby', 'title');
      $query->set('order', 'ASC');
      break;
    case 'date':
      $query->set('orderby', 'date');
      $query->set('order', 'DESC');
      break;
    default:
      $query->set('orderby', 'menu_order');
      $query->set('order', 'ASC');
  }
}
add_action('pre_get_posts', 'aera_technology_skill_archive_pre_get_posts');

/**
 * Customize the document title for Webinars and Events archives.
 *
 * @param array $title The document title parts.
 * @return array Modified title parts.
 */
function aera_technology_custom_archive_title($title)
{
  if (is_post_type_archive('webinar')) {
    $title['title'] = __('Webinars', 'aera');
  } elseif (is_post_type_archive('event')) {
    $title['title'] = __('Events', 'aera');
  }
  return $title;
}
add_filter('document_title_parts', 'aera_technology_custom_archive_title');

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

/**
 * Override get_avatar to use author_photo_url from user meta if available
 *
 * @param string $avatar      Avatar image tag.
 * @param mixed  $id_or_email User ID, email, or object.
 * @param int    $size        Avatar size.
 * @param string $default     Default avatar URL.
 * @param string $alt         Alt text.
 * @return string Avatar image tag.
 */
function aera_custom_avatar($avatar, $id_or_email, $size, $default, $alt)
{
  $user = false;
  if (is_numeric($id_or_email)) {
    $user = get_user_by('id', (int) $id_or_email);
  } elseif (is_object($id_or_email)) {
    if (! empty($id_or_email->user_id)) {
      $user = get_user_by('id', (int) $id_or_email->user_id);
    }
  } else {
    $user = get_user_by('email', $id_or_email);
  }

  if ($user && is_object($user)) {
    $author_photo_url = get_user_meta($user->ID, 'author_photo_url', true);
    if (! empty($author_photo_url)) {
      $avatar = sprintf(
        '<img alt="%s" src="%s" class="avatar avatar-%d photo" height="%d" width="%d" />',
        esc_attr($alt ?: $user->display_name),
        esc_url($author_photo_url),
        (int) $size,
        (int) $size,
        (int) $size
      );
    }
  }

  return $avatar;
}
add_filter('get_avatar', 'aera_custom_avatar', 10, 5);

/**
 * Hide default WordPress Posts from admin menu
 */
function aera_hide_default_posts_menu()
{
  remove_menu_page('edit.php');
}
add_action('admin_menu', 'aera_hide_default_posts_menu');

/**
 * ============================================
 * DISABLE DEFAULT POSTS, COMMENTS & AUTHORS
 * ============================================
 * The site uses custom post types exclusively.
 * Default posts, comments, and author archives are disabled.
 */

/**
 * Disable default post type from generating front-end URLs.
 *
 * @return void
 */
function aera_disable_default_post_type(): void
{
  global $wp_post_types;

  if (isset($wp_post_types['post'])) {
    $wp_post_types['post']->publicly_queryable  = false;
    $wp_post_types['post']->has_archive         = false;
    $wp_post_types['post']->rewrite             = false;
    $wp_post_types['post']->query_var           = false;
    $wp_post_types['post']->exclude_from_search = true;
  }
}
add_action('init', 'aera_disable_default_post_type', 999);

/**
 * Redirect any default post, category, tag, date, or author archive pages.
 *
 * @return void
 */
function aera_redirect_disabled_archives(): void
{
  if (is_singular('post') || is_home() || is_category() || is_tag() || is_date()) {
    wp_redirect(home_url('/'), 301);
    exit;
  }

  // Disable author archive pages.
  if (is_author()) {
    wp_redirect(home_url('/'), 301);
    exit;
  }
}
add_action('template_redirect', 'aera_redirect_disabled_archives');


/**
 * Exclude default posts from Yoast XML sitemap.
 *
 * @param bool   $excluded  Whether the post type is excluded.
 * @param string $post_type The post type slug.
 * @return bool
 */
function aera_exclude_default_posts_from_sitemap(bool $excluded, string $post_type): bool
{
  if ($post_type === 'post') {
    return true;
  }
  return $excluded;
}
add_filter('wpseo_sitemap_exclude_post_type', 'aera_exclude_default_posts_from_sitemap', 10, 2);

/**
 * Disable author sitemaps in Yoast.
 *
 * @param bool $excluded Whether authors are excluded.
 * @return bool
 */
function aera_disable_author_sitemap(bool $excluded): bool
{
  return true;
}
add_filter('wpseo_sitemap_exclude_author', 'aera_disable_author_sitemap');

/**
 * Disable comments across the entire site.
 *
 * @return void
 */
function aera_disable_comments(): void
{
  // Remove comment support from all post types.
  $post_types = get_post_types(array('public' => true), 'names');
  foreach ($post_types as $post_type) {
    remove_post_type_support($post_type, 'comments');
    remove_post_type_support($post_type, 'trackbacks');
  }
}
add_action('init', 'aera_disable_comments', 100);

// Close comments and pings on the front-end.
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Return empty array for any existing comments.
add_filter('comments_array', '__return_empty_array', 10, 2);

/**
 * Remove comments from admin menu and admin bar.
 *
 * @return void
 */
function aera_remove_comments_admin(): void
{
  remove_menu_page('edit-comments.php');
  remove_submenu_page('options-general.php', 'options-discussion.php');
}
add_action('admin_menu', 'aera_remove_comments_admin', 999);

/**
 * Remove comments link from admin bar.
 *
 * @param WP_Admin_Bar $wp_admin_bar The admin bar instance.
 * @return void
 */
function aera_remove_comments_admin_bar(\WP_Admin_Bar $wp_admin_bar): void
{
  $wp_admin_bar->remove_node('comments');
}
add_action('admin_bar_menu', 'aera_remove_comments_admin_bar', 999);

/**
 * Change Users page post count column to show Blog count instead of default posts
 */
function aera_modify_user_posts_column($columns)
{
  // Remove default posts column
  unset($columns['posts']);

  // Add Blog posts column
  $columns['blog_posts'] = __('Blog Posts', 'aera');

  return $columns;
}
add_filter('manage_users_columns', 'aera_modify_user_posts_column');

/**
 * Display blog post count in Users list
 */
function aera_custom_user_column_content($value, $column_name, $user_id)
{
  if ($column_name === 'blog_posts') {
    $count = count_user_posts($user_id, 'blog');
    if ($count > 0) {
      $url = admin_url('edit.php?post_type=blog&author=' . $user_id);
      return '<a href="' . esc_url($url) . '">' . $count . '</a>';
    }
    return '0';
  }
  return $value;
}
add_filter('manage_users_custom_column', 'aera_custom_user_column_content', 10, 3);

/**
 * Make blog posts column sortable
 */
function aera_make_blog_posts_column_sortable($columns) /// TODO: delete?
{
  $columns['blog_posts'] = 'blog_posts';
  return $columns;
}
add_filter('manage_users_sortable_columns', 'aera_make_blog_posts_column_sortable');

/**
 * Handle sorting by blog posts count
 */
function aera_sort_users_by_blog_posts($query)
{
  if (!is_admin() || !isset($_GET['orderby']) || $_GET['orderby'] !== 'blog_posts') {
    return;
  }

  global $wpdb;
  $order = isset($_GET['order']) && strtolower($_GET['order']) === 'desc' ? 'DESC' : 'ASC';

  $query->query_orderby = "ORDER BY (
    SELECT COUNT(*)
    FROM {$wpdb->posts}
    WHERE {$wpdb->posts}.post_author = {$wpdb->users}.ID
    AND {$wpdb->posts}.post_type = 'blog'
    AND {$wpdb->posts}.post_status = 'publish'
  ) $order";
}
add_action('pre_get_users', 'aera_sort_users_by_blog_posts');

/**
 * Enqueue media uploader script on user profile pages
 */
function aera_enqueue_user_profile_media_script($hook)
{
  if ($hook !== 'profile.php' && $hook !== 'user-edit.php') {
    return;
  }
  wp_enqueue_media();
}
add_action('admin_enqueue_scripts', 'aera_enqueue_user_profile_media_script');

/**
 * Add custom fields to User profile for author photo and position
 */
function aera_add_user_profile_fields($user)
{
?>
  <h3><?php esc_html_e('Author Information', 'aera'); ?></h3>
  <p><?php esc_html_e('These fields are used for blog post author display in the sidebar.', 'aera'); ?></p>

  <table class="form-table">
    <tr>
      <th>
        <label for="author_photo_url"><?php esc_html_e('Author Photo URL', 'aera'); ?></label>
      </th>
      <td>
        <?php
        $author_photo_url = get_user_meta($user->ID, 'author_photo_url', true);
        ?>
        <input type="url" name="author_photo_url" id="author_photo_url" value="<?php echo esc_attr($author_photo_url); ?>" class="regular-text" />
        <button type="button" class="button" id="author_photo_upload_button"><?php esc_html_e('Upload Image', 'aera'); ?></button>
        <p class="description">
          <?php esc_html_e('URL to the author photo. This will be used instead of Gravatar for blog posts. Click "Upload Image" to select from Media Library.', 'aera'); ?>
        </p>
        <?php if ($author_photo_url) : ?>
          <p>
            <img src="<?php echo esc_url($author_photo_url); ?>" alt="Author photo preview" style="max-width: 150px; height: auto; margin-top: 10px; border: 1px solid #ddd; padding: 5px;" />
          </p>
        <?php endif; ?>
      </td>
    </tr>
    <tr>
      <th>
        <label for="author_position"><?php esc_html_e('Author Position', 'aera'); ?></label>
      </th>
      <td>
        <?php
        $author_position = get_user_meta($user->ID, 'author_position', true);
        ?>
        <input type="text" name="author_position" id="author_position" value="<?php echo esc_attr($author_position); ?>" class="regular-text" placeholder="<?php esc_attr_e('e.g., VP of Product, Chief Technology Officer', 'aera'); ?>" />
        <p class="description">
          <?php esc_html_e('Author\'s role or position. This will be displayed below the author name in blog post sidebars.', 'aera'); ?>
        </p>
      </td>
    </tr>
  </table>

  <script>
    jQuery(document).ready(function($) {
      $('#author_photo_upload_button').on('click', function(e) {
        e.preventDefault();
        var button = $(this);
        var input = $('#author_photo_url');

        var frame = wp.media({
          title: 'Select Author Photo',
          button: {
            text: 'Use this image'
          },
          multiple: false
        });

        frame.on('select', function() {
          var attachment = frame.state().get('selection').first().toJSON();
          input.val(attachment.url);
          if ($('#author_photo_preview').length) {
            $('#author_photo_preview').attr('src', attachment.url);
          } else {
            input.after('<p><img id="author_photo_preview" src="' + attachment.url + '" alt="Author photo preview" style="max-width: 150px; height: auto; margin-top: 10px; border: 1px solid #ddd; padding: 5px;" /></p>');
          }
        });

        frame.open();
      });
    });
  </script>
<?php
}
add_action('show_user_profile', 'aera_add_user_profile_fields');
add_action('edit_user_profile', 'aera_add_user_profile_fields');

/**
 * Save custom user profile fields
 */
function aera_save_user_profile_fields($user_id)
{
  if (!current_user_can('edit_user', $user_id)) {
    return false;
  }

  if (isset($_POST['author_photo_url'])) {
    update_user_meta($user_id, 'author_photo_url', sanitize_text_field($_POST['author_photo_url']));
  }

  if (isset($_POST['author_position'])) {
    update_user_meta($user_id, 'author_position', sanitize_text_field($_POST['author_position']));
  }
}
add_action('personal_options_update', 'aera_save_user_profile_fields');
add_action('edit_user_profile_update', 'aera_save_user_profile_fields');
