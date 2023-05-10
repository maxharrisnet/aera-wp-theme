<?php
namespace Elementor;

class Aera_Attributes_Items extends Widget_Base {

	public function get_name() {
		return 'aera-attributes-items';
	}

	public function get_title() {
		return 'Aera Attributes Items';
	}

	public function get_icon() {
		return 'dashicons dashicons-saved';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
		
		$this->start_controls_section(
			'section_content', [
				'label' => esc_html__('Items', 'aera'),
			]
		);

		$attributes_items = new Repeater();

		$attributes_items->add_control(
			'attributes_items_title', [
				'label' => esc_html__('Attribute Title', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$attributes_items->add_control(
			'attributes_items_description', [
				'label' => esc_html__('Attribute Description', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'attributes_items',
			[
				'label' => esc_html__('Attributes', 'aera'),
				'type' => Controls_Manager::REPEATER,
				'fields' => $attributes_items->get_controls(),
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-attributes-items', AERA_T_URI . '/widgets/attributes-items/assets/css/attributes-items.css' );
	}

	public function get_style_depends() {
		return [ 'aera-attributes-items' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
	  <?php if (!empty($settings['attributes_items'])) { ?>
			<ul class="aera-attributes-items">
				<?php foreach ($settings['attributes_items'] as $item) : ?>
					<?php if (!empty($item['attributes_items_title']) && !empty($item['attributes_items_description'])) { ?>
						<li class="aera-attributes-items__item">
							<div class="aera-attributes-items__item-content">
								<h4 class="aera-attributes-items__item-content__title h4"><?php echo esc_html($item['attributes_items_title']); ?></h4>
								<p class="aera-attributes-items__item-content__description text"><?php echo esc_html($item['attributes_items_description']); ?></p>
							</div>
						</li>
					<?php } ?>
				<?php endforeach; ?>
			</ul>
		<?php } ?>
	<?php
	}
}