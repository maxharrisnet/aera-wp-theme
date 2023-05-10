<?php
/**
 * 404 Page
 */

get_header(); ?>
    <div id="main-canvas"></div>
    <div class="aera-error">
        <div class="container">
            <div class="aera-error__content">
                <h1 class="aera-error__title"><?php esc_html_e('Page not found.', 'aera'); ?></h1>
                <p class="aera-error__text banner-text"><?php esc_html_e('It is possible that the page has moved or changed or may no longer be available. Please check the page address and try again.', 'aera'); ?></p>
            </div>
        </div>
    </div>

<?php get_footer();
