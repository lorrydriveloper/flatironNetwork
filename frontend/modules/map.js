import DOM from "../modules/render.js";

class Map {
  static init(gradsArray) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35, lng: -50 },
      zoom: 3,
    });

    let icon = {
      url:
        "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/999/s200/flatironschool.png", // url
      scaledSize: new google.maps.Size(20, 20), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };



    let markers = gradsArray.map((grad) => {
      const infowindow = new google.maps.InfoWindow({
        content: DOM.renderGrad(grad),
      });
      let marker = new google.maps.Marker({
        position: {
          lat: grad.latitude,
          lng: grad.longitude,
        },
        map: map,
        title: grad.name,
        infowindow: infowindow,
        icon: icon
      });
      marker.addListener("click", function () {
        closeMarkers(map);
        infowindow.open(map, marker);
      });
      return marker;
    });
    function closeMarkers(map) {
      markers.forEach(function (marker) {
        map.zoom = 10
        marker.infowindow.close(map, marker);
      });
    }
  }

}

export default Map;
