<?php

/**
 * Template Name: Resources
 *
 * @package Aera_Technology
 */

use function Aera\build_resource_query_args;
use function Aera\get_active_resource_type;
use function Aera\get_resource_label_for_post_type;
use function Aera\get_resource_types;

get_header();

$hero = function_exists('get_field') ? (array) get_field('resources_hero') : array();
$hero = wp_parse_args(
  $hero,
  array(
    'title'       => __('Resources', 'aera'),
    'description' => __('Browse the latest decision intelligence stories, research, videos, and news from Aera Technology.', 'aera'),
  )
);

$types = get_resource_types();
$active_slug = get_active_resource_type(filter_input(INPUT_GET, 'category', FILTER_SANITIZE_SPECIAL_CHARS));
$paged = max(1, get_query_var('paged') ?: get_query_var('page') ?: 1);

$resource_query = new WP_Query(build_resource_query_args($active_slug, $paged));

$demo_media_base = trailingslashit(get_template_directory_uri()) . 'assets/placeholder/';
$demo_resources = array(
  array(
    'title'      => __('Smarter Waste Mitigation for Maximum Margin Recovery and Less Loss', 'aera'),
    'excerpt'    => __('Aera’s Business Waste Mitigation Skill detects at-risk inventory and recommends the most effective mitigation path.', 'aera'),
    'type_label' => __('Blogs', 'aera'),
    'post_type'  => 'blog',
    'date'       => '2025-11-19',
    'image'      => $demo_media_base . 'aera_tile.png',
    'image_alt'  => __('Technology powered freight truck', 'aera'),
  ),
  array(
    'title'      => __('Hershey, Gallo Advance Decision Intelligence Across the Supply Chain', 'aera'),
    'excerpt'    => __('Supply chain leaders from Hershey and Gallo share how they are scaling decision intelligence from pilot to production.', 'aera'),
    'type_label' => __('News', 'aera'),
    'post_type'  => 'news',
    'date'       => '2025-11-18',
    'image'      => $demo_media_base . 'aera_tile.png',
    'image_alt'  => __('Corporate building exterior', 'aera'),
  ),
  array(
    'title'      => __('Fred Laluyaux: How Decision Intelligence & AI Agents Are Redefining Enterprise Operations', 'aera'),
    'excerpt'    => __('CEO Fred Laluyaux unpacks how organizations can move from dashboards to systems that sense, reason, and act.', 'aera'),
    'type_label' => __('Podcasts', 'aera'),
    'post_type'  => 'podcast',
    'date'       => '2025-11-13',
    'image'      => $demo_media_base . 'aera_tile.png',
    'image_alt'  => __('Animated conversational UI preview', 'aera'),
  ),
);

$base_url = get_permalink();
?>

<main id="primary" class="site-main site-main--resources">
  <section class="resources-hero">
    <div class="resources-hero__container">
      <h1 class="resources-hero__title"><?php echo esc_html($hero['title']); ?></h1>
      <p class="resources-hero__description"><?php echo esc_html($hero['description']); ?></p>
    </div>
  </section>

  <section class="resources-filter" data-active-filter="<?php echo esc_attr($active_slug); ?>">
    <div class="resources-filter__container">
      <div id="typeSelector" class="resources-filter__controls" role="tablist" aria-label="<?php esc_attr_e('Resource Categories', 'aera'); ?>">
        <?php foreach ($types as $slug => $type) : ?>
          <?php
          $url = 'all' === $slug ? remove_query_arg('category', $base_url) : add_query_arg('category', $slug, $base_url);
          $is_active = $slug === $active_slug;
          ?>
          <a
            class="resources-filter__button<?php echo $is_active ? ' is-active' : ''; ?>"
            href="<?php echo esc_url($url); ?>"
            data-filter="<?php echo esc_attr($slug); ?>"
            role="tab"
            aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>">
            <?php echo esc_html($type['label']); ?>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="resources-grid">
    <div class="resources-grid__container">
      <?php if ($resource_query->have_posts()) : ?>
        <div class="resources-grid__list">
          <?php
          while ($resource_query->have_posts()) :
            $resource_query->the_post();
            get_template_part(
              'template-parts/content',
              'resource-card',
              array(
                'post_id'     => get_the_ID(),
                'type_label'  => get_resource_label_for_post_type(get_post_type()),
                'external_url' => function_exists('get_field') ? get_field('resource_external_url') : '',
                'post_type'   => get_post_type(),
              )
            );
          endwhile;
          ?>
        </div>

        <?php
        $pagination = paginate_links(
          array(
            'total'   => $resource_query->max_num_pages,
            'current' => $paged,
            'type'    => 'list',
          )
        );
        if ($pagination) :
        ?>
          <nav class="resources-grid__pagination" aria-label="<?php esc_attr_e('Resources pagination', 'aera'); ?>">
            <?php echo wp_kses_post($pagination); ?>
          </nav>
        <?php endif; ?>
      <?php else : ?>
        <div ist"resources-grid__list">
          <?php foreach ($demo_resources as $item) : ?>
            <?php
            get_template_part(
              'template-parts/content',
              'resource',
              array(
                'title'      => $item['title'],
                'excerpt'    => $item['excerpt'],
                'type_label' => $item['type_label'],
                'date'       => $item['date'],
                'link'       => '#',
                'is_demo'    => true,
                'post_type'  => $item['post_type'] ?? 'blog',
                'image'      => $item['image'] ?? '',
                'image_alt'  => $item['image_alt'] ?? '',
              )
            );
            ?>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </section>
</main>

<?php
wp_reset_postdata();
get_footer();
