<?php

/**
 * Template Name: Contact
 *
 * @package Aera_Technology
 */

get_header();

?>

<div class="intro">
  <div class="intro__container">
    <h1 class="intro__title"><?php esc_html_e('Contact us.', 'aera'); ?></h1>
    <p class="intro__text"><?php esc_html_e('The new era of decision making is here. Fill out the form below and we will be in touch shortly.', 'aera'); ?></p>
  </div>
</div>

<div class="makeContact">
  <div class="makeContact__container">
    <div id="contactFormWrapper" class="makeContact__inner">
      <?php the_content(); ?>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Check if form was submitted and show thank you message
    const formWrapper = document.getElementById('contactFormWrapper');
    if (formWrapper) {
      const checkInterval = setInterval(function() {
        const submittedMessage = formWrapper.querySelector('.submitted-message');
        if (submittedMessage) {
          // Form was submitted, could redirect or show thank you message
          clearInterval(checkInterval);
        }
      }, 500);
    }
  });
</script>

<?php
get_footer();
