<?php

/**
 * HubSpot page tracking for form context (equivalent to original React HubspotTracker).
 *
 * The original site used HubspotTracker to push setPath + trackPageView so HubSpot
 * knows the current page URL when forms are submitted. That enables URL-triggered
 * workflows/emails. This file loads the main HubSpot tracking script and sets the
 * current path on pages that have HubSpot forms.
 *
 * @see _ORIGINAL_FILES/hubspot-tracker/HubspotTracker.js
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/** Default HubSpot portal ID (must match forms). */
const HUBSPOT_TRACKER_PORTAL_ID = '4455954';

/**
 * Output HubSpot tracking script and setPath/trackPageView on pages with forms.
 *
 * Runs in wp_head so path is set before form embeds run. The main tracking script
 * creates _hsq and processes the queue; setPath/trackPageView ensure the submission
 * is associated with the correct page URL for workflow triggers.
 */
function hubspot_tracker_head(): void
{
  if (! \aera_has_hubspot_form()) {
    return;
  }

  $portal_id = function_exists('get_field') ? \get_field('hubspot_portal_id') : '';
  if (empty($portal_id)) {
    $portal_id = HUBSPOT_TRACKER_PORTAL_ID;
  }

  $path = '/';
  if (! empty($_SERVER['REQUEST_URI']) && is_string($_SERVER['REQUEST_URI'])) {
    $parsed = wp_parse_url(home_url(wp_unslash($_SERVER['REQUEST_URI'])), PHP_URL_PATH);
    if (is_string($parsed) && $parsed !== '') {
      $path = $parsed;
    }
  }

  $path_js = esc_js($path);
  $script_src = esc_url('https://js.hs-scripts.com/' . $portal_id . '.js');
  ?>
  <script type="text/javascript">
    window._hsq = window._hsq || [];
    window._hsq.push(['setPath', '<?php echo $path_js; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- esc_js above ?>']);
    window._hsq.push(['trackPageView']);
  </script>
  <script type="text/javascript" id="hs-script-loader" async defer src="<?php echo $script_src; ?>"></script>
  <?php
}

add_action('wp_head', __NAMESPACE__ . '\\hubspot_tracker_head', 2);
