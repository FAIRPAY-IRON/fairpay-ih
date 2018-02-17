// const mongoose = require('mongoose');
// const Bet = require('../models/bet.model');

var map;
    function initMap() {
        var options = {
            zoom: 12,
            center: new google.maps.LatLng(40.4167,-3.70325)
        };

        map = new google.maps.Map(document.getElementById('map'), options);
    }

// window.eqfeed_callback = function(results) {
//   for (var i = 0; i < results.features.length; i++) {
//     var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(coords[1],coords[0]);
//     var marker = new google.maps.Marker({
//       position: latLng,
//       map: map
//     });
//   }
// };
