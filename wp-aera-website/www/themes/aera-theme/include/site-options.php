<?php
defined( 'ABSPATH' ) || exit;

/** Header options **/
function aera_site_header_options() {
    $menus     = wp_get_nav_menus();
    $nav_menus = array();

    if (!isset($menus) || empty($menus)) {
        $nav_menus = [ '' => esc_html__( 'No Menu', 'aera' ) ];
    } else {
        foreach ( $menus as $menu ) {
            $nav_menus[ $menu->term_id ] = $menu->name;
        }
    }

    $args = array(
        'id'           => 'aera_header_options',
        'title'        => esc_html__( 'Header Options', 'aera' ),
        'object_types' => array( 'options-page' ),
        'menu_title'   => esc_html__( 'Header Options', 'aera' ),
        'icon_url'     => 'dashicons-admin-generic',
        'option_key'   => 'aera_header_options',
        'tab_group'    => 'aera_options_tab',
        'tab_title'    => 'Header Options',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Header Logo',
        'id'   => 'aera_header_logo',
        'desc' => '(required)',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name'             => 'Header Menu',
        'id'               => 'aera_menu_header',
        'type'             => 'select',
        'desc'             => '(required)',
        'show_option_none' => true,
        'options'          => $nav_menus
    ) );
    $cmb->add_field( array(
        'name' => 'Button Text',
        'id'   => 'aera_menu_btn_text',
        'desc' => '(required)',
        'type' => 'text_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Button URL',
        'id'   => 'aera_menu_btn_url',
        'desc' => '(required)',
        'type' => 'text_url',
    ) );
    $group_field_id = $cmb->add_field( array(
        'name'    => 'Social Networks',
        'id'      => 'header_social_network',
        'type'    => 'group',
        'options' => array(
            'group_title'    => __('Social Network {#}', 'aera'),
            'add_button'     => __('Add Another Social Network', 'aera'),
            'remove_button'  => __('Remove Social Network', 'aera'),
            'remove_confirm' => esc_html__('Are you sure you want to remove?', 'aera'),
            'sortable'       => true,
        ),
    ) );
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Social network URL',
        'id'   => 'header_social_network_url',
        'type' => 'text_url',
    ) );
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Social network Icon',
        'id'   => 'header_social_network_icon',
        'type' => 'file',
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_header_options', 10 );

/** Footer options **/
function aera_site_footer_options() {
    $menus     = wp_get_nav_menus();
    $nav_menus = array();

    if (!isset($menus) || empty($menus)) {
        $nav_menus = [ '' => esc_html__( 'No Menu', 'aera' ) ];
    } else {
        foreach ( $menus as $menu ) {
            $nav_menus[ $menu->term_id ] = $menu->name;
        }
    }

    $args = array(
        'id'           => 'aera_footer_options',
        'title'        => esc_html__( 'Footer Options', 'aera' ),
        'object_types' => array( 'options-page' ),
        'menu_title'   => esc_html__( 'Footer Options', 'aera' ),
        'icon_url'     => 'dashicons-admin-generic',
        'option_key'   => 'aera_footer_options',
        'tab_group'    => 'aera_options_tab',
        'tab_title'    => 'Footer Options',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Footer Logo',
        'id'   => 'aera_footer_logo',
        'desc' => '(required)',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name'             => 'Footer Menu',
        'id'               => 'aera_footer_menu',
        'type'             => 'select',
        'desc'             => '(required)',
        'show_option_none' => true,
        'options'          => $nav_menus
    ) );
    $group_field_id = $cmb->add_field( array(
        'name'    => 'Social Networks',
        'id'      => 'footer_social_network',
        'type'    => 'group',
        'options' => array(
            'group_title'    => __('Social Network {#}', 'aera'),
            'add_button'     => __('Add Another Social Network', 'aera'),
            'remove_button'  => __('Remove Social Network', 'aera'),
            'remove_confirm' => esc_html__('Are you sure you want to remove?', 'aera'),
            'sortable'       => true,
        ),
    ) );
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Social network URL',
        'id'   => 'footer_social_network_url',
        'type' => 'text_url',
    ) );
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Social network Name',
        'id'   => 'footer_social_network_name',
        'type' => 'text',
    ) );
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Social network Icon',
        'id'   => 'footer_social_network_icon',
        'type' => 'file',
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_footer_options', 10 );

/** Blog post options **/
function aera_site_blog_options() {
    $args = array(
        'id'           => 'aera_site_blog_options',
        'title'        => esc_html__('Posts Options', 'aera'),
        'object_types' => array('options-page'),
        'menu_title'   => esc_html__('Posts Options', 'aera'),
        'icon_url'     => 'dashicons-admin-generic',
        'option_key'   => 'aera_site_blog_options',
        'tab_group'    => 'aera_options_tab',
        'tab_title'    => 'Posts Options',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
		'name' => 'Hide "Schedule Demo Section"?',
		'id'   => 'aera_blog_sd_hide',
        'type' => 'checkbox',
	) );
    $cmb->add_field( array(
        'name' => 'Title (for Schedule Demo Section)',
        'id'   => 'aera_blog_sd_title',
        'type' => 'text',
    ) );
    $cmb->add_field( array(
        'name' => 'Button Text (for Schedule Demo Section)',
        'id'   => 'aera_blog_sd_btn_text',
        'type' => 'text',
    ) );
    $cmb->add_field( array(
        'name' => 'Button URL (for Schedule Demo Section)',
        'id'   => 'aera_blog_sd_btn_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Announcements URL (for Other Resources Block)',
        'id'   => 'aera_blog_sd_ann_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Videos URL (for Other Resources Block)',
        'id'   => 'aera_blog_sd_videos_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Whitepapers URL (for Other Resources Block)',
        'id'   => 'aera_blog_sd_whitepapers_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'On-Demand URL (for Other Resources Block)',
        'id'   => 'aera_blog_sd_ondemands_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Blogs URL (for Other Resources Block)',
        'id'   => 'aera_blog_sd_blogs_url',
        'type' => 'text_url',
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_blog_options', 10 );

/** Announcements post options **/
function aera_site_announcements_options() {
    $args = array(
        'id'           => 'aera_site_announcements_options',
        'title'        => esc_html__('Announcements Options', 'aera'),
        'object_types' => array('options-page'),
        'menu_title'   => esc_html__('Announcements Options', 'aera'),
        'icon_url'     => 'dashicons-admin-generic',
        'option_key'   => 'aera_site_announcements_options',
        'tab_group'    => 'aera_options_tab',
        'tab_title'    => 'Announcements Options',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
		'name' => 'Hide "Schedule Demo Section"?',
		'id'   => 'aera_announcements_sd_hide',
        'type' => 'checkbox',
	) );
    $cmb->add_field( array(
        'name' => 'Title (for Schedule Demo Section)',
        'id'   => 'aera_announcements_sd_title',
        'type' => 'text',
    ) );
    $cmb->add_field( array(
        'name' => 'Button Text (for Schedule Demo Section)',
        'id'   => 'aera_announcements_sd_btn_text',
        'type' => 'text',
    ) );
    $cmb->add_field( array(
        'name' => 'Button URL (for Schedule Demo Section)',
        'id'   => 'aera_announcements_sd_btn_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Announcements URL (for Other Resources Block)',
        'id'   => 'aera_announcements_sd_ann_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Videos URL (for Other Resources Block)',
        'id'   => 'aera_announcements_sd_videos_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Whitepapers URL (for Other Resources Block)',
        'id'   => 'aera_announcements_sd_whitepapers_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'On-Demand URL (for Other Resources Block)',
        'id'   => 'aera_announcements_sd_ondemands_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Blogs URL (for Other Resources Block)',
        'id'   => 'aera_announcements_sd_announcementss_url',
        'type' => 'text_url',
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_announcements_options', 10 );

/** CUSTOM POST TYPES OPTIONS **/
/** Cognitive Operating System Details Pages **/
function aera_site_cos_page_options() {
    $args = array(
        'id'            => 'aera_cos_post_page_options',
        'title'         => esc_html__('Cognitive Operating System Options', 'aera'),
        'object_types'  => array('cos'),
        'menu_title'    => esc_html__('Cognitive Operating System', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_cos_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Cognitive Operating System Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Page Icon',
        'id'   => 'aera_cos_detail_icon',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Picture',
        'id'   => 'aera_cos_detail_picture',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Subtitle',
        'id'   => 'aera_cos_detail_subtitle',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name'    => 'Description',
        'id'      => 'aera_cos_detail_description',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => false,
            'textarea_rows' => get_option('default_post_edit_rows', 10),
            'tinymce'       => true,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'Benefits',
        'id'      => 'aera_cos_detail_benefit',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => true,
            'media_buttons' => false,
            'teeny'         => true,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'Features',
        'id'      => 'aera_cos_detail_feature',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => true,
            'media_buttons' => false,
            'teeny'         => true,
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_cos_page_options', 10 );

/** Skills Details Pages **/
function aera_site_skills_page_options() {
    $args = array(
        'id'            => 'aera_skills_post_page_options',
        'title'         => esc_html__('Skill Options', 'aera'),
        'object_types'  => array('skills'),
        'menu_title'    => esc_html__('Skill', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_skills_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Skill Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Title',
        'id'   => 'aera_skills_detail_title',
        'type' => 'text_medium',
    ) );
    $cmb->add_field( array(
        'name' => 'Subtitle',
        'id'   => 'aera_skills_detail_subtitle',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Description',
        'id'   => 'aera_skills_detail_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Page Icon',
        'id'   => 'aera_skills_detail_icon',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Picture',
        'id'   => 'aera_skills_detail_picture',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name'    => 'Main Text',
        'id'      => 'aera_skills_detail_main_text',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => false,
            'textarea_rows' => get_option('default_post_edit_rows', 10),
            'tinymce'       => true,
            'media_buttons' => false,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'Benefits',
        'id'      => 'aera_skills_detail_benefit',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => true,
            'media_buttons' => false,
            'teeny'         => true,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'Skills',
        'id'      => 'aera_skills_detail_skill',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => true,
            'media_buttons' => false,
            'teeny'         => true,
        ),
    ) );
    $cmb->add_field( array(
        'name' => 'Skill position on widgets',
        'id'   => 'aera_skills_detail_order',
        'type' => 'text',
        'attributes' => array(
            'type' => 'number',
            'pattern' => '\d*',
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_skills_page_options', 10 );

/** Customers Details Pages **/
function aera_site_customers_page_options() {
    $args = array(
        'id'            => 'aera_customers_post_page_options',
        'title'         => esc_html__('Customer Options', 'aera'),
        'object_types'  => array('customers'),
        'menu_title'    => esc_html__('Customer', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_customers_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Customer Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Customer Icon (for Preview)',
        'id'   => 'aera_customers_detail_preview_icon',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Revenue (for Preview)',
        'id'   => 'aera_customers_detail_revenue',
        'type' => 'text_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Employees (for Preview)',
        'id'   => 'aera_customers_detail_employees',
        'type' => 'text_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Business Problem (for Preview)',
        'id'   => 'aera_customers_detail_business_problem',
        'type' => 'textarea_small',
    ) );

    $cmb->add_field( array(
        'name' => 'Title',
        'id'   => 'aera_customers_detail_title',
        'type' => 'text_medium',
    ) );
    $cmb->add_field( array(
        'name' => 'Subtitle',
        'id'   => 'aera_customers_detail_subtitle',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Page Icon',
        'id'   => 'aera_customers_detail_icon',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Description',
        'id'   => 'aera_customers_detail_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name'    => 'Business Need',
        'id'      => 'aera_customers_detail_business_need',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => false,
            'textarea_rows' => get_option('default_post_edit_rows', 6),
            'tinymce'       => true,
            'media_buttons' => false,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'Results List',
        'id'      => 'aera_customers_detail_results_list',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => true,
            'textarea_rows' => get_option('default_post_edit_rows', 6),
            'media_buttons' => false,
            'teeny'         => true,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'The Challenges',
        'id'      => 'aera_customers_detail_the_challenges',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => false,
            'textarea_rows' => get_option('default_post_edit_rows', 6),
            'tinymce'       => true,
            'media_buttons' => false,
        ),
    ) );
    $cmb->add_field( array(
        'name'    => 'The Solution',
        'id'      => 'aera_customers_detail_the_solution',
        'type'    => 'wysiwyg',
        'options' => array(
            'wpautop'       => false,
            'textarea_rows' => get_option('default_post_edit_rows', 6),
            'tinymce'       => true,
            'media_buttons' => false,
        ),
    ) );
    $cmb->add_field( array(
        'name' => 'Quote',
        'id'   => 'aera_customers_detail_quote',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Quote Author',
        'id'   => 'aera_customers_detail_quote_author',
        'type' => 'text',
    ) );
    $group_field_id = $cmb->add_field( array(
        'name'    => 'Results',
        'id'      => 'aera_customers_detail_results',
        'type'    => 'group',
        'options' => array(
            'group_title'    => __('Result {#}', 'aera'),
            'add_button'     => __('Add Another Result', 'aera'),
            'remove_button'  => __('Remove Result', 'aera'),
            'remove_confirm' => esc_html__('Are you sure you want to remove?', 'aera'),
            'sortable'       => true,
        ),
    ) );
    $cmb->add_group_field( $group_field_id, array(
        'name' => 'Result text',
        'id'   => 'aera_customers_detail_results_text',
        'type' => 'textarea_small',
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_customers_page_options', 10 );

/** Announcements Details Pages **/
function aera_site_announcements_page_options() {
    $authors_args = array('post_type' => 'authors', 'posts_per_page' => -1);
    $loop = new WP_Query($authors_args);
    $authorsArray = [];


    if ($loop->have_posts()) {  
        while($loop->have_posts()) : $loop->the_post();
            $authorID = get_the_id();
            $authorName = get_the_title();
            $authorsArray[$authorID] = $authorName;
        endwhile;   
    }

    $args = array(
        'id'            => 'aera_announcements_post_page_options',
        'title'         => esc_html__('Announcement Options', 'aera'),
        'object_types'  => array('announcements'),
        'menu_title'    => esc_html__('Announcement', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_announcements_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Announcement Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Background Image (for preview)',
        'id'   => 'aera_announcements_detail_bg_image',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Small Description (for preview)',
        'id'   => 'aera_announcements_detail_small_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Date (if post is scheduled in future)',
        'id'   => 'aera_announcements_detail_date',
        'type' => 'text_date',
        'desc' => '(optional)',
        'date_format' => 'Y-m-d',
    ) );
    $cmb->add_field( array(
        'name'  => "Announcement URL for external resources (if we don't need detail page)",
        'id'    => 'aera_announcements_detail_external_url',
        'type'  => 'text_url',
        'desc'  => '(optional)',
    ) );
    $cmb->add_field( array(
        'name' => 'Position on Resources page (for preview)',
        'id'   => 'aera_announcements_detail_order',
        'type' => 'text',
        'desc' => '(optional)',
        'attributes'  => array(
            'type'    => 'number',
            'pattern' => '\d*',
        ),
    ) );
    $cmb->add_field( array(
        'name'             => 'Author',
        'id'               => 'aera_announcements_detail_author',
        'type'             => 'select',
        'desc'             => '(optional)',
        'show_option_none' => true,
        'options'          => $authorsArray
    ) );
    $cmb->add_field( array(
        'name'             => 'Placement',
        'id'               => 'aera_announcements_detail_placement',
        'type'             => 'text',
        'desc'             => 'for example "Aera Technology"',
    ) );
    $cmb->add_field( array(
        'name'             => 'Placement URL',
        'id'               => 'aera_announcements_detail_placement_url',
        'type'             => 'text_url',
        'desc'             => '(optional)',
    ) );
    $cmb->add_field( array(
        'name'    => 'Content',
        'id'      => 'aera_announcements_detail_content',
        'type'    => 'wysiwyg',
        'options' => array(
            'textarea_rows' => get_option('default_post_edit_rows', 28),
            'media_buttons' => true,
            'teeny'         => false,
            'dfw'           => false,
            'tinymce'       => true,
            'quicktags'     => true 
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_announcements_page_options', 10 );

/** Videos Details Pages **/
function aera_site_videos_page_options() {
    $args = array(
        'id'            => 'aera_videos_post_page_options',
        'title'         => esc_html__('Video Options', 'aera'),
        'object_types'  => array('videos'),
        'menu_title'    => esc_html__('Video', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_videos_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Video Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Video URL',
        'id'   => 'aera_videos_detail_video_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Background Image (for preview)',
        'id'   => 'aera_videos_detail_bg_image',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Small Description (for preview)',
        'id'   => 'aera_videos_detail_small_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Date (if post is scheduled in future)',
        'id'   => 'aera_videos_detail_date',
        'type' => 'text_date',
        'desc' => '(optional)',
        'date_format' => 'Y-m-d',
    ) );
    $cmb->add_field( array(
        'name' => 'Position on Resources page (for preview)',
        'id'   => 'aera_videos_detail_order',
        'type' => 'text',
        'desc' => '(optional)',
        'attributes'  => array(
            'type'    => 'number',
            'pattern' => '\d*',
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_videos_page_options', 10 );

/** Whitepapers Details Pages **/
function aera_site_whitepapers_page_options() {
    $args = array(
        'id'            => 'aera_whitepapers_post_page_options',
        'title'         => esc_html__('Whitepaper Options', 'aera'),
        'object_types'  => array('whitepapers'),
        'menu_title'    => esc_html__('Whitepaper', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_whitepapers_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Whitepaper Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Whitepaper URL',
        'id'   => 'aera_whitepapers_detail_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Background Image (for preview)',
        'id'   => 'aera_whitepapers_detail_bg_image',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Small Description (for preview)',
        'id'   => 'aera_whitepapers_detail_small_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Date (if post is scheduled in future)',
        'id'   => 'aera_whitepapers_detail_date',
        'type' => 'text_date',
        'desc' => '(optional)',
        'date_format' => 'Y-m-d',
    ) );
    $cmb->add_field( array(
        'name' => 'Position on Resources page (for preview)',
        'id'   => 'aera_whitepapers_detail_order',
        'type' => 'text',
        'desc' => '(optional)',
        'attributes'  => array(
            'type'    => 'number',
            'pattern' => '\d*',
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_whitepapers_page_options', 10 );

/** On-Demands Details Pages **/
function aera_site_ondemands_page_options() {
    $args = array(
        'id'            => 'aera_ondemands_post_page_options',
        'title'         => esc_html__('On-Demand Options', 'aera'),
        'object_types'  => array('on_demand'),
        'menu_title'    => esc_html__('On-Demand', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_ondemands_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'On-Demand Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'On-Demand URL',
        'id'   => 'aera_ondemands_detail_url',
        'type' => 'text_url',
    ) );
    $cmb->add_field( array(
        'name' => 'Background Image (for preview)',
        'id'   => 'aera_ondemands_detail_bg_image',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Small Description (for preview)',
        'id'   => 'aera_ondemands_detail_small_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Date (if post is scheduled in future)',
        'id'   => 'aera_ondemands_detail_date',
        'type' => 'text_date',
        'desc' => '(optional)',
        'date_format' => 'Y-m-d',
    ) );
    $cmb->add_field( array(
        'name' => 'Position on Resources page (for preview)',
        'id'   => 'aera_ondemands_detail_order',
        'type' => 'text',
        'desc' => '(optional)',
        'attributes'  => array(
            'type'    => 'number',
            'pattern' => '\d*',
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_ondemands_page_options', 10 );

/** Blog Details Pages **/
function aera_site_blog_page_options() {
    $authors_args = array('post_type' => 'authors', 'posts_per_page' => -1);
    $loop = new WP_Query($authors_args);
    $authorsArray = [];

    if ($loop->have_posts()) {  
        while($loop->have_posts()) : $loop->the_post();
            $authorID = get_the_id();
            $authorName = get_the_title();
            $authorsArray[$authorID] = $authorName;
        endwhile;   
    }

    $args = array(
        'id'            => 'aera_blog_post_page_options',
        'title'         => esc_html__('Post Options', 'aera'),
        'object_types'  => array('post'),
        'menu_title'    => esc_html__('Post', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_blog_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Post Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Background Image (for preview)',
        'id'   => 'aera_blog_detail_bg_image',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Small Description (for preview)',
        'id'   => 'aera_blog_detail_small_description',
        'type' => 'textarea_small',
    ) );
    $cmb->add_field( array(
        'name' => 'Date (if post is scheduled in future)',
        'id'   => 'aera_blog_detail_date',
        'type' => 'text_date',
        'desc' => '(optional)',
        'date_format' => 'Y-m-d',
    ) );
    $cmb->add_field( array(
        'name' => 'Position on Resources page (for preview)',
        'id'   => 'aera_blog_detail_order',
        'type' => 'text',
        'desc' => '(optional)',
        'attributes'  => array(
            'type'    => 'number',
            'pattern' => '\d*',
        ),
    ) );
    $cmb->add_field( array(
        'name'             => 'Author',
        'id'               => 'aera_blog_detail_author',
        'type'             => 'select',
        'show_option_none' => true,
        'options'          => $authorsArray
    ) );
    $cmb->add_field( array(
        'name'             => 'Second Author (if needed)',
        'id'               => 'aera_blog_detail_author_second',
        'type'             => 'select',
        'show_option_none' => true,
        'options'          => $authorsArray
    ) );
    $cmb->add_field( array(
        'name'             => 'Third Author (if needed)',
        'id'               => 'aera_blog_detail_author_third',
        'type'             => 'select',
        'show_option_none' => true,
        'options'          => $authorsArray
    ) );
    $cmb->add_field( array(
        'name'    => 'Content',
        'id'      => 'aera_blog_detail_content',
        'type'    => 'wysiwyg',
        'options' => array(
            'textarea_rows' => get_option('default_post_edit_rows', 28),
            'media_buttons' => true,
            'teeny'         => false,
            'dfw'           => false,
            'tinymce'       => true,
            'quicktags'     => true 
        ),
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_blog_page_options', 10 );

/** Authors Details Page **/
function aera_site_authors_options() {
    $args = array(
        'id'            => 'aera_blog_authors_options',
        'title'         => esc_html__('Authors Options', 'aera'),
        'object_types'  => array('authors'),
        'menu_title'    => esc_html__('Author', 'aera'),
        'icon_url'      => 'dashicons-admin-generic',
        'option_key'    => 'aera_blog_post_page_options',
        'tab_group'     => 'aera_options_tab',
        'tab_title'     => 'Author Page',
    );
    $cmb = new_cmb2_box( $args );

    $cmb->add_field( array(
        'name' => 'Author Image',
        'id'   => 'aera_author_image',
        'type' => 'file',
    ) );
    $cmb->add_field( array(
        'name' => 'Author Name',
        'id'   => 'aera_author_name',
        'type' => 'text',
    ) );
    $cmb->add_field( array(
        'name' => 'Author Position',
        'id'   => 'aera_author_position',
        'type' => 'text',
    ) );
}
add_action( 'cmb2_admin_init', 'aera_site_authors_options', 10 );