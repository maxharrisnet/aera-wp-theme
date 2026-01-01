const fs = require('fs');
const path = require('path');
const P = path.resolve(__dirname, '../_ORIGINAL_FILES/contentful-export-mh1amgo8m7ts-master-2025-11-24T23-06-28.json');
function read(){
  const raw = fs.readFileSync(P,'utf8');
  return JSON.parse(raw);
}
function firstLocalizedString(field){
  if (!field) return null;
  if (typeof field === 'string') return field;
  if (typeof field === 'object'){
    const keys = Object.keys(field);
    if (keys.length) return field[keys[0]];
  }
  return null;
}
function valueContainsWhitepaper(v){
  if (!v) return false;
  if (typeof v === 'string') return /whitepaper/i.test(v);
  if (typeof v === 'object'){
    for(const k of Object.keys(v)){
      if (valueContainsWhitepaper(v[k])) return true;
    }
  }
  return false;
}

try{
  const j = read();
  const contentTypes = j.contentTypes || [];
  const eventsCt = contentTypes.find(ct => /events?/i.test(ct.name || (ct.sys && ct.sys.id) || ''));
  if (!eventsCt){
    console.error('Events content type not found');
    process.exit(0);
  }
  console.error('Events contentType:', eventsCt.name, '(', eventsCt.sys && eventsCt.sys.id, ')');
  const entries = j.entries || [];
  const eventEntries = entries.filter(e => e.sys && e.sys.contentType && e.sys.contentType.sys && e.sys.contentType.sys.id === (eventsCt.sys && eventsCt.sys.id));
  console.error('Total event entries:', eventEntries.length);

  const matches = eventEntries.filter(e => {
    const f = e.fields || {};
    // Check any field value contains 'Whitepaper' (case-insensitive)
    for(const k of Object.keys(f)){
      if (valueContainsWhitepaper(f[k])) return true;
    }
    return false;
  });
  console.error('Matches (heuristic):', matches.length);

  matches.sort((a,b)=> new Date(b.sys.updatedAt || b.sys.createdAt) - new Date(a.sys.updatedAt || a.sys.createdAt));
  const top = matches.slice(0,5);
  top.forEach(m => {
    const tCandidates = ['title','name','headline','heading','Title','Name'];
    let title = null;
    for(const tc of tCandidates){ if (m.fields && m.fields[tc]){ title = firstLocalizedString(m.fields[tc]); break; } }
    if (!title) title = '(no title)';
    const date = m.sys.updatedAt || m.sys.createdAt || '';
    console.log(date+' - '+title);
  });
}catch(err){
  console.error('ERROR', err && err.message);
  process.exit(1);
}
