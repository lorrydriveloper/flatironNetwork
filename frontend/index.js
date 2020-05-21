const companies = document.querySelector("#companies");
const displayCompanies = companies.querySelector(".grid-container");
const grads = document.querySelector("#grads");
const info = document.querySelector("#info");
const displayInfo = info.querySelector(".display-info");
const displayGrads = grads.querySelector(".grid-container");
const searchGradButton = document.querySelector("#searchGrad");
let allGrads = [];
const URL = "http://localhost:3000/api/v1/";
document.addEventListener("DOMContentLoaded", function () {
  fetchCompanies();
  fetchGrads();
});

grads.addEventListener("click", function gradsEvents(event) {
  if (event.target.id == "search") {
    makeSearch(this);
  }
});

companies.addEventListener('click', function companiesEvents(event) {
    if(event.target.parentElement.id || event.target.id){
        let id = event.target.parentElement.id || event.target.id;
        fetchCompany(id)
    }
})





function fetchCompanies() {
  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify({ trainer_id: trainerId }),
  };
  fetch(URL + "companies", configurationObject)
    .then((response) => response.json())
    .then((json) => {
      displayCompanies.innerHTML += json.map(renderCompany).join("");
    })
    .catch((error) => console.log(error.message));
}

function fetchGrads() {
  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify({ trainer_id: trainerId }),
  };
  fetch(URL + "users", configurationObject)
    .then((response) => response.json())
    .then((json) => {
      displayGrads.innerHTML += json.map(renderGrad).join("");
      allGrads = json;
      initMap(allGrads)
    })
    .catch((error) => console.log(error.message));
}

function fetchCompany(companySlug) {
    let configurationObject = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // body: JSON.stringify({ trainer_id: trainerId }),
    };
    fetch(URL + "companies/" + companySlug, configurationObject)
      .then((response) => response.json())
      .then((json) => {
        initMap(json.users);
        displayInfo.innerHTML = ''
        displayInfo.innerHTML += json.users.map(renderGrad).join("");
      })
      .catch((error) => console.log(error.message));
}



function renderGrad({ name, avatar, campus, cohort, course }) {
  return `
    <div class='card'>
      <h1>${name}</h1>
    </div>
  `;
}

function renderCompany({ logo, name, slug, users }) {
  if (users.length == 0) {
    return "";
  }
  return `
          <div class="company" id='${slug}'>
            <img
              src="${logo}"
              alt="${slug}-logo"
            />
            <div class="company__info">
              <h3>${name}</h3>
              <h4>grads working here ${users.length}</h4>
            </div>
          </div>
  `;
}

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


function initMap(allGrads) {
  let coordinates = { lat: 52.6655976, lng: -2.4558356 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom:2,
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

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  let a =  allGrads
  let array = a.map(a => {
    let marker = new google.maps.Marker({
        position: { lat: (getRandomInRange(-90,90,7)), lng: (getRandomInRange(-180,180,7)) },
        map: map,
        title: "Hello World",
      })
      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
      return marker
  });

}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}