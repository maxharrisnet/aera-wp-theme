#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const OUT = path.resolve(__dirname, '../_ORIGINAL_FILES/whitepapers-wxr.xml');
const SRC = path.resolve(__dirname, '../_ORIGINAL_FILES/contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json');

function escXml(s){ if (s==null) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function firstLocalized(f){ if (!f) return null; if (typeof f==='string') return f; if (typeof f==='object'){ const k=Object.keys(f)[0]; return f[k]; } return null; }

function buildWxr(items, assetsMap){
  const now = new Date().toUTCString();
  const DEFAULT_IMAGE_URL = 'https://images.ctfassets.net/mh1amgo8m7ts/4prFu00cABgTGVeGvbCo8b/a2ac7f09d24154c85cd0dee9ee72096b/Aera_tile.png';
  let out = '';
  out += '<?xml version="1.0" encoding="UTF-8"?>\n';
  out += '<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/">\n';
  out += '<channel>\n';
  out += '<title>Whitepapers Export</title>\n';
  out += '<link>https://your-site.example/</link>\n';
  out += `<wp:wxr_version>1.2</wp:wxr_version>\n`;

  items.forEach((it, i) => {
    const postId = 300000 + i;
    const attachId = 400000 + i;
    const fields = it.fields || {};
    const title = firstLocalized(fields.title) || firstLocalized(fields.name) || '(no title)';
    const excerpt = firstLocalized(fields.text) || firstLocalized(fields.summary) || firstLocalized(fields.description) || '';
    const externalLink = firstLocalized(fields.link) || ''; // prefer explicit link
    const author = firstLocalized(fields.author) || '';
    const cta = firstLocalized(fields.ctaText) || 'Download';

    // Use default image for all whitepapers
    const imageUrl = DEFAULT_IMAGE_URL;

    out += '<item>\n';
    out += `<title><![CDATA[${title}]]></title>\n`;
    out += `<link>${escXml(externalLink || ('https://example.com/whitepapers/'+(it.sys && it.sys.id||i)))}</link>\n`;
    out += `<pubDate>${now}</pubDate>\n`;
    out += `<dc:creator>admin</dc:creator>\n`;
    out += `<guid isPermaLink="false">whitepaper-${it.sys && it.sys.id}</guid>\n`;
    out += `<content:encoded><![CDATA[${excerpt || ''}]]></content:encoded>\n`;
    out += `<wp:post_id>${postId}</wp:post_id>\n`;
    const postDate = (it.sys && it.sys.createdAt) ? new Date(it.sys.createdAt).toISOString() : new Date().toISOString();
    out += `<wp:post_date>${postDate}</wp:post_date>\n`;
    out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
    out += `<wp:comment_status>closed</wp:comment_status>\n`;
    out += `<wp:ping_status>closed</wp:ping_status>\n`;
    out += `<wp:post_name>${escXml((title||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''))}</wp:post_name>\n`;
    out += `<wp:status>publish</wp:status>\n`;
    out += `<wp:post_type>whitepaper</wp:post_type>\n`;

    function meta(k,v){ if (v==null) return; out += `<wp:postmeta>\n<wp:meta_key>${escXml(k)}</wp:meta_key>\n<wp:meta_value><![CDATA[${v}]]></wp:meta_value>\n</wp:postmeta>\n`; }

    meta('resource_card_title', firstLocalized(fields.cardTitle) || title);
    if (author) meta('resource_author', author);
    if (excerpt) meta('resource_excerpt', excerpt);
    if (cta) meta('resource_cta_text', cta);
    if (externalLink) meta('resource_external_url', externalLink);
    if (it.sys && it.sys.id) meta('original_id', it.sys.id);

    // Set default image for all whitepapers
    meta('_thumbnail_id', attachId);
    meta('resource_card_image', attachId);

    out += '</item>\n';

    // emit attachment item with default image
    out += '<item>\n';
    out += `<title><![CDATA[${title} image]]></title>\n`;
    out += `<link>${escXml(imageUrl)}</link>\n`;
    out += `<pubDate>${now}</pubDate>\n`;
    out += `<dc:creator>admin</dc:creator>\n`;
    out += `<guid isPermaLink="false">attachment-${attachId}</guid>\n`;
    out += `<wp:post_id>${attachId}</wp:post_id>\n`;
    out += `<wp:post_date>${postDate}</wp:post_date>\n`;
    out += `<wp:post_date_gmt>${postDate}</wp:post_date_gmt>\n`;
    out += `<wp:post_status>inherit</wp:post_status>\n`;
    out += `<wp:post_parent>${postId}</wp:post_parent>\n`;
    out += `<wp:post_type>attachment</wp:post_type>\n`;
    out += `<wp:attachment_url>${escXml(imageUrl)}</wp:attachment_url>\n`;
    out += '</item>\n';
  });

  out += '</channel>\n</rss>\n';
  return out;
}

function run(){
  const raw = fs.readFileSync(SRC,'utf8');
  const j = JSON.parse(raw);
  const contentTypes = j.contentTypes || [];
  const eventsCt = contentTypes.find(ct => /events?/i.test(ct.name || (ct.sys && ct.sys.id) || ''));
  if (!eventsCt){ console.error('Events content type not found'); process.exit(1); }
  const entries = j.entries || [];
  const assets = j.assets || [];
  const assetsMap = {};
  assets.forEach(a => {
    const id = a.sys && a.sys.id;
    if (!id) return;
    const fileObj = (a.fields && a.fields.file) || null;
    if (!fileObj){
      // sometimes localized
      for(const k of Object.keys(a.fields || {})){
        if (a.fields[k] && a.fields[k].file) { assetsMap[id] = 'https:' + a.fields[k].file.url; break; }
      }
    } else {
      const locale = Object.keys(fileObj)[0];
      const file = fileObj[locale];
      if (file && file.url) assetsMap[id] = (file.url.startsWith('//') ? 'https:'+file.url : file.url);
    }
  });

  // filter event entries where any field contains 'Whitepaper' (Type field)
  const eventEntries = entries.filter(e => e.sys && e.sys.contentType && e.sys.contentType.sys && e.sys.contentType.sys.id === (eventsCt.sys && eventsCt.sys.id));
  const whitepapers = eventEntries.filter(e => {
    const f = e.fields || {};
    // check specific Type field
    if (f.Type){ if (valueContainsWhitepaper(f.Type)) return true; }
    // fallback: look through all fields
    for(const k of Object.keys(f)){
      if (valueContainsWhitepaper(f[k])) return true;
    }
    return false;
  });

  function valueContainsWhitepaper(v){
    if (!v) return false;
    if (typeof v === 'string') return /whitepaper/i.test(v);
    if (typeof v === 'object'){
      for(const kk of Object.keys(v)){
        if (valueContainsWhitepaper(v[kk])) return true;
      }
    }
    return false;
  }

  console.error('Events contentType:', eventsCt.name, eventsCt.sys && eventsCt.sys.id);
  console.error('Total event entries:', eventEntries.length);
  console.error('Whitepapers found:', whitepapers.length);

  // sort by updatedAt desc
  whitepapers.sort((a,b)=> new Date(b.sys.updatedAt || b.sys.createdAt) - new Date(a.sys.updatedAt || a.sys.createdAt));

  const wxr = buildWxr(whitepapers, assetsMap);
  fs.writeFileSync(OUT, wxr, 'utf8');
  console.log('WXR written to', OUT);
}

run();
