<?php
namespace Elementor;

class Aera_Services_Items extends Widget_Base {

	public function get_name() {
		return 'aera-services-items';
	}

	public function get_title() {
		return 'Aera Services Items';
	}

	public function get_icon() {
		return 'dashicons dashicons-info-outline';
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

		$services_items = new Repeater();

		$services_items->add_control(
			'services_items_img', [
				'label' => esc_html__('Item Icon', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$services_items->add_control(
			'services_items_title', [
				'label' => esc_html__('Item Title', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$services_items->add_control(
			'services_items_description', [
				'label' => esc_html__('Item Description', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$services_items->add_control(
			'services_items_url', [
				'label' => esc_html__('Item URL', 'aera'),
				'type' => Controls_Manager::URL,
				'placeholder' => esc_html__('https://your-link.com', 'aera'),
				'default' => [
					'url' => '',
				]
			]
		);

		$this->add_control(
			'services_items',
			[
				'label' => esc_html__('Items', 'aera'),
				'type' => Controls_Manager::REPEATER,
				'fields' => $services_items->get_controls(),
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-services-items', AERA_T_URI . '/widgets/services-items/assets/css/services-items.css' );
	}

	public function get_style_depends() {
		return [ 'aera-services-items' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
	  <?php if (!empty($settings['services_items'])) { ?>
			<div class="aera-services-items">
				<?php foreach ($settings['services_items'] as $item) : ?>
					<?php if (!empty($item['services_items_img']['url']) && !empty($item['services_items_title']) && !empty($item['services_items_description']) && !empty($item['services_items_url']['url'])) { ?>
						<a class="aera-services-items__item" href="<?php echo esc_url($item['services_items_url']['url'])?>">
							<div class="aera-services-items__item-media">
								<img class="aera-services-items__item-media__img" src="<?php echo esc_url($item['services_items_img']['url'])?>" alt="<?php echo ($item['services_items_img']['alt'])?>">
							</div>
							<div class="aera-services-items__item-content">
								<h4 class="aera-services-items__item-content__title h4"><?php echo esc_html($item['services_items_title']); ?></h4>
								<p class="aera-services-items__item-content__description text"><?php echo esc_html($item['services_items_description']); ?></p>
							</div>
						</a>
					<?php } ?>
				<?php endforeach; ?>
			</div>
		<?php } ?>
	<?php
	}
}