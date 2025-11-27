<?php

/**
 * Custom Footer Social Navigation Walker
 *
 * Extends WordPress Walker_Nav_Menu to add custom markup for footer social links:
 * - Social link classes and structure
 * - SVG icons based on link URL
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Custom footer social navigation walker class.
 */
class Footer_Social_Walker extends \Walker_Nav_Menu
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
    // Social menus don't use nested lists
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
    // Social menus don't use nested lists
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
    $classes[] = 'Social_social__item_sF9is';

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

    // Add social link class
    if (isset($atts['class'])) {
      $existing_classes = is_array($atts['class']) ? $atts['class'] : explode(' ', $atts['class']);
      $existing_classes[] = 'Social_social__link_21NqN';
      $atts['class'] = array_unique($existing_classes);
    } else {
      $atts['class'] = 'Social_social__link_21NqN';
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

    // Get SVG icon based on URL
    $svg_icon = $this->get_social_icon($item->url, $title);

    $item_output  = isset($args->before) ? $args->before : '';
    $item_output .= '<a' . $attributes . '>';
    $item_output .= $svg_icon;
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
   * Get SVG icon for social link based on URL.
   *
   * @param string $url  Menu item URL.
   * @param string $title Menu item title.
   * @return string SVG icon markup.
   */
  private function get_social_icon($url, $title)
  {
    $icon_class = 'Social_social__linkIcon_Yvp88';
    $data_attrs = 'data-event-category="Footer" data-event-action="Click" data-event-name="' . esc_attr($title) . '"';

    // Determine icon based on URL or title
    $url_lower = strtolower($url);
    $title_lower = strtolower($title);

    if (strpos($url_lower, 'twitter') !== false || strpos($title_lower, 'twitter') !== false) {
      return '<svg height="10px" width="10px" version="1.1" viewBox="0 0 10 10" ' . $data_attrs . ' class="' . esc_attr($icon_class) . '"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1" d="M 0.0195312 0.0273438 C 0.0429688 0.0585938 3.855469 5.492188 3.890625 5.542969 L 3.902344 5.558594 L 1.972656 7.753906 C 0.914062 8.964844 0.03125 9.960938 0.0195312 9.976562 L 0 10 L 0.878906 10 L 2.589844 8.058594 C 3.527344 6.992188 4.292969 6.121094 4.296875 6.121094 C 4.296875 6.121094 4.910156 6.992188 5.660156 8.058594 L 7.019531 10 L 10 10 L 9.988281 9.980469 C 9.980469 9.972656 9.074219 8.679688 7.964844 7.101562 C 6.859375 5.527344 5.957031 4.238281 5.957031 4.238281 C 5.957031 4.234375 6.789062 3.277344 7.8125 2.121094 C 8.835938 0.957031 9.667969 0.0078125 9.667969 0.00390625 C 9.667969 0.00390625 9.472656 0 9.230469 0 L 8.792969 0 L 7.175781 1.835938 C 6.292969 2.84375 5.5625 3.671875 5.5625 3.671875 C 5.558594 3.671875 4.976562 2.84375 4.269531 1.835938 L 2.980469 0 L 0 0 Z M 2.808594 1.003906 C 3.996094 2.660156 8.785156 9.371094 8.789062 9.375 C 8.792969 9.382812 8.65625 9.382812 8.113281 9.382812 L 7.4375 9.382812 L 6.019531 7.394531 C 5.238281 6.300781 3.835938 4.335938 2.902344 3.027344 C 1.96875 1.726562 1.203125 0.652344 1.203125 0.652344 C 1.203125 0.648438 1.488281 0.648438 1.878906 0.648438 L 2.554688 0.648438 Z M 2.808594 1.003906 "></path></g></svg>';
    } elseif (strpos($url_lower, 'linkedin') !== false || strpos($title_lower, 'linkedin') !== false) {
      return '<svg height="12" width="12" viewBox="0 0 12 12" ' . $data_attrs . ' class="' . esc_attr($icon_class) . '"><path d="M11.12 0H.89A.88.88 0 0 0 0 .86v10.28a.88.88 0 0 0 .89.86h10.23a.88.88 0 0 0 .89-.87V.86a.88.88 0 0 0-.89-.86zM3.57 10.23H1.79V4.5h1.78zm-.89-6.52a1 1 0 0 1 0-2.06 1 1 0 0 1 0 2.06zm7.56 6.51H8.45V7.44c0-.66 0-1.52-.93-1.52s-1.07.72-1.07 1.47v2.84H4.68V4.5h1.71v.78a1.87 1.87 0 0 1 1.71-.93c1.8 0 2.14 1.19 2.14 2.73z" fill="#49c5e0"></path></svg>';
    } elseif (strpos($url_lower, 'trustcenter') !== false || strpos($title_lower, 'trust') !== false) {
      return '<svg height="15" width="15" version="1.1" ' . $data_attrs . ' class="' . esc_attr($icon_class) . '"><path d="M0 0 C0.48403361 7.1394958 0.48403361 7.1394958 -1.6875 11 C-4 13 -4 13 -6.5 13.625 C-9 13 -9 13 -11.3125 11 C-13.56395452 6.99741418 -13.30779433 4.53996635 -13 0 C-7.95902516 -2.44847349 -5.1554311 -1.71847703 0 0 Z " fill="#5BB0FF" transform="translate(14,2)"></path><path d="M0 0 C0.34718988 3.73229119 0.23503152 5.59957594 -1.6875 8.875 C-4 11 -4 11 -6.75 11.3125 C-7.86375 11.1578125 -7.86375 11.1578125 -9 11 C-9 7 -9 7 -7.5390625 5.078125 C-6.90742187 4.47484375 -6.27578125 3.8715625 -5.625 3.25 C-4.68527344 2.32960937 -4.68527344 2.32960937 -3.7265625 1.390625 C-2 0 -2 0 0 0 Z " fill="#3E99FF" transform="translate(14,4)"></path><path d="M0 0 C0 0.66 0 1.32 0 2 C-5.47619048 7 -5.47619048 7 -8 7 C-8 5.35 -8 3.7 -8 2 C-5.09399739 0.74335022 -3.20395416 0 0 0 Z " fill="#71C0FF" transform="translate(9,0)"></path><path d="M0 0 C0.99 0 1.98 0 3 0 C3 2 3 2 1.35546875 3.65625 C0.64003906 4.2646875 -0.07539063 4.873125 -0.8125 5.5 C-1.87404297 6.41265625 -1.87404297 6.41265625 -2.95703125 7.34375 C-5 9 -5 9 -8 11 C-6.4722133 7.56247993 -4.49818944 4.81046312 -2 2 C-1.34 2 -0.68 2 0 2 C0 1.34 0 0.68 0 0 Z " fill="#4CA5FF" transform="translate(11,2)"></path><path d="M0 0 C0.66 0 1.32 0 2 0 C1.3125 2.4375 1.3125 2.4375 0 5 C-2.625 5.8125 -2.625 5.8125 -5 6 C-3.38405168 3.95880212 -1.7143618 1.95927063 0 0 Z " fill="#2E8AFF" transform="translate(12,8)"></path></svg>';
    }

    // Default empty icon if no match
    return '';
  }
}
