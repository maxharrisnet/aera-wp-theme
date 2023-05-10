<?php
/*
 * Single post
 */
    $get_id = get_the_ID();
    $post_date = get_post_meta($get_id, 'aera_blog_detail_date', true);
    $post_content = get_post_meta($get_id, 'aera_blog_detail_content', true);

    $post_author_id = get_post_meta($get_id, 'aera_blog_detail_author', true);
    $post_author_img = get_post_meta($post_author_id, 'aera_author_image', true);
    $post_author_name = get_post_meta($post_author_id, 'aera_author_name', true);
    $post_author_position = get_post_meta($post_author_id, 'aera_author_position', true);

    $post_second_author_id = get_post_meta($get_id, 'aera_blog_detail_author_second', true);
    $post_second_author_img = get_post_meta($post_second_author_id, 'aera_author_image', true);
    $post_second_author_name = get_post_meta($post_second_author_id, 'aera_author_name', true);
    $post_second_author_position = get_post_meta($post_second_author_id, 'aera_author_position', true);

    $post_third_author_id = get_post_meta($get_id, 'aera_blog_detail_author_third', true);
    $post_third_author_img = get_post_meta($post_third_author_id, 'aera_author_image', true);
    $post_third_author_name = get_post_meta($post_third_author_id, 'aera_author_name', true);
    $post_third_author_position = get_post_meta($post_third_author_id, 'aera_author_position', true);

    $show_shedule_demo_section = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_hide');
    $shedule_demo_section_title = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_title');
    $shedule_demo_section_btn_text = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_btn_text');
    $shedule_demo_section_btn_url = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_btn_url');

    $post_ann_page_url = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_ann_url');
    $post_videos_page_url = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_videos_url');
    $post_whitepapers_page_url = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_whitepapers_url');
    $post_ondemands_page_url = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_ondemands_url');
    $post_blogs_page_url = cmb2_get_option('aera_site_blog_options', 'aera_blog_sd_blogs_url');
?>

<div class="aera-blog--single">
    <div class="container">
        <div class="aera-blog--single__wrapper">
            <article class="aera-blog--single__post">
                <div class="aera-blog--single__post-header">
                    <?php if (!empty($post_date)) { ?>
						<p class="aera-blog--single__post-date"><?php echo esc_html_e($post_date); ?></p>
					<?php } else { ?>
						<p class="aera-blog--single__post-date"><?php echo get_the_date('Y-m-d'); ?></p>
					<?php } ?>
                    <h1 class="aera-blog--single__post-title"><?php the_title(); ?></h1>
                </div>
                <div class="aera-blog--single__post-content">
                    <?php if (has_post_thumbnail()) { ?>
                        <div class="aera-blog--single__post-thumbnail">
                            <?php
                                $image_url = get_the_post_thumbnail_url($get_id, 'full');
                                $image_id = get_post_thumbnail_id($get_id);
                                $image_alt = get_post_meta($image_id, '_wp_attachment_image_alt', true); 
                            ?>
                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($image_alt); ?>">
                        </div>
                    <?php } ?>
                    <?php if (!empty($post_content)) { ?>
                        <div class="aera-blog--single__post-text">
                            <?php echo wpautop($post_content); ?>
                        </div>
                    <?php } ?>
                </div>
            </article>
            <div class="aera-blog--single__sidebar">
                <div class="aera-blog--single__sidebar-author">
                    <?php if (!empty($post_author_name)) { ?>
                        <div class="aera-blog--single__sidebar-author__block">
                            <?php if (!empty($post_author_img)) { ?>
                                <div class="aera-blog--single__sidebar-author__img">
                                    <img src="<?php echo esc_url($post_author_img); ?>" alt="<?php echo esc_html__($post_author_name); ?>">
                                </div>
                            <?php } ?>
                            <p class="aera-blog--single__sidebar-author__name"><?php echo esc_html__($post_author_name); ?></p>
                            <?php if (!empty($post_author_position)) { ?>
                                <p class="aera-blog--single__sidebar-author__position"><?php echo esc_html__($post_author_position); ?></p>
                            <?php } ?>
                        </div>
                    <?php } ?>
                    <?php if (!empty($post_second_author_name)) { ?>
                        <div class="aera-blog--single__sidebar-author__block">
                            <?php if (!empty($post_second_author_img)) { ?>
                                <div class="aera-blog--single__sidebar-author__img">
                                    <img src="<?php echo esc_url($post_second_author_img); ?>" alt="<?php echo esc_html__($post_second_author_name); ?>">
                                </div>
                            <?php } ?>
                            <p class="aera-blog--single__sidebar-author__name"><?php echo esc_html__($post_second_author_name); ?></p>
                            <?php if (!empty($post_second_author_position)) { ?>
                                <p class="aera-blog--single__sidebar-author__position"><?php echo esc_html__($post_second_author_position); ?></p>
                            <?php } ?>
                        </div>
                    <?php } ?>
                    <?php if (!empty($post_third_author_name)) { ?>
                        <div class="aera-blog--single__sidebar-author__block">
                            <?php if (!empty($post_third_author_img)) { ?>
                                <div class="aera-blog--single__sidebar-author__img">
                                    <img src="<?php echo esc_url($post_third_author_img); ?>" alt="<?php echo esc_html__($post_third_author_name); ?>">
                                </div>
                            <?php } ?>
                            <p class="aera-blog--single__sidebar-author__name"><?php echo esc_html__($post_third_author_name); ?></p>
                            <?php if (!empty($post_third_author_position)) { ?>
                                <p class="aera-blog--single__sidebar-author__position"><?php echo esc_html__($post_third_author_position); ?></p>
                            <?php } ?>
                        </div>
                    <?php } ?>
                </div>
                <div class="aera-blog--single__sidebar-share">
                    <p class="aera-blog--single__sidebar-share__text large-text"><?php echo esc_html__('Share This'); ?></p>
                    <div class="aera-blog--single__sidebar-share__social facebook">
                        <a href="https://www.facebook.com/sharer.php?u=<?php esc_url(the_permalink()); ?>" target="_blank" title="Share to Facebook">
                            <svg viewBox="0 0 64 64" width="32" height="32">
                                <circle cx="32" cy="32" r="31" fill="#3b5998"></circle>
                                <path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="aera-blog--single__sidebar-share__social twitter">
                        <a href="https://twitter.com/share?url=<?php esc_url(the_permalink()); ?>" target="_blank" title="Share to Twitter">
                            <svg viewBox="0 0 64 64" width="32" height="32">
                                <circle cx="32" cy="32" r="31" fill="#00aced"></circle>
                                <path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z" fill="white"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="aera-blog--single__sidebar-share__social linkedin">
                        <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php esc_url(the_permalink()); ?>" target="_blank" title="Share to LinkedIn">
                            <svg viewBox="0 0 64 64" width="32" height="32">
                                <circle cx="32" cy="32" r="31" fill="#007fb1"></circle>
                                <path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z" fill="white"></path>
                            </svg>
                        </a>
                    </div>
                    <div class="aera-blog--single__sidebar-share__social email">
                        <a href="mailto:?subject=<?php echo esc_attr(urlencode(the_title('', ' ', false))); ?>&amp;body=<?php esc_url(the_permalink()); ?>" target="_blank" title="Share to Email">
                            <svg viewBox="0 0 64 64" width="32" height="32">
                                <circle cx="32" cy="32" r="31" fill="#7f7f7f"></circle>
                                <path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z" fill="white"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="aera-blog--single__sidebar-posts">
                    <p class="aera-blog--single__sidebar-posts__title large-text"><?php echo esc_html__('Recent Articles'); ?></p>
                    <div class="aera-blog--single__sidebar-posts__wrapper">
                        <?php 
                            $args = array(
                                'post_type' => 'post',
                                'posts_per_page' => 5,
                            );
                            $posts = get_posts($args); 

                        foreach ($posts as $post) {
                            $recent_post_id = $post->ID;
                            $recent_post_author_id = get_post_meta($recent_post_id, 'aera_blog_detail_author', true);
                            $recent_post_author_name = get_post_meta($recent_post_author_id, 'aera_author_name', true);
                            $recent_post_image = get_post_meta($recent_post_id, 'aera_blog_detail_bg_image', true);
                        ?>
                            <div class="aera-blog--single__sidebar-post">
                                <a class="aera-blog--single__sidebar-post__wrapper" href="<?php the_permalink($recent_post_id); ?>">
                                    <?php if (!empty($recent_post_image)) { ?>
                                        <img src="<?php echo esc_url($recent_post_image); ?>" alt="<?php echo the_title(); ?>">
                                    <?php } ?>
                                    <?php if (!empty($recent_post_author_name)) { ?>
                                        <p class="aera-blog--single__sidebar-post__author"><?php echo esc_html__($recent_post_author_name); ?></p>
                                    <?php } ?>
                                    <p class="aera-blog--single__sidebar-post__title small-text"><?php the_title(); ?></p>
                                </a>
                            </div>
                        <?php } ?>
                    </div>
                </div>
                <div class="aera-blog--single__sidebar-categories">
                    <p class="aera-blog--single__sidebar-categories__title large-text"><?php echo esc_html__('Other Resources'); ?></p>
                    <ul class="aera-blog--single__sidebar-categories__items">
                        <?php if (!empty($post_ann_page_url)) { ?>
                            <li><a class="text" href="<?php echo esc_url($post_ann_page_url); ?>"><?php echo esc_html__('Announcements'); ?></a></li>
                        <?php } ?>
                        <?php if (!empty($post_videos_page_url)) { ?>
                            <li><a class="text" href="<?php echo esc_url($post_videos_page_url); ?>"><?php echo esc_html__('Videos'); ?></a></li>
                        <?php } ?>
                        <?php if (!empty($post_whitepapers_page_url)) { ?>
                            <li><a class="text" href="<?php echo esc_url($post_whitepapers_page_url); ?>"><?php echo esc_html__('Whitepapers'); ?></a></li>
                        <?php } ?>
                        <?php if (!empty($post_ondemands_page_url)) { ?>
                            <li><a class="text" href="<?php echo esc_url($post_ondemands_page_url); ?>"><?php echo esc_html__('On-Demand'); ?></a></li>
                        <?php } ?>
                        <?php if (!empty($post_blogs_page_url)) { ?>
                            <li><a class="text" href="<?php echo esc_url($post_blogs_page_url); ?>"><?php echo esc_html__('Blogs'); ?></a></li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    
        <?php if (empty($show_shedule_demo_section)) { ?>
            <?php if (!empty($shedule_demo_section_title)) { ?>
                <div class="aera-blog--single__demo">
                    <h2 class="aera-blog--single__demo-title"><?php echo esc_html($shedule_demo_section_title); ?></h2>
                    <?php if (!empty($shedule_demo_section_btn_text) && !empty($shedule_demo_section_btn_url)) { ?>
                        <a class="aera-blog--single__demo-btn btn" href="<?php echo esc_html($shedule_demo_section_btn_url); ?>">
                            <?php echo esc_html($shedule_demo_section_btn_text); ?>
                        </a>
                    <?php } ?>
                </div>
            <?php } ?>
        <?php } ?>
    </div>
</div>