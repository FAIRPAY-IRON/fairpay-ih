var map;
function initMap() {
    var options = {
        zoom: 12,
        center: new google.maps.LatLng(40.4167,-3.70325)
    };

    map = new google.maps.Map(document.getElementById('map'), options);

}

// function addMarker(map, coords){
//     new google.maps.Marker({
//         position: coords,
//         map: map
//     });
// }

// const mongoose = require('mongoose');
// const Bet = require('../models/bet.model');



// function findAndPlace(){
//     Bet.find()
//         .then(bets => {
//             bets.forEach(bet => {
//                 markers.push(bet.location);
//             })
//         })
//         .else(e => {
//             next(e);
//         })
//
//     for(let i = 0; i < markers.length; i++){
//         addMarker(markers[i]);
//     }
// }
//


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
