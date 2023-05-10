<?php
namespace Elementor;

class Aera_Our_Locations extends Widget_Base {

	public function get_name() {
		return 'aera-our-locations';
	}

	public function get_title() {
		return 'Aera Our Locations';
	}

	public function get_icon() {
		return 'dashicons dashicons-location-alt';
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
			'our_locations_title', [
				'label' => esc_html__('Section Title', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'our_locations_number', [
				'label' => esc_html__('Main Number', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'our_locations_email', [
				'label' => esc_html__('Main Email', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$our_locations = new Repeater();

		$our_locations->add_control(
			'our_locations_city', [
				'label' => esc_html__('City', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_locations->add_control(
			'our_locations_address', [
				'label' => esc_html__('Address', 'aera'),
				'type' => Controls_Manager::WYSIWYG,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_locations->add_control(
			'our_locations_country', [
				'label' => esc_html__('Country', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_locations->add_control(
			'our_locations_x', [
				'label' => esc_html__('X coordinate for marker', 'aera'),
				'type' => Controls_Manager::NUMBER,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_locations->add_control(
			'our_locations_y', [
				'label' => esc_html__('Y coordinate for marker', 'aera'),
				'type' => Controls_Manager::NUMBER,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_locations->add_control(
			'our_locations_marker_color', [
				'label' => esc_html__('Marker color', 'aera'),
				'type' => Controls_Manager::COLOR,
				'label_block' => false,
			]
		);

		$this->add_control(
			'our_locations', [
				'label' => esc_html__('Locations', 'aera'),
				'type' => Controls_Manager::REPEATER,
				'fields' => $our_locations->get_controls(),
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-our-locations', AERA_T_URI . '/widgets/our-locations/assets/css/our-locations.css' );
		wp_register_script( 'aera-our-locations-js', AERA_T_URI . '/widgets/our-locations/assets/js/our-locations.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-our-locations-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-our-locations' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
    <?php if (!empty($settings['our_locations_title']) && !empty($settings['our_locations'])) { ?>
			<div class="aera-our-locations">
				<div class="aera-our-locations__banner">
					<h2 class="aera-our-locations__banner-title"><?php echo esc_html($settings['our_locations_title']); ?></h2>
					<div class="aera-our-locations__banner-contacts">
						<?php if (!empty($settings['our_locations_number'])) { ?>
							<a class="phonelink small-text" href="tel:+<?php echo preg_replace('/[^0-9]/', '', $settings['our_locations_number']); ?>"><?php echo esc_html($settings['our_locations_number']); ?></a>
						<?php } ?>
						<?php if (!empty($settings['our_locations_email'])) { ?>
							<a class="emaillink small-text" href="mailto:<?php echo ($settings['our_locations_email']); ?>"><?php echo esc_html($settings['our_locations_email']); ?></a>
						<?php } ?>
					</div>
				</div>

				<div class="aera-our-locations__map">
					<img class="aera-our-locations__map-img" src="<?php echo esc_url( get_template_directory_uri() . '/widgets/our-locations/assets/img/our-locations-map.png' ); ?>" loading="lazy" alt="Map." />
					<?php foreach ($settings['our_locations'] as $item) :
						if (empty($item['our_locations_city']) && empty($item['our_locations_address']) && empty($item['our_locations_country']) && empty($item['our_locations_x']) && empty($item['our_locations_y'])) {
							continue;
						}
					?>
						<?php if (!empty($item['our_locations_city']) && !empty($item['our_locations_address']) && !empty($item['our_locations_country']) && !empty($item['our_locations_x']) && !empty($item['our_locations_y'])) { ?>
							<?php
								$marker_y = isset($item['our_locations_y']) && !empty($item['our_locations_y']) ? 'top: ' . $item['our_locations_y'] . '%;' : '';
								$marker_x = isset($item['our_locations_x']) && !empty($item['our_locations_x']) ? 'left: ' . $item['our_locations_x'] . '%;' : '';
								$marker_color = isset($item['our_locations_marker_color']) && !empty($item['our_locations_marker_color']) ? 'style="fill:'. esc_html($item['our_locations_marker_color']) .'"' : '';
								$marker_bg_color = isset($item['our_locations_marker_color']) && !empty($item['our_locations_marker_color']) ? 'color:'. esc_html($item['our_locations_marker_color']) .';' : '';
							?>
							<span class="aera-our-locations__map-marker" style="<?php echo $marker_x; ?> <?php echo $marker_y; ?> <?php echo $marker_bg_color; ?>">
								<svg height="18.25" width="14" viewBox="0 0 14 18.25" <?php echo $marker_color; ?>>
									<circle cx="7" cy="6.95" fill="#fff" r="3.04"></circle>
									<path d="M7 0a6.93 6.93 0 0 0-7 6.86c0 3.81 7 11.36 7 11.36s7-7.55 7-11.36A6.93 6.93 0 0 0 7-.03zm0 9.64a2.69 2.69 0 1 1 2.69-2.69A2.68 2.68 0 0 1 7 9.64z"></path>
								</svg>
							</span>
						<?php } ?>
					<?php endforeach; ?>
				</div>

				<div class="aera-our-locations__addresses">
					<?php foreach ($settings['our_locations'] as $item) :
						if (empty($item['our_locations_city']) && empty($item['our_locations_address']) && empty($item['our_locations_country']) && empty($item['our_locations_x']) && empty($item['our_locations_y'])) {
							continue;
						}
					?>
						<?php if (!empty($item['our_locations_city']) && !empty($item['our_locations_address']) && !empty($item['our_locations_country']) && !empty($item['our_locations_x']) && !empty($item['our_locations_y'])) { ?>
							<?php
								$text_color = isset($item['our_locations_marker_color']) && !empty($item['our_locations_marker_color']) ? 'style="color:'. esc_html($item['our_locations_marker_color']) .'"' : '';
							?>
							<div class="aera-our-locations__address">
								<div class="aera-our-locations__address-wrapper">
									<h6 class="aera-our-locations__address-city"><?php echo esc_html($item['our_locations_city']); ?></h6>
									<div class="aera-our-locations__address-text small-text"><?php echo $item['our_locations_address']; ?></div>
									<p class="aera-our-locations__address-country small-text" <?php echo $text_color; ?>><?php echo esc_html($item['our_locations_country']); ?></p>
								</div>
							</div>
						<?php } ?>
					<?php endforeach; ?>
				</div>
			</div>
    <?php } ?>
	<?php
	}
}