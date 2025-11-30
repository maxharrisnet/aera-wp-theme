<?php

/**
 * Template Name: Contact
 *
 * @package Aera_Technology
 */

get_header();

?>

<?php get_template_part('template-parts/components/hero'); ?>

<div class="makeContact">
  <div class="makeContact__container">
    <div class="makeContact__inner">
      <div id="contactFormWrapper" class="contact-form__contentwrapper">
        <?php the_content(); ?>
      </div>
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
