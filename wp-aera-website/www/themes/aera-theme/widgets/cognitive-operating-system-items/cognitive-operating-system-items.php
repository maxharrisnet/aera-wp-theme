<?php
namespace Elementor;

class Aera_Cognitive_Operating_System_Items extends Widget_Base {

	public function get_name() {
		return 'aera-cognitive-operating-system-items';
	}

	public function get_title() {
		return 'Aera Cognitive Operating System Items';
	}

	public function get_icon() {
		return 'dashicons dashicons-block-default';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_content', [
				'label' => esc_html__('Content', 'aera'),
			]
		);

		$terms = get_terms(array(
			'taxonomy' => 'cos_categories',
			'hide_empty' => false,
			'parent' => 0
		));
		$terms_array = array('-Select category-');

		foreach ($terms as $term) {
			$terms_array[$term->slug] = $term->name;
		}

		$this->add_control(
			'product_category', [
				'label' => esc_html__('Items Category', 'aera'),
				'type' => Controls_Manager::SELECT,
				'default' => 0,
				'options' => $terms_array,
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-cognitive-operating-system-items', AERA_T_URI . '/widgets/cognitive-operating-system-items/assets/css/cognitive-operating-system-items.css' );
	}

	public function get_style_depends() {
		return [ 'aera-cognitive-operating-system-items' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$args = [
			'post_type' => 'cos',
			'posts_per_page' => 1000,
			'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
			'numberposts' => -1
		];

		if ($settings['product_category']) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => 'cos_categories',
					'field' => 'slug',
					'terms' => $settings['product_category'],
				)
			);
		}
		$the_query = new \WP_Query($args);
		$category_name_title = 'all';

		if (!empty($args['tax_query'][0]['terms'])) {
			$category_name_title = $args['tax_query'][0]['terms'];
		}
	?>
		<div class="aera-cos-items">
			<h6 class="aera-cos-items__heading"><?php echo esc_html_e($category_name_title); ?></h6>
			<div class="aera-cos-items__wrapper">
				<?php while ($the_query->have_posts()) :
					$the_query->the_post();
					$post_id = get_the_ID();
					$post_image = get_post_meta(get_the_ID(), 'aera_cos_detail_icon', true);
					$post_bg_image = 'style="background-image: url(' . esc_url($post_image) . ')"';
					$post_subtitle = get_post_meta(get_the_ID(), 'aera_cos_detail_subtitle', true);
				?>
					<a class="aera-cos-items__item" href="<?php the_permalink($post_id); ?>" <?php echo $post_bg_image; ?>>
						<h6 class="aera-cos-items__item-title h6">
							<?php the_title(); ?>
							<svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15 1L22 8M22 8C20.2111 9.75736 16.7889 13.1618 15 14.9192M22 8C22 8 -0.598612 8 0.0121612 8" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</h6>
						<?php if (!empty($post_subtitle)) { ?>
							<p class="aera-cos-items__item-description"><?php echo esc_html_e($post_subtitle); ?></p>
						<?php } ?>
					</a>
				<?php endwhile; ?>
			</div>
		</div>
	<?php
	}
}