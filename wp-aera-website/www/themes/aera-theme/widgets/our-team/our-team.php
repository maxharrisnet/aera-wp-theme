<?php
namespace Elementor;

class Aera_Our_Team extends Widget_Base {

	public function get_name() {
		return 'aera-our-team';
	}

	public function get_title() {
		return 'Aera Our Team';
	}

	public function get_icon() {
		return 'dashicons dashicons-businessperson';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'section_teams', [
				'label' => esc_html__('Team', 'aera'),
			]
		);

		$our_team_item = new Repeater();

		$our_team_item->add_control(
			'our_team_picture', [
				'label' => esc_html__('Member Picture', 'aera'),
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

		$our_team_item->add_control(
			'our_team_name', [
				'label' => esc_html__('Member Name', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_team_item->add_control(
			'our_team_position', [
				'label' => esc_html__('Member Position', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('', 'aera'),
				'label_block' => true,
			]
		);

		$our_team_item->add_control(
			'our_team_social', [
				'label' => esc_html__('Member Social URL', 'aera'),
				'type' => Controls_Manager::URL,
				'placeholder' => esc_html__('https://your-link.com', 'aera'),
				'default' => [
					'url' => '',
				]
			]
		);

		$this->add_control(
			'our_team_item', [
				'label' => esc_html__('Team Items', 'aera'),
				'type' => Controls_Manager::REPEATER,
				'fields' => $our_team_item->get_controls(),
			]
		);
		
		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-our-team', AERA_T_URI . '/widgets/our-team/assets/css/our-team.css' );
	}

	public function get_style_depends() {
		return [ 'aera-our-team' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
		<?php if (!empty($settings['our_team_item'])) { ?>
			<div class="aera-our-team">
        <div class="aera-our-team__wrapper">
					<?php foreach ($settings['our_team_item'] as $item) :
						if (empty($item['our_team_picture']['url']) && empty($item['our_team_name']) && empty($item['our_team_position'])) {
							continue;
						}
					?>
						<?php if (!empty($item['our_team_picture']['url']) && !empty($item['our_team_name']) && !empty($item['our_team_position'])) { ?>
							<?php $img_alt_text = isset($item['our_team_picture']['alt']) && !empty($item['our_team_picture']['alt']) ? $item['our_team_picture']['alt'] : $item['our_team_name']; ?>
							<?php if (!empty($item['our_team_social']['url'])) { ?>
								<div class="aera-our-team__item-wrapper has-link">
									<a class="aera-our-team__item" href="<?php echo esc_url($item['our_team_social']['url']); ?>" target="_blank" rel="noopener noreferrer">
										<img class="aera-our-team__item-img" src="<?php echo esc_url($item['our_team_picture']['url'])?>" alt="<?php echo esc_html_e($img_alt_text)?>">
										<div class="aera-our-team__item-content">
											<h5 class="aera-our-team__item-content__name"><?php echo esc_html_e($item['our_team_name']); ?></h5>
											<p class="aera-our-team__item-content__position text"><?php echo esc_html_e($item['our_team_position']); ?></p>
										</div>
									</a>
								</div>
							<?php } else { ?>
								<div class="aera-our-team__item-wrapper">
									<div class="aera-our-team__item">
										<img class="aera-our-team__item-img" src="<?php echo esc_url($item['our_team_picture']['url'])?>" alt="<?php echo esc_html_e($img_alt_text)?>">
										<div class="aera-our-team__item-content">
											<h5 class="aera-our-team__item-content__name"><?php echo esc_html_e($item['our_team_name']); ?></h5>
											<p class="aera-our-team__item-content__position text"><?php echo esc_html_e($item['our_team_position']); ?></p>
										</div>
									</div>
								</div>
							<?php } ?>
						<?php } ?>
					<?php endforeach; ?>
        </div>
			</div>
		<?php } ?>
	<?php
	}
}

