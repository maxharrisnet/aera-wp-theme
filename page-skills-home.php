<?php

/**
 * Template Name: Skills Home
 * Description: Landing page for Aera Skills with featured skills grid
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();
?>

<main id="primary" class="site-main site-main--skills-home">
	<?php
	while (have_posts()) :
		the_post();

		// Get ACF hero fields if they exist
		$hero_title = get_field('hero_title') ?: __('Aera Skills™', 'aera');
		$hero_text = get_field('hero_text') ?: __('Powered by the Aera Decision Cloud™, Aera Skills provide real-time insights, recommendations, and predictions. Aera Skills deliver prepackaged content, logic, and interactions that augment and automate business decisions.', 'aera');

		// Prepare hero data
		$hero_args = array(
			'hero_title' => $hero_title,
			'hero_text' => $hero_text,
			'hero_full_height' => true,
		);

		get_template_part('template-parts/components/hero', null, $hero_args);
		?>

		<!-- Skills Grid Section -->
		<section class="skills-home">
			<div class="skills-home__container">

				<!-- Featured Skills Grid (Top 2 large cards) -->
				<div class="skills-home__featured-grid">
					<?php
					// Query for featured skills (you can customize this query)
					$featured_skills_args = array(
						'post_type' => 'skill',
						'posts_per_page' => 2,
						'orderby' => 'menu_order',
						'order' => 'ASC',
						'meta_query' => array(
							array(
								'key' => 'featured_skill',
								'compare' => 'EXISTS',
							),
						),
					);

					$featured_skills = new WP_Query($featured_skills_args);

					if ($featured_skills->have_posts()) :
						while ($featured_skills->have_posts()) :
							$featured_skills->the_post();
							get_template_part('template-parts/content', 'skill-card', array('featured' => true));
						endwhile;
						wp_reset_postdata();
					else :
						// Fallback: show first 2 skills if no featured skills
						$fallback_args = array(
							'post_type' => 'skill',
							'posts_per_page' => 2,
							'orderby' => 'menu_order',
							'order' => 'ASC',
						);

						$fallback_query = new WP_Query($fallback_args);

						if ($fallback_query->have_posts()) :
							while ($fallback_query->have_posts()) :
								$fallback_query->the_post();
								get_template_part('template-parts/content', 'skill-card', array('featured' => true));
							endwhile;
							wp_reset_postdata();
						endif;
					endif;
					?>
				</div>

				<!-- Regular Skills Grid (Next 8 cards) -->
				<div class="skills-home__regular-grid">
					<?php
					// Query for regular skills (skip first 2)
					$regular_skills_args = array(
						'post_type' => 'skill',
						'posts_per_page' => 8,
						'offset' => 2,
						'orderby' => 'menu_order',
						'order' => 'ASC',
					);

					$regular_skills = new WP_Query($regular_skills_args);

					if ($regular_skills->have_posts()) :
						while ($regular_skills->have_posts()) :
							$regular_skills->the_post();
							get_template_part('template-parts/content', 'skill-card');
						endwhile;
						wp_reset_postdata();
					endif;
					?>
				</div>

				<!-- View All Skills CTA -->
				<div class="skills-home__cta">
					<a href="<?php echo esc_url(get_post_type_archive_link('skill')); ?>" class="skills-home__cta-button">
						<?php esc_html_e('View All Skills', 'aera'); ?>
					</a>
				</div>
			</div>
		</section>

		<!-- Icon Section -->
		<?php
		$icon_section_title = get_field('icon_section_title') ?: __('Title', 'aera');
		$icon_items = get_field('icon_items');

		if ($icon_items && is_array($icon_items)) :
			?>
			<section class="skills-home__icon-section">
				<div class="skills-home__container">
					<h2 class="skills-home__icon-title"><?php echo esc_html($icon_section_title); ?></h2>
					<div class="skills-home__icon-grid">
						<?php foreach ($icon_items as $item) : ?>
							<div class="skills-home__icon-item">
								<?php if (!empty($item['icon'])) : ?>
									<div class="skills-home__icon-image">
										<img src="<?php echo esc_url($item['icon']['url']); ?>" alt="<?php echo esc_attr($item['icon']['alt'] ?: $item['title']); ?>" />
									</div>
								<?php endif; ?>
								<?php if (!empty($item['title'])) : ?>
									<h3 class="skills-home__icon-item-title"><?php echo esc_html($item['title']); ?></h3>
								<?php endif; ?>
								<?php if (!empty($item['description'])) : ?>
									<p class="skills-home__icon-item-text"><?php echo esc_html($item['description']); ?></p>
								<?php endif; ?>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			</section>
		<?php endif; ?>

		<!-- Resources Section -->
		<?php
		$resources_title = get_field('resources_section_title') ?: __('Resources', 'aera');
		$featured_resources = get_field('featured_resources');

		if ($featured_resources && is_array($featured_resources)) :
			?>
			<section class="skills-home__resources-section">
				<div class="skills-home__container">
					<h2 class="skills-home__resources-title"><?php echo esc_html($resources_title); ?></h2>
					<div class="skills-home__resources-grid">
						<?php
						foreach ($featured_resources as $resource) :
							if (is_object($resource) && isset($resource->ID)) :
								// It's a post object
								$post_id = $resource->ID;
								setup_postdata($resource);
								get_template_part('template-parts/content', 'resource-card');
								wp_reset_postdata();
							endif;
						endforeach;
						?>
					</div>
				</div>
			</section>
		<?php endif; ?>

		<!-- See Aera in Action CTA Section -->
		<?php
		$action_title = get_field('action_section_title') ?: __('See Aera in Action', 'aera');
		$action_button_1_text = get_field('action_button_1_text') ?: __('Learn About the Platform', 'aera');
		$action_button_1_url = get_field('action_button_1_url') ?: home_url('/platform');
		$action_button_2_text = get_field('action_button_2_text') ?: __('Schedule Demo', 'aera');
		$action_button_2_url = get_field('action_button_2_url') ?: home_url('/demo');
		?>
		<section class="skills-home__action-section">
			<div class="skills-home__container">
				<h2 class="skills-home__action-title"><?php echo esc_html($action_title); ?></h2>
				<div class="skills-home__action-buttons">
					<a href="<?php echo esc_url($action_button_1_url); ?>" class="skills-home__action-button">
						<?php echo esc_html($action_button_1_text); ?>
					</a>
					<a href="<?php echo esc_url($action_button_2_url); ?>" class="skills-home__action-button">
						<?php echo esc_html($action_button_2_text); ?>
					</a>
				</div>
			</div>
		</section>

	<?php endwhile; ?>
</main>

<?php
get_footer();

