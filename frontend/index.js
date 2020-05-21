const companies = document.querySelector("#companies .grid-container");
const grads = document.querySelector("#grads");
const displayGrads = grads.querySelector(".grid-container");
const searchGradButton = document.querySelector("#searchGrad");
let allGrads = [];
const URL = "http://localhost:3000/api/v1/";
document.addEventListener("DOMContentLoaded", function () {
  fetchCompanies();
  fetchGrads();
});

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
      companies.innerHTML += json.map(renderCompany).join("");
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
      displayGrads.innerHTML += json.map(renderGrads).join("");
      allGrads = json;
    })
    .catch((error) => console.log(error.message));
}
function renderGrads({ name, avatar, campus, cohort, course }) {
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
          <div class="company">
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

function searchGradby(filter, query) {
  if (filter.innerText == 'ALL') {
    displayGrads.innerHTML += allGrads.map(renderGrads).join("");
    return
  }
  filter = filter.innerText.toLowerCase()
  query = query.value.toLowerCase()
  let n = allGrads.filter(graduate => graduate[filter].toLowerCase() == query)
  displayGrads.innerHTML = "";
  displayGrads.innerHTML += n.map(renderGrads).join("");
  console.log(n)
}

grads.addEventListener("click", function (event) {
  document.querySelector(".dropdown ul").classList.remove("active");
  if(event.target.className == "default_option") {
    document.querySelector(".dropdown ul").classList.add("active");
  }
  if(event.target.tagName == 'LI'){
      let text = event.target.innerText;
      document.querySelector(".default_option").innerText = text;
      document.querySelector(".dropdown ul").classList.remove("active");
  }
  if(event.target.className == "fas fa-search") {
   let filter = this.querySelector(".default_option");
   let query = this.querySelector(".input");
   searchGradby(filter,query)
   filter.innerText = 'ALL'
   query.value =''
  }

});
