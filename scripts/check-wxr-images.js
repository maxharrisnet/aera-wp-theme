#!/usr/bin/env node
/**
 * Check WXR file for image assignments
 */

const fs = require('fs');
const path = require('path');

const wxr = fs.readFileSync(path.resolve(__dirname, '../_ORIGINAL_FILES/blogs-wxr.xml'), 'utf8');
const items = wxr.match(/<item>[\s\S]*?<\/item>/g);
const posts = items.filter(i => i.includes('<wp:post_type>blog</wp:post_type>'));
const testTitles = ['Smarter Material Allocation', 'Eliminating Waste', 'Smarter Waste Mitigation'];

testTitles.forEach(testTitle => {
	const post = posts.find(p => {
		const title = p.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1];
		return title && title.includes(testTitle);
	});

	if (post) {
		const title = post.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1];
		const postId = post.match(/<wp:post_id>(.*?)<\/wp:post_id>/)?.[1];
		const thumbnail = post.match(/<wp:meta_key>_thumbnail_id<\/wp:meta_key>[\s\S]*?<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/)?.[1];
		const cardImage = post.match(/<wp:meta_key>resource_card_image<\/wp:meta_key>[\s\S]*?<wp:meta_value><!\[CDATA\[(.*?)\]\]><\/wp:meta_value>/)?.[1];

		const featuredAtt = items.find(att => att.includes(`<wp:post_id>${thumbnail}</wp:post_id>`));
		const cardAtt = cardImage ? items.find(att => att.includes(`<wp:post_id>${cardImage}</wp:post_id>`)) : null;

		const featuredUrl = featuredAtt?.match(/<wp:attachment_url>(.*?)<\/wp:attachment_url>/)?.[1];
		const cardUrl = cardAtt?.match(/<wp:attachment_url>(.*?)<\/wp:attachment_url>/)?.[1];

		console.log(`\n${title?.substring(0, 60)}`);
		console.log(`  Post ID: ${postId}`);
		console.log(`  Featured ID: ${thumbnail} - ${featuredUrl?.split('/').pop() || 'N/A'}`);
		console.log(`  Card ID: ${cardImage || 'NOT SET'} - ${cardUrl?.split('/').pop() || 'N/A'}`);
		console.log(`  Same? ${featuredUrl === cardUrl}`);
		console.log(`  Card attachment exists? ${!!cardAtt}`);
	}
});
