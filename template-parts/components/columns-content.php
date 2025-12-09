<?php
/**
 * Template part for displaying columns content section
 *
 * @package Aera_Technology
 *
 * @param array $args {
 *   Optional. Array of column data and options.
 *   @type array $columns Array of column arrays. Each column can have:
 *                        - 'column_title' or 'title' (required)
 *                        - 'column_content' or 'text' or 'content' (optional)
 *   @type string $heading_level Heading level to use (h2, h3, etc.). Default: 'h2'
 *   @type string $section_class CSS class for the section wrapper. Default: 'about'
 *   @type string $content_class CSS class for content wrapper. Default: 'columnContentItem__content'
 * }
 */

defined('ABSPATH') || exit;

$columns = $args['columns'] ?? array();
$heading_level = $args['heading_level'] ?? 'h2';
$section_class = $args['section_class'] ?? 'about';
$content_class = $args['content_class'] ?? 'columnContentItem__content';

// Normalize column data - support different field name variations
$normalized_columns = array();
foreach ($columns as $column) {
  // Support both 'column_title'/'title' and 'title'
  $title = $column['column_title'] ?? $column['title'] ?? '';

  // Support 'column_content', 'text', or 'content'
  $content = $column['column_content'] ?? $column['text'] ?? $column['content'] ?? '';

  if (!empty($title)) {
    $normalized_columns[] = array(
      'title' => $title,
      'content' => $content,
    );
  }
}

// Don't display if no valid columns
if (empty($normalized_columns)) {
  return;
}
?>

<section class="<?php echo esc_attr($section_class); ?>">
  <div class="columnContent">
    <div class="columnContent__container">
      <div class="columnContent__row">
        <?php foreach ($normalized_columns as $column) : ?>
          <div class="columnContent__col">
            <div class="columnContentItem">
              <<?php echo esc_html($heading_level); ?> class="columnContentItem__title"><?php echo esc_html($column['title']); ?></<?php echo esc_html($heading_level); ?>>
              <?php if (!empty($column['content'])) : ?>
                <div class="<?php echo esc_attr($content_class); ?>"><?php echo wp_kses_post($column['content']); ?></div>
              <?php endif; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

