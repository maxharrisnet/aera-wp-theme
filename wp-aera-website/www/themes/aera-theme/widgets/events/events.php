<?php
namespace Elementor;

class Aera_Events extends Widget_Base {

	public function get_name() {
		return 'aera-events';
	}

	public function get_title() {
		return 'Aera Events';
	}

	public function get_icon() {
		return 'dashicons dashicons-megaphone';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_events', [
				'label' => esc_html__('Events', 'aera'),
			]
		);

		$events_item = new Repeater();

		$events_item->add_control(
			'events_bg_image', [
				'label' => esc_html__('Event Background Image', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'dynamic' => [
					'active' => true,
				],
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$events_item->add_control(
			'events_name', [
				'label' => esc_html__('Event Name', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$events_item->add_control(
			'events_description', [
				'label' => esc_html__('Event Description', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$events_item->add_control(
			'events_url', [
				'label' => esc_html__('Event URL', 'aera'),
				'type' => Controls_Manager::URL,
				'placeholder' => esc_html__('https://your-link.com', 'aera'),
				'default' => [
					'url' => '',
				]
			]
		);
		
		$events_item->add_control(
			'events_date', [
				'label' => esc_html__('Event Date', 'aera'),
				'type' => Controls_Manager::DATE_TIME,
				'picker_options' => [
					'dateFormat' => 'Y-m-d',
				]
			]
		);

		$events_item->add_control(
			'events_category', [
				'label' => esc_html__('Event Category', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'events_item', [
				'label' => esc_html__('Events items', 'aera'),
				'type' => Controls_Manager::REPEATER,
				'fields' => $events_item->get_controls(),
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-events', AERA_T_URI . '/widgets/events/assets/css/events.css' );
	}

	public function get_style_depends() {
		return [ 'aera-events' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
		<?php if (!empty($settings['events_item'])) { ?>
			<div class="aera-events">
        <div class="aera-events__wrapper">
					<?php foreach ($settings['events_item'] as $item) :
						if (empty($item['events_bg_image']) && empty($item['events_name']) && empty($item['events_description']) && empty($item['events_url']) && empty($item['events_date']) && empty($item['events_category'])) {
							continue;
						}
						$bg_image = isset($item['events_bg_image']['url']) && !empty($item['events_bg_image']['url']) ? 'style="background-image: url(' . esc_url($item['events_bg_image']['url']) . ')"' : ''; 
					?>
						<?php if (!empty($item['events_bg_image']) && !empty($item['events_name']) && !empty($item['events_description']) && !empty($item['events_url']) && !empty($item['events_date']) && !empty($item['events_category'])) { ?>
							<div class="aera-events__item-wrapper">
								<div class="aera-events__item">
									<div class="aera-events__item-top">
										<a class="aera-events__item-top__bg" href="<?php echo esc_url($item['events_url']['url']); ?>" target="_blank" <?php echo $bg_image; ?>></a>
									</div>
									<a class="aera-events__item-bottom" href="<?php echo esc_url($item['events_url']['url']); ?>" target="_blank">
										<div class="aera-events__item-bottom__banner">
											<div class="aera-events__item-bottom__banner-text"><?php echo esc_html_e('Event'); ?></div>
											<div class="aera-events__item-bottom__banner-category"><?php echo esc_html($item['events_category']); ?></div>
										</div>
										<div class="aera-events__item-bottom__content">
											<div class="aera-events__item-bottom__content-wrapper">
												<h4 class="aera-events__item-bottom__content-name"><?php echo esc_html($item['events_name']); ?></h4>
												<p class="aera-events__item-bottom__content-description small-text"><?php echo esc_html($item['events_description']); ?></p>
											</div>
										</div>
										<div class="aera-events__item-bottom__register">
											<div class="aera-events__item-bottom__register-wrapper">
												<div class="aera-events__item-bottom__register-date"><?php echo wp_kses($item['events_date'], 'aera'); ?></div>
												<div class="aera-events__item-bottom__register-line"></div>
												<div class="aera-events__item-bottom__register-button">
													<span><?php echo esc_html_e('Register'); ?></span>
												</div>
											</div>
										</div>
									</a>
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

