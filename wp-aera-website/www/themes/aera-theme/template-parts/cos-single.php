<?php
/*
 * Single post
 */
    $get_id = get_the_ID();
    $item_photo = get_post_meta($get_id, 'aera_cos_detail_picture', true);
    $item_photo_alt = get_the_title();
    $item_subtitle = get_post_meta($get_id, 'aera_cos_detail_subtitle', true);
    $item_description = get_post_meta($get_id, 'aera_cos_detail_description', true);
    $item_benefits = get_post_meta($get_id, 'aera_cos_detail_benefit', true);
    $item_features = get_post_meta($get_id, 'aera_cos_detail_feature', true);
?>

<div class="aera-cos-details">
    <div class="aera-cos-details__banner">
        <div class="container">
            <?php the_title('<h1 class="aera-cos-details__title">', '</h1>'); ?>
            <?php if (!empty($item_subtitle)) { ?>
                <p class="aera-cos-details__subtitle banner-text"><?php echo esc_html_e($item_subtitle); ?></p>
            <?php } ?>
        </div>
    </div>

    <div class="aera-cos-details__main">
        <div class="container">
            <div class="aera-cos-details__main-wrapper">
                <?php if (!empty($item_description)) { ?>
                    <div class="aera-cos-details__main-wrapper__left">
                        <div class="aera-cos-details__main-wrapper__left-text text">
                            <?php echo $item_description; ?>
                        </div>
                    </div>
                <?php } ?>
                <?php if (!empty($item_photo)) { ?>
                    <div class="aera-cos-details__main-wrapper__right">
                        <img src="<?php echo esc_url($item_photo); ?>" alt="<?php echo esc_html_e($item_photo_alt); ?>">
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>

    <div class="aera-cos-details__benefits">
        <div class="container">
            <div class="aera-cos-details__benefits-content">
                <div class="aera-cos-details__benefits-left">
                    <?php if (!empty($item_benefits)) { ?>
                        <h4 class="aera-cos-details__benefits-left__title aera-cos-details__benefits-title"><?php echo esc_html_e('Benefits'); ?></h4>
                        <div class="aera-cos-details__benefits-left__content text">
                            <?php echo $item_benefits; ?>
                        </div>
                    <?php } ?>
                </div>
                
                <div class="aera-cos-details__benefits-right">
                    <?php if (!empty($item_features)) { ?>
                        <h4 class="aera-cos-details__benefits-right__title aera-cos-details__benefits-title"><?php echo esc_html_e('Features'); ?></h4>
                        <div class="aera-cos-details__benefits-right__content text">
                            <?php echo $item_features; ?>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>