<?php

/**
 * Template Name: Careers
 *
 * @package Aera_Technology
 */

get_header();

$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';

// Culture section
$culture_title = function_exists('get_field') ? get_field('careers_culture_title') : __('The big ideas behind our culture.', 'aera');

// Values section - using ACF repeater or defaults
$values = function_exists('get_field') ? get_field('careers_values') : array();
if (empty($values)) {
  // Default values
  $values = array(
    array(
      'title' => __('Excellence', 'aera'),
      'text' => __('We shoot for the best<br />We don\'t compromise', 'aera'),
    ),
    array(
      'title' => __('Integrity', 'aera'),
      'text' => __('We do the right thing<br />We take the high road', 'aera'),
    ),
    array(
      'title' => __('Accountability', 'aera'),
      'text' => __('We deliver what we promise<br />As individuals and as a team', 'aera'),
    ),
    array(
      'title' => __('Speed', 'aera'),
      'text' => __('We decide with data<br />We fail and succeed fast', 'aera'),
    ),
    array(
      'title' => __('Disruption', 'aera'),
      'text' => __('We take risks<br />We think on our feet', 'aera'),
    ),
    array(
      'title' => __('Inclusion', 'aera'),
      'text' => __('We proactively build a diverse<br />community. We advance together', 'aera'),
    ),
  );
}

// Office image
$office_image = function_exists('get_field') ? get_field('careers_office_image') : null;
if (!$office_image) {
  // Use one of the career images as office image
  $office_image = array('url' => $assets_base . 'images/careers/2d828affcb3e235cec3fff40bfe5f655.jpg');
}

// Gallery images
$gallery_video = function_exists('get_field') ? get_field('careers_gallery_video') : null;
$gallery_image1 = function_exists('get_field') ? get_field('careers_gallery_image_1') : null;
$gallery_image2 = function_exists('get_field') ? get_field('careers_gallery_image_2') : null;
$gallery_image3 = function_exists('get_field') ? get_field('careers_gallery_image_3') : null;

// Default gallery images from careers folder
if (!$gallery_video) {
  $gallery_video = array('url' => $assets_base . 'images/careers/433963b63f2d0556648f3c53b79e16a2.jpg');
}
if (!$gallery_image1) {
  $gallery_image1 = array('url' => $assets_base . 'images/careers/c6e54815b36378a8c041ba56a26e6096.jpg');
}
if (!$gallery_image2) {
  $gallery_image2 = array('url' => $assets_base . 'images/careers/c3e938d1a2711f71e7e50c0f3dd1cd56.jpg');
}
if (!$gallery_image3) {
  $gallery_image3 = array('url' => $assets_base . 'images/careers/2d828affcb3e235cec3fff40bfe5f655.jpg');
}

// Roles section
$roles_title = function_exists('get_field') ? get_field('careers_roles_title') : __('Open Roles.', 'aera');
$roles_text = function_exists('get_field') ? get_field('careers_roles_text') : __('Headquartered in Mountain View, California, Aera is growing fast. We\'re building teams in San Francisco and Mountain View (California), Bucharest and Cluj-Napoca (Romania), Paris (France), Munich (Germany), London (UK), and Pune (India). We offer comprehensive healthcare plans, stock option grants, challenging work and the opportunity for professional growth.', 'aera');
$roles_bold_text = function_exists('get_field') ? get_field('careers_roles_bold_text') : __('All official opportunities for Aera Technology careers will come from @aeratechnology.com email. Please report any suspicious emails or other communications to security@aeratechnology.com', 'aera');

// Jobs - could be from ACF repeater or external API (Lever, etc.)
$jobs = function_exists('get_field') ? get_field('careers_jobs') : array();

?>

<main id="primary" class="site-main site-main--careers">
  <?php get_template_part('template-parts/components/hero'); ?>

  <!-- Office Image Section -->
  <?php if (!empty($office_image['url'])) : ?>
    <section class="image-block">
      <div class="image-block__container">
        <img
          src="<?php echo esc_url($office_image['url']); ?>"
          alt="<?php esc_attr_e('Aera Technology Office', 'aera'); ?>"
          loading="lazy" />
      </div>
    </section>
  <?php endif; ?>

  <!-- Culture Section -->
  <?php if (!empty($culture_title)) : ?>
    <section class="culture">
      <div class="culture__container">
        <h2 class="culture__title"><?php echo esc_html($culture_title); ?></h2>
      </div>
    </section>
  <?php endif; ?>

  <!-- Values Section -->
  <?php if (!empty($values)) : ?>
    <section class="column-content">
      <div class="columnContent__container">
        <div class="columnContent__row">
          <?php foreach ($values as $value) : ?>
            <?php
            $value_title = $value['title'] ?? '';
            $value_text = $value['text'] ?? '';
            ?>
            <div class="columnContent__col">
              <div class="columnContentItem">
                <?php if (!empty($value_title)) : ?>
                  <h3 class="columnContentItem__title"><?php echo esc_html($value_title); ?></h3>
                <?php endif; ?>
                <?php if (!empty($value_text)) : ?>
                  <div class="columnContentItem__text">
                    <p><?php echo wp_kses_post(nl2br($value_text)); ?></p>
                  </div>
                <?php endif; ?>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  <?php endif; ?>

  <!-- Gallery Section -->
  <section class="gallery">
    <div class="gallery__container">
      <div class="gallery__row">
        <div class="gallery__col1">
          <?php if (!empty($gallery_video['url'])) : ?>
            <img
              class="gallery__media"
              src="<?php echo esc_url($gallery_video['url']); ?>"
              alt="<?php esc_attr_e('Aera Technology Gallery', 'aera'); ?>"
              loading="lazy" />
          <?php endif; ?>
        </div>
        <div class="gallery__col2">
          <?php if (!empty($gallery_image1['url'])) : ?>
            <img
              class="gallery__media"
              src="<?php echo esc_url($gallery_image1['url']); ?>"
              alt="<?php esc_attr_e('Aera Technology Gallery', 'aera'); ?>"
              loading="lazy" />
          <?php endif; ?>
        </div>
      </div>
      <div class="gallery__row">
        <div class="gallery__col3">
          <?php if (!empty($gallery_image2['url'])) : ?>
            <img
              class="gallery__media"
              src="<?php echo esc_url($gallery_image2['url']); ?>"
              alt="<?php esc_attr_e('Aera Technology Gallery', 'aera'); ?>"
              loading="lazy" />
          <?php endif; ?>
        </div>
        <div class="gallery__col4">
          <?php if (!empty($gallery_image3['url'])) : ?>
            <img
              class="gallery__media"
              src="<?php echo esc_url($gallery_image3['url']); ?>"
              alt="<?php esc_attr_e('Aera Technology Gallery', 'aera'); ?>"
              loading="lazy" />
          <?php endif; ?>
        </div>
      </div>
    </div>
  </section>

  <!-- Roles Section -->
  <section id="open-roles" class="roles">
    <div class="roles__container">
      <div class="roles__content">
        <div class="roles__contentCol">
          <?php if (!empty($roles_title)) : ?>
            <h2 class="roles__title"><?php echo esc_html($roles_title); ?></h2>
          <?php endif; ?>
          <?php if (!empty($roles_text)) : ?>
            <p class="roles__text"><?php echo esc_html($roles_text); ?></p>
          <?php endif; ?>
          <?php if (!empty($roles_bold_text)) : ?>
            <p class="roles__boldtext"><strong><?php echo esc_html($roles_bold_text); ?></strong></p>
          <?php endif; ?>

          <!-- Job Filters -->
          <form class="roles__filter" id="jobFilters">
            <div class="roles__filterItem">
              <label for="filter-role"><?php esc_html_e('Role', 'aera'); ?></label>
              <select id="filter-role" name="role" class="roles__select">
                <option value="all"><?php esc_html_e('All teams', 'aera'); ?></option>
                <!-- Options will be populated dynamically from jobs -->
              </select>
            </div>
            <div class="roles__filterItem">
              <label for="filter-countries"><?php esc_html_e('Country', 'aera'); ?></label>
              <select id="filter-countries" name="country" class="roles__select">
                <option value="all"><?php esc_html_e('All countries', 'aera'); ?></option>
                <!-- Options will be populated dynamically from jobs -->
              </select>
            </div>
            <div class="roles__filterItem" id="filter-cities-wrapper" style="display: none;">
              <label for="filter-cities"><?php esc_html_e('City', 'aera'); ?></label>
              <select id="filter-cities" name="city" class="roles__select">
                <option value="all"><?php esc_html_e('All cities', 'aera'); ?></option>
                <!-- Options will be populated dynamically from jobs -->
              </select>
            </div>
          </form>
        </div>
      </div>

      <!-- Jobs List -->
      <div id="jobsList" class="roles__listWrapper">
        <div class="roles__row roles__row--header">
          <div class="roles__col"><?php esc_html_e('Role', 'aera'); ?></div>
          <div class="roles__col"><?php esc_html_e('Location', 'aera'); ?></div>
        </div>
        <ul class="roles__list" id="jobsListItems">
          <!-- Jobs will be populated here -->
          <?php if (empty($jobs)) : ?>
            <li class="roles__noMatch">
              <p class="roles__noMatchContent">
                <?php esc_html_e('No job postings available at this time. Please check back later.', 'aera'); ?>
              </p>
            </li>
          <?php else : ?>
            <?php foreach ($jobs as $job) : ?>
              <?php
              $job_name = $job['name'] ?? '';
              $job_team = $job['team'] ?? '';
              $job_commitment = $job['commitment'] ?? '';
              $job_location = $job['location'] ?? '';
              $job_url = $job['url'] ?? '#';
              ?>
              <li class="rolesItem" data-team="<?php echo esc_attr($job_team); ?>" data-location="<?php echo esc_attr($job_location); ?>">
                <a class="rolesItem__link" href="<?php echo esc_url($job_url); ?>" target="_blank" rel="noopener noreferrer">
                  <div class="rolesItem__row">
                    <div class="rolesItem__col">
                      <div class="rolesItem__heading">
                        <h3 class="rolesItem__name"><?php echo esc_html($job_name); ?></h3>
                        <p class="rolesItem__type"><?php echo esc_html($job_team . ($job_commitment ? ', ' . $job_commitment : '')); ?></p>
                      </div>
                    </div>
                    <div class="rolesItem__col">
                      <p class="rolesItem__location"><?php echo esc_html($job_location); ?></p>
                    </div>
                  </div>
                </a>
              </li>
            <?php endforeach; ?>
          <?php endif; ?>
        </ul>
        <div class="roles__noMatch" id="noJobsMatch" style="display: none;">
          <p class="roles__noMatchContent">
            <?php esc_html_e('No job postings match these filters', 'aera'); ?>
          </p>
        </div>
      </div>
    </div>
  </section>
</main>

<script>
  (function() {
    'use strict';

    // Scroll to open roles section
    function initFindCareerButton() {
      const findCareerBtn = document.getElementById('findCareer');
      const openRolesSection = document.getElementById('open-roles');

      if (findCareerBtn && openRolesSection) {
        findCareerBtn.addEventListener('click', function() {
          const offsetTop = openRolesSection.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        });
      }
    }

    // Job filtering functionality
    function initJobFilters() {
      const roleFilter = document.getElementById('filter-role');
      const countryFilter = document.getElementById('filter-countries');
      const cityFilter = document.getElementById('filter-cities');
      const cityWrapper = document.getElementById('filter-cities-wrapper');
      const jobsList = document.getElementById('jobsListItems');
      const noMatchMessage = document.getElementById('noJobsMatch');
      const allJobs = Array.from(document.querySelectorAll('.rolesItem'));

      if (!roleFilter || !countryFilter || !cityFilter || !jobsList) {
        return;
      }

      // Extract unique teams and locations from jobs
      const teams = new Set();
      const locations = new Set();
      const locationData = {};

      allJobs.forEach(function(job) {
        const team = job.getAttribute('data-team');
        const location = job.getAttribute('data-location');

        if (team) teams.add(team);
        if (location) {
          locations.add(location);
          // Parse location to extract country and city
          const locationParts = location.split(',').map(s => s.trim());
          if (locationParts.length > 1) {
            const city = locationParts.slice(0, -1).join(', ');
            const country = locationParts[locationParts.length - 1];
            if (!locationData[country]) {
              locationData[country] = [];
            }
            if (!locationData[country].includes(city)) {
              locationData[country].push(city);
            }
          }
        }
      });

      // Populate role filter
      Array.from(teams).sort().forEach(function(team) {
        const option = document.createElement('option');
        option.value = team;
        option.textContent = team;
        roleFilter.appendChild(option);
      });

      // Populate country filter
      Object.keys(locationData).sort().forEach(function(country) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter.appendChild(option);
      });

      // Filter function
      function filterJobs() {
        const selectedRole = roleFilter.value;
        const selectedCountry = countryFilter.value;
        const selectedCity = cityFilter.value;

        let visibleCount = 0;

        allJobs.forEach(function(job) {
          const jobTeam = job.getAttribute('data-team');
          const jobLocation = job.getAttribute('data-location');
          let show = true;

          // Filter by role
          if (selectedRole !== 'all' && jobTeam !== selectedRole) {
            show = false;
          }

          // Filter by location
          if (show && selectedCountry !== 'all') {
            const locationParts = jobLocation.split(',').map(s => s.trim());
            const jobCountry = locationParts[locationParts.length - 1];

            if (jobCountry !== selectedCountry) {
              show = false;
            } else if (selectedCity !== 'all') {
              const jobCity = locationParts.slice(0, -1).join(', ');
              if (jobCity !== selectedCity) {
                show = false;
              }
            }
          }

          job.style.display = show ? '' : 'none';
          if (show) visibleCount++;
        });

        // Show/hide no match message
        if (visibleCount === 0) {
          noMatchMessage.style.display = 'block';
          jobsList.style.display = 'none';
        } else {
          noMatchMessage.style.display = 'none';
          jobsList.style.display = '';
        }
      }

      // Country filter change - update city filter
      countryFilter.addEventListener('change', function() {
        const selectedCountry = this.value;
        cityFilter.innerHTML = '<option value="all"><?php echo esc_js(__('All cities', 'aera')); ?></option>';

        if (selectedCountry !== 'all' && locationData[selectedCountry]) {
          cityWrapper.style.display = 'block';
          locationData[selectedCountry].sort().forEach(function(city) {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
          });
        } else {
          cityWrapper.style.display = 'none';
        }

        filterJobs();
      });

      // Role and city filter changes
      roleFilter.addEventListener('change', filterJobs);
      cityFilter.addEventListener('change', filterJobs);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initFindCareerButton();
        initJobFilters();
      });
    } else {
      initFindCareerButton();
      initJobFilters();
    }
  })();
</script>

<?php
get_footer();
