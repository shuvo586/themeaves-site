/*--=====================================
=            Google Maps Loader         =
======================================--*/

// Loads the Google Maps JS API using a key fetched from the site's own
// /api/maps-key endpoint, so no key ever sits in a static file. The key
// lives in the server's environment (GOOGLE_MAPS_API_KEY). Pages include
// this file where the template shipped its inline keyed script tag; the
// callback contract is unchanged (initMap lives in the app-*.js files).

(function () {
  "use strict";

  function inject(key, version) {
    var url =
      "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(key);
    if (version) url += "&v=" + encodeURIComponent(version);
    url += "&loading=async&callback=initMap";
    var script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = url;
    document.body.appendChild(script);
  }

  fetch("api/maps-key", { headers: { accept: "application/json" } })
    .then(function (res) {
      return res.ok ? res.json() : null;
    })
    .then(function (data) {
      if (data && data.key) inject(data.key, data.version);
    })
    .catch(function () {
      // No key, no map: initMap is never called and the #map area keeps
      // whatever the page paints as its fallback. Never throw.
    });
})();
