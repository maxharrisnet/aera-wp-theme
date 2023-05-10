<?php
/*
 * Single post
 */
    $get_id = get_the_ID();
    $item_photo = get_post_meta($get_id, 'aera_skills_detail_picture', true);
    $item_photo_alt = get_the_title();
    $item_title = get_post_meta($get_id, 'aera_skills_detail_title', true);
    $item_subtitle = get_post_meta($get_id, 'aera_skills_detail_subtitle', true);
    $item_description = get_post_meta($get_id, 'aera_skills_detail_description', true);
    $item_main_text = get_post_meta($get_id, 'aera_skills_detail_main_text', true);
    $item_benefits = get_post_meta($get_id, 'aera_skills_detail_benefit', true);
    $item_skills = get_post_meta($get_id, 'aera_skills_detail_skill', true);
?>

<div class="aera-skills-details">
    <div class="aera-skills-details__banner">
        <div class="container">
            <?php if (!empty($item_title)) { ?>
                <h1 class="aera-skills-details__title"><?php echo esc_html_e($item_title); ?></h1>
            <?php } ?>
            <?php if (!empty($item_subtitle)) { ?>
                <p class="aera-skills-details__subtitle banner-text"><i><?php echo esc_html_e($item_subtitle); ?></i></p>
            <?php } ?>
            <?php if (!empty($item_description)) { ?>
                <p class="aera-skills-details__description large-text"><?php echo esc_html_e($item_description); ?></p>
            <?php } ?>
        </div>
    </div>

    <div class="aera-skills-details__main">
        <div class="container">
            <div class="aera-skills-details__main-wrapper">
                <?php if (!empty($item_photo)) { ?>
                    <div class="aera-skills-details__main-wrapper__top">
                        <img src="<?php echo esc_url($item_photo); ?>" alt="<?php echo esc_html_e($item_photo_alt); ?>">
                    </div>
                <?php } ?>

                <?php if (!empty($item_main_text)) { ?>
                    <div class="aera-skills-details__main-wrapper__bottom">
                        <div class="aera-skills-details__main-wrapper__bottom-text text">
                            <?php echo $item_main_text; ?>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>

    <div class="aera-skills-details__benefits">
        <div class="container">
            <div class="aera-skills-details__benefits-content">
                <div class="aera-skills-details__benefits-top">
                    <?php if (!empty($item_benefits)) { ?>
                        <h4 class="aera-skills-details__benefits-top__title aera-skills-details__benefits-title"><?php echo esc_html_e('Benefits'); ?></h4>
                        <div class="aera-skills-details__benefits-top__content text">
                            <?php echo $item_benefits; ?>
                        </div>
                    <?php } ?>
                </div>

                <div class="aera-skills-details__benefits-bottom">
                    <?php if (!empty($item_skills)) { ?>
                        <h4 class="aera-skills-details__benefits-bottom__title aera-skills-details__benefits-title"><?php echo esc_html_e('Cognitive Skills'); ?></h4>
                        <div class="aera-skills-details__benefits-bottom__content text">
                            <?php echo $item_skills; ?>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </div>
</div>