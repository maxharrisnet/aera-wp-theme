<?php
//BLOG LIST CATEGORY

global $wp_query;

$content_size_class = is_active_sidebar( 'aera-sidebar' ) ? 'col-12 col-lg-8' : 'col-12';
$post_size_class    = is_active_sidebar( 'aera-sidebar' ) ? 6 : 4;
$aera_blog_title_text        =  is_archive() || is_category() ? '' : get_the_title(); ?>

<div class="aera-blog--wrapper grid-sidebar">

	<?php if(!empty($aera_blog_title_text) ){ ?>
        <div class="container aera-blog--top-wrap">
            <div class="row">
                <div class="col-12">
					<?php if(!empty($aera_blog_title_text)){ ?>
                        <h1 class="aera-blog--top-title"><?php echo esc_html($aera_blog_title_text); ?></h1>
					<?php } ?>
                </div>
            </div>
        </div>
	<?php } ?>

    <div class="container">
        <div class="row">
            <div class="aera-blog--posts <?php echo esc_attr( $content_size_class ); ?>">
                <div class="aera-blog--isotope row">
					<?php while ( have_posts() ) :
						the_post();

						$post_id   = get_the_ID();
						$no_image  = ! has_post_thumbnail() ? ' no-image' : '';
						$image_id  = get_post_thumbnail_id( $post_id );
						$author_id = get_the_author_meta( 'ID' ); ?>

                        <div <?php post_class( 'aera-blog--post col-12 col-sm-6 col-md-' . $post_size_class ); ?>>
                            <div class="aera-blog--post-wrap">
								<?php if ( ! empty( $image_id ) ) {
									$image     = wp_get_attachment_image_url( $image_id, 'large' );
									$image_alt = get_post_meta( $image_id, '_wp_attachment_image_alt', true ); ?>
                                    <div class="aera-blog--post__media">
                                        <img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>">
                                    </div>
								<?php } ?>

                                <div class="aera-blog--post__info-wrap">

                                    <div class="aera-blog--post-header">

                                        <div class="aera-blog--post__categories">
                                            <b><?php the_category( ' '); ?></b>
                                        </div>

                                        <div class="aera-blog--post__time">
                                           <span>
                                               <b>
                                                   <i class="ion-clock"></i>
                                                   <?php echo aera_reading_time($post_id); ?>
                                               </b>
                                           </span>
                                        </div>

                                    </div>

									<?php if(!empty(get_the_title())){ ?>
                                        <div class="aera-blog--post__title-wrap">
                                            <h3>
                                                <a href="<?php the_permalink(); ?>" class="aera-blog--post__title">
                                                    <?php the_title(); ?>
                                                </a>
                                            </h3>
                                        </div>
									<?php } ?>
                                    <div class="aera-blog--post__author">

                                        <div class="aera-blog--post__author-info">
                                            <?php echo get_avatar( $author_id, 30 ); ?>
                                            <div class="aera-blog--post__author-name">
                                                <b><?php echo esc_html( get_the_author() ); ?></b>
                                            </div>
                                        </div>

                                        <a href="<?php the_permalink(); ?>">
											<?php echo sprintf( esc_html__( '%s ago', 'aera' ), human_time_diff( get_the_time( 'U' ), current_time( 'timestamp' ) ) ); ?>
                                        </a>
                                    </div>
                                    <div class="aera-blog--post__text"><?php the_excerpt(); ?></div>

                                    <div class="aera-blog--post__footer">
                                        <div class="aera-blog--post__link">
                                            <a href="<?php the_permalink(); ?>" class="aheto-link aheto-btn--dark aheto-btn--no-underline"><?php esc_html_e('Continue Reading', 'aera'); ?></a>
                                        </div>
                                        <div class="aera-blog--post__comments"><b><i class="ion-ios-chatbubble-outline"></i><?php echo get_comments_number($post_id); ?></b></div>
                                    </div>

                                </div>
                            </div>

                        </div>

					<?php endwhile;
					wp_reset_postdata(); ?>
                </div>
				<?php if ( $wp_query->max_num_pages > 1 ) { ?>
                    <div class="aera-blog--pagination">
						<?php echo paginate_links(
							array(
								'prev_text' => __( 'Previous', 'aera' ),
								'next_text' => __( 'Next', 'aera' ),
								'total'     => $wp_query->max_num_pages
							)
						); ?>
                    </div>
				<?php } ?>
            </div>
			<?php if ( is_active_sidebar( 'aera-sidebar' ) ) {
				get_sidebar( 'aera-sidebar' );
			} ?>
        </div>
    </div>
</div>