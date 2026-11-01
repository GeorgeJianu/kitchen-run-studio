/* Kitchen Run Studio — service worker
   Keeps a copy of the app so it opens instantly and works offline.
   Bump VERSION whenever manifest.json or the icons change; index.html is
   checked against the website on every launch and refreshed by itself. */
var VERSION = '5.2.0';
var CACHE = 'kitchen-run-studio-' + VERSION;
var FONT_CACHE = 'kitchen-run-studio-fonts';
var APP_FILES = [
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];
var FONT_CSS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,500..800&family=IBM+Plex+Sans+Condensed:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap';

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      // straight from the website, never from the browser's own cache
      return c.addAll(APP_FILES.map(function(u){ return new Request(u, {cache:'reload'}); }));
    }).then(function(){
      // fonts are best effort and must not hold the install up for long
      return Promise.race([cacheFonts(), new Promise(function(r){ setTimeout(r, 8000); })]);
    })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== CACHE && k !== FONT_CACHE && k.indexOf('kitchen-run-studio-') === 0) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('message', function(e){
  if(e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;
  var url = new URL(req.url);

  // the page itself: answer from the copy at once, then look for a newer one
  if(req.mode === 'navigate' || url.pathname.replace(/.*\//, '') === 'index.html'){
    e.respondWith(caches.open(CACHE).then(function(c){
      return c.match('./index.html').then(function(cached){
        // clone before the page consumes the body, or the comparison fails
        var fresh = refreshIndex(c, cached ? cached.clone() : null);
        if(cached){ e.waitUntil(fresh); return cached; }
        return fresh.then(function(r){ return r || Response.error(); });
      });
    }));
    return;
  }

  // the typefaces: keep whatever Google Fonts served, for offline use
  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    e.respondWith(caches.open(FONT_CACHE).then(function(c){
      return c.match(req).then(function(hit){
        if(hit) return hit;
        return fetch(req).then(function(res){
          if(res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
          return res;
        });
      });
    }));
    return;
  }

  // manifest, icons: the copy first, the network if we have none
  if(url.origin === location.origin){
    e.respondWith(caches.match(req).then(function(hit){ return hit || fetch(req); }));
  }
});

// Fetch index.html from the website; when it differs from the copy, store it
// and tell every open window that a reload will bring the new version.
function refreshIndex(c, cached){
  return fetch('./index.html', {cache:'no-cache'}).then(function(res){
    if(!res || !res.ok) return null;
    return res.clone().text().then(function(text){
      var oldText = cached ? cached.text() : Promise.resolve(null);
      return oldText.then(function(old){
        if(text === old) return res;
        return c.put('./index.html', res.clone()).then(function(){
          if(old !== null) return notify({type:'index-updated'});
        }).then(function(){ return res; });
      });
    });
  }).catch(function(){ return null; });
}

function notify(msg){
  return self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    list.forEach(function(cl){ cl.postMessage(msg); });
  });
}

// Best effort: the font CSS and the font files it names. Skipped quietly when
// Google Fonts cannot be reached — the app still installs.
function cacheFonts(){
  return caches.open(FONT_CACHE).then(function(c){
    return fetch(FONT_CSS).then(function(res){
      if(!res.ok) return;
      return res.clone().text().then(function(css){
        var urls = [], m, re = /url\(([^)]+)\)/g;
        while((m = re.exec(css))) urls.push(m[1].replace(/["']/g, ''));
        return c.put(FONT_CSS, res).then(function(){
          return Promise.all(urls.map(function(u){
            return fetch(u).then(function(r){ if(r.ok) return c.put(u, r); }).catch(function(){});
          }));
        });
      });
    }).catch(function(){});
  });
}
