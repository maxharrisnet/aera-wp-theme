<?php
namespace Elementor;

class Aera_Quote extends Widget_Base {

	public function get_name() {
		return 'aera-quote';
	}

	public function get_title() {
		return 'Aera Quote';
	}

	public function get_icon() {
		return 'dashicons dashicons-format-quote';
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
			'quote_text', [
				'label' => esc_html__('Quote Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'quote_author', [
				'label' => esc_html__('Quote Author', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'quote_author_position', [
				'label' => esc_html__('Quote Author Position', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'quote_author_photo', [
				'label' => esc_html__('Quote Author Photo', 'aera'),
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
		wp_register_style( 'aera-quote', AERA_T_URI . '/widgets/quote/assets/css/quote.css' );
	}

	public function get_style_depends() {
		return [ 'aera-quote' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
    <?php if (!empty($settings['quote_text']) && !empty($settings['quote_author']) && !empty($settings['quote_author_photo']['url'])) { ?>
			<div class="aera-quote">
				<div class="aera-quote__content">
					<q class="aera-quote__content-text"><?php echo esc_html($settings['quote_text']); ?></q>
					<cite class="aera-quote__content-author text">
						<?php echo esc_html($settings['quote_author']); ?>
						<?php if (!empty($settings['quote_author_position'])) { ?>
							<span><?php echo esc_html($settings['quote_author_position']); ?></span>
						<?php } ?>
					</cite>
				</div>
				<img class="aera-quote__img" src="<?php echo esc_url($settings['quote_author_photo']['url'])?>" alt="<?php echo ($settings['quote_author_photo']['alt'])?>">
			</div>
    <?php } ?>
	<?php
	}
}