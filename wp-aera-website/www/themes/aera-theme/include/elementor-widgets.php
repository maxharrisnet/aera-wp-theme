<?php
if ( ! class_exists( 'Aera_Elementor_Widgets' ) ) {
	class Aera_Elementor_Widgets {

		protected static $instance = null;

		public static function get_instance() {
			if ( ! isset( static::$instance ) ) {
				static::$instance = new static;
			}

			return static::$instance;
		}

		protected function __construct() {
			require_once AERA_T_PATH . '/widgets/headings/headings.php';
			require_once AERA_T_PATH . '/widgets/main-canvas/main-canvas.php';
			require_once AERA_T_PATH . '/widgets/button/button.php';
			require_once AERA_T_PATH . '/widgets/quote/quote.php';
			require_once AERA_T_PATH . '/widgets/technology-section/technology-section.php';
			require_once AERA_T_PATH . '/widgets/four-images-gallery/four-images-gallery.php';
			require_once AERA_T_PATH . '/widgets/services-items/services-items.php';
			require_once AERA_T_PATH . '/widgets/attributes-items/attributes-items.php';
			require_once AERA_T_PATH . '/widgets/decision-cloud-how-animation/decision-cloud-how-animation.php';
			require_once AERA_T_PATH . '/widgets/cognitive-operating-system-items/cognitive-operating-system-items.php';
			require_once AERA_T_PATH . '/widgets/cognitive-operating-system-animation/cognitive-operating-system-animation.php';
			require_once AERA_T_PATH . '/widgets/skills-items/skills-items.php';
			require_once AERA_T_PATH . '/widgets/hubspot-form/hubspot-form.php';
			require_once AERA_T_PATH . '/widgets/customers-types-items/customers-types-items.php';
			require_once AERA_T_PATH . '/widgets/careers-gallery/careers-gallery.php';
			require_once AERA_T_PATH . '/widgets/open-roles/open-roles.php';
			require_once AERA_T_PATH . '/widgets/events/events.php';
			require_once AERA_T_PATH . '/widgets/all-resources/all-resources.php';
			require_once AERA_T_PATH . '/widgets/our-team/our-team.php';
			require_once AERA_T_PATH . '/widgets/our-locations/our-locations.php';
			add_action( 'elementor/widgets/widgets_registered', [ $this, 'register_widgets' ] );
		}

		public function register_widgets() {
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Heading() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Main_Canvas() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Button() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Quote() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Technology_Section() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Four_Images_Gallery() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Services_Items() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Attributes_Items() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Decision_Cloud_How_Animation() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Cognitive_Operating_System_Items() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Cognitive_Operating_System_Animation() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Skills_Items() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Hubspot_Form() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Customers_Types_Items() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Careers_Gallery() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Open_Roles() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Events() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_All_Resources() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Our_Team() );
			\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new \Elementor\Aera_Our_Locations() );
		}

	}
}

if ( ! function_exists( 'aera_elementor_init' ) ) {

	function aera_elementor_init() {
		Aera_Elementor_Widgets::get_instance();
	}
	add_action( 'init', 'aera_elementor_init' );

}