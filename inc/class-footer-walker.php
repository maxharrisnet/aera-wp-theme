<?php

/**
 * Custom Footer Navigation Walker
 *
 * Extends WordPress Walker_Nav_Menu to add custom markup for footer menus:
 * - Parent links with Footer_footer__parentLink classes
 * - Child links with Footer_footer__link classes
 * - Proper list structure matching the design system
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Custom footer navigation walker class.
 */
class Footer_Walker extends \Walker_Nav_Menu
{

  /**
   * Starts the list before the elements are added.
   *
   * @param string   $output Used to append additional content (passed by reference).
   * @param int      $depth  Depth of menu item. Used for padding.
   * @param stdClass $args   An object of wp_nav_menu() arguments.
   */
  public function start_lvl(&$output, $depth = 0, $args = null)
  {
    // Footer menus don't use nested lists
    return;
  }

  /**
   * Ends the list after the elements are added.
   *
   * @param string   $output Used to append additional content (passed by reference).
   * @param int      $depth  Depth of menu item. Used for padding.
   * @param stdClass $args   An object of wp_nav_menu() arguments.
   */
  public function end_lvl(&$output, $depth = 0, $args = null)
  {
    // Footer menus don't use nested lists
    return;
  }

  /**
   * Starts the element output.
   *
   * @param string   $output Used to append additional content (passed by reference).
   * @param WP_Post  $item   Menu item data object.
   * @param int      $depth  Depth of menu item. Used for padding.
   * @param stdClass $args   An object of wp_nav_menu() arguments.
   * @param int      $id     Current item ID.
   */
  public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
  {
    if (isset($args->item_spacing) && 'discard' === $args->item_spacing) {
      $t = '';
      $n = '';
    } else {
      $t = "\t";
      $n = "\n";
    }
    $indent = ($depth) ? str_repeat($t, $depth) : '';

    $classes   = empty($item->classes) ? array() : (array) $item->classes;
    $classes[] = 'menu-item-' . $item->ID;

    /**
     * Filters the arguments for a single nav menu item.
     *
     * @param stdClass $args  An object of wp_nav_menu() arguments.
     * @param WP_Post  $item  Menu item data object.
     * @param int      $depth Depth of menu item. Used for padding.
     */
    $args = apply_filters('nav_menu_item_args', $args, $item, $depth);

    /**
     * Filters the CSS classes applied to a menu item's list item element.
     *
     * @param string[] $classes Array of the CSS classes that are applied to the menu item's `<li>` element.
     * @param WP_Post  $item    The current menu item.
     * @param stdClass $args    An object of wp_nav_menu() arguments.
     * @param int      $depth   Depth of menu item. Used for padding.
     */
    $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
    $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

    /**
     * Filters the ID applied to a menu item's list item element.
     *
     * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
     * @param WP_Post  $item    The current menu item.
     * @param stdClass $args    An object of wp_nav_menu() arguments.
     * @param int      $depth   Depth of menu item. Used for padding.
     */
    $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth);
    $id = $id ? ' id="' . esc_attr($id) . '"' : '';

    $output .= $indent . '<li' . $id . $class_names . '>';

    $atts           = array();
    $atts['title']  = ! empty($item->attr_title) ? $item->attr_title : '';
    $atts['target'] = ! empty($item->target) ? $item->target : '';
    if ('_blank' === $item->target && empty($item->xfn)) {
      $atts['rel'] = 'noopener noreferrer';
    } else {
      $atts['rel'] = $item->xfn;
    }
    $atts['href']         = ! empty($item->url) ? $item->url : '';
    $atts['aria-current'] = $item->current ? 'page' : '';

    // Add data attributes for analytics
    $atts['data-event-category'] = 'Footer';
    $atts['data-event-action']   = 'Click';
    $atts['data-event-name']     = ! empty($item->title) ? $item->title : '';

    /**
     * Filters the HTML attributes applied to a menu item's anchor element.
     *
     * @param array $atts {
     *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
     *
     *     @type string $title        Title attribute.
     *     @type string $target       Target attribute.
     *     @type string $rel          The rel attribute.
     *     @type string $href         The href attribute.
     *     @type string $aria_current The aria-current attribute.
     * }
     * @param WP_Post  $item  The current menu item.
     * @param stdClass $args  An object of wp_nav_menu() arguments.
     * @param int      $depth Depth of menu item. Used for padding.
     */
    $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);

    // Determine if this is a parent link (first item in menu) or child link
    $is_parent = $this->is_parent_link($item, $args);
    $link_class = $is_parent ? 'Footer_footer__parentLink_2LsJC Footer_footer__parentLinkHover_2THi4' : 'Footer_footer__link_2A8DS';

    // Add link class
    if (isset($atts['class'])) {
      $existing_classes = is_array($atts['class']) ? $atts['class'] : explode(' ', $atts['class']);
      $existing_classes[] = $link_class;
      $atts['class'] = array_unique($existing_classes);
    } else {
      $atts['class'] = $link_class;
    }

    $attributes = '';
    foreach ($atts as $attr => $value) {
      if (is_scalar($value) && '' !== $value) {
        if ('class' === $attr && is_array($value)) {
          $value = join(' ', array_filter($value));
        }
        $value       = ('href' === $attr) ? esc_url($value) : esc_attr($value);
        $attributes .= ' ' . $attr . '="' . $value . '"';
      } elseif ('class' === $attr && is_array($value)) {
        $value = join(' ', array_filter($value));
        $attributes .= ' ' . $attr . '="' . esc_attr($value) . '"';
      }
    }

    /** This filter is documented in wp-includes/post-template.php */
    $title = apply_filters('the_title', $item->title, $item->ID);

    /**
     * Filters a menu item's title.
     *
     * @param string   $title The menu item's title.
     * @param WP_Post  $item  The current menu item.
     * @param stdClass $args  An object of wp_nav_menu() arguments.
     * @param int      $depth Depth of menu item. Used for padding.
     */
    $title = apply_filters('nav_menu_item_title', $title, $item, $args, $depth);

    $item_output  = isset($args->before) ? $args->before : '';
    $item_output .= '<a' . $attributes . '>';
    $item_output .= (isset($args->link_before) ? $args->link_before : '') . $title . (isset($args->link_after) ? $args->link_after : '');
    $item_output .= '</a>';
    $item_output .= isset($args->after) ? $args->after : '';

    /**
     * Filters a menu item's starting output.
     *
     * The menu item's starting output only includes `$args->before`, the opening `<a>`,
     * the menu item's title, the closing `</a>`, and `$args->after`. Currently, there is
     * no filter for modifying the opening and closing `<li>` tags.
     *
     * @param string   $item_output The menu item's starting HTML output.
     * @param WP_Post  $item        Menu item data object.
     * @param int      $depth       Depth of menu item. Used for padding.
     * @param stdClass $args        An object of wp_nav_menu() arguments.
     */
    $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
  }

  /**
   * Ends the element output.
   *
   * @param string   $output Used to append additional content (passed by reference).
   * @param WP_Post  $item   Page data object. Not used.
   * @param int      $depth  Depth of page. Not Used.
   * @param stdClass $args   An object of wp_nav_menu() arguments.
   */
  public function end_el(&$output, $item, $depth = 0, $args = null)
  {
    if (isset($args->item_spacing) && 'discard' === $args->item_spacing) {
      $t = '';
      $n = '';
    } else {
      $t = "\t";
      $n = "\n";
    }
    $output .= "</li>{$n}";
  }

  /**
   * Determine if a menu item is a parent link (first top-level item in the menu).
   *
   * @param WP_Post  $item Menu item data object.
   * @param stdClass $args An object of wp_nav_menu() arguments.
   * @return bool True if parent link, false otherwise.
   */
  private function is_parent_link($item, $args)
  {
    // Check if this is a top-level item (no parent) and if it's the first one we've seen
    // We'll use a static array to track first items per menu
    static $first_items = array();

    $menu_id = isset($args->menu) && isset($args->menu->term_id) ? $args->menu->term_id : 0;

    // If this is a top-level item (no parent)
    if ($item->menu_item_parent == 0) {
      // Check if we've already seen a first item for this menu
      if (!isset($first_items[$menu_id])) {
        // This is the first top-level item, mark it and return true
        $first_items[$menu_id] = $item->ID;
        return true;
      }
      // Not the first top-level item
      return false;
    }

    // Has a parent, so it's a child link
    return false;
  }
}

