<?php
namespace Elementor;

class Aera_Button extends Widget_Base {

	public function get_name() {
		return 'aera-button';
	}

	public function get_title() {
		return 'Aera Button';
	}

	public function get_icon() {
		return 'dashicons dashicons-button';
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
			'btn_text', [
				'label' => esc_html__('Button Text', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'btn_url', [
				'label' => esc_html__('Button URL', 'aera'),
				'type' => Controls_Manager::URL,
				'placeholder' => esc_html__('https://your-link.com', 'aera'),
				'default' => [
					'url' => '',
				]
			]
		);

		$this->add_control(
			'btn_style', [
				'label' => esc_html__('Button Style', 'aera'),
				'type' => Controls_Manager::SELECT,
				'default' => 'standart',
				'options' => [
					'standart' => esc_html__('Standart', 'aera'),
					'gradient' => esc_html__('Gradient', 'aera'),
					'blue' => esc_html__('Blue', 'aera'),
				],
			]
		);

		$this->add_control(
			'btn_alignment', [
				'label' => esc_html__( 'Button Alignment', 'aera' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'center',
				'options' => [
					'left' => esc_html__( 'Left', 'aera' ),
					'center' => esc_html__( 'Center', 'aera' ),
					'right' => esc_html__( 'Right', 'aera' )
				],
			]
		);

		$this->add_control(
			'btn_mobile_alignment', [
				'label' => esc_html__( 'Button Mobile Alignment', 'aera' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'm-center',
				'options' => [
					'm-left' => esc_html__( 'Left', 'aera' ),
					'm-center' => esc_html__( 'Center', 'aera' ),
					'm-right' => esc_html__( 'Right', 'aera' )
				],
			]
		);

		$this->add_control(
			'btn_large_text', [
				'label' => esc_html__('Large text with smaller button height?', 'aera'),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => esc_html__('Yes', 'aera'),
				'label_off' => esc_html__('No', 'aera'),
				'return_value' => 'yes',
				'default' => 'no',
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-button', AERA_T_URI . '/widgets/button/assets/css/button.css' );
	}

	public function get_style_depends() {
		return [ 'aera-button' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
		$btn_target = isset($settings['btn_url']['is_external']) && $settings['btn_url']['is_external'] == 'on' ? 'target="_blank"' : '';	
		$btn_follow = isset($settings['btn_url']['nofollow']) && $settings['btn_url']['nofollow'] == 'on' ? 'rel="nofollow noopener"' : '';	
		$btn_custom_attr = isset($settings['btn_url']['custom_attributes']) && $settings['btn_url']['custom_attributes'] !== '' ? $settings['btn_url']['custom_attributes'] : '';	
		$btn_style_value = $settings['btn_style'];

		switch ($btn_style_value) {
			case 'standart':
				$btn_style = 'standart';
				break;
			case 'gradient':
				$btn_style = 'gradient';
				break;
			case 'blue':
				$btn_style = 'blue';
				break;
			default:
				$btn_style = 'standart';
		}

		$btn_large_text = '';

		if ($settings['btn_large_text'] === 'yes') {
			$btn_large_text = ' large-text';
		}
	?>
		<div class="aera-button <?php echo esc_attr($settings['btn_alignment']); ?> <?php echo esc_attr($settings['btn_mobile_alignment']); ?>">
      <?php if (!empty($settings['btn_text']) && !empty($settings['btn_url'])) { ?>
        <a class="btn btn-<?php echo esc_attr($btn_style); ?> <?php echo $btn_large_text; ?>" href="<?php echo esc_url($settings['btn_url']['url']); ?>"
					<?php echo ($btn_target); ?> 
					<?php echo ($btn_follow); ?> 
					<?php echo ($btn_custom_attr); ?>
				>
					<?php echo esc_html($settings['btn_text']); ?>
        </a>
      <?php } ?>
		</div>
	<?php
	}
}