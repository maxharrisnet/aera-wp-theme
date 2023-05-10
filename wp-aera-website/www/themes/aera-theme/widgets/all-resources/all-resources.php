<?php
namespace Elementor;

class Aera_All_Resources extends Widget_Base {

	public function get_name() {
		return 'aera-all-resources';
	}

	public function get_title() {
		return 'Aera All Resources';
	}

	public function get_icon() {
		return 'dashicons dashicons-star-filled';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-all-resources', AERA_T_URI . '/widgets/all-resources/assets/css/all-resources.css' );
		wp_register_style( 'aera-all-resources-magnific-css', AERA_T_URI . '/assets/css/lib/magnific-popup.min.css');
		wp_register_script( 'aera-all-resources-magnific-js', AERA_T_URI . '/assets/js/lib/magnific-popup-js.min.js', [], '1.0.0', true );
		wp_register_script( 'aera-all-resources-js', AERA_T_URI . '/widgets/all-resources/assets/js/all-resources.min.js', [], '1.0.0', true );
		wp_localize_script( 'aera-all-resources-js', 'getresources',
			array(
				'ajaxurl' => admin_url( 'admin-ajax.php' ),
				'siteurl' => get_template_directory_uri(),
			)
		);
	}

	public function get_script_depends() {
		return [ 'aera-all-resources-magnific-js', 'aera-all-resources-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-all-resources', 'aera-all-resources-magnific-css' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		$cpt = isset($_GET['category']) && $_GET['category'] && $_GET['category'] !== 'any' ? $_GET['category'] : ['announcements', 'videos', 'whitepapers', 'on_demand', 'post'];

		$args = [
			'post_type' => $cpt,
			'posts_per_page' => -1,
		];

		$the_query = new \WP_Query($args);
	?> 
		<div class="aera-all-resources">
			<div class="preloader"></div>
			<div class="aera-all-resources__filters">
				<div class="aera-all-resources__filters-wrapper">
					<span class="active-filter" data-cpt="any"><?php echo esc_html_e('All Types'); ?></span>
					<span data-cpt="announcements"><?php echo esc_html_e('Announcements'); ?></span>
					<span data-cpt="videos"><?php echo esc_html_e('Videos'); ?></span>
					<span data-cpt="whitepapers"><?php echo esc_html_e('Whitepapers'); ?></span>
					<span data-cpt="on_demand"><?php echo esc_html_e('On-Demand'); ?></span>
					<span data-cpt="post"><?php echo esc_html_e('Blogs'); ?></span>
				</div>
			</div>
			<div class="aera-all-resources__items">
				<?php if ($the_query->have_posts()) { ?>
					<?php while ($the_query->have_posts()) :
						$the_query->the_post();
						$post_id = get_the_ID();
						$post_post_types = get_post_type($post_id);
					?>
						<?php if ($post_post_types === 'announcements') { ?>
							<?php
								$ann_post_image = get_post_meta(get_the_ID(), 'aera_announcements_detail_bg_image', true);
								$ann_post_bg_image = isset($ann_post_image) && !empty($ann_post_image) ? 'style="background-image: url(' . esc_url($ann_post_image) . ')"' : ''; 
								$ann_post_description = get_post_meta(get_the_ID(), 'aera_announcements_detail_small_description', true);
								$ann_post_date = get_post_meta(get_the_ID(), 'aera_announcements_detail_date', true);
								$ann_post_external_url = get_post_meta(get_the_ID(), 'aera_announcements_detail_external_url', true);
								$ann_post_order_value = get_post_meta(get_the_ID(), 'aera_announcements_detail_order', true);
								$ann_post_order = '';
			
								if (!empty($ann_post_order_value)) {
									$ann_post_order = 'order: ' . esc_html($ann_post_order_value) . ';';
								}
							?>

							<?php if (empty($ann_post_external_url)) { ?>
								<div class="aera-all-resources__item-wrapper announcements active-item" style="<?php echo $ann_post_order; ?>">
									<div class="aera-all-resources__item">
										<div class="aera-all-resources__item-top">
											<a class="aera-all-resources__item-top__bg" href="<?php the_permalink($post_id); ?>" <?php echo $ann_post_bg_image; ?>></a>
										</div>
										<a class="aera-all-resources__item-bottom" href="<?php the_permalink($post_id); ?>">
											<div class="aera-all-resources__item-bottom__banner">
												<div class="aera-all-resources__item-bottom__banner-text"><?php echo esc_html_e('Announcements'); ?></div>
											</div>
											<div class="aera-all-resources__item-bottom__content">
												<div class="aera-all-resources__item-bottom__content-wrapper">
													<h4 class="aera-all-resources__item-bottom__content-name"><?php the_title(); ?></h4>
													<?php if (!empty($ann_post_description)) { ?>
														<p class="aera-all-resources__item-bottom__content-description small-text"><?php echo esc_html_e($ann_post_description); ?></p>
													<?php } ?>
												</div>
											</div>
											<div class="aera-all-resources__item-bottom__register">
												<div class="aera-all-resources__item-bottom__register-wrapper">
													<?php if (!empty($ann_post_date)) { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo esc_html_e($ann_post_date); ?></div>
													<?php } else { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo get_the_date('Y-m-d'); ?></div>
													<?php } ?>
													<div class="aera-all-resources__item-bottom__register-line"></div>
												</div>
											</div>
										</a>
									</div>
								</div>
							<?php } else { ?>
								<div class="aera-all-resources__item-wrapper announcements active-item" style="<?php echo $ann_post_order; ?>">
									<div class="aera-all-resources__item">
										<div class="aera-all-resources__item-top">
											<a class="aera-all-resources__item-top__bg" href="<?php echo esc_url($ann_post_external_url); ?>" target="_blank" rel="noreferrer noopener" <?php echo $ann_post_bg_image; ?>></a>
										</div>
										<a class="aera-all-resources__item-bottom" href="<?php echo esc_url($ann_post_external_url); ?>" target="_blank" rel="noreferrer noopener">
											<div class="aera-all-resources__item-bottom__banner">
												<div class="aera-all-resources__item-bottom__banner-text"><?php echo esc_html_e('Announcements'); ?></div>
											</div>
											<div class="aera-all-resources__item-bottom__content">
												<div class="aera-all-resources__item-bottom__content-wrapper">
													<h4 class="aera-all-resources__item-bottom__content-name"><?php the_title(); ?></h4>
													<?php if (!empty($ann_post_description)) { ?>
														<p class="aera-all-resources__item-bottom__content-description small-text"><?php echo esc_html_e($ann_post_description); ?></p>
													<?php } ?>
												</div>
											</div>
											<div class="aera-all-resources__item-bottom__register">
												<div class="aera-all-resources__item-bottom__register-wrapper">
													<?php if (!empty($ann_post_date)) { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo esc_html_e($ann_post_date); ?></div>
													<?php } else { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo get_the_date('Y-m-d'); ?></div>
													<?php } ?>
													<div class="aera-all-resources__item-bottom__register-line"></div>
												</div>
											</div>
										</a>
									</div>
								</div>
							<?php } ?>
						<?php } ?>
						
						<?php if ($post_post_types === 'videos') { ?>
							<?php
								$video_post_url = get_post_meta(get_the_ID(), 'aera_videos_detail_video_url', true);
								$video_post_image = get_post_meta(get_the_ID(), 'aera_videos_detail_bg_image', true);
								$video_post_bg_image = isset($video_post_image) && !empty($video_post_image) ? 'style="background-image: url(' . esc_url($video_post_image) . ')"' : ''; 
								$video_post_description = get_post_meta(get_the_ID(), 'aera_videos_detail_small_description', true);
								$video_post_date = get_post_meta(get_the_ID(), 'aera_videos_detail_date', true);
								$video_post_order_value = get_post_meta(get_the_ID(), 'aera_videos_detail_order', true);
								$video_post_order = '';
			
								if (!empty($video_post_order_value)) {
									$video_post_order = 'order: ' . esc_html($video_post_order_value) . ';';
								}
							?>
							<?php if (!empty($video_post_url)) { ?>
								<div class="aera-all-resources__item-wrapper videos active-item" style="<?php echo $video_post_order; ?>">
									<div class="aera-all-resources__item">
										<div class="aera-all-resources__item-top">
											<a class="aera-all-resources__item-top__bg aera--video-popup" href="<?php echo esc_url($video_post_url); ?>" <?php echo $video_post_bg_image; ?>></a>
										</div>
										<a class="aera-all-resources__item-bottom aera--video-popup" href="<?php echo esc_url($video_post_url); ?>">
											<div class="aera-all-resources__item-bottom__banner">
												<div class="aera-all-resources__item-bottom__banner-text"><?php echo esc_html_e('Video'); ?></div>
											</div>
											<div class="aera-all-resources__item-bottom__content">
												<div class="aera-all-resources__item-bottom__content-wrapper">
													<h4 class="aera-all-resources__item-bottom__content-name"><?php the_title(); ?></h4>
													<?php if (!empty($video_post_description)) { ?>
														<p class="aera-all-resources__item-bottom__content-description small-text"><?php echo esc_html_e($video_post_description); ?></p>
													<?php } ?>
												</div>
											</div>
											<div class="aera-all-resources__item-bottom__register">
												<div class="aera-all-resources__item-bottom__register-wrapper">
													<?php if (!empty($video_post_date)) { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo esc_html_e($video_post_date); ?></div>
													<?php } else { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo get_the_date('Y-m-d'); ?></div>
													<?php } ?>
													<div class="aera-all-resources__item-bottom__register-line"></div>
												</div>
											</div>
										</a>
									</div>
								</div>
							<?php } ?>
						<?php } ?>

						<?php if ($post_post_types === 'whitepapers') { ?>
							<?php
								$whitepaper_post_url = get_post_meta(get_the_ID(), 'aera_whitepapers_detail_url', true);
								$whitepaper_post_image = get_post_meta(get_the_ID(), 'aera_whitepapers_detail_bg_image', true);
								$whitepaper_post_bg_image = isset($whitepaper_post_image) && !empty($whitepaper_post_image) ? 'style="background-image: url(' . esc_url($whitepaper_post_image) . ')"' : ''; 
								$whitepaper_post_description = get_post_meta(get_the_ID(), 'aera_whitepapers_detail_small_description', true);
								$whitepaper_post_date = get_post_meta(get_the_ID(), 'aera_whitepapers_detail_date', true);
								$whitepaper_post_order_value = get_post_meta(get_the_ID(), 'aera_whitepapers_detail_order', true);
								$whitepaper_post_order = '';
			
								if (!empty($whitepaper_post_order_value)) {
									$whitepaper_post_order = 'order: ' . esc_html($whitepaper_post_order_value) . ';';
								}
							?>
							<?php if (!empty($whitepaper_post_url)) { ?>
								<div class="aera-all-resources__item-wrapper whitepapers active-item" style="<?php echo $whitepaper_post_order; ?>">
									<div class="aera-all-resources__item">
										<div class="aera-all-resources__item-top">
											<a class="aera-all-resources__item-top__bg" href="<?php echo esc_url($whitepaper_post_url); ?>" target="_blank" <?php echo $whitepaper_post_bg_image; ?>></a>
										</div>
										<a class="aera-all-resources__item-bottom" href="<?php echo esc_url($whitepaper_post_url); ?>" target="_blank">
											<div class="aera-all-resources__item-bottom__banner">
												<div class="aera-all-resources__item-bottom__banner-text"><?php echo esc_html_e('Whitepaper'); ?></div>
											</div>
											<div class="aera-all-resources__item-bottom__content">
												<div class="aera-all-resources__item-bottom__content-wrapper">
													<h4 class="aera-all-resources__item-bottom__content-name"><?php the_title(); ?></h4>
													<?php if (!empty($whitepaper_post_description)) { ?>
														<p class="aera-all-resources__item-bottom__content-description small-text"><?php echo esc_html_e($whitepaper_post_description); ?></p>
													<?php } ?>
												</div>
											</div>
											<div class="aera-all-resources__item-bottom__register">
												<div class="aera-all-resources__item-bottom__register-wrapper">
													<?php if (!empty($whitepaper_post_date)) { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo esc_html_e($whitepaper_post_date); ?></div>
													<?php } else { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo get_the_date('Y-m-d'); ?></div>
													<?php } ?>
													<div class="aera-all-resources__item-bottom__register-line"></div>
												</div>
											</div>
										</a>
									</div>
								</div>
							<?php } ?>
						<?php } ?>

						<?php if ($post_post_types === 'on_demand') { ?>
							<?php
								$ondemand_post_url = get_post_meta(get_the_ID(), 'aera_ondemands_detail_url', true);
								$ondemand_post_image = get_post_meta(get_the_ID(), 'aera_ondemands_detail_bg_image', true);
								$ondemand_post_bg_image = isset($ondemand_post_image) && !empty($ondemand_post_image) ? 'style="background-image: url(' . esc_url($ondemand_post_image) . ')"' : ''; 
								$ondemand_post_description = get_post_meta(get_the_ID(), 'aera_ondemands_detail_small_description', true);
								$ondemand_post_date = get_post_meta(get_the_ID(), 'aera_ondemands_detail_date', true);
								$ondemand_post_order_value = get_post_meta(get_the_ID(), 'aera_ondemands_detail_order', true);
								$ondemand_post_order = '';
			
								if (!empty($ondemand_post_order_value)) {
									$ondemand_post_order = 'order: ' . esc_html($ondemand_post_order_value) . ';';
								}
							?>
							<?php if (!empty($ondemand_post_url)) { ?>
								<div class="aera-all-resources__item-wrapper ondemand active-item" style="<?php echo $ondemand_post_order; ?>">
									<div class="aera-all-resources__item">
										<div class="aera-all-resources__item-top">
											<a class="aera-all-resources__item-top__bg" href="<?php echo esc_url($ondemand_post_url); ?>" target="_blank" <?php echo $ondemand_post_bg_image; ?>></a>
										</div>
										<a class="aera-all-resources__item-bottom" href="<?php echo esc_url($ondemand_post_url); ?>" target="_blank">
											<div class="aera-all-resources__item-bottom__banner">
												<div class="aera-all-resources__item-bottom__banner-text"><?php echo esc_html_e('On-Demand'); ?></div>
											</div>
											<div class="aera-all-resources__item-bottom__content">
												<div class="aera-all-resources__item-bottom__content-wrapper">
													<h4 class="aera-all-resources__item-bottom__content-name"><?php the_title(); ?></h4>
													<?php if (!empty($ondemand_post_description)) { ?>
														<p class="aera-all-resources__item-bottom__content-description small-text"><?php echo esc_html_e($ondemand_post_description); ?></p>
													<?php } ?>
												</div>
											</div>
											<div class="aera-all-resources__item-bottom__register">
												<div class="aera-all-resources__item-bottom__register-wrapper">
													<?php if (!empty($ondemand_post_date)) { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo esc_html_e($ondemand_post_date); ?></div>
													<?php } else { ?>
														<div class="aera-all-resources__item-bottom__register-date"><?php echo get_the_date('Y-m-d'); ?></div>
													<?php } ?>
													<div class="aera-all-resources__item-bottom__register-line"></div>
													<div class="aera-all-resources__item-bottom__register-button">
														<span><?php echo esc_html_e('Register'); ?></span>
													</div>
												</div>
											</div>
										</a>
									</div>
								</div>
							<?php } ?>
						<?php } ?>

						<?php if ($post_post_types === 'post') { ?>
							<?php
								$post_post_image = get_post_meta(get_the_ID(), 'aera_blog_detail_bg_image', true);
								$post_post_bg_image = isset($post_post_image) && !empty($post_post_image) ? 'style="background-image: url(' . esc_url($post_post_image) . ')"' : ''; 
								$post_post_description = get_post_meta(get_the_ID(), 'aera_blog_detail_small_description', true);
								$post_post_date = get_post_meta(get_the_ID(), 'aera_blog_detail_date', true);
								$post_post_order_value = get_post_meta(get_the_ID(), 'aera_blog_detail_order', true);
								$post_post_order = '';
			
								if (!empty($post_post_order_value)) {
									$post_post_order = 'order: ' . esc_html($post_post_order_value) . ';';
								}
							?>
							<div class="aera-all-resources__item-wrapper blogs active-item" style="<?php echo $post_post_order; ?>">
								<div class="aera-all-resources__item">
									<div class="aera-all-resources__item-top">
										<a class="aera-all-resources__item-top__bg" href="<?php the_permalink($post_id); ?>" <?php echo $post_post_bg_image; ?>></a>
									</div>
									<a class="aera-all-resources__item-bottom" href="<?php the_permalink($post_id); ?>">
										<div class="aera-all-resources__item-bottom__banner">
											<div class="aera-all-resources__item-bottom__banner-text"><?php echo esc_html_e('Blogs'); ?></div>
										</div>
										<div class="aera-all-resources__item-bottom__content">
											<div class="aera-all-resources__item-bottom__content-wrapper">
												<h4 class="aera-all-resources__item-bottom__content-name"><?php the_title(); ?></h4>
												<?php if (!empty($post_post_description)) { ?>
													<p class="aera-all-resources__item-bottom__content-description small-text"><?php echo esc_html_e($post_post_description); ?></p>
												<?php } ?>
											</div>
										</div>
										<div class="aera-all-resources__item-bottom__register">
											<div class="aera-all-resources__item-bottom__register-wrapper">
												<?php if (!empty($post_post_date)) { ?>
													<div class="aera-all-resources__item-bottom__register-date"><?php echo esc_html_e($post_post_date); ?></div>
												<?php } else { ?>
													<div class="aera-all-resources__item-bottom__register-date"><?php echo get_the_date('Y-m-d'); ?></div>
												<?php } ?>
												<div class="aera-all-resources__item-bottom__register-line"></div>
											</div>
										</div>
									</a>
								</div>
							</div>
						<?php } ?>
					<?php endwhile; ?>
				<?php } else { ?>
					<h4 class="aera-all-resources__items-nopost"><?php echo esc_html_e('Sorry, no posts matched your criteria.') ;?></h4>
				<?php } ?>
			</div>
		</div>
	<?php
	}
}