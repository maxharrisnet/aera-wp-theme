import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { fadeSlideIn } from 'utils/timelineAnimations';

import WaypointEnter from 'components/waypoint-enter';
import Button from 'components/button';
import rightArrow from 'assets/images/rightArrow.jpg';
import s from './News.scss';

const blogs = [
	{
		id: 103,
		title: 'Agentic Decision Intelligence: The Next Evolution in Autonomous Decisions',
		industry: 'General',
		solutionArea: ['Decision Intelligence', 'Decision Making'],
		jobFunction: ['Artificial Intelligence'],
		link: 'https://meet.aeratechnology.com/agentic-decision-intelligence-the-next-evolution-in-autonomous-decisions-nov20',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/31Nz0Upsc3Qi4MwDm0e3of/68a89afa66f6bb1581961b30dd5f6528/Agentic_Decision_Intelligence_Webinar.jpg',
	},
	{
		id: 102,
		title: 'Eliminating Waste in Supply Chains: Unlocking Efficiency with AI-Powered Decision Intelligence',
		industry: 'General',
		solutionArea: ['Decision Intelligence', 'Decision Making'],
		jobFunction: ['Artificial Intelligence'],
		link: 'https://meet.aeratechnology.com/eliminating-waste-in-supply-chains-unlocking-efficiency-with-ai-powered-decision-intelligence-oct14',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3VWpjf2d8TmhZzMa8pMQ0W/c41f18c57ea4846f13bea63263844945/Website_resource_card_thumbnail__16_.jpg',
	},
	{
		id: 101,
		title: 'From Blind Spots to Visibility: How Alcon is Transforming its Supply Chain with AI',
		industry: 'General',
		solutionArea: ['Decision Making'],
		jobFunction: ['Supply Chain', 'Artificial Intelligence'],
		link: 'https://meet.aeratechnology.com/from-blind-spots-to-visibility-how-alcon-is-transforming-its-supply-chain-with-ai-sep30',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/75VWV46b2QJYjCqUEGGEo9/6de387d895d00a81cec51cc477fa0049/Website_resource_card_thumbnail__17_.jpg',
	},
	{
		id: 100,
		title: 'Agentic AI in Action: Redefining Enterprise Decision-Making with Aera',
		industry: 'General',
		solutionArea: ['Agentic AI', 'Decision Making'],
		jobFunction: ['Supply Chain', 'Artificial Intelligence'],
		link: 'https://meet.aeratechnology.com/agentic-ai-in-action-redefining-enterprise-decision-making-with-aera',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5opAWDFUOtPTlQYTOPkNw3/22f9432161c415f3b79084e396220cfe/Website_resource_card_thumbnail__15___1_.jpg',
	},
	{
		id: 99,
		title: 'From Automation to Autonomy - Achieving transformational business value with Agentic AI',
		industry: 'General',
		solutionArea: ['Agentic AI'],
		jobFunction: ['Supply Chain', 'Artificial Intelligence'],
		link: 'https://meet.aeratechnology.com/from-automation-to-autonomy-achieving-transformational-business-value-with-agentic-ai-july29',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1MSkpborzKyCtMiL67wleg/1ff84a43f9672bcc1303ac7a721a8d0c/Website_resource_card_thumbnail__10_.jpg',
	},
	{
		id: 98,
		title: 'Why Decision Intelligence Is No Longer Optional',
		industry: 'General',
		solutionArea: ['Decision Intelligence', 'Decision Making'],
		jobFunction: 'Supply Chain',
		link: 'https://meet.aeratechnology.com/why-decision-intelligence-is-no-longer-optional-july15',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5R0WG9zBBoI9321Syf1dmC/e61847bd1f4fac5e4f8b8cd0ecb37c2d/Website_resource_card_thumbnail__8_.jpg',
	},
	{
		id: 97,
		title: 'Introducing Aera with Agentic AI: Decision-Making, Reimagined',
		industry: 'General',
		solutionArea: ['Agentic AI', 'Decision Intelligence', 'Aera Chat'],
		jobFunction: 'Artificial Intelligence',
		link: 'https://meet.aeratechnology.com/introducing-aeras-agentic-ai-decision-making-reimagined-jun24',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6gUWUjiYYLNMNFXvzG2xtt/19af962c3c46689abb505a3a0cda0c6b/Website_resource_card_thumbnail__6_.jpg',
	},
	{
		id: 96,
		title: 'Reimagining Control Towers with AI-Powered Decision Intelligence',
		industry: 'General',
		solutionArea: ['Digital Control Tower', 'Decision Intelligence'],
		jobFunction: 'Supply Chain',
		link: 'https://meet.aeratechnology.com/reimagining-control-towers-with-ai-powered-decision-intelligence-03-07-25',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5j3y1sfZZvR4afOnfQ4bbe/2600fc0de5a3477344124e469bfac659/Drive_Control_Tower_Automation_with_Decision_Intelligence__1_.jpg',
	},
	{
		id: 95,
		title: 'AI for Sustainability: Lower Emissions, Less Waste, Smarter Operations',
		industry: 'General',
		solutionArea: ['Inventory', 'Decision Intelligence'],
		jobFunction: 'Supply Chain',
		link: 'https://meet.aeratechnology.com/webinar/ai-for-sustainability-lower-emissions-less-waste-smarter-operations-22-04-2025',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7JisePwrtrLpy39O2GitIX/aa3f8f6f7364c1a299f5169e9b62cca3/Website_resource_card_thumbnail_v2.jpg',
	},
	{
		id: 94,
		title: 'Orchestrating Connected High Tech Supply Chains with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Decision Intelligence'],
		jobFunction: 'Supply Chain',
		link: 'https://meet.aeratechnology.com/webinar/orchestrating-connected-hi-tech-supply-chains-with-decision-intelligence-08-04-2025',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3XHXt35KYBqFmoT4oQaY4c/fc128b5f9d4be30f4aa0bd4ae52293ae/Website_resource_card_thumbnail__3_.jpg',
	},
	{
		id: 93,
		title: 'Navigating Tariff Shifts with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Decision Intelligence'],
		jobFunction: 'Supply Chain',
		link: 'https://meet.aeratechnology.com/webinar/navigating-tariff-shifts-with-decision-intelligence-27-03-2025',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1kVjoQzjKW6Bd9T2cF7vFB/e0ece97f81372b170767cceb7944c744/Website_resource_card_thumbnail__2_.jpg',
	},
	{
		id: 92,
		title: 'What is Agentic AI? Unlocking the Next Phase of Decision Intelligence',
		industry: 'General',
		solutionArea: ['Decision Automation', 'Decision Intelligence'],
		jobFunction: 'Artificial Intelligence',
		link: 'https://meet.aeratechnology.com/webinar/what-is-agentic-ai-unlocking-the-next-phase-of-decision-intelligence-13-03-2025',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6J68nQpqmSAalXosgNd657/88211d3df223d8cae048e2c5a48909fc/Website_resource_card_thumbnail.jpg',
	},
	{
		id: 91,
		title: 'Agentic AI for Decisions in Action',
		industry: 'General',
		solutionArea: 'Decision Automation',
		jobFunction: 'Artificial Intelligence',
		link: 'https://meet.aeratechnology.com/webinar/agentic-ai-for-decisions-in-action-25-02-2025',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4rbIMb6On8PFDRqxoexzJh/f64a52f85a9462bb0b284f27c162d682/Agentic_AI_for_Decisions_in_Action.png',
	},
	{
		id: 90,
		title: 'AI that Drives Real ROI: A Decision Intelligence Overview',
		industry: 'General',
		solutionArea: 'Decision Making',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/webinar/the-ai-advantage-converting-data-into-decision-intelligence-11-02-2025',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2AcROVIS1Zr48k7FaLej55/e4d29aa51a651a4195c620e0ab9716fe/AI_that_Drives_Real_ROI__A_Decision_Intelligence_Overview.png',
	},
	{
		id: 87,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3HP1M7w8LZzagMzXNORku7/c674b65255be46d6655e43225a58d250/Empowering_Pharma_Supply_Chains_with_Decision_Intelligence.png',
		title: 'Empowering Pharma Supply Chains with Decision Intelligence',
		industry: 'Life Sciences (Incl. Pharmaceuticals)',
		solutionArea: '',
		jobFunction: '',
		link: 'https://meet.aeratechnology.com/webinar/empowering-pharma-supply-chains-with-decision-intelligence-28-01-25',
	},
	{
		id: 84,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6ezeGobSNDPazkP69MZKlC/0215ce8f35e7233367ebaabfc188adec/Overcoming_Data_Barriers_with_Aera-s_Decision_Data_Model.jpg',
		title: "Overcoming Data Barriers with Aera's Decision Data Model",
		industry: 'General',
		solutionArea: ['Decision Data Model'],
		jobFunction: ['Supply Chain'],
		link: 'https://meet.aeratechnology.com/webinar/overcoming-data-barriers-with-aeras-decision-data-model-dec-11-2024',
	},
	{
		id: 85,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2AcROVIS1Zr48k7FaLej55/e4d29aa51a651a4195c620e0ab9716fe/AI_that_Drives_Real_ROI__A_Decision_Intelligence_Overview.png',
		title: 'The AI Advantage: Converting Data into Decision Intelligence in Three Essential Steps',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Financial Supply Planning'],
		jobFunction: ['Data & Analytics', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/the-ai-advantage-converting-data-into-decision-intelligence-in-three-essential-steps-03-12-2024',
	},
	// {
	//   id: 86,
	//   image: "https://images.ctfassets.net/mh1amgo8m7ts/2AcROVIS1Zr48k7FaLej55/e4d29aa51a651a4195c620e0ab9716fe/AI_that_Drives_Real_ROI__A_Decision_Intelligence_Overview.png",
	//   title: "The AI Advantage: Converting Data into Decision Intelligence in Three Essential Steps",
	//   industry: "General",
	//   solutionArea: ["Integrated Business Planning", "Financial Supply Planning"],
	//   jobFunction: ["Data & Analytics", "Operations"],
	//   link: "https://meet.aeratechnology.com/webinar/the-ai-advantage-converting-data-into-decision-intelligence-in-three-essential-steps-12-11-2014"
	// },
	{
		id: 88,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/12ZCRMWrkVmG915WyGVPIx/e6202d2345d9293c29c2bea6de1654ee/Shaping_the_Future_of_Food___Beverage_with_Decision_Intelligence.png',
		title: 'Shaping the Future of Food & Beverage with Decision Intelligence',
		industry: ['Consumer Packaged Goods', 'Food & Beverage'],
		solutionArea: ['Inventory', 'Demand', 'Order', 'Logistics'],
		jobFunction: '',
		link: 'https://meet.aeratechnology.com/webinar/shaping-the-future-of-food-beverage-with-decision-intelligence-16-01-2025-0',
	},
	// {
	//   id: 89,
	//   image: "https://images.ctfassets.net/mh1amgo8m7ts/2AcROVIS1Zr48k7FaLej55/e4d29aa51a651a4195c620e0ab9716fe/AI_that_Drives_Real_ROI__A_Decision_Intelligence_Overview.png",
	//   title: "The AI Advantage: Converting Data into Decision Intelligence in Three Essential Steps",
	//   industry: "General",
	//   solutionArea: ["Integrated Business Planning", "Financial Supply Planning"],
	//   jobFunction: ["Data & Analytics", "Operations"],
	//   link: "https://meet.aeratechnology.com/webinar/the-ai-advantage-converting-data-into-decision-intelligence-in-three-essential-steps-september-24"
	// },

	{
		id: 1,
		title: 'Unlocking the Power of Decision Intelligence: Skill Building',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/webinar/unlocking-the-power-of-decision-intelligence-skill-building-19-11-2024',
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3tuDiMDrOaBnx7oWTuSZ8I/6d2a8cef080e30aec847f5815878be3a/Unlocking_the_Power_of_Decision_Intelligence__Skill_Building__1_.png',
	},
	// {
	//   id: 2,
	//   image: "https://images.ctfassets.net/mh1amgo8m7ts/2AcROVIS1Zr48k7FaLej55/e4d29aa51a651a4195c620e0ab9716fe/AI_that_Drives_Real_ROI__A_Decision_Intelligence_Overview.png",
	//   title: "The AI Advantage: Converting Data into Decision Intelligence in Three Essential Steps",
	//   industry: "General",
	//   solutionArea: ["Integrated Business Planning", "Financial Supply Planning"],
	//   jobFunction: ["Data & Analytics", "Operations"],
	//   link: "https://meet.aeratechnology.com/webinar/the-ai-advantage-converting-data-into-decision-intelligence-in-three-essential-steps"
	// },
	{
		id: 3,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/YtAaeQ7mUh7MaVxRYdyHc/5dbaf8931f71021b21951bb9a5214eec/Transforming_CPG_Manufacturing_with_Decision_Intelligence_with_Deloitte__1_.png',
		title: 'Transforming CPG Manufacturing with Decision Intelligence with Deloitte',
		industry: ['Consumer Packaged Goods', 'Manufacturing'],
		solutionArea: ['Raw Material Inventory', 'Dynamic Inventory Management', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/transforming-cpg-manufacturing-with-decision-intelligence-22-10-2024',
	},
	{
		id: 4,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/399wG9y0iauGEjdwfC85Ut/83ab74e4e362083bb14dcb8fcb2ef57c/Smarter__Faster_Logistics_Decisions_with_AI.png',
		title: 'Smarter, Faster Logistics Decisions with AI',
		industry: 'General',
		solutionArea: ['Efficient Shipping Plan', 'Outbound Operations Management', 'Digital Control Tower'],
		jobFunction: ['Supply Chain', 'IT'],
		link: 'https://meet.aeratechnology.com/webinar/smarter-faster-logistics-decisions-with-ai-15-10',
	},
	{
		id: 5,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5RV8XqAZBbyKpRRB0ZrCEc/b59cc00ac81f4448a7745e609aada774/Agentic_AI_for_Decisions__Automating_Claims_Management_with_Aera__1_.png',
		title: 'Agentic AI for Decisions: Automating Claims Management with Aera',
		industry: 'General',
		solutionArea: ['Order Lifecycle Management', 'Root Cause Analysis and Prediction'],
		jobFunction: 'Operations',
		link: 'https://meet.aeratechnology.com/webinar/agentic-ai-for-decisions-automating-claims-management-with-aera-october-08',
	},
	{
		id: 6,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/OGwDoWppLvxGIU9Kz3zIy/7c130b59e5cde8b1584a8ee024742248/The_Top_AI_Use_Cases_for_Decision_Intelligence_in_CPG___with_Deloitte.png',
		title: 'The Top AI Use Cases for Decision Intelligence in CPG — with Deloitte',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Trade Promotion Optimization', 'Media Optimization'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/webinar/the-top-ai-use-cases-for-decision-intelligence-in-cpg-with-deloitte-october-01',
	},
	{
		id: 7,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/68pqbPfYOsDbp4kCkt4Q3D/a1364fdf300ebf7026f65b0d555b85eb/Beyond_Traditional_Planning__Leveraging_Decision_Intelligence_for_Business_Impact__1_.png',
		title: 'Beyond Traditional Planning: Leveraging Decision Intelligence for Business Impact',
		industry: 'General',
		solutionArea: 'Integrated Business Planning',
		jobFunction: 'Operations',
		link: 'https://meet.aeratechnology.com/webinar/beyond-traditional-planning-leveraging-decision-intelligence-for-business-impact-september-17-2024',
	},
	{
		id: 8,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4W7cGcKM2XUgovHpeCXaI6/6318c1f2dee31f18856790fc31d83db1/How_Decision_Architects_and_AI_Platforms_are_Transforming_Work_and_Value__1_.png',
		title: 'How Decision Architects and AI Platforms are Transforming Work and Value',
		industry: 'General',
		solutionArea: '',
		jobFunction: ['IT', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/how-decision-architects-and-ai-platforms-are-transforming-work-and-value-september-10-2024',
	},
	{
		id: 9,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/49wJvRd6cvjodM4xnbQZek/7d49ccfcd12a63cc4f5bbbbc50acb800/Smart_Decisions__Happy_Customers__Leveraging_Decision_Intelligence_for_World-Class_Customer_Experiences__1_.png',
		title: 'Smart Decisions, Happy Customers: Leveraging Decision Intelligence for World-Class Customer Experiences',
		industry: 'General',
		solutionArea: ['Dynamic Order Fulfillment', 'Availability-to-Promise'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/smart-decisions-happy-customers-leveraging-di-sept-03-2024',
	},
	{
		id: 10,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3GwLHcfB2ocOoafl04MGHR/7ccf4d5c39e16f778c35a86e6107fa97/From_Experiment_to_Execution__Operationalizing_Decision_AI_for_Business_Success__1_.png',
		title: 'From Experiment to Execution: Operationalizing Decision AI for Business Success',
		industry: 'General',
		solutionArea: ['Integrated Business Planning'],
		jobFunction: ['Operations'],
		link: 'https://meet.aeratechnology.com/webinar/from-experiment-to-execution-operationalizing-decision-ai-for-business-success',
	},
	{
		id: 11,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5keiYKZKk2w0E2YrSLOAgv/72d7cdfb5f850a02ee2673c91c72cf32/The_Future_of_Data___Analytics__From_Data-Focused_to_Decision-Centric__1_.png',
		title: 'The Future of Data & Analytics: From Data-Focused to Decision-Centric',
		industry: 'General',
		solutionArea: ['Digital Control Tower', 'Root Cause Analysis and Prediction'],
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/webinar/the-future-of-data-analytics-from-data-focused-to-decision-centric',
	},
	{
		id: 12,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/67hdw11DUAY7le4yzdh2tD/4065a94faae8f6eaead6c320898d1547/Decision_Intelligence_for_Self-Healing_Data__Achieving_Scalable_Data_Quality__1_.png',
		title: 'Decision Intelligence for Self-Healing Data: Achieving Scalable Data Quality',
		industry: 'General',
		solutionArea: ['Root Cause Analysis and Prediction', 'Supply Scorecard and Ranking'],
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/webinar/decision-intelligence-for-self-healing-data-achieving-scalable-data-quality',
	},
	{
		id: 13,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3i66R4z0iFwfvF8ZXCQRTs/e119f384921c0016ee3efa4b97e7dce3/Harnessing_AI_for_Superior_Demand_Forecasting__2_.png',
		title: 'Harnessing AI for Superior Demand Forecasting',
		industry: 'General',
		solutionArea: ['Touchless Demand Forecasting', 'Short-Term Demand Sensing'],
		jobFunction: ['Supply Chain', 'Data & Analytics'],
		link: 'https://meet.aeratechnology.com/webinar/harnessing-ai-for-superior-demand-forecasting',
	},
	{
		id: 14,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2SS3KhBB3mlmGpSr65J8u2/224b20385317f315ed1fe315b108660c/Three_Ways_to_Use_AI_to_Improve_your_Inventory_Performance__1_.png',
		title: 'Three Ways to Use AI to Improve Your Inventory Performance',
		industry: 'General',
		solutionArea: ['Dynamic Inventory Management', 'MEIO'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/webinar/three-ways-to-use-ai-to-improve-your-inventory-performance',
	},
	{
		id: 15,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/LkuRVzcwHWThwiXlwb6DX/ad720f430bee77bfccf7d9481a9ebc25/Close_the_Loop_Between_Insight_and_Action_with_Decision_Intelligence__1_.png',
		title: 'Close the Loop Between Insight and Action with Decision Intelligence',
		industry: 'General',
		solutionArea: 'Order Lifecycle Management',
		jobFunction: 'Operations',
		link: 'https://meet.aeratechnology.com/webinar/close-the-loop-between-insight-and-action-with-decision-intelligence',
	},
	{
		id: 16,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5bGRf2f2vQBYcVMpCaogfz/dd81b0b3f14b1442af52755a54b9a966/Boosting_Pharma_Supply_Chains_with_Decision_Intelligence__1_.png',
		title: 'Boosting Pharma Supply Chains with Decision Intelligence',
		industry: 'Life Sciences (Incl. Pharmaceuticals)',
		solutionArea: ['Prevent Stockout', 'Raw Material Inventory', 'Dynamic Supply Response'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/boosting-pharma-supply-chains-with-decision-intelligence',
	},
	{
		id: 17,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4szLVBzCtaTSwQtL2w912a/83b8062615016f2c3544cf23808d7621/What_Is__Not__Decision_Intelligence___1_.png',
		title: 'What Is (Not) Decision Intelligence?',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/webinar/what-is-not-decision-intelligence',
	},
	{
		id: 18,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4PbpeQuRPhFsORWIVlCnqL/6f9039e7b3d2eeb7df777a02bdeeac9c/Unlocking_Value_in_CPG_with_AI-Powered_Decision_Intelligence.png',
		title: 'Unlocking Value in CPG with AI-Powered Decision Intelligence',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Trade Promotion Optimization', 'Inventory'],
		jobFunction: 'Supply Chain',
		link: 'https://meet.aeratechnology.com/webinar/unlocking-value-in-cpg-with-ai-powered-decision-intelligence',
	},
	{
		id: 19,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7nqOoUqwjjJcWANBboapfK/1d7152f77f85965326e11ef1d1473529/Achieve_Frictionless_Order_Fulfillment_with_Decision_Intelligence___Automation.png',
		title: 'Achieve Frictionless Order Fulfillment with Decision Intelligence & Automation',
		industry: 'General',
		solutionArea: ['Dynamic Order Fulfillment', 'Order Lifecycle Management'],
		jobFunction: ['Operations', 'IT'],
		link: 'https://meet.aeratechnology.com/webinar/achieve-frictionless-order-fulfillment-with-decision-intelligence-automation',
	},
	{
		id: 20,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1VN4eGKaFX6HlRj25GuH2B/2d336cd35053dbaa4ffbec6fbc87abaf/How_To_Get_More_Value_Out_Of_Your_Inventory.png',
		title: 'How To Get More Value Out Of Your Inventory',
		industry: 'General',
		solutionArea: ['Dynamic Inventory Management', 'Stock Rebalancing', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/how-to-get-more-value-out-of-your-inventory',
	},
	{
		id: 21,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5M2UcTu8BY5chJMEGwQDgu/73d68c975573c1dfc1eee5f3b20b412f/How_to_Unlock_Value_with_Decision_Intelligence.png',
		title: 'How to Unlock Value with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Dynamic Inventory Management', 'Financial Supply Planning'],
		jobFunction: ['Finance', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/how-to-unlock-value-with-decision-intelligence',
	},
	{
		id: 22,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/35H1YIgNhHKqFJaPA8h9Vp/98af102b75d52404c0663badac055302/Five_Things_Data_Management_Leaders_Need_to_Do_to_Maximize_Impact.png',
		title: 'Five Things Data Management Leaders Need to Do to Maximize Impact',
		industry: 'General',
		solutionArea: ['Spend Visibility', 'Payment Terms Optimization'],
		jobFunction: ['Procurement', 'Finance'],
		link: 'https://meet.aeratechnology.com/webinar/five-things-that-keep-data-management-leaders-up-at-night',
	},
	{
		id: 23,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1Dbr90zTZxrRXqsoziHrsV/80385cd2aee5e47891f956f6c66537bf/External_Data___Decision_Intelligence___Better_Outcomes.jpg',
		title: 'External Data + Decision Intelligence = Better Outcomes',
		industry: 'General',
		solutionArea: ['Supplier-Buyer Collaboration', 'Best Supplier', 'Spend Visibility'],
		jobFunction: ['Procurement', 'Data & Analytics'],
		link: 'https://meet.aeratechnology.com/on-demand/external-data-decision-intelligence-better-outcome',
	},
	{
		id: 24,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2Lf4X8s2bIOd8HIb949KfN/2355c60b12910d7c703961eb6231dd19/Chief_Procurement_Officers__Four_Key_Decision_Intelligence_Trends.png',
		title: 'Chief Procurement Officers: Four Key Decision Intelligence Trends',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'Operations',
		link: 'https://meet.aeratechnology.com/webinar/chief-procurement-officers-four-key-decision-intelligence',
	},
	{
		id: 25,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5J3v8tnOXTEhzrLOUOOGOF/121e9bd80e46e7c138109a3ce09b0d3e/GenAI-Powered_Decision_Intelligence.png',
		title: 'GenAI-Powered Decision Intelligence',
		industry: 'General',
		solutionArea: 'Media Optimization',
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/webinar/genai-powered-decision-intelligence',
	},
	{
		id: 26,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3jIlRdbeRd2Shb7Ccf66kj/9224a4677b671c7e0b9ae57c61e95052/Decision_Intelligence_is_the_Cure_for_Underperforming_Pharma_Supply_Chains.png',
		title: 'Decision Intelligence is the Cure for Underperforming Pharma Supply Chains',
		industry: 'Life Sciences (Incl. Pharmaceuticals)',
		solutionArea: ['Prevent Stockout', 'Supply Resilience', 'Dynamic Supply Response'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/decision-intelligence-is-the-cure-for-under-performing-pharma-supply-chains',
	},
	//notfound 27
	{
		id: 27,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2NtiiKvlCOMDeeaigXQLH9/5c039a1a71db3b31e8e19b0c3cbc2f74/Democratizing_Analytics_with_AI.png',
		title: 'Democratizing Analytics with AI',
		industry: 'General',
		solutionArea: ['Spend Visibility', 'Root Cause Analysis and Prediction'],
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/on-demand/democratizing-analytics-with-ai',
	},
	{
		id: 28,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/62EqtQTzOSiVbbTO6A3uyW/971bb476cfa3260bd593cd41ae79e990/Solving_Data_Availability_and_Integrity_with_Decision_Intelligence.png',
		title: 'Solving Data Availability and Integrity with Decision Intelligence',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/webinar/solving-data-availability-and-integrity-with-decision-intelligence',
	},
	{
		id: 29,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/LbPG6sAYGy9n8I7FJe7uf/025eba01cb034ca836f6f71c3de7917c/Optimizing_Procurement__Streamlining_Payment_Terms_with_Decision_Intelligence.png',
		title: 'Optimizing Procurement: Streamlining Payment Terms with Decision Intelligence',
		industry: 'General',
		solutionArea: 'Payment Terms Optimization',
		jobFunction: ['Procurement', 'Finance'],
		link: 'https://meet.aeratechnology.com/webinar/optimizing-procurement-streamlining-payment-terms-with-decision-intelligence',
	},
	{
		id: 30,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5CYyaoTo6Z95oRgIICnVR2/e6652823d8e19a0932f294c762c03cf7/Aera_Test_Drive__Start_Transforming_Your_Supply_Chain_with_AI.png',
		title: 'Aera Test Drive: Start Transforming Your Supply Chain with AI',
		industry: 'General',
		solutionArea: 'Digital Control Tower',
		jobFunction: ['Supply Chain', 'IT'],
		link: 'https://meet.aeratechnology.com/webinar/aera-test-drive-start-transforming-your-supply-chain-with-ai',
	},
	{
		id: 31,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1H2eKD0BLspNhHBjkhwhTV/6846f6153b7c49661c8c60fa594cb485/AdobeStock_537494552_1.jpg',
		title: 'The Future of End-to-End Business Decision Making',
		industry: 'General',
		solutionArea: ['Digital Control Tower', 'Root Cause Analysis and Prediction'],
		jobFunction: ['Data & Analytics', 'IT'],
		link: 'https://meet.aeratechnology.com/webinar/the-future-of-end-to-end-business-decision-making',
	},
	{
		id: 32,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5lQurCpuqcMc9pzaVKrXHi/f3545b0ba404e04135d4343648b15060/Deep_Dive_into_the_IDC_Decision_Automation_Survey.jpg',
		title: 'Deep Dive into the IDC Decision Automation Survey',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/webinar/deep-dive-into-IDC-decision-automation-survey-predictions',
	},
	{
		id: 33,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2dSQAEkNzFQLyLyinDwAvD/35ee9da78c51640e5dccbb15f19af8cd/The_Psychology_of_Decision_Making.png',
		title: 'The Psychology of Decision Making',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/webinar/the-psychology-of-decision-making',
	},
	{
		id: 34,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1LXVusFjQW6nz68iBSwIKo/ca9227ce73f6c91517af8f0a4ff076b7/Acelerando_la_transformaci%C3%B3n_digital_con_inteligencia_de_decisiones.png',
		title: 'Acelerando la transformación digital con inteligencia de decisiones',
		industry: 'General',
		solutionArea: ['Dynamic Order Fulfillment', 'Order Lifecycle Management'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/acelerando-la-transformaci%C3%B3n-digital-con-inteligencia-de-decisiones',
	},
	{
		id: 35,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1SPbfN5cL0tOJmzAHzySrJ/9b33bd610ee2d95a35f682842494b4bf/Tricks_and_Treats_-_Haunting_Implementations_vs._Glowing_Success.png',
		title: 'Tricks and Treats - Haunting Implementations vs. Glowing Success',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Financial Supply Planning'],
		jobFunction: ['Finance', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/tricks-and-treats-haunting-implementations-vs-glowing-success',
	},
	{
		id: 36,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6Z4oGgfRgWQ4t6upaVKrrK/867b28548410aa0f9d35575a860bc023/Beyond_the_Business_Case__Quantifying_and_Optimizing_Value_through_Decision_Intelligence.png',
		title: 'Beyond the Business Case: Quantifying and Optimizing Value through Decision Intelligence',
		industry: 'General',
		solutionArea: ['Supply Resilience', 'Spend Visibility'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/webinar/beyond-the-business-case-quantifying-and-optimizing-value-through-decision-intelligence',
	},
	{
		id: 37,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7h51dK2HNo3YaX2rkfFpMR/4514330bff922b6e835e0a40cd396c68/AI-fueled_Supply_Chain_Design.png',
		title: 'AI-Fueled Supply Chain Design',
		industry: 'General',
		solutionArea: ['Supply Resilience', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/ai-fueled-supply-chain-design',
	},
	{
		id: 38,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5H0j6FOWqstrG4vBmr14FU/29635d978cc4fb1aff67dbb59c074a01/What_You_Need_to_Know_about_Predictive_Models.png',
		title: 'What You Need to Know about Predictive Models',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/webinar/what-you-need-to-know-about-predictive-models',
	},
	{
		id: 39,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1AwGPsvDq14tF8FKwPe4wu/02805076e5cdc32972239f64b99a6048/Introduction_to_Decision_Intelligence.png',
		title: 'Introduction to Decision Intelligence',
		industry: 'General',
		solutionArea: ['Touchless Demand Forecasting', 'Short-Term Demand Sensing'],
		jobFunction: ['Data & Analytics', 'Supply Chain'],
		link: 'https://meet.aeratechnology.com/on-demand/introduction-to-decision-intelligence',
	},
	{
		id: 40,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1yFfTUOyWgtekTJYIlnE5L/9d374c286507f29d65c3d0b85c1eb0a8/Using_AI_to_Make_Better_Supply_Chain_Decisions.png',
		title: 'Using AI to Make Better Supply Chain Decisions',
		industry: 'General',
		solutionArea: ['Efficient Shipping Plan', 'Outbound Operations Management'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/using-ai-to-make-better-supply-chain-decisions',
	},
	{
		id: 41,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1wcPsmrzxt26BK6dG1kx6b/c4798cc2d7a1b9a43acbd780af76f25c/Self-Driving_Supply_Chain_in_Action__Automating_Safety_Stock_Recalibrations_with_AI_Presented_by_EY_and_Aera_Technology.png',
		title: 'Self-Driving Supply Chain in Action: Automating Safety Stock Recalibrations with AI',
		industry: 'General',
		solutionArea: ['Dynamic Inventory Management', 'MEIO'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/self-driving-supply-chain-in-action-automating-safety-stock-recalibrations-with-ai',
	},
	{
		id: 42,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2jXY6f6xW4WyYRtSGNEJud/c28bfaea5b5649cc02289fa63eb92bdc/Revolutionizing_Pharma_with_AI__Unleashing_the_Power_of_Decision_Intelligence.png',
		title: 'Revolutionizing Pharma with AI: Unleashing the Power of Decision Intelligence',
		industry: 'Life Sciences (Incl. Pharmaceuticals)',
		solutionArea: ['Prevent Stockout', 'Raw Material Inventory', 'Supply Resilience'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/revolutionizing-pharma-with-ai-unleashing-the-power-of-decision-intelligence',
	},
	{
		id: 43,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2slzkHeHcZXEFtC4P0fSaF/c91ff2fc699aff68fbffeb4abcd59aab/Digitization_and_AI_in_Procurement__Deloitte_s_2023_CPO_Survey_Reflections.png',
		title: 'Digitization and AI in Procurement: Deloitte’s 2023 CPO Survey Reflections',
		industry: 'General',
		solutionArea: ['Spend Visibility', 'Payment Terms Optimization'],
		jobFunction: ['Procurement', 'Finance'],
		link: 'https://meet.aeratechnology.com/digitization-and-ai-in-procurement-deloittes-2023-cpo-survey-reflections',
	},
	{
		id: 44,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6eZfIVJ8VDn52Rhv0y8tJv/d8188aabff23b8f46dfbd0172fa7300e/Beyond_Scenario_Planning__Prepare_for_the_Unexpected_with_Decision_Intelligence.png',
		title: 'Beyond Scenario Planning: Prepare for the Unexpected with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Financial Supply Planning'],
		jobFunction: ['Finance', 'Operations'],
		link: 'https://meet.aeratechnology.com/beyond-scenario-planning-prepare-for-the-unexpected-with-decision-intelligence',
	},
	{
		id: 45,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1T5sCnWICWq6Z461OxvaOg/cde0377249ce19e12a02e6e353760880/A_New_Approach_to_Inventory_Management_with_Decision_Intelligence.png',
		title: 'Overcome Costly Planning Challenges with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Prevent Stockout', 'Dynamic Inventory Management'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/overcome-costly-planning-challenges-with-decision-intelligence',
	},
	{
		id: 46,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5OfddfQ4ZOJqnuerZRtiV7/1fb1838e4fa87a95e881361b42c2e34b/Overcome_Costly_Planning_Challenges_with_Decision_Intelligence.png',
		title: 'A New Approach to Inventory Management with Decision Intelligence',
		industry: 'General',
		solutionArea: ['MEIO', 'Dynamic Inventory Management', 'Stock Rebalancing'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/a-new-approach-to-inventory-management-with-decision-intelligence',
	},
	{
		id: 47,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5MzBIdzjm6WaBAwYgwhmTb/d5e908b14f6e3fab5db4edad64b050f9/The_Evolution_of_Digital_Control_Towers__AI_Command_Centers_for_Decision_Making.png',
		title: 'The Evolution of Digital Control Towers: AI Command Centers for Decision Making',
		industry: 'General',
		solutionArea: ['Digital Control Tower', 'Root Cause Analysis and Prediction'],
		jobFunction: ['IT', 'Operations'],
		link: 'https://meet.aeratechnology.com/the-evolution-of-digital-control-towers-ai-command-centers-for-decision-making',
	},
	{
		id: 48,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7xkLiiFemfm3kStxEs3VeC/701ab93fd67f8b0954bff71df8f17bda/An_Overview_of_Aera-s_AI_Engine__Aera_Cortex_.png',
		title: "An Overview of Aera's AI Engine: Aera Cortex™",
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/an-overview-of-aeras-ai-engine-aera-cortex',
	},
	{
		id: 49,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6JAVVm1nPC6JLZ79jHtzA2/95ee044436fc597ff4f7116672d8ed82/Turning_Sustainability_Goals_into_Realities_with_Decision_Intelligence.png',
		title: 'Turning Sustainability Goals into Realities with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Supply Scorecard and Ranking', 'Efficient Shipping Plan'],
		jobFunction: ['Supply Chain', 'IT'],
		link: 'https://meet.aeratechnology.com/turning-sustainability-goals-into-realities-with-decision-intelligence',
	},
	{
		id: 50,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/OXhfVpDz9TCWHDkx2Tqmb/5bb6910d3fdca15916a362d2e5e08704/Gaining_Value_from_Data_Science_and_AI__A_Fireside_Chat_with_BCG.png',
		title: 'Gaining Value from Data Science and AI: A Fireside Chat with BCG',
		industry: 'General',
		solutionArea: ['Root Cause Analysis and Prediction'],
		jobFunction: 'Data & Analytics',
		link: 'https://meet.aeratechnology.com/gaining-value-from-data-science-and-ai-a-fireside-chat-with-bcg',
	},
	{
		id: 51,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4Qiq4MtvxrLy2PpedCEEle/d0ac5fff502f25e4174452aaf9159987/Marketing_and_Supply_Synchronization_with_Decision_Intelligence.png',
		title: 'Marketing and Supply Synchronization with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Trade Promotion Optimization', 'Media Optimization'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/marketing-and-supply-synchronization-with-decision-intelligence',
	},
	{
		id: 52,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3NixQAAnCe4ayDgGpCYthk/102f1af4071abc6600ac13018105febb/How_Decision_Intelligence_Solves_for_Sustainability_Tradeoffs_and_Complexity.jpg',
		title: 'How Decision Intelligence Solves for Sustainability Tradeoffs and Complexity',
		industry: 'General',
		solutionArea: ['Supply Resilience', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/how-decision-intelligence-solves-for-sustainability-tradeoffs-and-complexity',
	},
	{
		id: 53,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4ZV35onIupWpOt58MlJ3V1/57cb66627ef0d56e7811569fedec529d/AI_in_Supply_Chains_-_Challenges_and_Opportunities.jpg',
		title: 'AI in Supply Chains - Challenges and Opportunities',
		industry: 'General',
		solutionArea: ['Efficient Shipping Plan', 'Dynamic Supply Response'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/ai-in-supply-chains-challenges-and-opportunities',
	},
	{
		id: 54,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/HXWSCLJnT3SmGjITufRvn/8db4ae4b74fa7d11003ada20cec74951/Optimizing_Procurement__Overcoming_Supplier_Constraints_with_Decision_Intelligence.jpg',
		title: 'Optimizing Procurement: Overcoming Supplier Constraints with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Best Supplier', 'Supplier-Buyer Collaboration', 'Purchase Price Variance'],
		jobFunction: 'Procurement',
		link: 'https://meet.aeratechnology.com/optimizing-procurement-overcoming-supplier-constraints-with-decision-intelligence',
	},
	{
		id: 55,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3DcHOrvzQRgXY5qQ9oZh3L/22706719cfcb614b72bb72041cae59f8/Decision_Intelligence_Playbook__Starting_Your_Journey_to_Digitizing_Business_Decision_Making.png',
		title: 'Decision Intelligence Playbook: Starting Your Journey to Digitizing Business Decision Making',
		industry: 'General',
		solutionArea: 'Dynamic Inventory Management',
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/decision-intelligence-playbook-starting-your-journey-to-digitizing-business-decision-making',
	},
	{
		id: 56,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/3UhZcchMJkKpCLxP9tWYR/86303962c26da51db31ca3be7233c1f2/Tech-Tonic_Shifts__How_Decision_Intelligence_is_Helping_the_Beverage_Industry_Address_Volatility.png',
		title: 'Tech-Tonic Shifts: How Decision Intelligence is Helping the Beverage Industry Address Volatility',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Trade Promotion Optimization', 'Media Optimization'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/tech-tonic-shifts-how-decision-intelligence-is-helping-the-beverage-industry-address-volatility',
	},
	{
		id: 57,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/354CTZsk4cuIipustdI4nz/d3eac57e3e41db247e619707086ec2b8/Women_in_Innovation__The_Decision_Intelligence_Opportunity__1_.png',
		title: 'Women in Innovation: The Decision Intelligence Opportunity',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/women-in-innovation-the-decision-intelligence-opportunity',
	},
	{
		id: 58,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/5d7F5l3ujMhhKjHOvE8Ewy/be881243bdaa9bac77dceaa4731412f7/Unlocking_AI_with_Decision_Intelligence__1_.jpg',
		title: 'Unlocking AI with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Dynamic Supply Response', 'Digital Control Tower'],
		jobFunction: ['IT', 'Operations'],
		link: 'https://meet.aeratechnology.com/unlocking-ai-with-decision-intelligence',
	},
	{
		id: 59,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7g9sG1e2r0RYFn0HsWchj/2dad2fcd4e3046746a511c0a0a0a22d8/Solving_Data_Integrity_with_Decision_Intelligence.jpg',
		title: 'Solving Data Integrity with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Root Cause Analysis and Prediction', 'Data Integrity'],
		jobFunction: ['Data & Analytics', 'IT'],
		link: 'https://meet.aeratechnology.com/solving-data-integrity-with-decision-intelligence',
	},
	{
		id: 60,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4iywkvtyHF45hvRSCr7O3c/825cc79a286751b19a8ffc08bee6d043/How_to_Run_a_Successful_Decision_Intelligence_Transformation.png',
		title: 'How to Run a Successful Decision Intelligence Transformation',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Financial Supply Planning'],
		jobFunction: ['Finance', 'Operations'],
		link: 'https://meet.aeratechnology.com/how-to-run-a-successful-decision-intelligence-transformation',
	},
	{
		id: 61,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6uE1YbfhQp13cNqGaNgODN/073a022b67ea165d298ed611859dcab5/Journey_to_the_Autonomous_Enterprise.png',
		title: 'Journey to the Autonomous Enterprise',
		industry: 'General',
		solutionArea: '',
		jobFunction: 'General',
		link: 'https://meet.aeratechnology.com/journey-to-the-autonomous-enterprise',
	},
	{
		id: 62,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1kF69R4yUeSQdHNwMX6Jp6/7fe6bff16effd93e976f9858335341ff/Driving_Supply_Chain_Agility_Within_the_Chemicals_Industry_with_Decision_Intelligence.png',
		title: 'Driving Supply Chain Agility Within the Chemicals Industry with Decision Intelligence',
		industry: 'Chemicals',
		solutionArea: ['Supply Resilience', 'Dynamic Supply Response'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/driving-supply-chain-agility-within-the-chemicals-industry-with-decision-intelligence',
	},
	// {
	//   id: 63,
	//   image: "https://images.ctfassets.net/mh1amgo8m7ts/1oLf16dirxsoy71i99Zcdj/31cfc397dc2545638d4c49adaf832a5d/The_Top_10_Predictions_for_2023_from_Aera.png",
	//   title: "The Top 10 Predictions for 2023 from Aera",
	//   industry: "General",
	//   solutionArea: "",
	//   jobFunction: "General",
	//   link: "https://meet.aeratechnology.com/the-top-10-predictions-for-2023-from-aera"
	// },
	{
		id: 64,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6Sl3YB1FivfEDu3vqp4PDA/709e4c287ff13462044db4094c21dfeb/What_is_the_Future_of_Work_in_a_Decision_Intelligence_World_.png',
		title: 'What is the Future of Work in a Decision Intelligence World?',
		industry: 'General',
		solutionArea: '',
		jobFunction: ['Finance', 'Operations'],
		link: 'https://meet.aeratechnology.com/what-is-the-future-of-work-in-a-decision-intelligence-world',
	},
	{
		id: 65,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2xQzpZptErhkZNAB8obAzp/2a3d853348196818239148168971f28c/Driving_Decision_Intelligence_with_MLOps.png',
		title: 'Driving Decision Intelligence with MLOps',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Digital Control Tower'],
		jobFunction: ['IT', 'Supply Chain'],
		link: 'https://meet.aeratechnology.com/driving-decision-intelligence-with-mlops',
	},
	{
		id: 66,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7kybJQXkagEOAs8OadKDfz/74dfbdb95afe14ec088ec6084dbf36f7/Regaining_Control_of_Order_Fulfillment_Processes_with_Decision_Intelligence.png',
		title: 'Regaining Control of Order Fulfillment Processes with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Order Lifecycle Management', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/regaining-control-of-order-fulfillment-processes-with-decision-intelligence',
	},
	{
		id: 67,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/6HSQqboXcxVPnbXLop8j74/bd7e92e2871f893f1f0c632b8da3d92a/Unlocking_New_Value_with_Decision_Intelligence.png',
		title: 'Unlocking New Value with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Dynamic Inventory Management', 'Integrated Business Planning'],
		jobFunction: ['Finance', 'Supply Chain'],
		link: 'https://meet.aeratechnology.com/unlocking-new-value-with-decision-intelligence',
	},
	{
		id: 68,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1xOOgl6Ksq8mtymbo7WjhL/dceaa4e5df753a115890186db262e0d1/Boosting_your_Business_Performance_with_Decision_Intelligence.png',
		title: 'Boosting Your Business Performance with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Financial Supply Planning', 'Profit-and-Loss Planning'],
		jobFunction: 'Finance',
		link: 'https://meet.aeratechnology.com/boosting-your-business-performance-with-decision-intelligence',
	},
	{
		id: 69,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/7fFM9rtzaNmt8UGY0SNu1A/120a2c57ba3a0995694d3088505f8072/Decision_Intelligence_-_How_to_Match_the_Market_Pace_of_Change_with_High-Frequency_Supply_Chain_Synchronization.png',
		title: 'Decision Intelligence - How to Match the Market Pace of Change with High-Frequency Supply Chain Synchronization',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Dynamic Supply Response'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/decision-intelligence-how-to-match-the-market-pace-of-change-with-high-frequency-supply-chain-synchronization',
	},
	{
		id: 70,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/Ccaaj3S2zEMAMQAvM2Ucb/09c09c00848c3390720afd8a3e1f1d54/How_Decision_Intelligence_Prevents_Supply_Shortages_and_Facilitates_Seamless_Reallocation.png',
		title: 'How Decision Intelligence Prevents Supply Shortages and Facilitates Seamless Real location',
		industry: 'General',
		solutionArea: ['Prevent Stockout', 'Dynamic Supply Response'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/how-decision-intelligence-prevents-supply-shortages-and-facilitates-seamless-reallocation',
	},

	//not found 71
	{
		id: 71,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/F5cyMbdsnrpcRwjQ56ieS/9d51f45a1448ed86390b671884d67ad5/Delivering_on_CPG_Brand_Promises_with_Decision_Intelligence.png',
		title: 'Delivering on CPG Brand Promises with Decision Intelligence',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Dynamic Inventory Management', 'Stock Rebalancing'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/webinar/delivering-on-cpg-brand-promises-with-decision-intelligence',
	},
	{
		id: 72,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/15fmT3FauLkUEBKdHHZVQB/715dc98b22b9e9296335589c35504e11/Decision_Agility_-_How_Decision_Intelligence_Breaks_Through_Current_Operational_Latency.png',
		title: 'Decision Agility - How Decision Intelligence Breaks Through Current Operational Latency',
		industry: 'General',
		solutionArea: ['Root Cause Analysis and Prediction', 'Digital Control Tower'],
		jobFunction: ['IT', 'Data & Analytics'],
		link: 'https://meet.aeratechnology.com/decision-agility-how-decision-intelligence-breaks-through-current-operational-latency',
	},
	{
		id: 73,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1DfYWsvxekSQrDcfltr2Sp/614873985081c83354e97184b694617f/Beyond_the_Digital_Control_Tower.png',
		title: 'Beyond the Digital Control Tower',
		industry: 'General',
		solutionArea: ['Digital Control Tower', 'Efficient Shipping Plan'],
		jobFunction: ['IT', 'Operations'],
		link: 'https://meet.aeratechnology.com/beyond-the-digital-control-tower',
	},
	{
		id: 74,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/14RwJaJo5dtWYmbe8qKc8L/304bce24ec1a2c200fc564be5e42a5be/Future_of_Data_Science.png',
		title: 'Future of Data Science',
		industry: 'General',
		solutionArea: 'Integrated Business Planning',
		jobFunction: 'Finance',
		link: 'https://meet.aeratechnology.com/future-of-data-science',
	},
	{
		id: 75,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1T00j9Xl7PUOZb2DEUlITB/89859c61151b20e34dbff14eeeaaff17/How_Decision_Intelligence_Connects_Planning_and_Execution_to_Manage_Disruption.png',
		title: 'How Decision Intelligence Connects Planning and Execution to Manage Disruption',
		industry: 'General',
		solutionArea: ['Order Lifecycle Management', 'Dynamic Supply Response'],
		jobFunction: ['Procurement', 'Operations'],
		link: 'https://meet.aeratechnology.com/how-decision-intelligence-connects-planning-and-execution-to-manage-disruption-1',
	},
	{
		id: 76,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/13uYhxAuidCN4e260s51EG/7822985355f30ab34a99ea29bf304930/Bridging_Procurement_and_Supply_Chain_with_Decision_Intelligence.png',
		title: 'Bridging Procurement and Supply Chain with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Supplier-Buyer Collaboration', 'Best Supplier'],
		jobFunction: ['Procurement', 'Supply Chain'],
		link: 'https://meet.aeratechnology.com/bridging-procurement-and-supply-chain-with-decision-intelligence',
	},
	{
		id: 77,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/23eRrGCC2cGoS0dOBld9AI/20091df71b87427d2e9401657b000bf3/How_to_Deal_Effectively_with_Supply_Disruptions_in_CPG.png',
		title: 'How to Deal Effectively with Supply Disruptions in CPG',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Prevent Stockout', 'Raw Material Inventory'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/how-to-deal-effectively-with-supply-disruptions-in-cpg',
	},
	{
		id: 78,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4oXHLF937o51OL9e8tGlw2/8fd760073d9338a59db4150a995ed39f/Decision_Intelligence_for_Supply_Chain.png',
		title: 'Decision Intelligence for Supply Chain',
		industry: 'General',
		solutionArea: ['Prevent Stockout', 'Supply Resilience'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/decision-intelligence-for-supply-chain',
	},
	{
		id: 79,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1LlwPqkBylgrcpTakx395C/fa318993c099681ad76c79935099eafe/The_Convergence_of_Sustainability_and_Decision_Intelligence.png',
		title: 'The Convergence of Sustainability and Decision Intelligence',
		industry: 'General',
		solutionArea: ['Integrated Business Planning', 'Supply Resilience'],
		jobFunction: ['Finance', 'Operations'],
		link: 'https://meet.aeratechnology.com/the-convergence-of-sustainability-and-decision-intelligence',
	},
	{
		id: 80,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1JE87ibXo0RnifPwNcQLtj/d1bcc96228aa38462a9cd90c1f564ffa/Reducing_Risk_and_Operational_Complexity_in_Pharma_with_Decision_Intelligence.png',
		title: 'Reducing Risk and Operational Complexity in Pharma with Decision Intelligence',
		industry: 'Life Sciences (Incl. Pharmaceuticals)',
		solutionArea: ['Dynamic Inventory Management', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Operations'],
		link: 'https://meet.aeratechnology.com/reducing-risk-and-operational-complexity-in-pharma-with-decision-intelligence',
	},
	{
		id: 81,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/1ZGG22GjOofTOvpUIdUoY7/67560ad6613c8c31d93aaf0fe2ccc290/Next_Generation_Trade_Promotion_Management_and_Media_Spend_Optimization.png',
		title: 'Next Generation Trade Promotion Management and Media Spend Optimization',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Trade Promotion Optimization', 'Media Optimization'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/next-generation-trade-promotion-management-and-media-spend-optimization',
	},
	{
		id: 82,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/2BYpnZQ3ZIfb1txcdMBAB1/87a0be98596315c75b0c59c219a31699/How_to_Close_the_Planning_and_Execution_Automation_Gap_with_Decision_Intelligence.png',
		title: 'How to Close the Planning and Execution Automation Gap with Decision Intelligence',
		industry: 'General',
		solutionArea: ['Prevent Stockout', 'Supplier-Buyer Collaboration'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/how-to-close-the-planning-and-execution-automation-gap-with-decision-intelligence',
	},
	{
		id: 83,
		image: 'https://images.ctfassets.net/mh1amgo8m7ts/4Yj9Q9eF99cC6XwWLrVGAF/43e857a2dd62dd7410702442a4698061/How_CPG_Companies_are_Deploying_Decision_Intelligence_to_Overcome_Raw_Material_Disruption.png',
		title: 'How CPG Companies are Deploying Decision Intelligence to Overcome Raw Material Disruption',
		industry: 'Consumer Packaged Goods',
		solutionArea: ['Raw Material Inventory', 'Prevent Stockout'],
		jobFunction: ['Supply Chain', 'Procurement'],
		link: 'https://meet.aeratechnology.com/how-cpg-companies-are-deploying-decision-intelligence-to-overcome-raw-material-disruption',
	},
];

export default class AllResources extends Component {
	static propTypes = {
		title: PropTypes.string,
		subTitle: PropTypes.string,
		children: PropTypes.node,
		type: PropTypes.string,
		onMoreClick: PropTypes.func,
		hasMore: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedCategory: '',
			selectedTag: '',
			selectedAuthor: '',
			//featuredCardVisible: 3,
		};
	}

	t = new TimelineLite();

	componentDidMount() {
		this.t.set(this.el, { autoAlpha: 0 });
	}

	animate = () => {
		fadeSlideIn(this.t, this.el);
	};

	handleCategoryChange = (event) => {
		this.setState({ selectedCategory: event.target.value });
	};

	handleTagChange = (event) => {
		this.setState({ selectedTag: event.target.value });
	};

	handleAuthorChange = (event) => {
		this.setState({ selectedAuthor: event.target.value });
	};

	getFilteredBlogs() {
		const { selectedCategory, selectedTag, selectedAuthor } = this.state;

		return blogs.filter((blog) => (selectedCategory === '' || blog.industry.includes(selectedCategory)) && (selectedTag === '' || blog.solutionArea.includes(selectedTag)) && (selectedAuthor === '' || blog.jobFunction.includes(selectedAuthor)));
	}

	render() {
		const { title, subTitle, children, type, hasMore, onMoreClick } = this.props;

		const allcategories = [...new Set(blogs.map((blog) => blog.industry))];
		const filtercategories = [].concat(...allcategories);
		const categories = filtercategories.filter((item, index) => filtercategories.indexOf(item) === index).filter(Boolean);
		const alltags = [...new Set(blogs.map((blog) => blog.solutionArea))];
		const filtertags = [].concat(...alltags);
		const tags = filtertags.filter((item, index) => filtertags.indexOf(item) === index).filter(Boolean);
		const allauthors = [...new Set(blogs.map((blog) => blog.jobFunction))];
		const filterauthors = [].concat(...allauthors);
		const authors = filterauthors.filter((item, index) => filterauthors.indexOf(item) === index).filter(Boolean);
		const filteredBlogs = this.getFilteredBlogs();
		//console.log(this.props.type)
		return (
			<WaypointEnter onEnter={this.animate}>
				<div className={s.news}>
					<div className={s.news__container}>
						<div className={s.news__col}>
							<h2
								ref={(c) => (this.el = c)}
								className={s.news__subheading}
							>
								Want to learn more?
							</h2>
							<p
								ref={(c) => (this.el = c)}
								className={s.news__para}
							>
								Catch up on our previous webinars.
							</p>
							<div className={s.news__filterRow}>
								<div ref={(c) => (this.el = c)}>
									{/* <label>Category:</label> */}
									<select onChange={this.handleCategoryChange}>
										<option value=''>All Industries</option>
										{categories.map((category) => (
											<option
												key={category}
												value={category}
											>
												{category}
											</option>
										))}
									</select>
								</div>
								<div ref={(c) => (this.el = c)}>
									{/* <label>Tags:</label> */}
									<select onChange={this.handleTagChange}>
										<option value=''>All Solution Areas</option>
										{tags.map((tag) => (
											<option
												key={tag}
												value={tag}
											>
												{tag}
											</option>
										))}
									</select>
								</div>
								<div ref={(c) => (this.el = c)}>
									{/* <label>Author:</label> */}
									<select onChange={this.handleAuthorChange}>
										<option value=''>All Job Functions</option>
										{authors.map((author) => (
											<option
												key={author}
												value={author}
											>
												{author}
											</option>
										))}
									</select>
								</div>
							</div>
							<div>
								{filteredBlogs.length ? (
									filteredBlogs.map((blog) => (
										<div
											className={s.newsItem}
											key={blog.id}
											ref={(c) => (this.el = c)}
										>
											<a
												className={s.newsItem__wrapper}
												href={blog.link}
												target='_blank'
											>
												<div className={s.newsItem__bgImage}>
													<img
														alt='featured image'
														src={blog.image}
													/>
												</div>
												<div className={s.newsItem__row}>
													<div className={s.newsItem__content}>
														<h2 className={s.newsItem__title}>{blog.title}</h2>
													</div>
												</div>
												<div className={s.newsItem__lastRow}>
													<div className={s(s.newsItem__row)}>
														{/* <div className={s.newsItem__date}>{date}</div>
                            <div className={s.newsItem__line}></div> */}
														<span className={s.newsItem__link}>
															WATCH NOW{' '}
															<img
																alt='right arrow'
																src={rightArrow}
															/>
														</span>
													</div>
												</div>
											</a>
										</div>
									))
								) : (
									<h2>No Webinars Found</h2>
								)}
							</div>
						</div>
						<div></div>
						{/* <div className={s.news__list}>
              <div className={s.news__col}>{children}</div>
            </div> */}

						{/* {hasMore && (
              <div className={s.news__more}>
                <Button
                  data-event-category="Section"
                  data-event-action="Click"
                  data-event-name="See More"
                  onClick={onMoreClick}
                >
                  See More
                </Button>
              </div>
            )} */}
					</div>
				</div>
			</WaypointEnter>
		);
	}
}
