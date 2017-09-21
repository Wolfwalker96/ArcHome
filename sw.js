this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v3.1').then(function(cache) {
      return cache.addAll([
        'index.html',
        'arc.css',
        'arc.js',
        'papaparse.min.js',
        'archome.png',
        'calendar.png',
        'schedule.html',
        'archome_fav.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response){
      let rep = response.clone();
      caches.open("v3").then(function(cache){
        cache.put(event.request,rep);
      });
      return response;
    }).catch(function() {
      return caches.match(event.request);
    })
  );
});
