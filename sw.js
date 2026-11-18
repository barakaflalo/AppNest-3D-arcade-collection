// AppNest 3D Arcade service worker — cache name derived from the version (lesson נ׳)
const CACHE='an3d-v1.1.0-naval1.0.0-frogger3.0.0';
const CORE=["./","index.html","manifest.json","icon-192.png","icon-512.png","assets/fonts/ps2p.woff2","assets/fonts/rubik-he-500.woff2","assets/fonts/rubik-he-700.woff2","assets/fonts/rubik-he-900.woff2","assets/fonts/rubik-la-500.woff2","assets/fonts/rubik-la-700.woff2","assets/fonts/rubik-la-900.woff2","assets/fx/fx.webp","assets/snd/alarm.ogg","assets/snd/bomb.ogg","assets/snd/boom_plate.ogg","assets/snd/combo.ogg","assets/snd/hit_metal.ogg","assets/snd/laser.ogg","assets/snd/mission.ogg","assets/snd/ping.ogg","assets/snd/powerup.ogg","img/frogger.webp","img/galaxy.webp","img/heli.webp","img/kangaroo.webp","img/naval.webp","img/poker.webp","img/star.webp","img/waiter.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))));return;}
 if(u.origin!==location.origin){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;}).catch(()=>m)));return;}
 if(r.headers.has('range')||/\.mp3$/.test(u.pathname))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;})));});
