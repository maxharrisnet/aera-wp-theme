<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Aera
 */

add_action( 'tgmpa_register', 'aera_include_required_plugins' );
add_action( 'widgets_init', 'aera_widgets_init' );
add_action( 'after_setup_theme', 'aera_content_width', 0 );
add_action( 'wp_enqueue_scripts', 'aera_enqueue_scripts' );
add_action( 'enqueue_block_editor_assets', 'aera_add_gutenberg_assets' );
add_action( 'aera_search', 'aera_search_popup', 10 );

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 *
 * @return array
 */
function aera_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'aera-page';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'aera-enable-sidebar' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}

add_filter( 'body_class', 'aera_body_classes' );


/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 */
function aera_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'aera_content_width', 1200 );
}


/**
 * Register widget area.
 */
function aera_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'aera' ),
		'id'            => 'aera-sidebar',
		'description'   => esc_html__( 'Add widgets here.', 'aera' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );
}


/**
 * Register Fonts
 */
if ( ! function_exists( 'aera_fonts_url' ) ) {
	function aera_fonts_url() {

		$font_url = '';


		/*
		Translators: If there are characters in your language that are not supported
		by chosen font(s), translate this to 'off'. Do not translate into your own language.
		 */
		if ( 'off' !== esc_html_x( 'off', 'Google font: on or off', 'aera' ) ) {

			$query_args = array(
				'family' => 'Poppins:300,300i,400,400i,500,500i,600,600i,700,700i',
				'subset' => 'latin,latin-ext',
				'display' => 'swap',
			);

			$font_url = add_query_arg($query_args, "//fonts.googleapis.com/css" );

			$font_url = urldecode( $font_url );

		}

		return $font_url;
	}
}


/**
Enqueue scripts and styles.
*/
if ( ! function_exists( 'aera_font_scripts' ) ) {
	function aera_font_scripts() {
		wp_enqueue_style( 'aera-fonts', aera_fonts_url(), array(), null );
	}
}


/**
 * Enqueue scripts and styles.
 */
function aera_enqueue_scripts() {

	// general settings
	if ( ( is_admin() ) ) {
		return;
	}

	if ( is_page() || is_home() ) {
		$post_id = get_queried_object_id();
	} else {
		$post_id = get_the_ID();
	}

    wp_enqueue_style( 'aera-fonts', aera_fonts_url(), array(), null );
		wp_enqueue_style( 'aera-general', AERA_T_URI . '/assets/css/general.css' );

	if (is_archive() || is_author() || is_category() || is_tag() || is_search()) {
		wp_enqueue_style( 'aera-blog-list', AERA_T_URI . '/assets/css/blog/blog-list.css' );
	}

	if (is_active_sidebar('aera-sidebar')) {
		wp_enqueue_style( 'aera-sidebar', AERA_T_URI . '/assets/css/blog/sidebar.css' );
	}

	wp_enqueue_style( 'aera-main-style', AERA_T_URI . '/assets/css/style.css' );
	wp_enqueue_style( 'aera-style', AERA_T_URI . '/style.css' );

	if (get_post_type() === 'post') {
		wp_enqueue_style( 'aera-blog-single', AERA_T_URI . '/assets/css/blog/blog-single.css' );
	}

	if (get_post_type() === 'announcements') {
		wp_enqueue_style( 'aera-announcements-single', AERA_T_URI . '/assets/css/blog/announcements-single.css' );
	}

	if (get_post_type() === 'cos') {
		wp_enqueue_style( 'aera-cos-single', AERA_T_URI . '/assets/css/blog/cos-single.css' );
	}

	if (get_post_type() === 'skills') {
		wp_enqueue_style( 'aera-skills-single', AERA_T_URI . '/assets/css/blog/skills-single.css' );
	}

	if (get_post_type() === 'customers') {
		wp_enqueue_style( 'aera-customers-single', AERA_T_URI . '/assets/css/blog/customers-single.css' );
	}

	// add TinyMCE style
	add_editor_style();

	// including jQuery plugins
	wp_localize_script( 'aera-script', 'get',
		array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'siteurl' => get_template_directory_uri(),
		)
	);

	if ( is_singular() ) {
		wp_enqueue_script( 'comment-reply' );
	}

    wp_enqueue_script( 'aera-navigation', AERA_T_URI . '/assets/js/navigation.min.js', array(), '', true );
		wp_enqueue_script( 'aera-gsap', AERA_T_URI . '/assets/js/lib/gsap.min.js', [], '1.0.0', true );
    wp_enqueue_script( 'aera-script', AERA_T_URI . '/assets/js/script.min.js', array( 'jquery' ), '', true );

	if ( is_404() ) {
		wp_enqueue_style( 'aera-error-page', AERA_T_URI . '/assets/css/error-page.css' );
    wp_enqueue_script( 'aera-error-page-threejs-script', AERA_T_URI . '/assets/js/lib/three.min.js', [], '1.0.0', true );
		wp_enqueue_script( 'aera-error-page-script', AERA_T_URI . '/assets/js/error-page.min.js', [], '1.0.0', true );
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}


/**
 * Include plugins
 */
if ( ! function_exists( 'aera_include_required_plugins' ) ) {
	function aera_include_required_plugins() {

		$plugins = array(
			array(
				'name'               => esc_html__( 'Elementor', 'aera' ),
				// The plugin name
				'slug'               => 'elementor',
				// The plugin slug (typically the folder name)
				'required'           => false,
				// If false, the plugin is only 'recommended' instead of required
				'version'            => '',
				// E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
				'force_activation'   => false,
				// If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
				'force_deactivation' => false,
				// If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
				'external_url'       => '',
				// If set, overrides default API URL and points to an external URL
			),
		);

		// Change this to your theme text domain, used for internationalising strings

		/**
		 * Array of configuration settings. Amend each line as needed.
		 * If you want the default strings to be available under your own theme domain,
		 * leave the strings uncommented.
		 * Some of the strings are added into a sprintf, so see the comments at the
		 * end of each line for what each argument will be.
		 */
		$config = array(
			'domain'       => 'aera',                    // Text domain - likely want to be the same as your theme.
			'default_path' => '',                            // Default absolute path to pre-packaged plugins
			'menu'         => 'tgmpa-install-plugins',    // Menu slug
			'has_notices'  => true,                        // Show admin notices or not
			'is_automatic' => true,                        // Automatically activate plugins after installation or not
			'message'      => '',                            // Message to output right before the plugins table
			'strings'      => array(
				'page_title'                      => esc_html__( 'Install Required Plugins', 'aera' ),
				'menu_title'                      => esc_html__( 'Install Plugins', 'aera' ),
				'installing'                      => esc_html__( 'Installing Plugin: %s', 'aera' ),
				// %1$s = plugin name
				'oops'                            => esc_html__( 'Something went wrong with the plugin API.', 'aera' ),
				'notice_can_install_required'     => _n_noop( 'This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_can_install_recommended'  => _n_noop( 'This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_can_activate_required'    => _n_noop( 'The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_can_activate_recommended' => _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_ask_to_update'            => _n_noop( 'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'aera' ),
				// %1$s = plugin name(s)
				'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'aera' ),
				// %1$s = plugin name(s)
				'install_link'                    => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'aera' ),
				'activate_link'                   => _n_noop( 'Activate installed plugin', 'Activate installed plugins', 'aera' ),
				'return'                          => esc_html__( 'Return to Required Plugins Installer', 'aera' ),
				'plugin_activated'                => esc_html__( 'Plugin activated successfully.', 'aera' ),
				'complete'                        => esc_html__( 'All plugins installed and activated successfully. %s', 'aera' ),
				// %1$s = dashboard link
				'nag_type'                        => 'updated'
				// Determines admin notice type - can only be 'updated' or 'error'
			)
		);

		tgmpa( $plugins, $config );
	}
}


/**
 * Password form
 */
if ( ! function_exists( 'aera_password_form' ) ) {
	function aera_password_form( $post_id ) {
		$form = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post" class="form">
					<h3>' . esc_html__( 'Enter password below:', 'aera' ) . '</h3>
  				  	<input placeholder="' . esc_attr__( "Password:", 'aera' ) . '" name="post_password" type="password" size="20" maxlength="20" />
  				  	<input type="submit" name="' . esc_attr__( 'Submit', 'aera' ) . '" value="' . esc_attr__( 'Enter', 'aera' ) . '" />
				  </form>';

		return $form;
	}
}
add_filter( 'the_password_form', 'aera_password_form' );


/**
 * Check need minimal requirements (PHP and WordPress version)
 */
if ( version_compare( $GLOBALS['wp_version'], '4.3', '<' ) || version_compare( PHP_VERSION, '5.3', '<' ) ) {
	if ( ! function_exists( 'aera_requirements_notice' ) ) {
		function aera_requirements_notice() {
			$message = sprintf( esc_html__( 'Aera theme needs minimal WordPress version 4.3 and PHP 5.6<br>You are running version WordPress - %s, PHP - %s.<br>Please upgrade need module and try again.', 'aera' ), $GLOBALS['wp_version'], PHP_VERSION );
			printf( '<div class="notice-warning notice"><p><strong>%s</strong></p></div>', $message );
		}
	}
	add_action( 'admin_notices', 'aera_requirements_notice' );
}


/**
 * Add backend styles for Gutenberg.
 */

if ( ! function_exists( 'aera_add_gutenberg_assets' ) ) {
	function aera_add_gutenberg_assets() {

        wp_enqueue_style( 'aera-fonts', aera_fonts_url(), array(), null );
        wp_enqueue_style( 'aera-gutenberg', AERA_T_URI . '/assets/css/gutenberg.css' );

	}
}

/**
 * Search popup
 */

if ( ! function_exists( 'aera_search_popup' ) ) {
	function aera_search_popup() { ?>
        <div class="aera-header--search" id="search-box-<?php echo esc_attr( rand() ); ?>">
            <div class="aera-header--search__form-container">
                <form role="search" method="get" class="aera-header--search__form"
                      action="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <div class="input-group">
                        <input type="search" value="<?php echo get_search_query() ?>" name="s"
                               class="search-field"
                               placeholder="<?php esc_attr_e( 'Search..', 'aera' ); ?>"
                               required>
                        <button><i class="ion-ios-search-strong open-search"></i></button>
                    </div>
                </form>
            </div>
        </div>
	<?php }
}