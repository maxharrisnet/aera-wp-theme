<?php

/**
 * Template Name: Customers
 *
 * @package Aera_Technology
 */

use function Aera\get_resource_label_for_post_type;

get_header();

$paged = max(1, get_query_var('paged') ?: get_query_var('page') ?: 1);

// Query customers
$customer_query_args = array(
  'post_type'      => 'customer',
  'posts_per_page' => 12,
  'paged'          => $paged,
  'post_status'    => 'publish',
  'orderby'        => 'date',
  'order'          => 'DESC',
);

$customer_query = new WP_Query($customer_query_args);

$demo_media_base = trailingslashit(get_template_directory_uri()) . 'assets/placeholder/';
$demo_customers = array(
  array(
    'title'      => __('Customer Success Story Example', 'aera'),
    'excerpt'    => __('Learn how this customer transformed their operations with Aera Technology.', 'aera'),
    'type_label' => __('Customer', 'aera'),
    'post_type'  => 'customer',
    'date'       => date('Y-m-d'),
    'image'      => $demo_media_base . 'aera_tile.png',
    'image_alt'  => __('Customer logo', 'aera'),
  ),
);
?>

<main id="primary" class="site-main site-main--customers">

  <?php get_template_part('template-parts/components/hero'); ?>

  <div class="customers">
    <div class="customers__container">
      <?php if ($customer_query->have_posts()) : ?>
        <div class="customers__list">
          <div class="customers__col">
            <?php
            while ($customer_query->have_posts()) :
              $customer_query->the_post();
              get_template_part(
                'template-parts/content',
                'resource-card',
                array(
                  'post_id'     => get_the_ID(),
                  'type_label'  => get_resource_label_for_post_type('customer'),
                  'external_url' => function_exists('get_field') ? get_field('resource_external_url') : '',
                  'post_type'   => 'customer',
                )
              );
            endwhile;
            ?>
          </div>
        </div>

        <?php
        $pagination = paginate_links(
          array(
            'total'   => $customer_query->max_num_pages,
            'current' => $paged,
            'type'    => 'list',
          )
        );
        if ($pagination) :
        ?>
          <nav class="customers__pagination" aria-label="<?php esc_attr_e('Customers pagination', 'aera'); ?>">
            <?php echo wp_kses_post($pagination); ?>
          </nav>
        <?php endif; ?>
      <?php else : ?>
        <div class="customers__list">
          <div class="customers__col">
            <?php foreach ($demo_customers as $item) : ?>
              <?php
              get_template_part(
                'template-parts/content',
                'resource-card',
                array(
                  'title'      => $item['title'],
                  'excerpt'    => $item['excerpt'],
                  'type_label' => $item['type_label'],
                  'date'       => $item['date'],
                  'link'       => '#',
                  'is_demo'    => true,
                  'post_type'  => $item['post_type'] ?? 'customer',
                  'image'      => $item['image'] ?? '',
                  'image_alt'  => $item['image_alt'] ?? '',
                )
              );
              ?>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>

  <?php
  // CTA section - "See Aera in action"
  $cta_title = __('See Aera in action.', 'aera');
  $cta_text = __('Schedule Demo', 'aera');
  $cta_link = home_url('/demo');
  ?>
  <div class="customers__cta">
    <h2 class="customers__ctaTitle"><?php echo esc_html($cta_title); ?></h2>
    <a href="<?php echo esc_url($cta_link); ?>" class="customers__ctaButton"><?php echo esc_html($cta_text); ?></a>
  </div>

</main>

<?php
wp_reset_postdata();
get_footer();
