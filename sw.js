const CACHE='ccaf-static-v5';
const SHELL=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)))});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.pathname.endsWith('questions.json')){event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>{const clone=res.clone();caches.open(CACHE).then(c=>c.put(event.request,clone));return res}).catch(()=>caches.match(event.request)));return}
  event.respondWith(fetch(event.request).then(res=>{if(res.ok){const clone=res.clone();caches.open(CACHE).then(c=>c.put(event.request,clone))}return res}).catch(()=>caches.match(event.request)));
});