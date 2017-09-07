this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v3').then(function(cache) {
      return cache.addAll([
        'index.html',
        'arc.css',
        'arc.js',
        'papaparse.min.js',
        'archome.png',
        'calendar.png',
        'schedule.html',
        'archome_fav.png',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vTEMyAwsSzIG81OPfEN4KUC2PFdif1KfrODE8EukJ4o3dZp7gxhmBlzxf6kCx-yqFFUCs1K94Azycoo/pub?gid=0&single=true&output=csv',
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
