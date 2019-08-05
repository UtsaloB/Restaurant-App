let staticCacheName = 'sw-restaurant-cache-v1';
self.addEventListener("install", function(event){
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache){
          console.log('Opened Cache');
          return cache.addAll([
              './index.html',
              './restaurant.html',
            //   './css/styles.css',
            //   './css/responsive_screen.css',
            //   './js/dbhelper.js',
            //   './js/main.js',
            //   './js/restaurant_info.js',
              './img/1.jpg',
              './img/2.jpg',
              './img/3.jpg',
              './img/4.jpg',
              './img/5.jpg',
              './img/6.jpg',
              './img/7.jpg',
              './img/8.jpg',
              './img/9.jpg',
              './img/10.jpg',
            //   './data/restaurants.json'
          ]);
      })  
    );
});

// Acivate Service Worker

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            console.log("Cache ACtivated ", cacheNames);
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch offline content
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            console.log("Responded", response)
            if(response){
                return response;
            } else{
                console.log('event '+ event.request.url)
                return fetch(event.request).then(function(response){
                    // var responseToCache = response.clone();
                    return caches.open(staticCacheName).then(function(cache){
                        cache.put(event.request, response.clone());
                        return response;
                    }).catch(error => console.log('Error', error))
                    // return response;
                });
            };
        })
    );
});