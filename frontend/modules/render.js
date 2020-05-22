import ApiAdapter from "../modules/api.js";

class DOM {
  static grads = document.querySelector("#grads");
  static companies = document.querySelector("#companies");
  static displayCompanies = companies.querySelector(".grid-container");
  static info = document.querySelector("#info");
  static displayInfo = info.querySelector(".display-info");
  static displayGrads = grads.querySelector(".grid-container");
  static searchGradButton = document.querySelector("#searchGrad");

  static renderNewGradForm() {
    grads.children[0].innerHTML += '<p class="close">close X</p>';
    this.toggleForm();
  }

  static toggleForm() {
    grads.children[0].classList.toggle("reveal");
    if (grads.children[0].classList.contains("reveal")) {
      grads.style.overflow = "hidden";
    } else {
      grads.style.overflow = "auto";
      grads.children[0].innerHTML = "";
    }
  }
  static addListeners() {
    grads.addEventListener("click", function gradsEvents(event) {
      if (event.target.id == "search") {
        DOM.makeSearch(this);
      }
      if (event.target.id == "new-grad") {
        DOM.renderNewGradForm();
      }
      if (event.target.className == "close") {
        DOM.toggleForm();
      }
    });

    companies.addEventListener("click", function companiesEvents(event) {
      if (event.target.parentElement.id || event.target.id) {
        let id = event.target.parentElement.id || event.target.id;
        ApiAdapter.fetchCompany(id);
      }
    });
  }

  static renderCompany({ logo, name, slug, users }) {
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
  static renderGrad({ name, avatar, campus, cohort, course }) {
    return `
        <div class="gradcard">
            <div class="grad">
              <img src="${avatar}">
            </div>
            <h1>${name}</h1>
            <ul class="card__info">
              <li>${course}</li>
                <span class="hr"></span>
              <li>${campus}</li>
              <li>${cohort}</li>
            </ul>
        </div>
  `;
  }
  static HTMLify(array, method) {
    return array.map(method).join("");
  }

  static searchGradBy(filter, query) {

    let output = ApiAdapter.allGrads;
    if (filter !== "all") {
      output  = ApiAdapter.allGrads.filter(
        (grad) => grad[filter].toLowerCase() === query.toLowerCase()
      );
    }
    return output;
  }
  static renderSearch(array) {
    this.displayGrads.innerHTML = "";
    this.displayGrads.innerHTML = array.map(DOM.renderGrad).join("");
  }

  static makeSearch(pointer) {
    let filter = pointer.querySelector("#filter");
    let query = pointer.querySelector("#query");
    let result = this.searchGradBy(filter.value, query.value);
    this.renderSearch(result);
    filter.value = "all";
    query.value = "";
  }
}

export default DOM;
