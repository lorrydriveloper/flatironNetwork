import DOM from "../modules/render.js";

class Map {
  static init(gradsArray) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 35, lng: -50 },
      zoom: 3,
    });


    let markers = gradsArray.map((grad) => {
      const infowindow = new google.maps.InfoWindow({
        content: DOM.renderGrad(grad),
      });
      let marker = new google.maps.Marker({
        position: {
          lat: Map.getRandomInRange(50, 26, 7),
          lng: Map.getRandomInRange(-124, -65, 7),
        },
        map: map,
        title: grad.name,
        infowindow: infowindow,
      });
      marker.addListener("click", function () {
        closeMarkers(map);
        infowindow.open(map, marker);
      });
      return marker;
    });
    function closeMarkers(map) {
      markers.forEach(function (marker) {
        map.zoom = 15
        marker.infowindow.close(map, marker);
      });
    }
  }
  //  TO DELETE WHEN REAL DATA IS POPULATE
  static getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
  }
}

export default Map;
