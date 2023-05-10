<?php
// Authors
if (!function_exists('aera_register_authors')) {
    function aera_register_authors()
    {
        register_post_type('authors',
            array(
                'labels' => array(
                    'name' => esc_html__('Authors', 'aera'),
                    'singular_name' => esc_html__('Author', 'aera'),
                    'search_items' => esc_html__('Search Author', 'aera'),
                    'all_items' => esc_html__('All Authors', 'aera'),
                    'view_item' => esc_html__('', 'aera'),
                    'edit_item' => esc_html__('Edit Author', 'aera'),
                    'update_item' => esc_html__('Update Author', 'aera'),
                    'add_new_item' => esc_html__('Add new Author', 'aera'),
                    'new_item_name' => esc_html__('New Author', 'aera'),
                    'menu_name' => esc_html__('Authors', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Author', 'aera'),
                'menu_icon' => 'dashicons-buddicons-buddypress-logo',
                'public' => true,
                'publicly_queryable' => false,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'authors',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_authors', 0);
}

// Cognitive Operating System
if (!function_exists('aera_register_сognitive_operating_systems')) {
    function aera_register_сognitive_operating_systems()
    {
        register_post_type('cos',
            array(
                'labels' => array(
                    'name' => esc_html__('Cognitive Operating Systems', 'aera'),
                    'singular_name' => esc_html__('Cognitive Operating System', 'aera'),
                    'search_items' => esc_html__('Search Cognitive Operating System', 'aera'),
                    'all_items' => esc_html__('All Cognitive Operating Systems', 'aera'),
                    'view_item' => esc_html__('View Cognitive Operating System', 'aera'),
                    'edit_item' => esc_html__('Edit Cognitive Operating System', 'aera'),
                    'update_item' => esc_html__('Update Cognitive Operating System', 'aera'),
                    'add_new_item' => esc_html__('Add new Cognitive Operating System', 'aera'),
                    'new_item_name' => esc_html__('New Cognitive Operating System', 'aera'),
                    'menu_name' => esc_html__('Cognitive Operating Systems', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Cognitive Operating System', 'aera'),
                'menu_icon' => 'dashicons-format-aside',
                'public' => true,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'cos',
                    'with_front' => false
                ],
            )
        );

        register_taxonomy(
            'cos_categories',
            'cos',
            array(
                'label' => esc_html__('Category', 'aera'),
                'labels' => [
                    'name' => esc_html__('Categories', 'aera'),
                    'singular_name' => esc_html__('Category', 'aera'),
                    'search_items' => esc_html__('Search category', 'aera'),
                    'all_items' => esc_html__('All categories', 'aera'),
                    'view_item ' => esc_html__('View category', 'aera'),
                    'parent_item' => esc_html__('Parent category', 'aera'),
                    'parent_item_colon' => esc_html__('Parent category:', 'aera'),
                    'edit_item' => esc_html__('Edit category', 'aera'),
                    'update_item' => esc_html__('Update category', 'aera'),
                    'add_new_item' => esc_html__('Add New category', 'aera'),
                    'new_item_name' => esc_html__('New category', 'aera'),
                    'menu_name' => esc_html__('Categories', 'aera')
                ],
                'rewrite' => array('slug' => 'cos-category'),
                'hierarchical' => true,
                'public' => true,
                'show_ui' => true,
                'show_admin_column' => true,
                'show_in_rest' => true,                
                'publicly_queryable' => false,
                'has_archive' => false,
            )
        );
    }

    add_action('init', 'aera_register_сognitive_operating_systems', 0);
}

// Skills
if (!function_exists('aera_register_skills')) {
    function aera_register_skills()
    {
        register_post_type('skills',
            array(
                'labels' => array(
                    'name' => esc_html__('Skills', 'aera'),
                    'singular_name' => esc_html__('Skill', 'aera'),
                    'search_items' => esc_html__('Search Skill', 'aera'),
                    'all_items' => esc_html__('All Skills', 'aera'),
                    'view_item' => esc_html__('View Skill', 'aera'),
                    'edit_item' => esc_html__('Edit Skill', 'aera'),
                    'update_item' => esc_html__('Update Skill', 'aera'),
                    'add_new_item' => esc_html__('Add new Skill', 'aera'),
                    'new_item_name' => esc_html__('New Skill', 'aera'),
                    'menu_name' => esc_html__('Skills', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Skill', 'aera'),
                'menu_icon' => 'dashicons-image-filter',
                'public' => true,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'skills',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_skills', 0);
}

// Customers
if (!function_exists('aera_register_customers')) {
    function aera_register_customers()
    {
        register_post_type('customers',
            array(
                'labels' => array(
                    'name' => esc_html__('Customers', 'aera'),
                    'singular_name' => esc_html__('Customer', 'aera'),
                    'search_items' => esc_html__('Search Customer', 'aera'),
                    'all_items' => esc_html__('All Customers', 'aera'),
                    'view_item' => esc_html__('View Customer', 'aera'),
                    'edit_item' => esc_html__('Edit Customer', 'aera'),
                    'update_item' => esc_html__('Update Customer', 'aera'),
                    'add_new_item' => esc_html__('Add new Customer', 'aera'),
                    'new_item_name' => esc_html__('New Customer', 'aera'),
                    'menu_name' => esc_html__('Customers', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Customer', 'aera'),
                'menu_icon' => 'dashicons-shortcode',
                'public' => true,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'customer',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_customers', 0);
}

// Announcements
if (!function_exists('aera_register_announcements')) {
    function aera_register_announcements()
    {
        register_post_type('announcements',
            array(
                'labels' => array(
                    'name' => esc_html__('Announcements', 'aera'),
                    'singular_name' => esc_html__('Announcement', 'aera'),
                    'search_items' => esc_html__('Search Announcement', 'aera'),
                    'all_items' => esc_html__('All Announcements', 'aera'),
                    'view_item' => esc_html__('View Announcement', 'aera'),
                    'edit_item' => esc_html__('Edit Announcement', 'aera'),
                    'update_item' => esc_html__('Update Announcement', 'aera'),
                    'add_new_item' => esc_html__('Add new Announcement', 'aera'),
                    'new_item_name' => esc_html__('New Announcement', 'aera'),
                    'menu_name' => esc_html__('Announcements', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Announcement', 'aera'),
                'menu_icon' => 'dashicons-share-alt',
                'public' => true,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'announcements',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_announcements', 0);
}

// Videos
if (!function_exists('aera_register_videos')) {
    function aera_register_videos()
    {
        register_post_type('videos',
            array(
                'labels' => array(
                    'name' => esc_html__('Videos', 'aera'),
                    'singular_name' => esc_html__('Video', 'aera'),
                    'search_items' => esc_html__('Search Video', 'aera'),
                    'all_items' => esc_html__('All Videos', 'aera'),
                    'view_item' => esc_html__('', 'aera'),
                    'edit_item' => esc_html__('Edit Video', 'aera'),
                    'update_item' => esc_html__('Update Video', 'aera'),
                    'add_new_item' => esc_html__('Add new Video', 'aera'),
                    'new_item_name' => esc_html__('New Video', 'aera'),
                    'menu_name' => esc_html__('Videos', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Video', 'aera'),
                'menu_icon' => 'dashicons-video-alt',
                'public' => true,
                'publicly_queryable' => false,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'videos',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_videos', 0);
}

// Whitepapers
if (!function_exists('aera_register_whitepapers')) {
    function aera_register_whitepapers()
    {
        register_post_type('whitepapers',
            array(
                'labels' => array(
                    'name' => esc_html__('Whitepapers', 'aera'),
                    'singular_name' => esc_html__('Whitepaper', 'aera'),
                    'search_items' => esc_html__('Search Whitepaper', 'aera'),
                    'all_items' => esc_html__('All Whitepapers', 'aera'),
                    'view_item' => esc_html__('', 'aera'),
                    'edit_item' => esc_html__('Edit Whitepaper', 'aera'),
                    'update_item' => esc_html__('Update Whitepaper', 'aera'),
                    'add_new_item' => esc_html__('Add new Whitepaper', 'aera'),
                    'new_item_name' => esc_html__('New Whitepaper', 'aera'),
                    'menu_name' => esc_html__('Whitepapers', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add Whitepaper', 'aera'),
                'menu_icon' => 'dashicons-media-spreadsheet',
                'public' => true,
                'publicly_queryable' => false,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'whitepapers',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_whitepapers', 0);
}

// On-Demand
if (!function_exists('aera_register_on_demand')) {
    function aera_register_on_demand()
    {
        register_post_type('on_demand',
            array(
                'labels' => array(
                    'name' => esc_html__('On Demands', 'aera'),
                    'singular_name' => esc_html__('On Demand', 'aera'),
                    'search_items' => esc_html__('Search On Demand', 'aera'),
                    'all_items' => esc_html__('All On Demands', 'aera'),
                    'view_item' => esc_html__('', 'aera'),
                    'edit_item' => esc_html__('Edit On Demand', 'aera'),
                    'update_item' => esc_html__('Update On Demand', 'aera'),
                    'add_new_item' => esc_html__('Add new On Demand', 'aera'),
                    'new_item_name' => esc_html__('New On Demand', 'aera'),
                    'menu_name' => esc_html__('On Demands', 'aera'),
                ),
                'show_in_rest' => true,
                'supports' => array('title'),
                'add_new_item' => esc_html__('Add On Demand', 'aera'),
                'menu_icon' => 'dashicons-tide',
                'public' => true,
                'publicly_queryable' => false,
                'has_archive' => false,
                'rewrite' => [
                    'slug' => 'on-demand',
                    'with_front' => false
                ],
            )
        );
    }

    add_action('init', 'aera_register_on_demand', 0);
}