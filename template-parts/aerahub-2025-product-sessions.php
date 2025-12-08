<?php

/**
 * Template part for displaying Product Sessions on AeraHub 2025 page
 *
 * @package Aera_Technology
 */

if (!isset($args['assets_uri'])) {
  $args['assets_uri'] = get_template_directory_uri() . '/assets/images/aerahub2025/';
}
$assets_uri = $args['assets_uri'];
?>

<div class="aerahub-2025__featuredsessionbox">
  <div class="aerahub-2025__featuredsessiontitlewrapper">
    <div class="aerahub-2025__featuredsessiontitle">
      <section class="aerahub-2025__sectionHeader">
        <h2><?php esc_html_e('Product Sessions', 'aera'); ?></h2>
        <p><?php esc_html_e('Starting, scaling, and succeeding with the Aera Decision Cloud', 'aera'); ?></p>
      </section>
      <div class="aerahub-2025__keynoteDetailsWrapper">
        <?php
        $sessions = array(
          array(
            'thumbnail' => 'onDemandSessionDIAgentsDemo.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134726806?h=46ab134b18&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('Working Side by Side with Your Decision Intelligence Agent (Live Demo)', 'aera'),
            'description' => __('What does it look like to work with your decision intelligence agent? See how Aera simplifies daily work by automating decisions, orchestrating processes, and surfacing insights in real time. From anticipating demand shifts to optimizing supply and fulfillment, discover how to make faster, smarter, and more agile decisions every day.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'keynoteLaurent.png',
                'name' => __('Laurent Lefouet', 'aera'),
                'title' => __('Chief Strategy Officer, Aera Technology', 'aera'),
              ),
              array(
                'image' => 'keynoteJuliana.png',
                'name' => __('Juliana Giraldo', 'aera'),
                'title' => __('Client Partner, Aera Technology', 'aera'),
              ),
            ),
          ),
          array(
            'thumbnail' => 'onDemandSessionDecisionCloud.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134753885?h=2e7addac35&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('Powering Your Decision Intelligence Agent with Aera Decision Cloud', 'aera'),
            'description' => __('Step into the future of agentic AI. See how Aera Decision Cloud transforms decision-making by rapidly building, deploying, and scaling intelligent skills that learn, adapt, and act in real time.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'keynoteMustafa.png',
                'name' => __('Mustafa Kabul', 'aera'),
                'title' => __('Senior Vice President, Data Science, Machine Learning, and AI, Aera Technology', 'aera'),
              ),
              array(
                'image' => 'keynoteLalitha.png',
                'name' => __('Lalitha Sundaramurthy', 'aera'),
                'title' => __('Senior Vice President, Head of Product, Aera Technology', 'aera'),
              ),
            ),
          ),
          array(
            'thumbnail' => 'onDemandSessionAeraProduct1.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134773659?h=72588db019&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('Aera Product Session: From Idea to Impact — How to Build and Maintain Aera Skills That Delivers', 'aera'),
            'description' => __('Get a practical walkthrough of Aera Workspaces—your hub for building, testing, and refining Aera Skills. Discover how teams collaborate to transform decision processes into automated capabilities for any area of the business.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'keynoteLalitha.png',
                'name' => __('Lalitha Sundaramurthy', 'aera'),
                'title' => __('Senior Vice President, Head of Product, Aera Technology', 'aera'),
              ),
            ),
          ),
          array(
            'thumbnail' => 'onDemandSessionAeraProduct2.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134769787?h=b4c0fd5287&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('Aera Product Session: Build Faster with Agentic AI', 'aera'),
            'description' => __('See how Aera\'s prebuilt agents and agentic capabilities make it easier than ever to design, deploy, and scale powerful decision-making skills. Learn how enterprises can accelerate skill development while maintaining flexibility and control—unlocking value with speed and precision.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'keynoteMustafa.png',
                'name' => __('Mustafa Kabul', 'aera'),
                'title' => __('Senior Vice President, Data Science, Machine Learning, and AI, Aera Technology', 'aera'),
              ),
            ),
          ),
        );

        foreach ($sessions as $session) :
        ?>
          <div class="aerahub-2025__keywnoteDetailsRow">
            <div class="aerahub-2025__keynoteCol1">
              <img
                src="<?php echo esc_url($assets_uri . $session['thumbnail']); ?>"
                data-vimeo-src="<?php echo esc_attr($session['vimeo_url']); ?>"
                alt="<?php echo esc_attr($session['title']); ?>"
                style="cursor: pointer;" />
            </div>
            <div class="aerahub-2025__keynoteCol2">
              <h4><?php echo esc_html($session['title']); ?></h4>
              <p><?php echo esc_html($session['description']); ?></p>
              <?php foreach ($session['speakers'] as $speaker) : ?>
                <div class="aerahub-2025__keynoteSpeakerDetails">
                  <div>
                    <img src="<?php echo esc_url($assets_uri . $speaker['image']); ?>" alt="<?php echo esc_attr($speaker['name']); ?>" />
                  </div>
                  <div class="aerahub-2025__keynoteSpeaker">
                    <h5><?php echo esc_html($speaker['name']); ?></h5>
                    <p><?php echo esc_html($speaker['title']); ?></p>
                  </div>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</div>