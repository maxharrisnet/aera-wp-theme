<?php
namespace Elementor;

class Aera_Open_Roles extends Widget_Base {

	public function get_name() {
		return 'aera-open-roles';
	}

	public function get_title() {
		return 'Aera Open Roles';
	}

	public function get_icon() {
		return 'dashicons dashicons-groups';
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
			'open_roles_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'open_roles_description', [
				'label' => esc_html__('Section Description', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-open-roles', AERA_T_URI . '/widgets/open-roles/assets/css/open-roles.css' );
		wp_register_script( 'aera-open-roles-js', AERA_T_URI . '/widgets/open-roles/assets/js/open-roles.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-open-roles-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-open-roles' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
    <?php if (!empty($settings['open_roles_heading']) && !empty($settings['open_roles_description'])) { ?>
			<div class="aera-open-roles">
				<div class="aera-open-roles__top">
					<h2 class="aera-open-roles__top-title"><?php echo esc_html($settings['open_roles_heading']); ?></h2>
					<p class="aera-open-roles__top-description text"><?php echo esc_html($settings['open_roles_description']); ?></p>
					<form class="aera-open-roles__top-form" id="open-roles-form">
						<div class="aera-open-roles__top-form__block">
							<div class="aera-open-roles__top-form__block-wrapper">
								<select class="aera-open-roles__top-form__select" id="open-roles-select-teams">
									<option value="All teams">All teams</option>
								</select>
								<svg height="7" width="12"><path d="M12 .84l-.69-.69L6 5.46.7.15 0 .84l6 6z" fill="#1a1a1a"></path></svg>
							</div>
						</div>

						<div class="aera-open-roles__top-form__block">
							<div class="aera-open-roles__top-form__block-wrapper">
								<select class="aera-open-roles__top-form__select" id="open-roles-select-countries">
									<option value="All countries">All countries</option>
								</select>
								<svg height="7" width="12"><path d="M12 .84l-.69-.69L6 5.46.7.15 0 .84l6 6z" fill="#1a1a1a"></path></svg>
							</div>
						</div>
					</form>
				</div>
				<div class="aera-open-roles__bottom">
					<div class="aera-open-roles__bottom-titles">
						<div class="aera-open-roles__bottom-titles__title"><?php echo esc_html_e('Role'); ?></div>
						<div class="aera-open-roles__bottom-titles__title"><?php echo esc_html_e('Location'); ?></div>
					</div>
					<ul class="aera-open-roles__bottom-positions" id="open-roles-positions">
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
						<li class="aera-open-roles__bottom-position__wrapper">
							<a class="aera-open-roles__bottom-position" href="#" target="_blank" rel="noopener noreferrer">
								<div class="aera-open-roles__bottom-position__content">
									<div class="aera-open-roles__bottom-position__content-left">
										<div>
											<p class="aera-open-roles__bottom-position__name text">loading...</p>
											<p class="aera-open-roles__bottom-position__department">loading...</p>
										</div>
									</div>
									<div class="aera-open-roles__bottom-position__content-right">
										<p class="aera-open-roles__bottom-position__address text">loading...</p>
									</div>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
    <?php } ?>
	<?php
	}
}