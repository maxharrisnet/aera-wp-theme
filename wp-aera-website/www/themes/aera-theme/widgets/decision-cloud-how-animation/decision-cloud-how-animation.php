<?php
namespace Elementor;

class Aera_Decision_Cloud_How_Animation extends Widget_Base {

	public function get_name() {
		return 'aera-decision-cloud-how-animation';
	}

	public function get_title() {
		return 'Aera Decision Cloud How Animation';
	}

	public function get_icon() {
		return 'dashicons dashicons-table-col-before';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'first_section_content', [
				'label' => esc_html__('First Section', 'aera'),
			]
		);

		$this->add_control(
			'first_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'first_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'first_section_img', [
				'label' => esc_html__('Section Mobile Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);
		
		$this->end_controls_section();


		$this->start_controls_section(
			'second_section_content', [
				'label' => esc_html__('Second Section', 'aera'),
			]
		);

		$this->add_control(
			'second_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'second_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'second_section_img', [
				'label' => esc_html__('Section Mobile Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->end_controls_section();


		$this->start_controls_section(
			'third_section_content', [
				'label' => esc_html__('Third Section', 'aera'),
			]
		);

		$this->add_control(
			'third_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_img', [
				'label' => esc_html__('Section Mobile Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->end_controls_section();


		$this->start_controls_section(
			'fourth_section_content', [
				'label' => esc_html__('Fourth Section', 'aera'),
			]
		);

		$this->add_control(
			'fourth_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_img', [
				'label' => esc_html__('Section Mobile Image', 'aera'),
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
		wp_register_style( 'aera-decision-cloud-how-animation', AERA_T_URI . '/widgets/decision-cloud-how-animation/assets/css/decision-cloud-how-animation.css' );
		wp_register_script( 'aera-decision-cloud-how-animation-bodymovin-js', AERA_T_URI . '/assets/js/lib/bodymovin.min.js', [], '1.0.0', true );
		wp_register_script( 'aera-decision-cloud-how-animation-js', AERA_T_URI . '/widgets/decision-cloud-how-animation/assets/js/decision-cloud-how-animation.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-decision-cloud-how-animation-bodymovin-js', 'aera-decision-cloud-how-animation-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-decision-cloud-how-animation' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
		<?php if (!empty($settings['first_section_heading']) && !empty($settings['first_section_text']) && !empty($settings['first_section_img']['url']) && !empty($settings['second_section_heading']) && !empty($settings['second_section_text']) && !empty($settings['second_section_img']['url']) && !empty($settings['third_section_heading']) && !empty($settings['third_section_text']) && !empty($settings['third_section_img']['url']) && !empty($settings['fourth_section_heading']) && !empty($settings['fourth_section_text']) && !empty($settings['fourth_section_img']['url'])) { ?>
			<div class="aera-dc-animation">
				<div class="aera-dc-animation__left">
					<div class="aera-dc-animation__left-wrapper">
						<div class="aera-dc-animation__left-content" id="aera-dc-animation__canvas">
							<div class="aera-dc-animation__left-lotties">
								<div class="aera-dc-animation__left-lotties__lottie" id="aera-dc-animation__lottie-first"></div>
								<div class="aera-dc-animation__left-lotties__lottie" id="aera-dc-animation__lottie-second"></div>
								<div class="aera-dc-animation__left-lotties__lottie" id="aera-dc-animation__lottie-third"></div>
								<div class="aera-dc-animation__left-lotties__lottie" id="aera-dc-animation__lottie-fourth"></div>
							</div>
						</div>
					</div>
				</div>

				<div class="aera-dc-animation__right">
					<div class="aera-dc-animation__right-block" id="aera-dc-animation__content-first">
						<div class="aera-dc-animation__right-block__img">
							<img src="<?php echo esc_url($settings['first_section_img']['url'])?>" alt="<?php echo ($settings['first_section_img']['alt'])?>">
						</div>
						<h4 class="aera-dc-animation__right-block__title"><?php echo esc_html($settings['first_section_heading']); ?></h4>
						<p class="aera-dc-animation__right-block__description text"><?php echo esc_html($settings['first_section_text']); ?></p>
					</div>
					
					<div class="aera-dc-animation__right-block" id="aera-dc-animation__content-second">
						<div class="aera-dc-animation__right-block__img">
							<img src="<?php echo esc_url($settings['second_section_img']['url'])?>" alt="<?php echo ($settings['second_section_img']['alt'])?>">
						</div>
						<h4 class="aera-dc-animation__right-block__title"><?php echo esc_html($settings['second_section_heading']); ?></h4>
						<p class="aera-dc-animation__right-block__description text"><?php echo esc_html($settings['second_section_text']); ?></p>
					</div>

					<div class="aera-dc-animation__right-block" id="aera-dc-animation__content-third">
						<div class="aera-dc-animation__right-block__img">
							<img src="<?php echo esc_url($settings['third_section_img']['url'])?>" alt="<?php echo ($settings['third_section_img']['alt'])?>">
						</div>
						<h4 class="aera-dc-animation__right-block__title"><?php echo esc_html($settings['third_section_heading']); ?></h4>
						<p class="aera-dc-animation__right-block__description text"><?php echo esc_html($settings['third_section_text']); ?></p>
					</div>

					<div class="aera-dc-animation__right-block" id="aera-dc-animation__content-fourth">
						<div class="aera-dc-animation__right-block__img">
							<img src="<?php echo esc_url($settings['fourth_section_img']['url'])?>" alt="<?php echo ($settings['fourth_section_img']['alt'])?>">
						</div>
						<h4 class="aera-dc-animation__right-block__title"><?php echo esc_html($settings['fourth_section_heading']); ?></h4>
						<p class="aera-dc-animation__right-block__description text"><?php echo esc_html($settings['fourth_section_text']); ?></p>
					</div>
				</div>
			</div>
		<?php } ?>
	<?php
	}
}