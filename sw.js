self.addEventListener('install', e=>{
    caches.open('cache-v1')
    .then(cache =>{
        cache.addAll([
            './',
            'css/style.css',
            'images/convers.jpg',
            'images/facebook.png',
            'images/golf.png',
            'images/instagram.png',
            'images/playera.jpg',
            'images/wallaper.jpg',
            'images/wheel.jpg',
            'images/twiter.png',
            'images/LEFLEUR.mp4',
            'images/TYLER.mp4',
            'images/CREATOR.mp4',
            'images/twiter.png',
            'main.js'
        ])
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});