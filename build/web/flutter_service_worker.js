'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "af726b7b4608f346d16f8896a3981a2f",
"assets/AssetManifest.json": "d8278143559addf4c87b1928234f5f14",
"assets/assets/avaters/Avatar%25201.jpg": "60f969aae689291e30cffc6deafd1ec2",
"assets/assets/avaters/Avatar%25202.jpg": "9eecb4a8f2da90198bf8c4f8c3e8c527",
"assets/assets/avaters/Avatar%25203.jpg": "4431bc261ac4f57a09dc1e041b32b4d1",
"assets/assets/avaters/Avatar%25204.jpg": "95617f142e8dcfa6547ea80557eee016",
"assets/assets/avaters/Avatar%25205.jpg": "405a74c93f4806312fcd25e7722d9f90",
"assets/assets/avaters/Avatar%25206.jpg": "57b1f154ef47c7a76a78544e9e6af44f",
"assets/assets/avaters/Avatar%2520Default.jpg": "fe9d7eaf1b437a1e6c84f1e6fdb77dcf",
"assets/assets/Backgrounds/Spline.png": "ff232f0cf3ebd732ca4383c381450714",
"assets/assets/Fonts/Inter-Regular.ttf": "eba360005eef21ac6807e45dc8422042",
"assets/assets/Fonts/Inter-SemiBold.ttf": "3e87064b7567bef4ecd2ba977ce028bc",
"assets/assets/Fonts/Poppins-Bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/icons/apple_box.svg": "3f634f4f80414d88ada3193069b4f961",
"assets/assets/icons/Arrow%2520Right.svg": "82b7f5520958b35402d7576d20fb5186",
"assets/assets/icons/code.svg": "516c08c5e685a49b79fa87d0cc2f7641",
"assets/assets/icons/email.svg": "1ae885eb1fdb247400ac0400112ddefb",
"assets/assets/icons/email_box.svg": "a09e0cb77621a100cfe8c98593b9f422",
"assets/assets/icons/google_box.svg": "9f643ad1c6e2731879c4eb501357d784",
"assets/assets/icons/ios.svg": "45b815957b353fc2c4b56e2e3779d6f3",
"assets/assets/icons/password.svg": "64a726ac604a3e6228987eeb9c10bc71",
"assets/assets/icons/profile_img.png": "bdd25e977a6858b7413f720188f721c3",
"assets/assets/icons/User.svg": "5eb1b43b454f1e763da0928d4841c138",
"assets/assets/RiveAssets/button.riv": "c8ffe2900d31d8236247928cd7c2b5f3",
"assets/assets/RiveAssets/check.riv": "14f9269423eabd7e2e10cafdc6ad4d41",
"assets/assets/RiveAssets/confetti.riv": "ad0d13cbea799085305316f0e8118274",
"assets/assets/RiveAssets/house.riv": "3ac77437a4c56b5143d6ceca83dd61d9",
"assets/assets/RiveAssets/icons.riv": "3d29f9acebef13f01f371b59e84e664b",
"assets/assets/RiveAssets/menu_button.riv": "f8fdfd9fd8dc7873dfac6f005f3233c1",
"assets/assets/RiveAssets/shapes.riv": "8839d67714d5e9c52b3e0dbb2b1e89c1",
"assets/FontManifest.json": "536f94795b1bf31327361e29bd5a6939",
"assets/fonts/MaterialIcons-Regular.otf": "62ec8220af1fb03e1c20cfa38781e17e",
"assets/NOTICES": "a28c562a9a57c953d8148b29136dfc00",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "52d3eb910f7539e92ae96358fd0edb4a",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "424d9ce82a3fb0693de2103c3bcceb46",
"/": "424d9ce82a3fb0693de2103c3bcceb46",
"main.dart.js": "f12a5e6ec5f0d1187d7fa44b0ad63d51",
"manifest.json": "b9d6020be983ef116fb11dc0e10bc82d",
"version.json": "3332df31670a0abbc691077af272f7cc"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
