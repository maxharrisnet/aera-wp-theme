<?php
namespace Elementor;

class Aera_Skills_Items extends Widget_Base {

	public function get_name() {
		return 'aera-skills-items';
	}

	public function get_title() {
		return 'Aera Skills Items';
	}

	public function get_icon() {
		return 'dashicons dashicons-block-default';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-skills-items', AERA_T_URI . '/widgets/skills-items/assets/css/skills-items.css' );
	}

	public function get_style_depends() {
		return [ 'aera-skills-items' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$args = [
			'post_type' => 'skills',
			'posts_per_page' => -1,
			'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
			'numberposts' => -1
		];
		$the_query = new \WP_Query($args);
	?>
		<div class="aera-skills-items">
			<div class="aera-skills-items__wrapper">
				<?php while ($the_query->have_posts()) :
					$the_query->the_post();
					$post_id = get_the_ID();
					$post_image = get_post_meta(get_the_ID(), 'aera_skills_detail_icon', true);
					$post_bg_image = 'background-image: url(' . esc_url($post_image) . ');';
					$post_description = get_post_meta(get_the_ID(), 'aera_skills_detail_description', true);
					$post_order_value = get_post_meta(get_the_ID(), 'aera_skills_detail_order', true);
					$post_order = '';

					if (!empty($post_order_value)) {
						$post_order = 'order: ' . esc_html($post_order_value) . ';';
					}
				?>
					<a class="aera-skills-items__item" href="<?php the_permalink($post_id); ?>" style="<?php echo $post_bg_image; ?> <?php echo $post_order; ?>">
						<h6 class="aera-skills-items__item-title h6">
							<?php the_title(); ?>
							<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 1L22 8M22 8C20.2111 9.75736 16.7889 13.1618 15 14.9192M22 8C22 8 -0.598612 8 0.0121612 8" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</h6>
						<?php if (!empty($post_description)) { ?>
							<p class="aera-skills-items__item-description"><?php echo esc_html_e($post_description); ?></p>
						<?php } ?>
					</a>
				<?php endwhile; ?>
			</div>
		</div>
	<?php
	}
}