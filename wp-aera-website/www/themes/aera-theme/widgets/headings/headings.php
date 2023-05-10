<?php
namespace Elementor;

class Aera_Heading extends Widget_Base {

	public function get_name() {
		return 'aera-heading';
	}

	public function get_title() {
		return 'Aera Heading';
	}

	public function get_icon() {
		return 'dashicons dashicons-heading';
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
			'title', [
				'label' => esc_html__('Title', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('My title' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'subtitle', [
				'label' => esc_html__('Subtitle', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('There is some text for my subtitle' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-heading', AERA_T_URI . '/widgets/headings/assets/css/heading.css' );
	}

	public function get_style_depends() {
		return [ 'aera-heading' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
		<div class="aera-heading">
      <?php if (!empty($settings['title'])) { ?>
        <h2 class="aera-heading__title">
          <?php echo esc_html( $settings['title']); ?>
        </h2>
      <?php } ?>

      <?php if (!empty($settings['subtitle'])) { ?>
        <p class="aera-heading__subtitle">
          <?php echo esc_html( $settings['subtitle']); ?>
        </p>
      <?php } ?>
		</div>
	<?php
	}
}