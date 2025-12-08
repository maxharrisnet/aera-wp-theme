<?php

/**
 * Template part for displaying Partner Sessions on AeraHub 2025 page
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
        <h2><?php esc_html_e('Partner Sessions', 'aera'); ?></h2>
        <p><?php esc_html_e('Learn how to get the most out of your decision intelligence investments with our partners', 'aera'); ?></p>
      </section>
      <div class="aerahub-2025__keynoteDetailsWrapper">
        <?php
        $sessions = array(
          array(
            'thumbnail' => 'onDemandSessionAccenture.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134748491?h=ccd7ec1fb0&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('The Era of Autonomous Operations with Accenture', 'aera'),
            'description' => __('The future belongs to enterprises that can think and act for themselves. Autonomous operations—powered by AI and real-time data—are reshaping how businesses run, enabling intelligent systems that sense, decide, and adapt without human intervention. In this session, Accenture explores how autonomy is redefining resilience and agility in a world of constant disruption. Hear bold perspectives on what it takes to bring autonomy to life at scale and how leading organizations are already harnessing it to outpace change and seize competitive advantage.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'keynoteDiego.png',
                'name' => __('Diego Pantoja-Navajas', 'aera'),
                'title' => __('Managing Director, Enterprise AI Value Strategy, Accenture', 'aera'),
              ),
            ),
          ),
          array(
            'thumbnail' => 'onDemandSessionDeloitte.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134757048?h=e592699668&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('The Value Roadmap: Building and Scaling Decision Intelligence with Deloitte', 'aera'),
            'description' => __('Where do you start? How do you scale? Deloitte reveals a value-first approach to decision intelligence—prioritizing the skills that deliver measurable impact. See how leading enterprises are building roadmaps that scale with confidence and unlock lasting value.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'speakers/keynoteElizabeth.png',
                'name' => __('Elizabeth Baker', 'aera'),
                'title' => __('Partner, Supply Chain & Network Operations and Aera Alliance Leader, Deloitte North America', 'aera'),
              ),
              array(
                'image' => 'speakers/keynoteKevin.png',
                'name' => __('Kevin Overdulve', 'aera'),
                'title' => __('Partner, Supply Chain & Network Operations and Aera Alliance Leader, Deloitte EMEA', 'aera'),
              ),
              array(
                'image' => 'speakers/keynoteGonzalo.png',
                'name' => __('Gonzalo Benedit', 'aera'),
                'title' => __('Chief Revenue Officer, Aera Technology', 'aera'),
              ),
            ),
          ),
          array(
            'thumbnail' => 'onDemandSessionEY.png',
            'vimeo_url' => 'https://player.vimeo.com/video/1134764962?h=7d6b887a46&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
            'title' => __('Orchestrating Material Planning Using Agentic AI with EY', 'aera'),
            'description' => __('EY will explore Aera\'s agentic AI transformative capabilities in addressing supply chain disruptions. Learn about the business case for implementing agentic AI, and hear guidance on how organizations initiate their autonomous journey and measure its success. Also, EY will showcase a real-world example of how Aera identifies a supplier delay and autonomously reruns scenarios to mitigate material planning risks, using agentic AI.', 'aera'),
            'speakers' => array(
              array(
                'image' => 'speakers/keynoteHarrison.png',
                'name' => __('Harrison Wickman', 'aera'),
                'title' => __('Senior Manager, Decision Intelligence, EY', 'aera'),
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