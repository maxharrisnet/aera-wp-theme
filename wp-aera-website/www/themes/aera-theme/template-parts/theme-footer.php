<?php
    $footer_text = esc_html__('&copy; ', 'aera') . date('Y') . ' ' . get_bloginfo('name') . '® · All Rights Reserved.';
    $footer_logo = cmb2_get_option('aera_footer_options', 'aera_footer_logo_id'); 
    $footer_menu_id = cmb2_get_option('aera_footer_options', 'aera_footer_menu');
?>
</div>

<footer class="aera-footer">
    <div class="container">
        <div class="aera-footer__content">
            <div class="aera-footer__logo-wrapper">
                <?php if (!empty($footer_logo)) { 
                    $footer_logo_att = wp_get_attachment_image_src( $footer_logo, 'full' );
                    $footer_logo_url = $footer_logo_att[0];
                    $footer_logo_alt = get_post_meta($footer_logo, '_wp_attachment_image_alt', TRUE);
                ?>
                    <a class="aera-footer__logo" href="<?php echo esc_url(home_url('/')); ?>">
                        <img width="121" height="47" src="<?php echo esc_url($footer_logo_url); ?>"  
                        alt="<?php echo esc_html_e($footer_logo_alt); ?>">
                    </a>
                <?php } else { ?>
                    <a class="aera-footer__logo-text" href="<?php echo esc_url(home_url('/')); ?>">
                        <?php echo esc_html_e('Aera'); ?>
                    </a>
                <?php } ?>
            </div>

            <div class="aera-footer__navigation">
                <div class="aera-footer__menu">
                    <?php if (!empty($footer_menu_id)) {
                        wp_nav_menu([
                            'menu_class' => 'footer--menu',
                            'menu' => $footer_menu_id,
                        ]); 
                    } else { ?>
                        <div class="footer--menu--empty"></div>
                    <?php } ?>
                </div>
                
                <div class="aera-footer__socials">
                    <?php 
                        $footer_social_items = cmb2_get_option('aera_footer_options', 'footer_social_network');

                        foreach((array) $footer_social_items as $key => $entry ) {
                            $footer_social_items_icon = $entry['footer_social_network_icon_id']; 
                            $footer_social_items_icon_att = wp_get_attachment_image_src( $footer_social_items_icon, 'full' );
                            $footer_social_items_icon_url = $footer_social_items_icon_att[0];
                            $footer_social_items_icon_alt = get_post_meta($footer_social_items_icon, '_wp_attachment_image_alt', TRUE);
                            $footer_social_items_name = $entry['footer_social_network_name']; 
                    ?>
                        <?php if (!empty($entry['footer_social_network_url']) && !empty($entry['footer_social_network_name']) && !empty($entry['footer_social_network_icon'])) { ?>
                            <a class="aera-footer__socials-item" href="<?php echo esc_html($entry['footer_social_network_url']); ?>" target="_blank" rel="noopener">
                                <img class="aera-footer__socials-item__icon" src="<?php echo esc_url($footer_social_items_icon_url); ?>" alt="<?php echo esc_html_e($footer_social_items_icon_alt); ?>">
                                <span class="aera-footer__socials-item__name"><?php echo esc_html($footer_social_items_name); ?></span>
                            </a>
                        <?php } ?>
                    <?php }?>
                </div>
            </div>
        </div>

        <div class="aera-footer__copyright">
            <p class="aera-footer__copyright-text"><?php echo wp_kses($footer_text, 'post'); ?></p>
        </div>
    </div>
</footer>