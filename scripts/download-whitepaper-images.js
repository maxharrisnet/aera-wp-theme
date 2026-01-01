const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const SRC = path.resolve(__dirname, '../_ORIGINAL_FILES/contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json');
const OUT_DIR = path.resolve(__dirname, '../_ORIGINAL_FILES/whitepaper-images');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function readJson(p){ return JSON.parse(fs.readFileSync(p,'utf8')); }
function valueContainsWhitepaper(v){
  if (!v) return false;
  if (typeof v === 'string') return /whitepaper/i.test(v);
  if (typeof v === 'object'){
    for(const k of Object.keys(v)) if (valueContainsWhitepaper(v[k])) return true;
  }
  return false;
}

function getAssetUrl(asset){
  if (!asset || !asset.fields) return null;
  const fileObj = asset.fields.file || null;
  if (!fileObj){
    // localized map
    for(const k of Object.keys(asset.fields)){
      if (asset.fields[k] && asset.fields[k].file) {
        const f = asset.fields[k].file;
        const locale = Object.keys(f)[0];
        const file = f[locale];
        if (file && file.url) return file.url.startsWith('//') ? 'https:' + file.url : file.url;
      }
    }
    return null;
  }
  const locale = Object.keys(fileObj)[0];
  const file = fileObj[locale];
  if (file && file.url) return file.url.startsWith('//') ? 'https:' + file.url : file.url;
  return null;
}

function download(url, dest){
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const request = proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200) return reject(new Error('Request Failed. Status Code: ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => { fs.unlink(dest, ()=>{}); reject(err); });
    });
    request.on('error', (err) => reject(err));
  });
}

(async function run(){
  try{
    const j = readJson(SRC);
    const contentTypes = j.contentTypes || [];
    const eventsCt = contentTypes.find(ct => /events?/i.test(ct.name || (ct.sys && ct.sys.id) || ''));
    if (!eventsCt) { console.error('Events content type not found'); process.exit(1); }
    const entries = j.entries || [];
    const assets = j.assets || [];
    const assetsById = {};
    assets.forEach(a => { if (a.sys && a.sys.id) assetsById[a.sys.id] = a; });

    const eventEntries = entries.filter(e => e.sys && e.sys.contentType && e.sys.contentType.sys && e.sys.contentType.sys.id === (eventsCt.sys && eventsCt.sys.id));
    const whitepapers = eventEntries.filter(e => {
      const f = e.fields || {};
      if (f.Type && valueContainsWhitepaper(f.Type)) return true;
      for(const k of Object.keys(f)) if (valueContainsWhitepaper(f[k])) return true;
      return false;
    });

    console.error('Found whitepapers:', whitepapers.length);

    const imgFields = ['image'];
    const urls = new Map();
    whitepapers.forEach((it)=>{
      const fields = it.fields || {};
      for(const k of imgFields){
        const imgField = fields[k];
        if (!imgField) continue;
        // Handle localized field: imgField = { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: '...' } } }
        let assetId = null;
        if (imgField.sys && imgField.sys.type === 'Link' && imgField.sys.linkType === 'Asset'){
          // non-localized
          assetId = imgField.sys.id;
        } else if (typeof imgField === 'object'){
          // localized: find the asset link
          for(const locale of Object.keys(imgField)){
            const val = imgField[locale];
            if (val && val.sys && val.sys.type === 'Link' && val.sys.linkType === 'Asset'){
              assetId = val.sys.id;
              break;
            }
          }
        }
        if (assetId){
          const aid = assetId;
          const asset = assetsById[aid];
          const url = getAssetUrl(asset);
          if (url) urls.set(aid, url);
        }
      }
    });

    console.error('Images to download:', urls.size);
    let i=0;
    for(const [aid, url] of urls.entries()){
      i++;
      const ext = path.extname(url.split('?')[0]) || '.jpg';
      const filename = `${aid}${ext}`.replace(/[^a-zA-Z0-9._-]/g,'');
      const dest = path.join(OUT_DIR, filename);
      if (fs.existsSync(dest)) { console.error(`${i}/${urls.size} exists: ${filename}`); continue; }
      try{
        console.error(`Downloading ${i}/${urls.size}: ${url} -> ${filename}`);
        await download(url, dest);
      }catch(err){ console.error('Failed:', err.message); }
    }

    console.error('Done.');
  }catch(err){ console.error('ERROR', err && err.message); process.exit(1); }
})();
