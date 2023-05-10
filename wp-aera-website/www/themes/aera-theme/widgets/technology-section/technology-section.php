<?php
namespace Elementor;

class Aera_Technology_Section extends Widget_Base {

	public function get_name() {
		return 'aera-technology-section';
	}

	public function get_title() {
		return 'Aera Technology Section';
	}

	public function get_icon() {
		return 'dashicons dashicons-list-view';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	protected function register_controls() {
		$this->start_controls_section(
			'first_section_content', [
				'label' => esc_html__('First Technology Section', 'aera'),
			]
		);

		$this->add_control(
			'first_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'first_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'first_section_video', [
				'label' => esc_html__('Section Video URL', 'aera'),
				'type' => Controls_Manager::URL,
				'default' => [
					'url' => '',
				],
				'label_block' => true,
			]
		);

		$this->add_control(
			'first_section_first_message', [
				'label' => esc_html__('Video First Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'first_section_second_message', [
				'label' => esc_html__('Video Second Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();


		$this->start_controls_section(
			'second_section_content', [
				'label' => esc_html__('Second Technology Section', 'aera'),
			]
		);

		$this->add_control(
			'second_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'second_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'second_section_video', [
				'label' => esc_html__('Section Video URL', 'aera'),
				'type' => Controls_Manager::URL,
				'default' => [
					'url' => '',
				],
				'label_block' => true,
			]
		);

		$this->add_control(
			'second_section_video_background', [
				'label' => esc_html__('Section Video Image Background', 'aera'),
				'type' => Controls_Manager::MEDIA,
				'placeholder' => esc_html__('Select image', 'aera'),
				'default' => [
					'url' => '',
				],
			]
		);

		$this->add_control(
			'second_section_first_message', [
				'label' => esc_html__('Video First Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'second_section_second_message', [
				'label' => esc_html__('Video Second Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();


		$this->start_controls_section(
			'third_section_content', [
				'label' => esc_html__('Third Technology Section', 'aera'),
			]
		);

		$this->add_control(
			'third_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_video', [
				'label' => esc_html__('Section Video URL', 'aera'),
				'type' => Controls_Manager::URL,
				'default' => [
					'url' => '',
				],
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_first_message', [
				'label' => esc_html__('Video First Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_second_message', [
				'label' => esc_html__('Video Second Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'third_section_third_message', [
				'label' => esc_html__('Video Third Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();


		$this->start_controls_section(
			'fourth_section_content', [
				'label' => esc_html__('Fourth Technology Section', 'aera'),
			]
		);

		$this->add_control(
			'fourth_section_heading', [
				'label' => esc_html__('Section Heading', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_text', [
				'label' => esc_html__('Section Text', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_btn_text', [
				'label' => esc_html__('Section Button Text', 'aera'),
				'type' => Controls_Manager::TEXT,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_btn_url', [
				'label' => esc_html__('Section Button URL', 'aera'),
				'type' => Controls_Manager::URL,
				'default' => [
					'url' => '',
				],
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_video', [
				'label' => esc_html__('Section Video URL', 'aera'),
				'type' => Controls_Manager::URL,
				'default' => [
					'url' => '',
				],
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_first_message', [
				'label' => esc_html__('Video First Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->add_control(
			'fourth_section_second_message', [
				'label' => esc_html__('Video Second Message', 'aera'),
				'type' => Controls_Manager::TEXTAREA,
				'default' => esc_html__('' , 'aera'),
				'label_block' => true,
			]
		);

		$this->end_controls_section();
	}

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_style( 'aera-technology-section', AERA_T_URI . '/widgets/technology-section/assets/css/technology-section.css' );
		wp_register_script( 'aera-technology-section-js', AERA_T_URI . '/widgets/technology-section/assets/js/technology-section.min.js', [], '1.0.0', true );
	}

	public function get_script_depends() {
		return [ 'aera-technology-section-js' ];
	}

	public function get_style_depends() {
		return [ 'aera-technology-section' ];
	}

	protected function render() {
		$settings = $this->get_settings_for_display();
	?>
	  <?php if (!empty($settings['first_section_heading']) && !empty($settings['first_section_text']) && !empty($settings['first_section_video']) && !empty($settings['second_section_heading']) && !empty($settings['second_section_text']) && !empty($settings['second_section_video']) && !empty($settings['third_section_heading']) && !empty($settings['third_section_text']) && !empty($settings['third_section_video']) && !empty($settings['fourth_section_heading']) && !empty($settings['fourth_section_text']) && !empty($settings['fourth_section_video'])) { ?>
			<div class="technology-section">
				<div class="technology-section__left">
					<?php if (!empty($settings['first_section_heading']) && !empty($settings['first_section_text']) && !empty($settings['first_section_video'])) { ?>
						<div class="technology-section__left-item__wrapper">
							<div class="technology-section__left-item">
								<div class="technology-section__left-item__content">
									<?php if (!empty($settings['first_section_first_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['first_section_first_message']); ?></div>
										</div>
									<?php } ?>

									<?php if (!empty($settings['first_section_second_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['first_section_second_message']); ?></div>
										</div>
									<?php } ?>
								</div>
								
								<?php if (!empty($settings['first_section_video'])) { ?>
									<div class="technology-section__left-item__content-video">
										<video src="<?php echo esc_url($settings['first_section_video']['url']); ?>" width="1280" height="720" autoplay="" loop="" muted="" playsinline=""></video>
									</div>
								<?php } ?>
							</div>

							<div class="technology-section__left-item__text">
								<?php if (!empty($settings['first_section_heading'])) { ?>
									<div class="technology-section__left-item__top">
										<p class="h2"><?php echo esc_html($settings['first_section_heading']); ?></p>
									</div>
								<?php } ?>
								<?php if (!empty($settings['first_section_text'])) { ?>
									<div class="technology-section__left-item__bottom large-text">
										<p class="large-text"><?php echo esc_html($settings['first_section_text']); ?></p>
									</div>
								<?php } ?>
							</div>
						</div>
					<?php } ?>
					
					<?php if (!empty($settings['second_section_heading']) && !empty($settings['second_section_text']) && !empty($settings['second_section_video'])) { ?>
						<div class="technology-section__left-item__wrapper">
							<div class="technology-section__left-item">
								<div class="technology-section__left-item__content">
									<?php if (!empty($settings['second_section_first_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['second_section_first_message']); ?></div>
										</div>
									<?php } ?>

									<?php if (!empty($settings['second_section_second_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['second_section_second_message']); ?></div>
										</div>
									<?php } ?>
								</div>

								<?php if (!empty($settings['second_section_video'])) { ?>
									<div class="technology-section__left-item__content-video">
										<video src="<?php echo esc_url($settings['second_section_video']['url']); ?>" width="1280" height="720" autoplay="" loop="" muted="" playsinline=""></video>
									</div>
								<?php } ?>

								<?php if (!empty($settings['second_section_video_background']['url'])) { ?>
									<div class="technology-section__left-item__bg">
										<img class="technology-section__left-item__bg-img" src="<?php echo esc_url($settings['second_section_video_background']['url'])?>" alt="<?php echo ($settings['second_section_video_background']['alt'])?>">
									</div>
								<?php } ?>
							</div>

							<div class="technology-section__left-item__text">
								<?php if (!empty($settings['second_section_heading'])) { ?>
									<div class="technology-section__left-item__top">
										<p class="h2"><?php echo esc_html($settings['second_section_heading']); ?></p>
									</div>
								<?php } ?>
								<?php if (!empty($settings['second_section_heading'])) { ?>
								<div class="technology-section__left-item__bottom large-text">
									<p class="large-text"><?php echo esc_html($settings['second_section_text']); ?></p>
								</div>
								<?php } ?>
							</div>
						</div>
					<?php } ?>

					<?php if (!empty($settings['third_section_heading']) && !empty($settings['third_section_text']) && !empty($settings['third_section_video'])) { ?>
						<div class="technology-section__left-item__wrapper">
							<div class="technology-section__left-item">
								<div class="technology-section__left-item__content">
									<?php if (!empty($settings['third_section_first_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['third_section_first_message']); ?></div>
										</div>
									<?php } ?>

									<?php if (!empty($settings['third_section_second_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['third_section_second_message']); ?></div>
										</div>
									<?php } ?>

									<?php if (!empty($settings['third_section_third_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['third_section_third_message']); ?></div>
										</div>
									<?php } ?>
								</div>

								<?php if (!empty($settings['third_section_video'])) { ?>
									<div class="technology-section__left-item__content-video">
										<video src="<?php echo esc_url($settings['third_section_video']['url']); ?>" width="1280" height="720" autoplay="" loop="" muted="" playsinline=""></video>
									</div>
								<?php } ?>
							</div>

							<div class="technology-section__left-item__text">
								<?php if (!empty($settings['third_section_heading'])) { ?>
									<div class="technology-section__left-item__top">
										<p class="h2"><?php echo esc_html($settings['third_section_heading']); ?></p>
									</div>
								<?php } ?>
								<?php if (!empty($settings['third_section_text'])) { ?>
									<div class="technology-section__left-item__bottom large-text">
										<p class="large-text"><?php echo esc_html($settings['third_section_text']); ?></p>
									</div>
								<?php } ?>
							</div>
						</div>
					<?php } ?>

					<?php if (!empty($settings['fourth_section_heading']) && !empty($settings['fourth_section_text']) && !empty($settings['fourth_section_video'])) { ?>
						<div class="technology-section__left-item__wrapper">
							<div class="technology-section__left-item">
								<div class="technology-section__left-item__content">
									<?php if (!empty($settings['fourth_section_first_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['fourth_section_first_message']); ?></div>
										</div>
									<?php } ?>

									<?php if (!empty($settings['fourth_section_second_message'])) { ?>
										<div class="technology-section__left-item__content-wrapper">
											<div class="technology-section__left-item__content-text"><?php echo esc_html($settings['fourth_section_second_message']); ?></div>
										</div>
									<?php } ?>
								</div>

								<?php if (!empty($settings['fourth_section_video'])) { ?>
									<div class="technology-section__left-item__content-video">
										<video src="<?php echo esc_url($settings['fourth_section_video']['url']); ?>" width="1280" height="720" autoplay="" loop="" muted="" playsinline=""></video>
									</div>
								<?php } ?>
							</div>

							<div class="technology-section__left-item__text">
								<?php if (!empty($settings['fourth_section_heading'])) { ?>
									<div class="technology-section__left-item__top">
										<p class="h2"><?php echo esc_html($settings['fourth_section_heading']); ?></p>
									</div>
								<?php } ?>
								<?php if (!empty($settings['fourth_section_text'])) { ?>
									<div class="technology-section__left-item__bottom large-text">
										<p class="large-text"><?php echo esc_html($settings['fourth_section_text']); ?></p>
									</div>
								<?php } ?>
								<?php if (!empty($settings['fourth_section_btn_text']) && !empty($settings['fourth_section_btn_url'])) { ?>
									<div class="technology-section__right-item__button">
										<?php 
											$btn_target = isset($settings['fourth_section_btn_url']['is_external']) && $settings['fourth_section_btn_url']['is_external'] == 'on' ? 'target="_blank"' : '';	
											$btn_follow = isset($settings['fourth_section_btn_url']['nofollow']) && $settings['fourth_section_btn_url']['nofollow'] == 'on' ? 'rel="nofollow noopener"' : '';	
											$btn_custom_attr = isset($settings['fourth_section_btn_url']['custom_attributes']) && $settings['fourth_section_btn_url']['custom_attributes'] !== '' ? $settings['fourth_section_btn_url']['custom_attributes'] : '';	
										?>
										<a href="<?php echo esc_url($settings['fourth_section_btn_url']['url']); ?>"
											<?php echo ($btn_target); ?> 
											<?php echo ($btn_follow); ?> 
											<?php echo ($btn_custom_attr); ?>
										>
											<?php echo esc_html($settings['fourth_section_btn_text']); ?>
										</a>
									</div>
								<?php } ?>
							</div>
						</div>
					<?php } ?>
				</div>

				<div class="technology-section__right">
					<?php if (!empty($settings['first_section_heading']) && !empty($settings['first_section_text'])) { ?>
						<div class="technology-section__right-item">
							<?php if (!empty($settings['first_section_heading'])) { ?>
								<div class="technology-section__right-item__top">
									<h2 class="h2"><?php echo esc_html($settings['first_section_heading']); ?></h2>
								</div>
							<?php } ?>
							<?php if (!empty($settings['first_section_text'])) { ?>
								<div class="technology-section__right-item__bottom large-text">
									<p class="large-text"><?php echo esc_html($settings['first_section_text']); ?></p>
								</div>
							<?php } ?>
						</div>
					<?php } ?>

					<?php if (!empty($settings['second_section_heading']) && !empty($settings['second_section_text'])) { ?>
						<div class="technology-section__right-item">
							<?php if (!empty($settings['second_section_heading'])) { ?>
								<div class="technology-section__right-item__top">
									<h2 class="h2"><?php echo esc_html($settings['second_section_heading']); ?></h2>
								</div>
							<?php } ?>
							<?php if (!empty($settings['second_section_text'])) { ?>
								<div class="technology-section__right-item__bottom large-text">
									<p class="large-text"><?php echo esc_html($settings['second_section_text']); ?></p>
								</div>
							<?php } ?>
						</div>
					<?php } ?>
					
					<?php if (!empty($settings['third_section_heading']) && !empty($settings['third_section_text'])) { ?>
						<div class="technology-section__right-item">
							<?php if (!empty($settings['third_section_heading'])) { ?>
								<div class="technology-section__right-item__top">
									<h2 class="h2"><?php echo esc_html($settings['third_section_heading']); ?></h2>
								</div>
							<?php } ?>
							<?php if (!empty($settings['third_section_text'])) { ?>
								<div class="technology-section__right-item__bottom large-text">
									<p class="large-text"><?php echo esc_html($settings['third_section_text']); ?></p>
								</div>
							<?php } ?>
						</div>
					<?php } ?>

					<?php if (!empty($settings['fourth_section_heading']) && !empty($settings['fourth_section_text'])) { ?>
						<div class="technology-section__right-item">
							<?php if (!empty($settings['fourth_section_heading'])) { ?>
								<div class="technology-section__right-item__top">
									<h2 class="h2"><?php echo esc_html($settings['fourth_section_heading']); ?></h2>
								</div>
							<?php } ?>
							<?php if (!empty($settings['fourth_section_text'])) { ?>
								<div class="technology-section__right-item__bottom large-text">
									<p class="large-text"><?php echo esc_html($settings['fourth_section_text']); ?></p>
								</div>
							<?php } ?>
							<?php if (!empty($settings['fourth_section_btn_text']) && !empty($settings['fourth_section_btn_url'])) { ?>
								<div class="technology-section__right-item__button">
									<?php 
										$btn_target = isset($settings['fourth_section_btn_url']['is_external']) && $settings['fourth_section_btn_url']['is_external'] == 'on' ? 'target="_blank"' : '';	
										$btn_follow = isset($settings['fourth_section_btn_url']['nofollow']) && $settings['fourth_section_btn_url']['nofollow'] == 'on' ? 'rel="nofollow noopener"' : '';	
										$btn_custom_attr = isset($settings['fourth_section_btn_url']['custom_attributes']) && $settings['fourth_section_btn_url']['custom_attributes'] !== '' ? $settings['fourth_section_btn_url']['custom_attributes'] : '';	
									?>
									<a href="<?php echo esc_url($settings['fourth_section_btn_url']['url']); ?>"
										<?php echo ($btn_target); ?> 
										<?php echo ($btn_follow); ?> 
										<?php echo ($btn_custom_attr); ?>
									>
										<?php echo esc_html($settings['fourth_section_btn_text']); ?>
									</a>
								</div>
							<?php } ?>
						</div>
					<?php } ?>
				</div>
			</div>
		<?php } ?>
	<?php
	}
}