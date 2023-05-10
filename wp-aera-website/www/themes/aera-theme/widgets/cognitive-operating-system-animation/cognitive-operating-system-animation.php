<?php
namespace Elementor;

class Aera_Cognitive_Operating_System_Animation extends Widget_Base {

	public function get_name() {
		return 'aera-cognitive-operating-system-animation';
	}

	public function get_title() {
		return 'Aera Cognitive Operating System Animation';
	}

	public function get_icon() {
		return 'dashicons dashicons-controls-play';
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
			'cos_animation_image_bg', [
				'label' => esc_html__('Background', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'description' => '(optional)',
				'placeholder' => esc_html__('Select image', 'aera'),
			]
		);
		
		$this->add_control(
			'cos_animation_image_first', [
				'label' => esc_html__('First Element', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'description' => '(required)',
				'placeholder' => esc_html__('Select image', 'aera'),
			]
		);
		
		$this->add_control(
			'cos_animation_image_second', [
				'label' => esc_html__('Second Element', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'description' => '(required)',
				'placeholder' => esc_html__('Select image', 'aera'),
			]
		);
		
		$this->add_control(
			'cos_animation_image_third', [
				'label' => esc_html__('Third Element', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'description' => '(required)',
				'placeholder' => esc_html__('Select image', 'aera'),
			]
		);
		
		$this->add_control(
			'cos_animation_image_fourth', [
				'label' => esc_html__('Fourth Element', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'description' => '(optional)',
				'placeholder' => esc_html__('Select image', 'aera'),
			]
		);
		
		$this->add_control(
			'cos_animation_image_fifth', [
				'label' => esc_html__('Fifth Element', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'description' => '(optional)',
				'placeholder' => esc_html__('Select image', 'aera'),
			]
		);

		$this->add_control(
			'cos_animation_image_bg_place', [
				'label' => esc_html__('Place the background below?', 'aera'),
				'type' => Controls_Manager::SWITCHER,
				'placeholder' => esc_html__('Select image', 'aera'),
				'label_on' => esc_html__('Yes', 'textdomain'),
				'label_off' => esc_html__('No', 'textdomain'),
				'return_value' => 'yes',
				'default' => 'no',
			]
		);
		
		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-cognitive-operating-system-animation', AERA_T_URI . '/widgets/cognitive-operating-system-animation/assets/css/cognitive-operating-system-animation.css' );
		wp_register_script( 'aera-cognitive-operating-system-animation-js', AERA_T_URI . '/widgets/cognitive-operating-system-animation/assets/js/cognitive-operating-system-animation.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-cognitive-operating-system-animation-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-cognitive-operating-system-animation' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$image_bg_place = '';

		if ($settings['cos_animation_image_bg_place'] === 'yes') {
			$image_bg_place = 'bottom';
		}
	?>
		<?php if (!empty($settings['cos_animation_image_first']['url']) && !empty($settings['cos_animation_image_second']['url']) && !empty($settings['cos_animation_image_third']['url'])) { ?>
			<div class="aera-cos-animation">
				<div class="aera-cos-animation__wrapper">
					<?php if (!empty($settings['cos_animation_image_bg']['url'])) { ?>
						<img class="aera-cos-animation__wrapper-bg <?php echo $image_bg_place; ?>" src="<?php echo esc_url($settings['cos_animation_image_bg']['url'])?>" alt="<?php echo ($settings['cos_animation_image_bg']['alt'])?>">
					<?php } ?>
					<img class="aera-cos-animation__wrapper-first" src="<?php echo esc_url($settings['cos_animation_image_first']['url'])?>" alt="<?php echo ($settings['cos_animation_image_first']['alt'])?>">
					<img class="aera-cos-animation__wrapper-second" src="<?php echo esc_url($settings['cos_animation_image_second']['url'])?>" alt="<?php echo ($settings['cos_animation_image_second']['alt'])?>">
					<img class="aera-cos-animation__wrapper-third" src="<?php echo esc_url($settings['cos_animation_image_third']['url'])?>" alt="<?php echo ($settings['cos_animation_image_third']['alt'])?>">
					<?php if (!empty($settings['cos_animation_image_fourth']['url'])) { ?>
						<img class="aera-cos-animation__wrapper-fourth" src="<?php echo esc_url($settings['cos_animation_image_fourth']['url'])?>" alt="<?php echo ($settings['cos_animation_image_fourth']['alt'])?>">
					<?php } ?>
					<?php if (!empty($settings['cos_animation_image_fifth']['url'])) { ?>
						<img class="aera-cos-animation__wrapper-fifth" src="<?php echo esc_url($settings['cos_animation_image_fifth']['url'])?>" alt="<?php echo ($settings['cos_animation_image_fifth']['alt'])?>">
					<?php } ?>
				</div>
			</div>
		<?php } ?>
	<?php
	}
}