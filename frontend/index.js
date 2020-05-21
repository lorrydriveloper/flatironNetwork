import DOM from "./modules/render.js";
import ApiAdapter from "./modules/api.js";
let allGrads = [];

document.addEventListener("DOMContentLoaded", function () {
  ApiAdapter.fetchCompanies();
  ApiAdapter.fetchGrads();
  DOM.addListeners();
});

function searchGradBy(filter, query) {
  let output = allGrads;
  if (filter !== "all") {
    output = filterGrads = allGrads.filter(
      (grad) => grad[filter].toLowerCase() === query
    );
  }
  return output;
}
function renderSearch(array) {
  displayGrads.innerHTML = "";
  displayGrads.innerHTML = array.map(renderGrad).join("");
}

function makeSearch(pointer) {
  let filter = pointer.querySelector("#filter");
  let query = pointer.querySelector("#query");
  let result = searchGradBy(filter.value, query.value);
  renderSearch(result);
  filter.value = "all";
  query.value = "";
}

// google Maps

var map;
function initMap(allGrads) {
  let coordinates = { lat: 52.6655976, lng: -2.4558356 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35, lng: -50 },
    zoom: 3,
  });

  var contentString = `
      <div id="content">
      <div id="siteNotice"></div>
      <h1 id="firstHeading" class="firstHeading">Uluru</h1>
      <div id="bodyContent">
       <p>
        <b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large sandstone
        rock formation in the southern part of the Northern Territory, central
        Australia. It lies 335&#160;km (208&#160;mi) south west of the nearest
        large town, Alice Springs; 450&#160;km (280&#160;mi) by road. Kata Tjuta
        and Uluru are the two major features of the Uluru - Kata Tjuta National
        Park. Uluru is sacred to the Pitjantjatjara and Yankunytjatjara, the
        Aboriginal people of the area. It has many springs, waterholes, rock caves
        and ancient paintings. Uluru is listed as a World Heritage Site.
      </p>
    <p>
      Attribution: Uluru,
      <a
        href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194"
      >
        https://en.wikipedia.org/w/index.php?title=Uluru</a
      >
      (last visited June 22, 2009).
    </p>
  </div>
</div>`;

  let a = allGrads;
  let markers = a.map((a) => {
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    let marker = new google.maps.Marker({
      position: {
        lat: getRandomInRange(-90, 90, 7),
        lng: getRandomInRange(-180, 180, 7),
      },
      map: map,
      title: `hello`,
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
      marker.infowindow.close(map, marker);
    });
  }
}
//  TO DELETE WHEN REAL DATA IS POPULATE
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
