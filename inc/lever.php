<?php

/**
 * Lever API integration for fetching job postings.
 *
 * @package Aera_Technology
 */

namespace Aera;

defined('ABSPATH') || exit;

/**
 * Fetches jobs from Lever API.
 *
 * Uses WordPress transients for caching (15 minutes default).
 * Falls back to ACF field if API is unavailable or fails.
 *
 * @param bool $force_refresh Whether to bypass cache and force a fresh fetch.
 * @return array Array of job postings, each with: name, team, commitment, location, url.
 */
function fetch_lever_jobs($force_refresh = false): array
{
  // Check for Lever API URL in ACF options
  $lever_api_url = function_exists('get_field') ? get_field('lever_api_url', 'option') : '';

  // If no API URL configured, return empty array
  if (empty($lever_api_url)) {
    return array();
  }

  // Cache key
  $transient_key = 'aera_lever_jobs';
  $cache_duration = 15 * MINUTE_IN_SECONDS; // 15 minutes

  // Return cached data if available and not forcing refresh
  if (!$force_refresh) {
    $cached = get_transient($transient_key);
    if (false !== $cached) {
      return $cached;
    }
  }

  // Fetch from Lever API
  $response = wp_remote_get(
    $lever_api_url,
    array(
      'timeout' => 15,
      'headers' => array(
        'Accept' => 'application/json',
      ),
    )
  );

  // Check for errors
  if (is_wp_error($response)) {
    error_log('Lever API Error: ' . $response->get_error_message());
    return array();
  }

  $response_code = wp_remote_retrieve_response_code($response);
  if ($response_code !== 200) {
    error_log('Lever API Error: HTTP ' . $response_code);
    return array();
  }

  $body = wp_remote_retrieve_body($response);
  $jobs_data = json_decode($body, true);

  // Validate response
  if (!is_array($jobs_data)) {
    error_log('Lever API Error: Invalid JSON response');
    return array();
  }

  // Map Lever API response to our expected format
  $jobs = array();
  foreach ($jobs_data as $job) {
    // Extract job data from Lever API structure
    $job_text = $job['text'] ?? '';
    $job_categories = $job['categories'] ?? array();
    $job_team = $job_categories['team'] ?? '';
    $job_commitment = $job_categories['commitment'] ?? '';
    $job_location = $job_categories['location'] ?? '';
    $job_url = $job['hostedUrl'] ?? ($job['applyUrl'] ?? '#');
    $job_id = $job['id'] ?? '';

    // Only include jobs with at least a title
    if (!empty($job_text)) {
      $jobs[] = array(
        'id' => $job_id,
        'name' => $job_text,
        'team' => $job_team,
        'commitment' => $job_commitment,
        'location' => $job_location,
        'url' => $job_url,
      );
    }
  }

  // Cache the results
  set_transient($transient_key, $jobs, $cache_duration);

  return $jobs;
}

/**
 * Gets jobs for the careers page.
 *
 * Tries Lever API first, falls back to ACF field if API is unavailable.
 *
 * @return array Array of job postings.
 */
function get_careers_jobs(): array
{
  // Try to fetch from Lever API
  $lever_jobs = fetch_lever_jobs();

  // If we have jobs from Lever, use them
  if (!empty($lever_jobs)) {
    return $lever_jobs;
  }

  // Fallback to ACF field (for manual entry or JSON)
  $acf_jobs = function_exists('get_field') ? get_field('careers_jobs') : array();

  // If ACF field is a JSON string, decode it
  if (is_string($acf_jobs)) {
    $decoded = json_decode($acf_jobs, true);
    if (is_array($decoded)) {
      return $decoded;
    }
  }

  // If ACF field is already an array, return it
  if (is_array($acf_jobs)) {
    return $acf_jobs;
  }

  return array();
}

