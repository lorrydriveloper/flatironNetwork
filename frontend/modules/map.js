import HTMLBuilder from "./HTMLbuilder.js";

class Map {
  static map;
  static markers;
  static init(gradsArray) {
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35, lng: -50 },
      zoom: 3,
    });

    this.markers = gradsArray.map(this.createMarker);

  }

  static closeMarkers(map, markers) {
    markers.forEach(function (marker) {
      map.zoom = 7;
      marker.infowindow.close(map, marker);
    });
  }
  static createMarker(grad) {
    let icon = {
      url:
        "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/999/s200/flatironschool.png", // url
      scaledSize: new google.maps.Size(18, 18), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };
    const infowindow = new google.maps.InfoWindow({
      content: HTMLBuilder.gradCard(grad),
    });
    let marker = new google.maps.Marker({
      position: {
        lat: grad.latitude,
        lng: grad.longitude,
      },
      map: Map.map,
      title: grad.name,
      infowindow: infowindow,
      icon: icon,
    });
    marker.addListener("click", function () {
      Map.closeMarkers(this.map, Map.markers);
      infowindow.open(this.map, marker);
    });
    return marker;
  }
}

export default Map;
