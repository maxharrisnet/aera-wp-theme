<?php

require_once ABSPATH . 'wp-admin/includes/plugin.php';

/**
 * Create custom html structure for comments
 */
if ( !function_exists('aera_comment') ) {
	function aera_comment($comment, $args, $depth) {

		$GLOBALS['comment'] = $comment;

		switch ( $comment->comment_type ):
			case 'pingback':
			case 'trackback': ?>
                <div class="pinback">
                <span class="pin-title"><?php esc_html_e('Pingback: ', 'aera'); ?></span><?php comment_author_link(); ?>
				<?php edit_comment_link(esc_html__('(Edit)', 'aera'), '<span class="edit-link">', '</span>'); ?>

				<?php
				break;
			default:
				// generate comments
				?>
            <div <?php comment_class('aera-blog--single__comments-item'); ?> id="li-comment-<?php comment_ID(); ?>">
                <div id="comment-<?php comment_ID(); ?>" class="aera-blog--single__comments-item-wrap">
                    <div class="aera-blog--single__comments-content">
                        <span class="person-img">
							<?php echo get_avatar($comment, '80', '', '', array('class' => 'img-person')); ?>
                        </span>
                        <div class="comment-content">
                            <div class="author-wrap">
                                <div class="author">
									<?php comment_author(); ?>
                                </div>
								<?php comment_reply_link(
									array_merge($args,
										array(
											'reply_text' => esc_html__('Reply', 'aera'),
											'after'      => '',
											'depth'      => $depth,
											'max_depth'  => $args['max_depth']
										)
									)
								); ?>
                            </div>
                            <div class="comment-date">
								<?php comment_date(get_option('date_format')); ?>
                            </div>

                            <div class="comment-text">
								<?php comment_text(); ?>
                            </div>

                        </div>
                    </div>
                </div>
				<?php
				break;
		endswitch;
	}
}


/**
 * Filter for excerpt more string
 */

if ( !function_exists('aera_excerpt_more') ) {
	function aera_excerpt_more() {
		return ' ...';
	}

	add_filter('excerpt_more', 'aera_excerpt_more');
}

// AJAX Resources
if (!function_exists('aera_jobs_ajax')) {
	function aera_jobs_ajax()
	{
		$cpt = $_POST['cpt'];
		if ($cpt === 'any') {
			$cpt = ['announcements', 'videos', 'whitepapers', 'on_demand', 'post'];
		}

		$args = array(
				'post_type' => $cpt,
				'posts_per_page' => -1,
				'post_status' => 'publish'
		);
		$posts = new WP_Query($args);

		$content = '';
			if ($posts->have_posts()) {
				while ($posts->have_posts()) :
					$posts->the_post();
					$post_id = get_the_ID();
					$post_post_types = get_post_type($post_id);

					if ($post_post_types === 'announcements') {
						$ann_post_external_url = get_post_meta(get_the_ID(), 'aera_announcements_detail_external_url', true);
						$ann_post_image = get_post_meta(get_the_ID(), 'aera_announcements_detail_bg_image', true);
						$ann_post_bg_image = isset($ann_post_image) && !empty($ann_post_image) ? 'style="background-image: url(' . esc_url($ann_post_image) . ')"' : ''; 
						$ann_post_description = get_post_meta(get_the_ID(), 'aera_announcements_detail_small_description', true);
						$ann_post_date = get_post_meta(get_the_ID(), 'aera_announcements_detail_date', true);
						$ann_post_order_value = get_post_meta(get_the_ID(), 'aera_announcements_detail_order', true);
						$ann_post_order = '';
	
						if (!empty($ann_post_order_value)) {
							$ann_post_order = 'order: ' . esc_html($ann_post_order_value) . ';';
						}

						if (empty($ann_post_external_url)) {
							$content .='<div class="aera-all-resources__item-wrapper announcements" style="' . $ann_post_order .' ">';
								$content .='<div class="aera-all-resources__item">';
									$content .='<div class="aera-all-resources__item-top">';
										$content .='<a class="aera-all-resources__item-top__bg" href="' . get_the_permalink() . '"  ' . $ann_post_bg_image . '></a>';
									$content .='</div>';
									$content .='<a class="aera-all-resources__item-bottom" href="' . get_the_permalink() . '">';
										$content .='<div class="aera-all-resources__item-bottom__banner">';
											$content .='<div class="aera-all-resources__item-bottom__banner-text">' . esc_html__('Announcements', 'aera') .'</div>';
										$content .='</div>';
										$content .='<div class="aera-all-resources__item-bottom__content">';
											$content .='<div class="aera-all-resources__item-bottom__content-wrapper">';
												$content .='<h4 class="aera-all-resources__item-bottom__content-name">' . get_the_title() . '</h4>';
												if (!empty($ann_post_description)) {
													$content .='<p class="aera-all-resources__item-bottom__content-description small-text">' . esc_html__($ann_post_description) . '</p>';
												}
											$content .='</div>';
										$content .='</div>';

										$content .='<div class="aera-all-resources__item-bottom__register">';
											$content .='<div class="aera-all-resources__item-bottom__register-wrapper">';
												if (!empty($ann_post_date)) {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . esc_html__($ann_post_date) . '</div>';
												} else {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . get_the_date('Y-m-d') . '</div>';
												}
												$content .='<div class="aera-all-resources__item-bottom__register-line"></div>';
											$content .='</div>';
										$content .='</div>';
									$content .='</a>';
								$content .='</div>';
							$content .='</div>';
						} else {
							$content .='<div class="aera-all-resources__item-wrapper announcements" style="' . $ann_post_order .' ">';
								$content .='<div class="aera-all-resources__item">';
									$content .='<div class="aera-all-resources__item-top">';
										$content .='<a class="aera-all-resources__item-top__bg" href="' . esc_url($ann_post_external_url) . '" target="_blank" rel="noreferrer noopener" ' . $ann_post_bg_image . '></a>';
									$content .='</div>';
									$content .='<a class="aera-all-resources__item-bottom" href="' . esc_url($ann_post_external_url) . '" target="_blank" rel="noreferrer noopener">';
										$content .='<div class="aera-all-resources__item-bottom__banner">';
											$content .='<div class="aera-all-resources__item-bottom__banner-text">' . esc_html__('Announcements', 'aera') .'</div>';
										$content .='</div>';
										$content .='<div class="aera-all-resources__item-bottom__content">';
											$content .='<div class="aera-all-resources__item-bottom__content-wrapper">';
												$content .='<h4 class="aera-all-resources__item-bottom__content-name">' . get_the_title() . '</h4>';
												if (!empty($ann_post_description)) {
													$content .='<p class="aera-all-resources__item-bottom__content-description small-text">' . esc_html__($ann_post_description) . '</p>';
												}
											$content .='</div>';
										$content .='</div>';

										$content .='<div class="aera-all-resources__item-bottom__register">';
											$content .='<div class="aera-all-resources__item-bottom__register-wrapper">';
												if (!empty($ann_post_date)) {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . esc_html__($ann_post_date) . '</div>';
												} else {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . get_the_date('Y-m-d') . '</div>';
												}
												$content .='<div class="aera-all-resources__item-bottom__register-line"></div>';
											$content .='</div>';
										$content .='</div>';
									$content .='</a>';
								$content .='</div>';
							$content .='</div>';
						}
					}

					if ($post_post_types === 'videos') {
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
						
						if (!empty($video_post_url)) {
							$content .='<div class="aera-all-resources__item-wrapper videos" style="' . $video_post_order .' ">';
								$content .='<div class="aera-all-resources__item">';
									$content .='<div class="aera-all-resources__item-top">';
										$content .='<a class="aera-all-resources__item-top__bg aera--video-popup" href="' . $video_post_url . '"  ' . $video_post_bg_image . '></a>';
									$content .='</div>';
									$content .='<a class="aera-all-resources__item-bottom aera--video-popup" href="' . $video_post_url . '">';
										$content .='<div class="aera-all-resources__item-bottom__banner">';
											$content .='<div class="aera-all-resources__item-bottom__banner-text">' . esc_html__('Video', 'aera') .'</div>';
										$content .='</div>';
										$content .='<div class="aera-all-resources__item-bottom__content">';
											$content .='<div class="aera-all-resources__item-bottom__content-wrapper">';
												$content .='<h4 class="aera-all-resources__item-bottom__content-name">' . get_the_title() . '</h4>';
												if (!empty($video_post_description)) {
													$content .='<p class="aera-all-resources__item-bottom__content-description small-text">' . esc_html__($video_post_description) . '</p>';
												}
											$content .='</div>';
										$content .='</div>';

										$content .='<div class="aera-all-resources__item-bottom__register">';
											$content .='<div class="aera-all-resources__item-bottom__register-wrapper">';
												if (!empty($video_post_date)) {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . esc_html__($video_post_date) . '</div>';
												} else {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . get_the_date('Y-m-d') . '</div>';
												}
												$content .='<div class="aera-all-resources__item-bottom__register-line"></div>';
											$content .='</div>';
										$content .='</div>';
									$content .='</a>';
								$content .='</div>';
							$content .='</div>';
						}
					}

					if ($post_post_types === 'whitepapers') {
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
						
						if (!empty($whitepaper_post_url)) {
							$content .='<div class="aera-all-resources__item-wrapper whitepapers" style="' . $whitepaper_post_order .' ">';
								$content .='<div class="aera-all-resources__item">';
									$content .='<div class="aera-all-resources__item-top">';
										$content .='<a class="aera-all-resources__item-top__bg" href="' . $whitepaper_post_url . '"  ' . $whitepaper_post_bg_image . ' target="_blank"></a>';
									$content .='</div>';
									$content .='<a class="aera-all-resources__item-bottom" href="' . $whitepaper_post_url . '" target="_blank">';
										$content .='<div class="aera-all-resources__item-bottom__banner">';
											$content .='<div class="aera-all-resources__item-bottom__banner-text">' . esc_html__('Whitepaper', 'aera') .'</div>';
										$content .='</div>';
										$content .='<div class="aera-all-resources__item-bottom__content">';
											$content .='<div class="aera-all-resources__item-bottom__content-wrapper">';
												$content .='<h4 class="aera-all-resources__item-bottom__content-name">' . get_the_title() . '</h4>';
												if (!empty($whitepaper_post_description)) {
													$content .='<p class="aera-all-resources__item-bottom__content-description small-text">' . esc_html__($whitepaper_post_description) . '</p>';
												}
											$content .='</div>';
										$content .='</div>';

										$content .='<div class="aera-all-resources__item-bottom__register">';
											$content .='<div class="aera-all-resources__item-bottom__register-wrapper">';
												if (!empty($whitepaper_post_date)) {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . esc_html__($whitepaper_post_date) . '</div>';
												} else {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . get_the_date('Y-m-d') . '</div>';
												}
												$content .='<div class="aera-all-resources__item-bottom__register-line"></div>';
											$content .='</div>';
										$content .='</div>';
									$content .='</a>';
								$content .='</div>';
							$content .='</div>';
						}
					}

					if ($post_post_types === 'on_demand') {
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
						
						if (!empty($ondemand_post_url)) {
							$content .='<div class="aera-all-resources__item-wrapper whitepapers" style="' . $ondemand_post_order .' ">';
								$content .='<div class="aera-all-resources__item">';
									$content .='<div class="aera-all-resources__item-top">';
										$content .='<a class="aera-all-resources__item-top__bg" href="' . $ondemand_post_url . '"  ' . $ondemand_post_bg_image . ' target="_blank"></a>';
									$content .='</div>';
									$content .='<a class="aera-all-resources__item-bottom" href="' . $ondemand_post_url . '" target="_blank">';
										$content .='<div class="aera-all-resources__item-bottom__banner">';
											$content .='<div class="aera-all-resources__item-bottom__banner-text">' . esc_html__('On-Demand', 'aera') .'</div>';
										$content .='</div>';
										$content .='<div class="aera-all-resources__item-bottom__content">';
											$content .='<div class="aera-all-resources__item-bottom__content-wrapper">';
												$content .='<h4 class="aera-all-resources__item-bottom__content-name">' . get_the_title() . '</h4>';
												if (!empty($ondemand_post_description)) {
													$content .='<p class="aera-all-resources__item-bottom__content-description small-text">' . esc_html__($ondemand_post_description) . '</p>';
												}
											$content .='</div>';
										$content .='</div>';

										$content .='<div class="aera-all-resources__item-bottom__register">';
											$content .='<div class="aera-all-resources__item-bottom__register-wrapper">';
												if (!empty($ondemand_post_date)) {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . esc_html__($ondemand_post_date) . '</div>';
												} else {
													$content .='<div class="aera-all-resources__item-bottom__register-date">' . get_the_date('Y-m-d') . '</div>';
												}
												$content .='<div class="aera-all-resources__item-bottom__register-line"></div>';
												$content .='<div class="aera-all-resources__item-bottom__register-button">';
													$content .='<span>' . esc_html__('Register', 'aera') .'</span>';
												$content .='</div>';
											$content .='</div>';
										$content .='</div>';
									$content .='</a>';
								$content .='</div>';
							$content .='</div>';
						}
					}

					if ($post_post_types === 'post') {
						$post_post_image = get_post_meta(get_the_ID(), 'aera_blog_detail_bg_image', true);
						$post_post_bg_image = isset($post_post_image) && !empty($post_post_image) ? 'style="background-image: url(' . esc_url($post_post_image) . ')"' : ''; 
						$post_post_description = get_post_meta(get_the_ID(), 'aera_blog_detail_small_description', true);
						$post_post_date = get_post_meta(get_the_ID(), 'aera_blog_detail_date', true);
						$post_post_order_value = get_post_meta(get_the_ID(), 'aera_blog_detail_order', true);
						$post_post_order = '';
	
						if (!empty($post_post_order_value)) {
							$post_post_order = 'order: ' . esc_html($post_post_order_value) . ';';
						}
						
						$content .='<div class="aera-all-resources__item-wrapper whitepapers" style="' . $post_post_order .' ">';
							$content .='<div class="aera-all-resources__item">';
								$content .='<div class="aera-all-resources__item-top">';
									$content .='<a class="aera-all-resources__item-top__bg" href="' . get_the_permalink() . '"  ' . $post_post_bg_image . '></a>';
								$content .='</div>';
								$content .='<a class="aera-all-resources__item-bottom" href="' . get_the_permalink() . '">';
									$content .='<div class="aera-all-resources__item-bottom__banner">';
										$content .='<div class="aera-all-resources__item-bottom__banner-text">' . esc_html__('Blogs', 'aera') .'</div>';
									$content .='</div>';
									$content .='<div class="aera-all-resources__item-bottom__content">';
										$content .='<div class="aera-all-resources__item-bottom__content-wrapper">';
											$content .='<h4 class="aera-all-resources__item-bottom__content-name">' . get_the_title() . '</h4>';
											if (!empty($post_post_description)) {
												$content .='<p class="aera-all-resources__item-bottom__content-description small-text">' . esc_html__($post_post_description) . '</p>';
											}
										$content .='</div>';
									$content .='</div>';
									$content .='<div class="aera-all-resources__item-bottom__register">';
										$content .='<div class="aera-all-resources__item-bottom__register-wrapper">';
											if (!empty($post_post_date)) {
												$content .='<div class="aera-all-resources__item-bottom__register-date">' . esc_html__($post_post_date) . '</div>';
											} else {
												$content .='<div class="aera-all-resources__item-bottom__register-date">' . get_the_date('Y-m-d') . '</div>';
											}
											$content .='<div class="aera-all-resources__item-bottom__register-line"></div>';
										$content .='</div>';
									$content .='</div>';
								$content .='</a>';
							$content .='</div>';
						$content .='</div>';
					}

				endwhile;
			} else {
				$content .='<h4 class="aera-all-resources__items-nopost">' . esc_html__('Sorry, no posts matched your criteria.', 'aera') . '</h4>';
			}

		wp_reset_postdata();

		echo $content;

		die();
	}

	add_action('wp_ajax_nopriv_aera_jobs_ajax', 'aera_jobs_ajax');
	add_action('wp_ajax_aera_jobs_ajax', 'aera_jobs_ajax');
}

// Remove defalut Post params (editor, category, tags, format)
add_action('init', 'my_rem_editor_from_post_type');
function my_rem_editor_from_post_type() {
  remove_post_type_support( 'post', 'editor' );
	unregister_taxonomy_for_object_type('post_tag', 'post');
	unregister_taxonomy_for_object_type('category', 'post');
	remove_theme_support('post-formats');
}