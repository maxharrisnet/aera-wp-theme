<?php

/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Aera_Technology
 */

get_header();

$paged = max(1, get_query_var('paged') ?: get_query_var('page') ?: 1);
?>

<main id="primary" class="site-main site-main--archive">

  <?php if (have_posts()) : ?>

    <div class="archive">
      <div class="archive__container">
        <div class="archive__list">
          <div class="archive__col">
            <?php
            /* Start the Loop */
            while (have_posts()) :
              the_post();

              $post_type = get_post_type();

              // Use case study card template for case-study post type
              if ($post_type === 'case-study') {
                get_template_part('template-parts/content', 'case-study-card');
              } else {
                // Use resource-card template for resource-like post types
                $resource_types = array('blog', 'news', 'press-release', 'whitepaper', 'podcast', 'video', 'webinar');
                if (in_array($post_type, $resource_types, true)) {
                  get_template_part(
                    'template-parts/content',
                    'resource-card',
                    array(
                      'post_id'      => get_the_ID(),
                      'type_label'   => get_the_author(), // For author pages
                      'external_url' => function_exists('get_field') ? get_field('resource_external_url') : '',
                      'post_type'    => $post_type,
                    )
                  );
                } else {
                  // Fallback to standard content template
                  get_template_part('template-parts/content', $post_type);
                }
              }

            endwhile;
            ?>
          </div>
        </div>

        <?php
        $pagination = paginate_links(
          array(
            'type'   => 'list',
            'current' => $paged,
          )
        );
        if ($pagination) :
        ?>
          <nav class="archive__pagination" aria-label="<?php esc_attr_e('Archive pagination', 'aera'); ?>">
            <?php echo wp_kses_post($pagination); ?>
          </nav>
        <?php endif; ?>
      </div>
    </div>

  <?php else :

    get_template_part('template-parts/content', 'none');

  endif;
  ?>

</main><!-- #main -->

<?php
get_sidebar();
get_footer();
