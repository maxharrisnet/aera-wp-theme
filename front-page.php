<?php
/**
 * Front page template.
 *
 * @package Aera_Technology
 */

get_header();

$hero = function_exists('get_field') ? (array) get_field('home_hero') : array();
$hero = wp_parse_args(
  $hero,
  array(
    'title'       => __('Hello, I’m Aera.', 'aera'),
    'tagline'     => __('Your Decision Intelligence Agent™', 'aera'),
    'description' => __('Aera understands how your business works, makes real-time recommendations, takes action autonomously, and learns from every decision made.', 'aera'),
    'cta_label'   => __('Schedule Demo', 'aera'),
    'cta_link'    => home_url('/demo'),
  )
);

$technology_sections = function_exists('get_field') ? (array) get_field('home_technology_sections') : array();

if (empty($technology_sections)) {
  $technology_sections = array(
    array(
      'title'       => __('Aera understands.', 'aera'),
      'description' => __('Aera continuously crawls enterprise systems; refines, indexes, and augments data; and delivers real-time visibility into your operations.', 'aera'),
      'video'       => '',
      'messages'    => array(
        array(
          'speaker' => 'user',
          'text'    => __('Aera, what’s my forecast?', 'aera'),
        ),
        array(
          'speaker' => 'aera',
          'text'    => __('On track at $1.2B with an additional $134M revenue opportunity. Do you want the regional breakdown?', 'aera'),
        ),
      ),
    ),
    array(
      'title'       => __('Aera recommends.', 'aera'),
      'description' => __('Aera uses real-time data and AI to predict risks and opportunities accurately, then recommends the best course of action.', 'aera'),
      'video'       => '',
      'messages'    => array(
        array(
          'speaker' => 'user',
          'text'    => __('Aera, how can I reduce my working capital?', 'aera'),
        ),
        array(
          'speaker' => 'aera',
          'text'    => __('Transferring excess inventory from Santiago to São Paulo will reduce working capital by $22.1M.', 'aera'),
        ),
      ),
    ),
    array(
      'title'       => __('Aera acts.', 'aera'),
      'description' => __('Aera proactively engages relevant users and autonomously drives the execution of decisions.', 'aera'),
      'video'       => '',
      'messages'    => array(
        array(
          'speaker' => 'aera',
          'text'    => __('I predict a competitor stock-out for the Logo product in Germany.', 'aera'),
        ),
        array(
          'speaker' => 'user',
          'text'    => __('Aera, do we have excess inventory that we can ship?', 'aera'),
        ),
        array(
          'speaker' => 'aera',
          'text'    => __('Yes, I found excess inventory to fill 53% of the projected stock-out.', 'aera'),
        ),
      ),
    ),
    array(
      'title'       => __('Aera learns.', 'aera'),
      'description' => __('Aera learns from decisions made and their outcomes in order to improve future recommendations.', 'aera'),
      'video'       => '',
      'cta_link'    => home_url('/aera-decision-cloud'),
      'cta_label'   => __('More About the technology', 'aera'),
      'messages'    => array(
        array(
          'speaker' => 'aera',
          'text'    => __('I found capacity for 100,000 units of Logo product in plant P23 for this month. Shall we launch production?', 'aera'),
        ),
        array(
          'speaker' => 'user',
          'text'    => __('Let’s do it!', 'aera'),
        ),
      ),
    ),
  );
}

$additional_text = function_exists('get_field') ? get_field('home_additional_text') : '';
$additional_text = $additional_text ? $additional_text : __('With Decision Intelligence, your business is agile, scalable, and continuously learning.', 'aera');

$cta = function_exists('get_field') ? (array) get_field('home_cta') : array();
$cta = wp_parse_args(
  $cta,
  array(
    'title' => __('See Aera in action.', 'aera'),
    'text'  => __('Schedule Demo', 'aera'),
    'link'  => home_url('/demo'),
  )
);
?>

<main id="primary" class="site-main site-main--home">
	<section class="intro intro--home">
		<div class="intro__container">
			<h1 class="intro__title"><?php echo esc_html($hero['title']); ?></h1>
			<p class="intro__subtitle"><?php echo esc_html($hero['tagline']); ?></p>
			<p class="intro__text"><?php echo esc_html($hero['description']); ?></p>
			<?php if (! empty($hero['cta_label']) && ! empty($hero['cta_link'])) : ?>
				<a class="button" href="<?php echo esc_url($hero['cta_link']); ?>">
					<?php echo esc_html($hero['cta_label']); ?>
				</a>
			<?php endif; ?>
		</div>
	</section>

	<section class="technology" id="sectionTechnology">
		<div class="technology__container">
			<?php foreach ($technology_sections as $index => $section) : ?>
				<?php
				$title = $section['title'] ?? '';
				$description = $section['description'] ?? '';
				$video = $section['video'] ?? '';
				$messages = $section['messages'] ?? array();
				$cta_link = $section['cta_link'] ?? '';
				$cta_label = $section['cta_label'] ?? '';
				?>
				<article class="technology__item" data-technology="<?php echo esc_attr($index); ?>">
					<header class="technology__header">
						<p class="technology__step"><?php printf(esc_html__('0%d', 'aera'), $index + 1); ?></p>
						<h2 class="technology__title"><?php echo esc_html($title); ?></h2>
					</header>
					<div class="technology__body">
						<p class="technology__description"><?php echo esc_html($description); ?></p>
						<?php if ($cta_link && $cta_label) : ?>
							<a class="technology__link" href="<?php echo esc_url($cta_link); ?>"><?php echo esc_html($cta_label); ?></a>
						<?php endif; ?>
					</div>
					<?php if ($video) : ?>
						<div class="technology__media">
							<video class="technology__video" autoplay muted loop playsinline preload="metadata">
								<source src="<?php echo esc_url($video); ?>" type="video/mp4" />
							</video>
						</div>
					<?php endif; ?>
					<?php if (! empty($messages)) : ?>
						<ul class="technology__messages">
							<?php foreach ($messages as $message) : ?>
								<li class="technology__message technology__message--<?php echo esc_attr($message['speaker'] ?? 'user'); ?>">
									<span class="technology__messageLabel">
										<?php echo 'aera' === ($message['speaker'] ?? '') ? esc_html__('Aera', 'aera') : esc_html__('You', 'aera'); ?>
									</span>
									<p><?php echo esc_html($message['text'] ?? ''); ?></p>
								</li>
							<?php endforeach; ?>
						</ul>
					<?php endif; ?>
				</article>
			<?php endforeach; ?>
		</div>
	</section>

	<section class="additionalsection">
		<div class="additionalsection__container">
			<p class="additionalsection__text"><?php echo esc_html($additional_text); ?></p>
		</div>
	</section>

	<section class="request">
		<div class="request__container">
			<div class="request__content">
				<h2 class="request__title"><?php echo esc_html($cta['title']); ?></h2>
				<a class="button button--outline" href="<?php echo esc_url($cta['link']); ?>"><?php echo esc_html($cta['text']); ?></a>
			</div>
		</div>
	</section>
</main>

<?php
get_footer();

