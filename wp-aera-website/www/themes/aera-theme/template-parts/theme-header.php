<?php
    $header_logo = cmb2_get_option('aera_header_options', 'aera_header_logo_id'); 
    $header_menu_id = cmb2_get_option('aera_header_options', 'aera_menu_header');
    $header_menu_btn_text = cmb2_get_option('aera_header_options', 'aera_menu_btn_text');
    $header_menu_btn_url = cmb2_get_option('aera_header_options', 'aera_menu_btn_url');
?>

<div class="aera-main-wrapper">
    <header class="aera-header">
        <div class="container">
            <nav class="aera-header__content">
                <?php if (!empty($header_logo)) { 
                    $header_logo_att = wp_get_attachment_image_src( $header_logo, 'full' );
                    $logo_url = $header_logo_att[0];
                    $logo_alt = get_post_meta($header_logo, '_wp_attachment_image_alt', TRUE);
                ?>
                    <a class="aera-header__logo" href="<?php echo esc_url(home_url('/')); ?>">
                        <img class="no-lazy" width="121" height="47" src="<?php echo esc_url($logo_url); ?>"  
                        alt="<?php echo esc_html_e($logo_alt); ?>">
                    </a>
                <?php } else { ?>
                    <a class="aera-header__logo-text" href="<?php echo esc_url(home_url('/')); ?>">
                        <?php echo esc_html_e('Aera'); ?>
                    </a>
                <?php } ?>

                <div class="aera-header__menu">
                    <div class="aera-header__menu-wrapper">
                        <?php if (!empty($header_menu_id)) {
                            wp_nav_menu([
                                'menu_class' => 'header--menu',
                                'menu' => $header_menu_id,
                            ]); 
                        } else { ?>
                            <div class="header--menu--empty"></div>
                        <?php } ?>
                        <?php if (!empty($header_menu_btn_text) && !empty($header_menu_btn_url)) { ?>
                            <a class="aera-header__menu-btn" href="<?php echo esc_url($header_menu_btn_url); ?>">
                                <?php echo esc_html($header_menu_btn_text); ?>
                            </a>
                        <?php } ?>
                    </div>
                    <div class="aera-header__menu-socials">
                        <?php 
                            $social_items = cmb2_get_option('aera_header_options', 'header_social_network');
                            foreach((array) $social_items as $key => $entry ) {
                                $social_items_icon = $entry['header_social_network_icon_id']; 
                                $social_items_icon_att = wp_get_attachment_image_src( $social_items_icon, 'full' );
                                $social_items_icon_url = $social_items_icon_att[0];
                                $social_items_icon_alt = get_post_meta($social_items_icon, '_wp_attachment_image_alt', TRUE);
                        ?>
                            <?php if (!empty($entry['header_social_network_url']) && !empty($entry['header_social_network_icon'])) { ?>
                                <a class="aera-header__menu-socials__item" href="<?php echo esc_html($entry['header_social_network_url']); ?>" target="_blank" rel="noopener">
                                    <img src="<?php echo esc_url($social_items_icon_url); ?>" alt="<?php echo esc_html_e($social_items_icon_alt); ?>">
                                </a>
                            <?php } ?>
                        <?php }?>
                    </div>
                </div>

                <?php if (!empty($header_menu_btn_text) && !empty($header_menu_btn_url)) { ?>
                    <a class="aera-header__btn" href="<?php echo esc_url($header_menu_btn_url); ?>">
                        <?php echo esc_html($header_menu_btn_text); ?>
                    </a>
                <?php } ?>

                <div class="aera-header__hamburger-wrapper">
                    <a class="aera-header__hamburger" href="#" title="button">
                        <div></div>
                        <div></div>
                        <div></div>
                    </a>
                </div>
            </nav>
        </div>
    </header>