<?php
/**
 * Template part for displaying Featured Sessions on AeraHub 2025 page
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
				<h2><?php esc_html_e('Featured Sessions', 'aera'); ?></h2>
				<p><?php esc_html_e('Stories and perspectives on the impact of decision intelligence', 'aera'); ?></p>
			</section>
			<div class="aerahub-2025__keynoteDetailsWrapper">
				<?php
				// Opening Keynote
				$sessions = array(
					array(
						'thumbnail' => 'onDemandSessionKeynote.png',
						'vimeo_url' => 'https://player.vimeo.com/video/1134741780?h=e9a826bb82&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
						'title' => __('Opening Keynote', 'aera'),
						'description' => __('Decision intelligence isn\'t coming — it\'s already here. Aera Technology Co-founder and CEO Fred Laluyaux reveals how leading enterprises are embedding decision intelligence at scale to transform performance, resilience, and the very nature of work. Get a front-row view of the operating model that will define the next decade.', 'aera'),
						'speakers' => array(
							array(
								'image' => 'keynoteFred.png',
								'name' => __('Fred Laluyaux', 'aera'),
								'title' => __('Co-Founder, President & CEO, Aera Technology', 'aera'),
							),
						),
					),
					array(
						'thumbnail' => 'onDemandSessionHersheyGallo.png',
						'vimeo_url' => 'https://player.vimeo.com/video/1134447794?h=a10b2155e9&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
						'title' => __('Hershey and Gallo\'s Decision Intelligence Story', 'aera'),
						'description' => __('Sweet meets bold: discover how two iconic brands—The Hershey Company and Gallo—recently launched their decision intelligence journeys and are already realizing rapid ROI. In just a short time, they\'ve achieved faster decision cycles, higher productivity, improved fulfillment, and reduced waste. Hear how quick wins are fueling momentum, what it takes to accelerate value from day one, and their vision for scaling decision intelligence to drive agility and growth.', 'aera'),
						'speakers' => array(
							array(
								'image' => 'keynoteDouglas.png',
								'name' => __('Douglas Guilherme', 'aera'),
								'title' => __('Vice President, Global Supply Chain, The Hershey Company', 'aera'),
							),
							array(
								'image' => 'keynoteNitin.png',
								'name' => __('Nitin Murali', 'aera'),
								'title' => __('Vice President of Supply Chain Excellence, Gallo', 'aera'),
							),
						),
					),
					array(
						'thumbnail' => 'onDemandSessionDecisionIntelligence.png',
						'vimeo_url' => 'https://player.vimeo.com/video/1134693238?h=e8ed87e1f8&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
						'title' => __('Decision Intelligence 2025: State of Decisions Today and What\'s Next?', 'aera'),
						'description' => __('IDC\'s Megha Kumar—author of the IDC Decision Intelligence MarketScape —joins Fred Laluyaux to unveil brand-new survey insights on how enterprises are adopting decision intelligence. Gain insight into what\'s driving adoption trends, where most enterprise are today and where they are heading in their adoption of decision intelligence.', 'aera'),
						'speakers' => array(
							array(
								'image' => 'keynoteMegha.png',
								'name' => __('Megha Kumar', 'aera'),
								'title' => __('Research Vice President - Analytics and AI, IDC', 'aera'),
							),
						),
					),
					array(
						'thumbnail' => 'onDemandSessionAstraZeneca.png',
						'vimeo_url' => 'https://player.vimeo.com/video/1134710413?h=43f8525d8f&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
						'title' => __('Pioneering Self-Healing Supply Chains at AstraZeneca', 'aera'),
						'description' => __('Imagine supply chains that fix themselves. AstraZeneca is making that a reality. Learn how decision intelligence is transforming the company\'s clinical and commercial operations — accelerating timelines, expanding scope, and fueling efficiency. A glimpse into the self-healing supply chains of tomorrow happening today.', 'aera'),
						'speakers' => array(
							array(
								'image' => 'keynoteEduardo.png',
								'name' => __('Eduardo De La Calle', 'aera'),
								'title' => __('Executive Director, Intelligent Supply Chain, AstraZeneca', 'aera'),
							),
							array(
								'image' => 'keynoteSam.png',
								'name' => __('Sam Mulligan', 'aera'),
								'title' => __('Senior Director of Digital & Lean, Clinical Manufacturing & Supply, AstraZeneca', 'aera'),
							),
						),
					),
					array(
						'thumbnail' => 'onDemandSessionHarvardWGU02.png',
						'vimeo_url' => 'https://player.vimeo.com/video/1134718201?h=909310683e&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
						'title' => __('Reinventing Work and Learning: Insights from Harvard Business School and Western Governors University', 'aera'),
						'description' => __('The workforce is being reshaped—fast. As technology and AI accelerate change, Western Governors University is demonstrating how decision intelligence can drive innovation in education—personalizing learning, aligning skills with workforce demand, and preparing talent for the jobs of tomorrow. In this session, Harvard\'s Professor Joseph Fuller joins WGU leaders Jennie Sanders and Paul Bingham, moderated by Fred Laluyaux, to explore how decision intelligence is transforming both education and work. Together, they\'ll share bold strategies for equipping people—and organizations—to thrive in the future of work.', 'aera'),
						'speakers' => array(
							array(
								'image' => 'keynoteFuller.png',
								'name' => __('Joseph Fuller', 'aera'),
								'title' => __('Professor of Management Practice, Co-Director, Managing the Future of Work Project, Harvard Business School', 'aera'),
							),
							array(
								'image' => 'keynotePaul.png',
								'name' => __('Paul Bingham', 'aera'),
								'title' => __('Senior Vice President, Executive Dean, Western Governors University', 'aera'),
							),
							array(
								'image' => 'keynoteJennie.png',
								'name' => __('Jennie Sanders', 'aera'),
								'title' => __('Vice President, Experiential Product Management, Western Governors University', 'aera'),
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
								style="cursor: pointer;"
							/>
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
