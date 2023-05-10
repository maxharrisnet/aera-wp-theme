<?php
namespace Elementor;

class Aera_Careers_Gallery extends Widget_Base {

	public function get_name() {
		return 'aera-careers-gallery';
	}

	public function get_title() {
		return 'Aera Careers Gallery';
	}

	public function get_icon() {
		return 'dashicons dashicons-images-alt2';
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

		$this->add_control(
			'first_image', [
				'label' => esc_html__('First Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->add_control(
			'second_image', [
				'label' => esc_html__('Second Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->add_control(
			'third_image', [
				'label' => esc_html__('Third Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->add_control(
			'fourth_image', [
				'label' => esc_html__('Fourth Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-careers-gallery', AERA_T_URI . '/widgets/careers-gallery/assets/css/careers-gallery.css' );
	}

	public function get_style_depends() {
		return [ 'aera-careers-gallery' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
	  <?php if (!empty($settings['first_image']['url']) && !empty($settings['second_image']['url']) && !empty($settings['third_image']['url']) && !empty($settings['fourth_image']['url'])) { ?>
			<div class="aera-careers-gallery">
				<div class="aera-careers-gallery__top">
					<div class="aera-careers-gallery__top-image">
						<img src="<?php echo esc_url($settings['first_image']['url'])?>" alt="<?php echo ($settings['first_image']['alt'])?>">
					</div>
					<div class="aera-careers-gallery__top-image">
						<img src="<?php echo esc_url($settings['second_image']['url'])?>" alt="<?php echo ($settings['second_image']['alt'])?>">
					</div>
				</div>
				<div class="aera-careers-gallery__bottom">
					<div class="aera-careers-gallery__bottom-image">
						<img src="<?php echo esc_url($settings['third_image']['url'])?>" alt="<?php echo ($settings['third_image']['alt'])?>">
					</div>
					<div class="aera-careers-gallery__bottom-image">
						<img src="<?php echo esc_url($settings['fourth_image']['url'])?>" alt="<?php echo ($settings['fourth_image']['alt'])?>">
					</div>
				</div>
			</div>
		<?php } ?>
	<?php
	}
}