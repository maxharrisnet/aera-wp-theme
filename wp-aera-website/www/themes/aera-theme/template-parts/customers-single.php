<?php
/*
 * Single post
 */
    $get_id = get_the_ID();
    $item_title = get_post_meta($get_id, 'aera_customers_detail_title', true);
    $item_subtitle = get_post_meta($get_id, 'aera_customers_detail_subtitle', true);
    $item_icon = get_post_meta($get_id, 'aera_customers_detail_icon', true);
    $item_icon_alt = get_the_title();
    $item_description = get_post_meta($get_id, 'aera_customers_detail_description', true);
    $item_business_need = get_post_meta($get_id, 'aera_customers_detail_business_need', true);
    $item_results_list = get_post_meta($get_id, 'aera_customers_detail_results_list', true);
    $item_the_challenges = get_post_meta($get_id, 'aera_customers_detail_the_challenges', true);
    $item_the_solution = get_post_meta($get_id, 'aera_customers_detail_the_solution', true);
    $item_quote = get_post_meta($get_id, 'aera_customers_detail_quote', true);
    $item_quote_author = get_post_meta($get_id, 'aera_customers_detail_quote_author', true);
    $item_results = get_post_meta($get_id, 'aera_customers_detail_results', true);
?>

<div class="aera-customers-details">
    <div class="aera-customers-details__banner">
        <div class="container">
            <?php if (!empty($item_title)) { ?>
                <h1 class="aera-customers-details__banner-title"><?php echo esc_html_e($item_title); ?></h1>
            <?php } ?>
            <?php if (!empty($item_subtitle)) { ?>
                <p class="aera-customers-details__banner-subtitle banner-text"><?php echo $item_subtitle; ?></p>
            <?php } ?>
        </div>
    </div>

    <div class="aera-customers-details__content">
        <div class="container">
            <div class="aera-customers-details__content-banner">
                <div class="aera-customers-details__content-banner__icon">
                    <?php if (!empty($item_icon)) { ?>
                        <img src="<?php echo esc_url($item_icon); ?>" alt="<?php echo esc_html_e($item_icon_alt); ?>">
                    <?php } ?>
                </div>
                <div class="aera-customers-details__content-banner__text">
                    <?php if (!empty($item_description)) { ?>
                        <p class="text"><?php echo esc_html_e($item_description); ?></p>
                    <?php } ?>
                </div>
            </div>

            <?php if (!empty($item_business_need) || !empty($item_results_list)) { ?>
                <div class="aera-customers-details__content-lists">
                    <div class="aera-customers-details__content-lists__left">
                        <?php if (!empty($item_business_need)) { ?>
                            <h4 class="aera-customers-details__content-lists__title"><?php echo esc_html_e('Business Need'); ?></h4>
                            <div class="aera-customers-details__content-lists__left-content wysiwyg-content">
                                <?php echo $item_business_need; ?>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="aera-customers-details__content-lists__right">
                        <?php if (!empty($item_results_list)) { ?>
                            <h4 class="aera-customers-details__content-lists__title"><?php echo esc_html_e('Results'); ?></h4>
                        <?php } ?>
                        <div class="aera-customers-details__content-lists__right-content wysiwyg-content">
                            <?php echo $item_results_list; ?>
                        </div>
                    </div>
                </div>
            <?php } ?>

            <?php if (!empty($item_the_challenges) || !empty($item_the_solution)) { ?>
                <div class="aera-customers-details__content-info">
                    <div class="aera-customers-details__content-info__left">
                        <?php if (!empty($item_the_challenges)) { ?>
                            <h4 class="aera-customers-details__content-info__title"><?php echo esc_html_e('The Challenges'); ?></h4>
                            <div class="aera-customers-details__content-info__left-content wysiwyg-content">
                                <?php echo $item_the_challenges; ?>
                            </div>
                        <?php } ?>
                    </div>
                    <div class="aera-customers-details__content-info__right">
                        <?php if (!empty($item_the_solution)) { ?>
                            <h4 class="aera-customers-details__content-info__title"><?php echo esc_html_e('The Solution'); ?></h4>
                        <?php } ?>
                        <div class="aera-customers-details__content-info__right-content wysiwyg-content">
                            <?php echo $item_the_solution; ?>
                        </div>
                    </div>
                </div>
            <?php } ?>

            <?php if (!empty($item_quote)) { ?>
                <div class="aera-customers-details__content-quote">
                    <div class="aera-customers-details__content-quote__top">
                        <p class="aera-customers-details__content-quote__text"><?php echo esc_html_e($item_quote); ?></p>
                    </div>
                    <?php if (!empty($item_quote_author)) { ?>
                        <div class="aera-customers-details__content-quote__bottom">
                            <p class="aera-customers-details__content-quote__author"><?php echo esc_html_e($item_quote_author); ?></p>
                        </div>
                    <?php } ?>
                </div>
            <?php } ?>

            <?php if (!empty($item_results)) { ?>
                <div class="aera-customers-details__content-results">
                    <h4 class="aera-customers-details__content-results__title"><?php echo esc_html_e('Results'); ?></h4>
                    <div class="aera-customers-details__content-results__items">
                        <?php foreach((array) $item_results as $key => $entry ) {
                            $item_results_text = $entry['aera_customers_detail_results_text']; 
                        ?>
                            <?php if (!empty($entry['aera_customers_detail_results_text'])) { ?>
                                <p class="aera-customers-details__content-results__item text"><?php echo esc_html($item_results_text); ?></p>
                            <?php } ?>
                        <?php }?>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</div>