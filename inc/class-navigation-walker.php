<?php

/**
 * Custom Navigation Walker
 *
 * Extends WordPress Walker_Nav_Menu to add custom markup:
 * - Adds navigation__arrowUp div to sub-menus
 * - Adds data-menu-type attributes to menu items
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Custom navigation walker class.
 */
class Navigation_Walker extends \Walker_Nav_Menu
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
    if (isset($args->item_spacing) && 'discard' === $args->item_spacing) {
      $t = '';
      $n = '';
    } else {
      $t = "\t";
      $n = "\n";
    }
    $indent = str_repeat($t, $depth);

    // Default class.
    $classes = array('sub-menu');

    /**
     * Filters the CSS class(es) applied to a menu list element.
     *
     * @param string[] $classes Array of the CSS classes that are applied to the menu `<ul>` element.
     * @param stdClass $args    An object of `wp_nav_menu()` arguments.
     * @param int      $depth   Depth of menu item. Used for padding.
     */
    $class_names = join(' ', apply_filters('nav_menu_submenu_css_class', $classes, $args, $depth));
    $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

    $output .= "{$n}{$indent}<ul$class_names>{$n}";
    // Add the navigation arrow div at the start of sub-menu
    $output .= "{$indent}\t<div class=\"navigation__arrowUp\"></div>{$n}";
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
    $classes[] = 'navigation__item';
    $classes[] = 'navigation__link';

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

    // Determine menu type based on URL
    $menu_type = $this->get_menu_type($item->url);

    // Add data-menu-type attribute if menu type is determined
    $data_menu_type = $menu_type ? ' data-menu-type="' . esc_attr($menu_type) . '"' : '';

    $output .= $indent . '<li' . $id . $class_names . $data_menu_type . '>';

    $atts           = array();
    $atts['title']  = ! empty($item->attr_title) ? $item->attr_title : '';
    $atts['target'] = ! empty($item->target) ? $item->target : '';
    if ('_blank' === $item->target && empty($item->xfn)) {
      $atts['rel'] = 'noopener';
    } else {
      $atts['rel'] = $item->xfn;
    }
    $atts['href']         = ! empty($item->url) ? $item->url : '';
    $atts['aria-current'] = $item->current ? 'page' : '';

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

    // Add navigation__link class to anchor, merging with existing class if present
    if (isset($atts['class'])) {
      $existing_classes = is_array($atts['class']) ? $atts['class'] : explode(' ', $atts['class']);
      $existing_classes[] = 'navigation__link';
      $atts['class'] = array_unique($existing_classes);
    } else {
      $atts['class'] = 'navigation__link';
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
   * Determine menu type based on URL.
   *
   * @param string $url Menu item URL.
   * @return string|false Menu type or false if not determined.
   */
  private function get_menu_type($url)
  {
    if (empty($url)) {
      return false;
    }

    // Parse URL to get path
    $parsed_url = wp_parse_url($url);
    $path       = isset($parsed_url['path']) ? $parsed_url['path'] : '';

    // Determine menu type based on path - only add for resources and events
    if (strpos($path, 'resources') !== false) {
      return 'resources';
    } elseif (strpos($path, 'events') !== false || strpos($path, 'webinars') !== false) {
      return 'events';
    }

    return false;
  }
}
