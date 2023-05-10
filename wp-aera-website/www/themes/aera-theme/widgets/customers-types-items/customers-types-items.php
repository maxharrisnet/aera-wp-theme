<?php
namespace Elementor;

class Aera_Customers_Types_Items extends Widget_Base {

	public function get_name() {
		return 'aera-customers-items';
	}

	public function get_title() {
		return 'Aera Customers Types Items';
	}

	public function get_icon() {
		return 'dashicons dashicons-block-default';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-customers-items', AERA_T_URI . '/widgets/customers-types-items/assets/css/customers-types-items.css' );
	}

	public function get_style_depends() {
		return [ 'aera-customers-items' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$args = [
			'post_type' => 'customers',
			'posts_per_page' => 1000,
			'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
			'numberposts' => -1
		];
		$the_query = new \WP_Query($args);
	?>
		<div class="aera-customers-items">
			<div class="aera-customers-items__wrapper">
				<?php while ($the_query->have_posts()) :
					$the_query->the_post();
					$post_id = get_the_ID();
					$post_icon = get_post_meta(get_the_ID(), 'aera_customers_detail_preview_icon', true);
					$post_revenue = get_post_meta(get_the_ID(), 'aera_customers_detail_revenue', true);
					$post_employees = get_post_meta(get_the_ID(), 'aera_customers_detail_employees', true);
					$post_business_problem = get_post_meta(get_the_ID(), 'aera_customers_detail_business_problem', true);
				?>
					<?php if (!empty($post_icon)) { ?>
						<div class="aera-customers-items__item-wrapper">
							<a class="aera-customers-items__item" href="<?php the_permalink($post_id); ?>">
								<div class="aera-customers-items__item-content">
									<div class="aera-customers-items__item-banner">
										<div class="aera-customers-items__item-banner__icon">
											<img src="<?php echo esc_url($post_icon); ?>" alt="<?php the_title(); ?>">
										</div>
										<div class="aera-customers-items__item-banner__title"><?php the_title(); ?></div>
									</div>
									<?php if (!empty($post_revenue) || !empty($post_employees)) { ?>
										<div class="aera-customers-items__item-details">
											<div class="aera-customers-items__item-details__left">
												<p class="aera-customers-items__item-details-title"><?php echo esc_html_e('Revenue'); ?></p>
												<div class="aera-customers-items__item-details-value text"><?php echo esc_html_e($post_revenue); ?></div>
											</div>
											<div class="aera-customers-items__item-details__right">
												<p class="aera-customers-items__item-details-title"><?php echo esc_html_e('Employees'); ?></p>
												<div class="aera-customers-items__item-details-value text"><?php echo esc_html_e($post_employees); ?></div>
											</div>
										</div>
									<?php } ?>
									<?php if (!empty($post_business_problem)) { ?>
										<div class="aera-customers-items__item-problems">
											<p class="aera-customers-items__item-problems__title"><?php echo esc_html_e('Business Problem'); ?></p>
											<p class="aera-customers-items__item-problems__text small-text"><?php echo esc_html_e($post_business_problem); ?></p>
										</div>
									<?php } ?>
									<div class="aera-customers-items__item-btn"><?php echo esc_html_e('Learn more →'); ?></div>
								</div>
							</a>
						</div>
					<?php } ?>
				<?php endwhile; ?>
			</div>
		</div>
	<?php
	}
}