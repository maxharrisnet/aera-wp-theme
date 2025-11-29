<?php

/**
 * Template Name: What is Decision Intelligence
 *
 * @package Aera_Technology
 */

get_header();

$assets_base = trailingslashit(get_template_directory_uri()) . 'assets/';
$original_files_base = trailingslashit(get_template_directory_uri()) . '_ORIGINAL_FILES/';

// Image paths - these should be updated to actual paths in the theme
$image_wdi = $assets_base . 'images/decisionintelligence/Whatisdecisionintelligence.jpg';
$image_venn_diagram = $assets_base . 'images/decisionintelligence/VennDiagramofDecisionIntelligence.png';
$image_venn_diagram_mobile = $assets_base . 'images/decisionintelligence/VennDiagramofDecisionIntelligenceMobile.jpg';
$image_ai_colab = $assets_base . 'images/decisionintelligence/TheSpectrumofAICollaborationinDigitizedDecisionMaking.jpg';
$image_ai_colab_mobile = $assets_base . 'images/decisionintelligence/TheSpectrumofAICollaborationinDigitizedDecisionMakingMobile.jpg';
$image_use_cases = $assets_base . 'images/decisionintelligence/BenefitsCapabilitiesUseCases.png';
$image_use_cases_mobile = $assets_base . 'images/decisionintelligence/BenefitsCapabilitiesUseCasesMobile.jpg';
$image_software_stocks = $assets_base . 'images/decisionintelligence/softwarestocks.png';
$image_software_stocks_mobile = $assets_base . 'images/decisionintelligence/softwarestocksMobile.jpg';

// Hero section
$hero_title = __('What is Decision Intelligence?', 'aera');
$hero_text = __('This guide introduces decision intelligence — what it does, why it\'s different, and where it delivers value across the enterprise.', 'aera');
$hero_full_height = true;

?>
<main id="primary" class="site-main site-main--decision-intelligence">
	<?php
	get_template_part(
		'template-parts/components/hero',
		null,
		array(
			'hero_title'      => $hero_title,
			'hero_text'       => $hero_text,
			'hero_full_height' => $hero_full_height,
		)
	);
	?>

	<div class="di" id="outerSection">
		<div class="di__section" id="sectionWrapper">
			<div class="di__scrollWrapper">
				<div class="contentRow">
					<nav class="nav" id="navMobile">
						<div id="hamburgerToggle">
							<div id="tableTitle"><?php esc_html_e('Table of Contents', 'aera'); ?></div>
							<div id="toggleIcon">▼</div>
						</div>
						<div class="listTitle"><?php esc_html_e('Table of Contents', 'aera'); ?></div>
						<ul id="menu" class="accordion">
							<li class="main">
								<a href="#section1"><?php esc_html_e('What is decision intelligence?', 'aera'); ?></a>
							</li>
							<li class="main">
								<a href="#section2"><?php esc_html_e('Benefits, Capabilities, Use Cases', 'aera'); ?></a>
								<span class="toggle-btn">▼</span>
								<ul class="submenu">
									<li>
										<a href="#section2"><?php esc_html_e('Why is decision intelligence important? What are its benefits?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section2-1"><?php esc_html_e('What is a decision intelligence platform?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section2-2"><?php esc_html_e('What are the key capabilities of a decision intelligence platform?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section2-3"><?php esc_html_e('Who uses decision intelligence, and what problems does it solve across industries?', 'aera'); ?></a>
									</li>
								</ul>
							</li>
							<li class="main">
								<a href="#section3"><?php esc_html_e('Differences from Other Tools & Disciplines', 'aera'); ?></a>
								<span class="toggle-btn">▼</span>
								<ul class="submenu">
									<li>
										<a href="#section3"><?php esc_html_e('How is decision intelligence different from other analytical tools?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section3-1"><?php esc_html_e('How are planning solutions different from decision intelligence platforms?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section3-2"><?php esc_html_e('What is the difference between decision intelligence and data science?', 'aera'); ?></a>
									</li>
								</ul>
							</li>
							<li class="main">
								<a href="#section4"><?php esc_html_e('The Role of Artificial Intelligence in Decision Intelligence', 'aera'); ?></a>
								<span class="toggle-btn">▼</span>
								<ul class="submenu">
									<li>
										<a href="#section4"><?php esc_html_e('How is artificial intelligence related to decision intelligence?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section4-1"><?php esc_html_e('What is agentic AI, and how does it enhance decision intelligence beyond other AI methods?', 'aera'); ?></a>
									</li>
								</ul>
							</li>
							<li class="main">
								<a href="#section5"><?php esc_html_e('Deploying Decision Intelligence with a Platform', 'aera'); ?></a>
								<span class="toggle-btn">▼</span>
								<ul class="submenu">
									<li>
										<a href="#section5"><?php esc_html_e('How can companies get started with decision intelligence?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section5-1"><?php esc_html_e('What is a decision intelligence skill?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section5-2"><?php esc_html_e('What is self-service decision intelligence?', 'aera'); ?></a>
									</li>
									<li>
										<a href="#section5-3"><?php esc_html_e('Where does decision intelligence fit in the enterprise stack?', 'aera'); ?></a>
									</li>
								</ul>
							</li>
							<li class="main">
								<a href="#section6"><?php esc_html_e('Ready to Make Smarter Decisions?', 'aera'); ?></a>
							</li>
						</ul>
					</nav>
					<div class="mainLeft" id="leftWrapper">
						<section id="section1" class="borderBottom">
							<div>
								<img src="<?php echo esc_url($image_wdi); ?>" class="sectionImg" alt="<?php esc_attr_e('What is decision intelligence', 'aera'); ?>" />
							</div>
							<h2 class="sectionTitle"><?php esc_html_e('What is decision intelligence?', 'aera'); ?></h2>
							<p><?php esc_html_e('Decision intelligence (DI) is the optimization and orchestration of decision-making across an enterprise value chain. DI understands how decisions are made and uses data, analytics, AI, and automation to create a feedback-driven process that refines decisions over time — enhancing both decision quality and business impact through recommendations or autonomous action. In effect, DI shifts decision-making from people making decisions supported by machines to machines making decisions guided by people, allowing human oversight while dramatically increasing scale and speed.', 'aera'); ?></p>
							<p>
								<?php
								printf(
									/* translators: %1$s: IDC link, %2$s: Gartner link */
									esc_html__('Industry analyst %1$s defines decision intelligence as being "a discipline and technology that helps organizations design, engineer, and orchestrate decisions by fully or partially automating all the steps in the decision-making process." Similarly, %2$s has defined it as "the practical discipline used to improve decision making by explicitly understanding and engineering how decisions are made, and how outcomes are evaluated, managed and improved by feedback."', 'aera'),
									'<a href="https://my.idc.com/getdoc.jsp?containerId=US51047423" target="_blank" rel="noopener noreferrer" class="contentLink">IDC</a>',
									'<a href="https://www.gartner.com/en/information-technology/glossary/decision-intelligence#:~:text=Decision%20intelligence%20is%20a%20practical,tune%20decision%20models%20and%20processes." target="_blank" rel="noopener noreferrer" class="contentLink">Gartner</a>'
								);
								?>
							</p>
							<img src="<?php echo esc_url($image_venn_diagram); ?>" class="sectionImg imgHiddenXs" alt="<?php esc_attr_e('Venn diagram showing decision intelligence at the center of three overlapping areas: artificial intelligence, data and analytics, and automation — representing the integration required for intelligent decision-making.', 'aera'); ?>" />
							<img src="<?php echo esc_url($image_venn_diagram_mobile); ?>" class="sectionImg imgShowXs" alt="<?php esc_attr_e('Venn diagram showing decision intelligence at the center of three overlapping areas: artificial intelligence, data and analytics, and automation — representing the integration required for intelligent decision-making.', 'aera'); ?>" />
							<p><?php esc_html_e('Traditional decision-making, reliant on human interpretation of data, can\'t keep pace with today\'s speed and complexity. What businesses need now is decision intelligence — an intelligent, scalable solution to continuously optimize decisions. DI not only recommends the best course of action but learns from outcomes and executes decisions in real time. The result: faster, more consistent, and more governed decision-making across the enterprise.', 'aera'); ?></p>
							<p><?php esc_html_e('Key aspects of decision intelligence:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Data-driven decisions:', 'aera'); ?></strong> <?php esc_html_e('Uses real-time, historical, structured, and unstructured data to inform actions.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('AI and automation:', 'aera'); ?></strong> <?php esc_html_e('Applies logic and rules to automate decisions, reducing manual work and improving speed.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Context-aware intelligence:', 'aera'); ?></strong> <?php esc_html_e('Considers business goals, constraints, and environments in each recommendation.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Scenario planning:', 'aera'); ?></strong> <?php esc_html_e('Enables simulation of multiple outcomes to support smarter choices.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Continuous learning:', 'aera'); ?></strong> <?php esc_html_e('Improves decision quality through feedback loops.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('Decision intelligence repositions humans as decision architects who design how decisions are made. It operates at three levels of AI involvement, depending on the type of data:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Decision support (human in the loop):', 'aera'); ?></strong> <?php esc_html_e('AI provides insights and performs simulations with alternative paths (e.g., scenario modeling for pricing decisions)', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Decision augmentation (human on the loop):', 'aera'); ?></strong> <?php esc_html_e('AI provides recommendations with full context and possible impact, and a human makes the final call to execute, change or reject the decision (e.g., recommendations for supplier sourcing)', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Decision automation (human out of the loop):', 'aera'); ?></strong> <?php esc_html_e('AI autonomously makes decisions and takes action within predefined constraints, with full auditability of actions (e.g., fully executed logistics optimization).', 'aera'); ?>
								</li>
							</ul>
							<img src="<?php echo esc_url($image_ai_colab); ?>" class="sectionImg imgHiddenXs" alt="<?php esc_attr_e('Chart illustrating three levels of AI collaboration in decision-making: human in the loop for decision support, human on the loop for decision augmentation, and human out of the loop for full automation — mapped across automation level and decision type.', 'aera'); ?>" />
							<img src="<?php echo esc_url($image_ai_colab_mobile); ?>" class="sectionImg imgShowXs" alt="<?php esc_attr_e('Chart illustrating three levels of AI collaboration in decision-making: human in the loop for decision support, human on the loop for decision augmentation, and human out of the loop for full automation — mapped across automation level and decision type.', 'aera'); ?>" />
							<p><?php esc_html_e('At every level, transparency and feedback improve decision quality. DI turns decision-making into a structured, scalable process that drives measurable business results.', 'aera'); ?></p>
						</section>

						<section id="section2">
							<h2 class="sectionTitle"><?php esc_html_e('Benefits, Capabilities, Use Cases', 'aera'); ?></h2>
							<h3 class="sectionSubTitle"><?php esc_html_e('Why is decision intelligence important? What are its benefits?', 'aera'); ?></h3>
							<p><?php esc_html_e('Decision intelligence is essential for businesses facing a surge in decision volume and complexity in today\'s fast-moving environment. It enables smarter, synchronized decision-making at scale by linking data, recommendations, and actions — optimizing decisions across the value chain and helping organizations stay agile and competitive.', 'aera'); ?></p>
							<p><?php esc_html_e('Key benefits include:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Improved decision accuracy and granularity.', 'aera'); ?></strong> <?php esc_html_e('DI analyzes all data — structured and unstructured — and applies analytics and AI to improve decision quality. It supports, augments, or automates decision-making at a level of detail and accuracy human judgment alone can\'t achieve.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Increased decision speed and efficiency.', 'aera'); ?></strong> <?php esc_html_e('DI reduces manual effort by providing real-time recommendations and automating routine decisions, scaling decision velocity across the organization.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Reduced risk and uncertainty.', 'aera'); ?></strong> <?php esc_html_e('DI simulates scenarios, surfaces potential risks, and helps implement proactive strategies — leading to better compliance, fewer surprises, and smarter investments.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Consistency and enhanced collaboration.', 'aera'); ?></strong> <?php esc_html_e('DI provides a single version of the truth, accessible to all teams via dashboards and natural language interfaces, ensuring aligned and consistent decision logic.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Connected decisions and continuous learning.', 'aera'); ?></strong> <?php esc_html_e('DI links decisions across functions and continuously learns, optimizing decision-making at scale.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('Decision intelligence is AI designed to drive tangible business value and measurable ROI. In supply chains, for instance, it cuts costs, reduces waste, boosts efficiency, improves inventory control, and increases service levels — all through more intelligent, automated decision-making:', 'aera'); ?></p>
							<img src="<?php echo esc_url($image_use_cases); ?>" class="sectionImg imgHiddenXs" alt="<?php esc_attr_e('Diagram highlighting five benefits of decision intelligence in supply chain optimization: cost reduction, waste reduction, increased efficiency, improved inventory performance, and revenue growth — all enabled by real-time visibility, automation, and smarter decisions.', 'aera'); ?>" />
							<img src="<?php echo esc_url($image_use_cases_mobile); ?>" class="sectionImg imgShowXs" alt="<?php esc_attr_e('Diagram highlighting five benefits of decision intelligence in supply chain optimization: cost reduction, waste reduction, increased efficiency, improved inventory performance, and revenue growth — all enabled by real-time visibility, automation, and smarter decisions.', 'aera'); ?>" />
							<p><?php esc_html_e('In short, DI enables faster, better decisions by fusing AI\'s scale with human judgment — helping organizations shift from reactive choices to proactive strategy execution.', 'aera'); ?></p>
							<p>
								<a href="<?php echo esc_url(home_url('/customers')); ?>" target="_blank" rel="noopener noreferrer" class="contentLink">
									<?php esc_html_e('Learn more about how Aera customers are using decision intelligence.', 'aera'); ?>
								</a>
							</p>
						</section>

						<section id="section2-1" class="subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('What is a decision intelligence platform?', 'aera'); ?></h3>
							<p>
								<?php
								printf(
									/* translators: %s: Gartner link */
									esc_html__('%s (DIPs) as "software used to create solutions that support, automate and augment decision making of humans or machines, powered by the composition of data, analytics, knowledge, and artificial intelligence (AI) techniques." These platforms bridge data and execution, transforming insights into timely action.', 'aera'),
									'<a href="https://www.gartner.com/reviews/market/decision-intelligence-platforms" target="_blank" rel="noopener noreferrer" class="contentLink">' . esc_html__('Gartner defines decision intelligence platforms', 'aera') . '</a>'
								);
								?>
							</p>
							<p>
								<?php
								printf(
									/* translators: %s: word "true" in bold */
									esc_html__('At a minimum, a %s decision intelligence platform should incorporate all of these crucial components:', 'aera'),
									'<strong>' . esc_html__('true', 'aera') . '</strong>'
								);
								?>
							</p>
							<ul>
								<li>
									<strong><?php esc_html_e('Data.', 'aera'); ?></strong> <?php esc_html_e('It aggregates and harmonizes data from multiple sources — structured databases, unstructured text, IoT devices, cloud apps — to provide a comprehensive view. It extracts and unifies billions of transactions from enterprise systems and external sources into an open, composable, transactional decision data model.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Automation.', 'aera'); ?></strong> <?php esc_html_e('It mirrors the dynamic thinking behind human decisions by applying transparent business rules and AI-driven logic. The platform can automate execution where appropriate, while still allowing humans to review and control as needed.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Composability.', 'aera'); ?></strong> <?php esc_html_e('It\'s modular, flexible, and configurable — enabling businesses to adapt quickly without overhauling systems. It allows organizations to assemble decision flows, integrate AI models, and build custom interfaces for specific needs.', 'aera'); ?>
								</li>
							</ul>
							<p>
								<?php
								printf(
									/* translators: %s: word "advanced" in bold */
									esc_html__('In addition, an %s decision intelligence platform incorporates these components:', 'aera'),
									'<strong>' . esc_html__('advanced', 'aera') . '</strong>'
								);
								?>
							</p>
							<ul>
								<li>
									<strong><?php esc_html_e('Intelligence.', 'aera'); ?></strong> <?php esc_html_e('It leverages AI to forecast outcomes using historical and real-time data. It supports decision automation, augmentation, and support by continuously sensing conditions, analyzing shifts, and learning from outcomes. Over time, this creates a self-improving, real-time learning loop that evolves decision models with changing business needs.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Engagement.', 'aera'); ?></strong> <?php esc_html_e('Leveraging agentic AI, it engages users through natural language and interactive UX. It explains its reasoning, provides full data traceability, and fosters trust by showing the "why" behind every recommendation — down to the transaction level.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('In addition to these attributes, many decision intelligence platforms provide intuitive dashboards, visual analytics, and interactive reports that make data insights accessible to business users without requiring deep technical expertise.', 'aera'); ?></p>
							<p>
								<?php
								printf(
									/* translators: %s: Gartner Market Guide link */
									esc_html__('Read more in the %s.', 'aera'),
									'<a href="' . esc_url(home_url('/blogs/aera-technology-featured-in-gartner-market-guide-for-cutting-edge-decision-intelligence-platforms')) . '" class="contentLink" target="_blank" rel="noopener noreferrer">' . esc_html__('Gartner Market Guide for Decision Intelligence Platforms', 'aera') . '</a>'
								);
								?>
							</p>
						</section>

						<section id="section2-2" class="subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('What are the key capabilities of a decision intelligence platform?', 'aera'); ?></h3>
							<p><?php esc_html_e('A robust DI platform combines capabilities across data, AI, workflow automation, and user interaction:', 'aera'); ?></p>
							<ul>
								<li>
									<?php esc_html_e('Data Integration & Real-Time Processing', 'aera'); ?>
									<ul>
										<li><?php esc_html_e('Structured and unstructured data ingestion', 'aera'); ?></li>
										<li><?php esc_html_e('Data integration and streaming from multiple sources', 'aera'); ?></li>
										<li><?php esc_html_e('Data harmonization', 'aera'); ?></li>
									</ul>
								</li>
								<li>
									<?php esc_html_e('Decision Composibility', 'aera'); ?>
									<ul>
										<li><?php esc_html_e('Decision modeling and orchestration design', 'aera'); ?></li>
										<li><?php esc_html_e('Advanced analytics and composite AI/ML capabilities', 'aera'); ?></li>
										<li><?php esc_html_e('Simulation and modeling capabilities to test potential decisions', 'aera'); ?></li>
										<li><?php esc_html_e('AI agents for decision reasoning', 'aera'); ?></li>
										<li><?php esc_html_e('Recommendation engines to suggest optimal choices', 'aera'); ?></li>
									</ul>
								</li>
								<li>
									<?php esc_html_e('Decision-Centric Engagement', 'aera'); ?>
									<ul>
										<li><?php esc_html_e('Decision-centric interfaces', 'aera'); ?></li>
										<li><?php esc_html_e('Natural language processing for conversational insights', 'aera'); ?></li>
										<li><?php esc_html_e('Simulation and modeling capabilities to test potential decisions', 'aera'); ?></li>
										<li><?php esc_html_e('Visualization techniques to provide contextual information', 'aera'); ?></li>
									</ul>
								</li>
								<li>
									<?php esc_html_e('Learning & Auditability', 'aera'); ?>
									<ul>
										<li><?php esc_html_e('Continuous learning from every decision made', 'aera'); ?></li>
										<li><?php esc_html_e('Transparency and auditing of decision types, number of decisions, outcomes, and approvals', 'aera'); ?></li>
									</ul>
								</li>
								<li>
									<?php esc_html_e('Enterprise-Scale Deployment & Security', 'aera'); ?>
									<ul>
										<li><?php esc_html_e('Assurance of data governance, regulatory compliance, and role-based access control', 'aera'); ?></li>
										<li><?php esc_html_e('Scaling to handle complex, multi-layered decision processes across global operations', 'aera'); ?></li>
									</ul>
								</li>
							</ul>
							<p><?php esc_html_e('Together, these capabilities help companies standardize and scale decision-making across functions and time horizons. DI platforms create consistent, repeatable processes that allow organizations to adapt quickly, simulate outcomes effectively, and track performance with clarity. By relying on data and logic rather than intuition, they reduce bias and improve objectivity. This results in a more agile, transparent, and measurable system of intelligence — one that aligns strategy and action to accelerate enterprise-wide transformation.', 'aera'); ?></p>
							<p>
								<a href="<?php echo esc_url(home_url('/decision-cloud')); ?>" target="_blank" rel="noopener noreferrer" class="contentLink">
									<?php esc_html_e('Learn more about Aera Decision Cloud.', 'aera'); ?>
								</a>
							</p>
						</section>

						<section id="section2-3" class="borderBottom subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('Who uses decision intelligence, and what problems does it solve across industries?', 'aera'); ?></h3>
							<p><?php esc_html_e('Decision intelligence platforms are used across a wide variety of sectors — especially those that rely on high volumes of data, rapid decision cycles, and complex value chains.', 'aera'); ?></p>
							<p><strong><?php esc_html_e('All Manufacturing', 'aera'); ?></strong></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Demand Forecasting:', 'aera'); ?></strong> <?php esc_html_e('Predicting demand fluctuations and adjusting inventory levels accordingly.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Inventory Waste Management:', 'aera'); ?></strong> <?php esc_html_e('Reducing waste and markdowns by identifying slow-moving or expiring products and recommending mitigations.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Logistics Optimization:', 'aera'); ?></strong> <?php esc_html_e('Determining the most efficient transportation routes to reduce costs, delivery times and carbon emissions.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Warehouse Management:', 'aera'); ?></strong> <?php esc_html_e('Automating restocking and optimizing warehouse space utilization.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Control Tower Visibility:', 'aera'); ?></strong> <?php esc_html_e('Providing real-time insights to manage disruptions proactively.', 'aera'); ?>
								</li>
							</ul>
							<p><strong><?php esc_html_e('Retail & Consumer Goods', 'aera'); ?></strong></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Price Optimization:', 'aera'); ?></strong> <?php esc_html_e('Dynamically adjusting pricing based on demand, competition, and inventory levels.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Inventory Replenishment:', 'aera'); ?></strong> <?php esc_html_e('Ensuring products are available when and where they are needed.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Claims Management:', 'aera'); ?></strong> <?php esc_html_e('Extracting unstructured claims data, validating claims, and automating claims processing.', 'aera'); ?>
								</li>
							</ul>
							<p><strong><?php esc_html_e('LifeSciences & Pharmaceuticals', 'aera'); ?></strong></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Drug Supply Chain Management:', 'aera'); ?></strong> <?php esc_html_e('Ensuring the timely distribution of medications.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Clinical Trial Optimization:', 'aera'); ?></strong> <?php esc_html_e('Identifying the best patient cohorts and trial locations.', 'aera'); ?>
								</li>
							</ul>
							<p><strong><?php esc_html_e('Energy & Utilities', 'aera'); ?></strong></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Sustainability Planning:', 'aera'); ?></strong> <?php esc_html_e('Helping businesses meet carbon reduction goals efficiently.', 'aera'); ?>
								</li>
							</ul>
							<p><strong><?php esc_html_e('Financial Services & Banking', 'aera'); ?></strong></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Fraud Detection:', 'aera'); ?></strong> <?php esc_html_e('Identifying fraudulent transactions in real time.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Risk Assessment:', 'aera'); ?></strong> <?php esc_html_e('Automating credit and loan approval processes.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('In particular, large companies with massively complex operations provide excellent use cases for decision intelligence — both to harmonize all the data they generate across multiple systems, and to digitize, augment, and automate decision-making at scale. By addressing inefficiencies, improving forecasting, and mitigating risks, decision intelligence platforms enable organizations across these industries to enhance performance, reduce costs, and drive better strategic outcomes.', 'aera'); ?></p>
							<p>
								<a href="<?php echo esc_url(home_url('/customers')); ?>" target="_blank" rel="noopener noreferrer" class="contentLink">
									<?php esc_html_e('Learn more about how Aera customers are using decision intelligence.', 'aera'); ?>
								</a>
							</p>
						</section>

						<section id="section3">
							<h2 class="sectionTitle"><?php esc_html_e('Differences from Other Tools & Disciplines', 'aera'); ?></h2>
							<h3 class="sectionSubTitle"><?php esc_html_e('How is decision intelligence different from other analytical tools?', 'aera'); ?></h3>
							<p><?php esc_html_e('Decision intelligence goes beyond traditional analytics. While business intelligence (BI) tools focus on describing what happened — through reports, dashboards, and historical trends — DI integrates predictive and prescriptive analytics to guide what should happen next.', 'aera'); ?></p>
							<p><?php esc_html_e('And unlike static BI dashboards that require human interpretation, DI platforms use AI to adapt in real time. They simulate scenarios, optimize recommendations, and align decisions with strategic goals — making them more dynamic and actionable. Finally, DI transforms data into intelligent decision-making that learns and improves continuously.', 'aera'); ?></p>
							<p><?php esc_html_e('How decision intelligence (DI) differs from business intelligence (BI):', 'aera'); ?></p>
							<div class="tableResponsive">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tableWrapper">
									<thead>
										<tr>
											<th></th>
											<th><?php esc_html_e('Business Intelligence (BI)', 'aera'); ?></th>
											<th><?php esc_html_e('Decision Intelligence (DI)', 'aera'); ?></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="colorBlack"><strong><?php esc_html_e('Focus', 'aera'); ?></strong></td>
											<td><?php esc_html_e('Provides reporting and analytics', 'aera'); ?></td>
											<td><?php esc_html_e('Provides decision support, augmentation and automation', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><strong><?php esc_html_e('Output', 'aera'); ?></strong></td>
											<td><?php esc_html_e('Presents data visualizations', 'aera'); ?></td>
											<td><?php esc_html_e('Gives predictions, recommendations, and automated actions', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><strong><?php esc_html_e('Scope', 'aera'); ?></strong></td>
											<td><?php esc_html_e('Is descriptive and diagnostic', 'aera'); ?></td>
											<td><?php esc_html_e('Is prescriptive and proactive', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><strong><?php esc_html_e('Learning', 'aera'); ?></strong></td>
											<td><?php esc_html_e('Generates static reports without learning', 'aera'); ?></td>
											<td><?php esc_html_e('Learns continuously from decision outcomes', 'aera'); ?></td>
										</tr>
									</tbody>
								</table>
							</div>
							<p>
								<strong><?php esc_html_e('In brief:', 'aera'); ?></strong> <?php esc_html_e('DI platforms don\'t just analyze data — they act on it. They automate routine decisions and support strategic ones, all in real time.', 'aera'); ?>
							</p>
						</section>

						<section id="section3-1" class="subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('How are planning solutions different from decision intelligence platforms?', 'aera'); ?></h3>
							<p><?php esc_html_e('Planning tools and DI platforms both support decisions — but differ in adaptability, intelligence, and execution.', 'aera'); ?></p>
							<p><?php esc_html_e('How DI platforms differ from planning solutions:', 'aera'); ?></p>
							<div class="tableResponsive">
								<table width="100%" border="0" cellpadding="0" cellspacing="0" class="tableWrapper">
									<thead>
										<tr>
											<th></th>
											<th><?php esc_html_e('Planning Solutions', 'aera'); ?></th>
											<th><?php esc_html_e('DI Platforms', 'aera'); ?></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Primary goal', 'aera'); ?></td>
											<td><?php esc_html_e('Build static plans using historical data, assumptions, and forecasting models', 'aera'); ?></td>
											<td><?php esc_html_e('Enable real-time decision-making, automation, and continuous learning from outcomes', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Scope', 'aera'); ?></td>
											<td><?php esc_html_e('Support structured, periodic planning cycles and scenario analysis', 'aera'); ?></td>
											<td><?php esc_html_e('Cover end-to-end execution of decisions – from strategic to operational and situational.', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Time Horizon', 'aera'); ?></td>
											<td><?php esc_html_e('Focused on long-term and periodic planning cycles.', 'aera'); ?></td>
											<td><?php esc_html_e('Designed for real-time, near-term, and long-range decisions.', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Execution of Plans', 'aera'); ?></td>
											<td><?php esc_html_e('Generate plans that require manual implementation and tracking.', 'aera'); ?></td>
											<td><?php esc_html_e('Recommend optimal decisions and take autonomous action when needed.', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Adaptability', 'aera'); ?></td>
											<td><?php esc_html_e('Plans often become outdated quickly as conditions change.', 'aera'); ?></td>
											<td><?php esc_html_e('Dynamically adjust to real-time data, events, and signals.', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Data Processing', 'aera'); ?></td>
											<td><?php esc_html_e('Use historical and structured data for forecasting', 'aera'); ?></td>
											<td><?php esc_html_e('Process real-time, structured, and unstructured data from diverse sources', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('AI & Machine Learning', 'aera'); ?></td>
											<td><?php esc_html_e('Often limited to forecasting and optimization models', 'aera'); ?></td>
											<td><?php esc_html_e('Use AI for continuous learning, automation, and contextual decision-making', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Decision Learning', 'aera'); ?></td>
											<td><?php esc_html_e('Do not learn from past plans or decisions', 'aera'); ?></td>
											<td><?php esc_html_e('Continuously learn from decisions and outcomes, improving over time', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Tech Stack Integration', 'aera'); ?></td>
											<td><?php esc_html_e('Typically require manual integration with execution systems.', 'aera'); ?></td>
											<td><?php esc_html_e('Seamlessly connect with ERP, CRM, SCM, and external platforms.', 'aera'); ?></td>
										</tr>
										<tr>
											<td class="colorBlack"><?php esc_html_e('Human & AI Collaboration', 'aera'); ?></td>
											<td><?php esc_html_e('Mostly human-driven, requiring analysts to interpret and act on plans', 'aera'); ?></td>
											<td><?php esc_html_e('Enable human–AI collaboration, with AI augmenting or automating decisions', 'aera'); ?></td>
										</tr>
									</tbody>
								</table>
							</div>
							<p>
								<strong><?php esc_html_e('In brief:', 'aera'); ?></strong> <?php esc_html_e('Planning tools simply forecast. DI platforms recommend and act — in real time, across the enterprise, with intelligence that evolves.', 'aera'); ?>
							</p>
						</section>

						<section id="section3-2" class="borderBottom subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('What is the difference between decision intelligence and data science?', 'aera'); ?></h3>
							<p><?php esc_html_e('Decision intelligence and data science work together but serve different goals. Data science focuses on extracting insights from data using statistics, machine learning, and AI. It identifies patterns, predicts trends, and builds models to explain complex datasets. DI takes those insights and turns them into action — integrating them into decision-making to deliver optimized outcomes.', 'aera'); ?></p>
							<p><?php esc_html_e('Key distinctions include:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Objective.', 'aera'); ?></strong> <?php esc_html_e('Data science generates insights; DI uses them to improve decisions.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Scope.', 'aera'); ?></strong> <?php esc_html_e('Data science centers on analysis and modeling; DI embeds insights into workflows, automation, and strategy.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('End-User Impact.', 'aera'); ?></strong> <?php esc_html_e('Data science supports analysts; DI empowers decision-makers and systems across the business.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Automation.', 'aera'); ?></strong> <?php esc_html_e('DI emphasizes real-time, AI-driven action; data science often requires human interpretation.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('Data science builds understanding. Decision intelligence ensures that understanding drives real-world decisions that matter.', 'aera'); ?></p>
						</section>

						<section id="section4">
							<h2 class="sectionTitle"><?php esc_html_e('The Role of Artificial Intelligence in Decision Intelligence', 'aera'); ?></h2>
							<h3 class="sectionSubTitle"><?php esc_html_e('How is artificial intelligence related to decision intelligence?', 'aera'); ?></h3>
							<p><?php esc_html_e('Decision intelligence applies artificial intelligence to optimize decision-making. AI is the broader field — machines that learn, reason, and predict — while DI is a targeted application of those capabilities.', 'aera'); ?></p>
							<p><?php esc_html_e('Here\'s how AI powers DI:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Predictive Capabilities.', 'aera'); ?></strong> <?php esc_html_e('AI analyzes past and present data to forecast outcomes and recommend next steps.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Decision Automation.', 'aera'); ?></strong> <?php esc_html_e('AI handles routine and complex choices, cutting manual work and boosting speed.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Continuous Learning.', 'aera'); ?></strong> <?php esc_html_e('Machine learning models improve over time through feedback and outcomes.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Cognitive Augmentation.', 'aera'); ?></strong> <?php esc_html_e('AI delivers insights, flags anomalies, and explains itself — fostering trust and transparency.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Real-Time Data Processing.', 'aera'); ?></strong> <?php esc_html_e('From structured to unstructured inputs, AI enables instant analysis and response.', 'aera'); ?>
								</li>
							</ul>
							<p>
								<?php
								printf(
									/* translators: %s: word "composite AI" in italic */
									esc_html__('AI includes machine learning, optimization, rules engines, NLP, and graph technologies. DI blends these into %s — a powerful stack that enhances accuracy, adaptability, and impact. AI is the engine; decision intelligence makes it drive with purpose, aligning actions with strategy and human judgment.', 'aera'),
									'<i>' . esc_html__('composite AI', 'aera') . '</i>'
								);
								?>
							</p>
						</section>

						<section id="section4-1" class="borderBottom subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('What is agentic AI, and how does it enhance decision intelligence beyond other AI methods?', 'aera'); ?></h3>
							<p><?php esc_html_e('Agentic AI is the next leap forward. It doesn\'t replace predictive or generative AI — it amplifies them. It creates a more cohesive, capable decision-making system.', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Predictive AI', 'aera'); ?></strong> <?php esc_html_e('offers foresight with forecasts and scenario models.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Generative AI', 'aera'); ?></strong> <?php esc_html_e('enables intuitive interaction and produces clear, user-friendly content.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Agentic AI', 'aera'); ?></strong> <?php esc_html_e('fuses these strengths with autonomous reasoning and execution.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('Designed to make complex decisions and adapt on its own, agentic AI becomes an engine of self-optimization. It doesn\'t just recommend — it acts. It\'s ideal for domains like supply chains, pricing, and operations, where fast, fine-tuned decisions are critical. With agentic AI, DI platforms evolve from reactive systems into proactive, self-improving ecosystems that drive innovation and efficiency.', 'aera'); ?></p>
							<p><?php esc_html_e('Take this example: predictive AI spots a demand surge; generative AI helps users interpret the data; agentic AI assesses the impact, reallocates inventory, and initiates action — keeping humans informed along the way. When combined with decision intelligence, agentic AI empowers enterprises to build intelligent, adaptive systems that move with the market, not behind it. Agility becomes built-in.', 'aera'); ?></p>
						</section>

						<section id="section5">
							<h2 class="sectionTitle"><?php esc_html_e('Deploying Decision Intelligence with a Platform', 'aera'); ?></h2>
							<h3 class="sectionSubTitle"><?php esc_html_e('How can companies get started with decision intelligence?', 'aera'); ?></h3>
							<p><?php esc_html_e('To deploy decision intelligence effectively, companies should take a structured approach:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Identify Decision-Making Challenges.', 'aera'); ?></strong> <?php esc_html_e('Pinpoint where decisions are slow, error-prone, or overly reliant on gut feel.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Assess Data Availability & Quality.', 'aera'); ?></strong> <?php esc_html_e('Ensure access to clean, relevant, and comprehensive data.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Implement a Decision Intelligence Platform.', 'aera'); ?></strong> <?php esc_html_e('Choose a platform that integrates with existing systems and supports analytics, automation, and AI-based decision support.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Train Teams & Build a Data-Driven Culture.', 'aera'); ?></strong> <?php esc_html_e('Upskill employees and promote a mindset that values data over intuition.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Start with High-Impact Use Cases.', 'aera'); ?></strong> <?php esc_html_e('Focus on areas like forecasting, risk, or supply chain to demonstrate early value.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Monitor, Measure & Refine.', 'aera'); ?></strong> <?php esc_html_e('Track outcomes, fine-tune models, and continuously improve.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('This approach helps organizations shift to faster, smarter, and more efficient decision-making.', 'aera'); ?></p>
							<p><?php esc_html_e('Here are real-world examples of companies starting with a clear business challenge, applying DI, and achieving stronger outcomes:', 'aera'); ?></p>
							<ul>
								<li>
									<?php
									printf(
										/* translators: %s: word "steel manufacturer" in bold */
										esc_html__('A global %s uses DI to identify root causes of late shipments, recommend actions, and improve communications and customer service when delays occur.', 'aera'),
										'<strong>' . esc_html__('steel manufacturer', 'aera') . '</strong>'
									);
									?>
								</li>
								<li>
									<?php
									printf(
										/* translators: %s: word "petrochemical company" in bold */
										esc_html__('A %s deploys DI for better shipping performance, gaining real-time visibility across its supply chain, including third-party operations.', 'aera'),
										'<strong>' . esc_html__('petrochemical company', 'aera') . '</strong>'
									);
									?>
								</li>
								<li>
									<?php
									printf(
										/* translators: %s: word "pharmaceutical company" in bold */
										esc_html__('A global %s uses DI to generate ATP (available-to-promise) estimates across diverse products by syncing data from multiple ERP systems — helping customers know when an order has been received, when it will be shipped, and when to expect it to be delivered.', 'aera'),
										'<strong>' . esc_html__('pharmaceutical company', 'aera') . '</strong>'
									);
									?>
								</li>
							</ul>
							<p>
								<a href="<?php echo esc_url(home_url('/customers')); ?>" target="_blank" rel="noopener noreferrer" class="contentLink">
									<?php esc_html_e('Learn more about how Aera customers are using decision intelligence.', 'aera'); ?>
								</a>
							</p>
						</section>

						<section id="section5-1" class="subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('What is a decision intelligence skill?', 'aera'); ?></h3>
							<p><?php esc_html_e('A decision intelligence skill is a modular capability built into a decision intelligence platform. It automates or assists decision-making in a specific area, functioning like AI skills in virtual assistants — offering contextual recommendations with transparency and ongoing learning.', 'aera'); ?></p>
							<p><?php esc_html_e('Each skill delivers a targeted solution with four core capabilities:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Data Integration.', 'aera'); ?></strong> <?php esc_html_e('Pulls and harmonizes data into a common model.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Analytics & Modeling.', 'aera'); ?></strong> <?php esc_html_e('Applies ML, simulations, and other calculations tailored to the decision at hand.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Digitized Logic & Flow.', 'aera'); ?></strong> <?php esc_html_e('Encodes business rules and user interactions.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Execution.', 'aera'); ?></strong> <?php esc_html_e('Pushes decisions back into operational systems.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('Examples include:', 'aera'); ?></p>
							<ul>
								<li>
									<strong><?php esc_html_e('Logistics.', 'aera'); ?></strong> <?php esc_html_e('Optimizes routes and modes for cost, speed, service, and sustainability.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Demand Forecasting.', 'aera'); ?></strong> <?php esc_html_e('Predicts trends using historical patterns and external variables.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Inventory Balancing.', 'aera'); ?></strong> <?php esc_html_e('Minimizes stockouts and aging inventory, adjusting to real-time supply-demand shifts.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Availability to Promise.', 'aera'); ?></strong> <?php esc_html_e('Analyzes inventory and lead times to offer accurate delivery commitments.', 'aera'); ?>
								</li>
								<li>
									<strong><?php esc_html_e('Tariff Impact Mitigation.', 'aera'); ?></strong> <?php esc_html_e('Models trade scenarios and finds lower-cost sourcing alternatives.', 'aera'); ?>
								</li>
							</ul>
							<p><?php esc_html_e('Skills enhance DI platforms by allowing businesses to customize decision-making capabilities according to their needs. As you add more skills, you can reuse common core elements and exchange information, making skills smarter and more efficient over time.', 'aera'); ?></p>
							<p>
								<a href="<?php echo esc_url(home_url('/skills')); ?>" target="_blank" rel="noopener noreferrer" class="contentLink">
									<?php esc_html_e('Learn more about Aera Skills.', 'aera'); ?>
								</a>
							</p>
						</section>

						<section id="section5-2" class="subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('What is self-service decision intelligence?', 'aera'); ?></h3>
							<p><?php esc_html_e('Self-service decision intelligence puts DI tools in the hands of business users — no deep technical expertise required. With intuitive interfaces and low-code or no-code setup, non-technical teams can act on insights faster.', 'aera'); ?></p>
							<p><?php esc_html_e('Self-service DI enables users to:', 'aera'); ?></p>
							<ul>
								<li><?php esc_html_e('Build and test decision models without coding.', 'aera'); ?></li>
								<li><?php esc_html_e('Understand AI-driven recommendations via clear dashboards.', 'aera'); ?></li>
								<li><?php esc_html_e('Run scenarios and compare decision paths.', 'aera'); ?></li>
								<li><?php esc_html_e('Automate decisions with minimal IT involvement.', 'aera'); ?></li>
							</ul>
							<p><?php esc_html_e('This accessibility broadens adoption and drives a culture of data-backed decision-making, enhancing agility across the organization.', 'aera'); ?></p>
						</section>

						<section id="section5-3" class="borderBottom subSectionPadding">
							<h3 class="sectionSubTitle"><?php esc_html_e('Where does decision intelligence fit in the enterprise stack?', 'aera'); ?></h3>
							<p><?php esc_html_e('Decision intelligence forms a crucial layer in the enterprise technology stack. It connects raw data, AI insights, and execution — bridging analytics, automation, and operational systems.', 'aera'); ?></p>
							<p><?php esc_html_e('As organizations embrace DI, the stack will evolve into something simpler and more streamlined:', 'aera'); ?></p>
							<ul>
								<li>
									<?php
									printf(
										/* translators: %s: Systems of Record text in bold */
										esc_html__('%s (ERP, CRM, POS, etc.) become more automated, reducing manual work.', 'aera'),
										'<strong>' . esc_html__('Systems of Record', 'aera') . '</strong>'
									);
									?>
								</li>
								<li>
									<?php
									printf(
										/* translators: %s: A System of Intelligence text in bold */
										esc_html__('%s emerges to coordinate decisions across functions, blending AI insights with human input.', 'aera'),
										'<strong>' . esc_html__('A System of Intelligence', 'aera') . '</strong>'
									);
									?>
								</li>
							</ul>
							<p><?php esc_html_e('With this shift, decision-making will become fluid and dynamic, allowing humans to operate in, on, or out of the loop, depending on the level of automation required.', 'aera'); ?></p>
							<img src="<?php echo esc_url($image_software_stocks); ?>" class="sectionImg imgHiddenXs" alt="<?php esc_attr_e('Diagram showing how decision intelligence simplifies the enterprise software stack. On the left, three layers — systems of record, differentiation, and intelligence — are connected to multiple point solutions. On the right, these layers are unified into a streamlined stack powered by a decision intelligence platform and skills, integrating with core systems like ERP, CRM, and POS.', 'aera'); ?>" />
							<img src="<?php echo esc_url($image_software_stocks_mobile); ?>" class="sectionImg imgShowXs" alt="<?php esc_attr_e('Diagram showing how decision intelligence simplifies the enterprise software stack. On the left, three layers — systems of record, differentiation, and intelligence — are connected to multiple point solutions. On the right, these layers are unified into a streamlined stack powered by a decision intelligence platform and skills, integrating with core systems like ERP, CRM, and POS.', 'aera'); ?>" />
							<p><?php esc_html_e('This integration shifts decision-making from rigid and reactive to fluid and dynamic. Humans can stay in the loop, step out, or oversee as needed.', 'aera'); ?></p>
							<p><?php esc_html_e('By integrating across the stack, decision intelligence enables faster, more accurate, and automated decisions — empowering organizations to boost performance, reduce risk, and stay competitive in a fast-moving world.', 'aera'); ?></p>
						</section>

						<section id="section6">
							<h2 class="sectionTitle"><?php esc_html_e('Ready to Make Smarter Decisions?', 'aera'); ?></h2>
							<p>
								<?php
								printf(
									/* translators: %s: decision intelligence link */
									esc_html__('The way businesses make decisions is evolving. Will your company lead the change or lag behind? Decision intelligence offers a clear path to more strategic, data-driven, and automated decision-making. Explore how %s.', 'aera'),
									'<a href="' . esc_url(home_url('/skills')) . '" target="_blank" rel="noopener noreferrer" class="contentLink">' . esc_html__('decision intelligence can transform your business', 'aera') . '</a>'
								);
								?>
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();

