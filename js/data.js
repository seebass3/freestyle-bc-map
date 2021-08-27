let map
let arr = [];
let totalSize = 0;
let totalNumber = 0;


var template = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">',
    '<style type="text/css"> .st0{fill:#2D87CC;} </style>',
    '<g>',
    '<image style="overflow:visible;opacity:0.48;" width="379" height="510" xlink:href="D8A947E28B0C4608.png"  transform="matrix(1 0 0 1 81 8)"></image>',
    '<g>',
    '<g>',
    '<g>',
    '<path class="st0" d="M263.7,16.2C167.9,16.2,90,94.1,90,189.9c0,118.9,155.4,293.4,162.1,300.7c6.2,6.9,17.1,6.9,23.2,0 c6.7-7.4,162.1-181.9,162.1-300.7C437.4,94.1,359.5,16.2,263.7,16.2z M263.7,277.3c-48.2,0-87.4-39.3-87.4-87.4 s39.3-87.4,87.4-87.4s87.4,39.3,87.4,87.4S311.9,277.3,263.7,277.3z"/>',
    '</g>',
    '</g>',
    '</g>',
    '</g>',
    '</svg>',
].join("\n");
var svg = template.replace("{{ color }}", "#2D87CC");

$(document).ready(function () {

    $.getJSON(
        "https://sheets.googleapis.com/v4/spreadsheets/1grTeLFkwzgEtrsxD5og3Mw-PAa9pzKWOtsxP801kMO0/values/clubs?alt=json&key=AIzaSyAMaSPPLaJFGGEnkohVhZooXk85ZSIRCkQ",
        function (data) {
            let markers = [];
            var entry = data.values;

            var i;

            for (i = 0; i < entry.length; i++) {
                for (j = 0; j < 6; j++) {
                    var pull = data.values[i][j];
                    // console.log('Array Item: ' + pull);
                    arr.push(pull);
                }
            } // End For Loop


            var s = 6;
            var locationCount = 1;
            const infowindow = new google.maps.InfoWindow({
                maxWidth: 310,
            });

            while (s < arr.length) {
                // console.log('This is club ' + locationCount);
                // console.log('Address:' + arr[s]);

                var lat = s + 1;
                // console.log('Lat:' + arr[lat]);
                lat = arr[lat];

                var long = s + 2;
                // console.log('Long:' + arr[long]);
                long = arr[long];

                var name = s + 3;
                // console.log('Name:' + arr[name]);
                var name = arr[name];

                var town = s + 4;
                // console.log('Town:' + arr[town]);
                var town = arr[town];

                var websiteURL = s + 5;
                // console.log('Website:' + arr[websiteURL]);
                var websiteURL = arr[websiteURL];

                makeMark(lat, long, name, town, websiteURL, infowindow, markers);

                locationCount++;
                s = s + 6;

                totalNumber++;

            } // End While Loop for drawing icons

        }); //End Function w/data

    function makeMark(lat, long, name, town, websiteURL, infowindow, markers) {
        const contentString =
            '<div class="infoWindow">' +
            // '<img class=\"infoImage\" src=\"' + url + '\" />' +
            '<div class="bodyContent">' +
            '<div class="bodyHeader">' + name + '</div>' +
            '<div class="bodyText">' + town + '</div>' +
            '<a href="' + websiteURL + '" rel="noopener noreferrer" target="_blank">Visit Website</a>' +
            "</div>" +
            "</div>";



        var docMarker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map,
            text: 'Label text',
            fontFamily: "'AmsiPro-Regular', Arial",
            title: "Dynamic SVG Marker",
            icon: {
                url: "data:image/svg+xml;charset=UTF-8;base64," + btoa(svg),
                scaledSize: new google.maps.Size(30, 30),
            },
            optimized: false,
            shadow: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/images/marker-shadow.png',
            animation: google.maps.Animation.DROP,

        });
        docMarker.addListener("click", () => {
            infowindow.setContent(contentString);
            infowindow.open(map, docMarker);
        });

        google.maps.event.addListener(map, "click", function (event) {
            infowindow.close();
        });

        markers.push(docMarker);
    }

});


function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 53.7267,
            lng: -127.6476
        },
        zoom: 5,
        mapId: "f6d2cd900630ced2",
    })

}