<?php
namespace Elementor;

class Aera_Main_Canvas extends Widget_Base {

	public function get_name() {
		return 'aera-main-canvas';
	}

	public function get_title() {
		return 'Aera Main Canvas Element';
	}

	public function get_icon() {
		return 'dashicons dashicons-superhero-alt';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-main-canvas', AERA_T_URI . '/widgets/main-canvas/assets/css/main-canvas.css' );
		wp_register_script( 'aera-main-canvas-three-js', AERA_T_URI . '/assets/js/lib/three.min.js', [], '1.0.0', true );
		wp_register_script( 'aera-main-canvas-js', AERA_T_URI . '/widgets/main-canvas/assets/js/main-canvas.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-main-canvas-three-js', 'aera-main-canvas-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-main-canvas' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
		<div class="aera-main-canvas" id="main-canvas"></div>
	<?php
	}

}