<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Aera_Technology
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'aera'); ?></a>

	<header class="header" id="masthead" data-header>
		<div class="header__container">
			<div class="header__content">
				<div class="header__bar" id="logo">
					<a class="header__logo" href="<?php echo esc_url(home_url('/')); ?>" rel="home" aria-label="<?php esc_attr_e('Aera Technology', 'aera'); ?>">
						<?php
						$logo = get_theme_mod('custom_logo');
						$logo_src = $logo ? wp_get_attachment_image_url($logo, 'full') : get_template_directory_uri() . '/assets/images/aera-logo.svg';
						?>
						<img src="<?php echo esc_url($logo_src); ?>" class="header__logoImage" alt="<?php bloginfo('name'); ?>" loading="lazy" width="160" height="36" />
					</a>
					<button class="header__toggle" type="button" data-nav-toggle aria-controls="primary-navigation" aria-expanded="false">
						<span class="header__toggleLine"></span>
						<span class="header__toggleLine"></span>
						<span class="header__toggleLine"></span>
						<span class="screen-reader-text"><?php esc_html_e('Toggle navigation', 'aera'); ?></span>
					</button>
				</div>

				<div class="header__demo" id="meetAera-desktop">
					<?php
					if (has_nav_menu('primary-utility')) {
						wp_nav_menu(
							array(
								'theme_location' => 'primary-utility',
								'container'      => false,
								'menu_class'     => 'header__utility',
								'depth'          => 1,
								'fallback_cb'    => false,
							)
						);
					} else {
						?>
						<a class="button button--outline" href="<?php echo esc_url(home_url('/demo')); ?>">
							<?php esc_html_e('Schedule Demo', 'aera'); ?>
						</a>
						<?php
					}
					?>
				</div>
			</div>
		</div>

		<div class="header__overlay" data-nav-overlay></div>
		<nav class="header__navigation" aria-label="<?php esc_attr_e('Primary navigation', 'aera'); ?>" data-nav-panel>
			<div class="header__navBackground" aria-hidden="true">
				<svg class="header__backgroundSvg" x="0" y="0" width="100%" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none">
					<path class="header__backgroundPath" fill="#f7f9fa" d="M100,0C100,0,0,118,0,249c0,146,34,150,65,249c33.7,107.8,35,85,35,278c0,87.1,0,224,0,224l0,0V0L100,0z" />
				</svg>
			</div>

			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-navigation',
					'container'      => false,
					'menu_class'     => 'navigation__list',
					'depth'          => 2,
					'fallback_cb'    => '__return_false',
				)
			);
			?>

			<div class="header__social">
				<?php
				if (has_nav_menu('primary-utility')) {
					wp_nav_menu(
						array(
							'theme_location' => 'primary-utility',
							'container'      => false,
							'menu_class'     => 'header__utility header__utility--mobile',
							'depth'          => 1,
							'fallback_cb'    => false,
						)
					);
				}
				?>
			</div>
		</nav>
	</header>
