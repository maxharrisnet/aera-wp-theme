<?php
namespace Elementor;

class Aera_Hubspot_Form extends Widget_Base {

	public function get_name() {
		return 'aera-hubspot-form';
	}

	public function get_title() {
		return 'Aera Hubspot Form';
	}

	public function get_icon() {
		return 'dashicons dashicons-feedback';
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
			'hubspot_form_heading', [
				'label' => esc_html__('Page Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);


		$this->add_control(
			'hubspot_form_description', [
				'label' => esc_html__('Page Description', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'hubspot_formid', [
				'label' => esc_html__('Hubspot formId', 'aera'),
				'type' => Controls_Manager::TEXT,
				'description' => 'example: 9fa1d4a1-4c89-44d5-add1-37df812fc7bd',
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'hubspot_form_text', [
				'label' => esc_html__('Text under the form', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-hubspot-form', AERA_T_URI . '/widgets/hubspot-form/assets/css/hubspot-form.css' );
		wp_register_script( 'aera-hubspot-form-js', AERA_T_URI . '/widgets/hubspot-form/assets/js/hubspot-form.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-hubspot-form-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-hubspot-form' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
		<div class="aera-hubspot-form">
			<?php if (!empty($settings['hubspot_form_heading']) && !empty($settings['hubspot_form_description']) && !empty($settings['hubspot_formid'])) { ?>
				<div class="aera-hubspot-form__banner">
					<h1 class="aera-hubspot-form__banner-heading"><?php echo esc_html_e($settings['hubspot_form_heading']); ?></h1>
					<p class="aera-hubspot-form__banner-description banner-text"><?php echo esc_html_e($settings['hubspot_form_description']); ?></p>
				</div>

				<div class="aera-hubspot-form__form">
					<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
					<script>
						hbspt.forms.create({
							region: "na1",
							portalId: "4455954",
							formId: "<?php echo esc_html($settings['hubspot_formid']); ?>"
						});
					</script>

					<?php if (!empty($settings['hubspot_form_text'])) { ?>
						<p class="aera-hubspot-form__text"><?php echo esc_html_e($settings['hubspot_form_text']); ?></p>
					<?php } ?>
				</div>
			<?php } ?>
		</div>
	<?php
	}
}