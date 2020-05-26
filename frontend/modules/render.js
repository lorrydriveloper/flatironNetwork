import ApiAdapter from "../modules/api.js";
import Map from "../modules/map.js";
import HTMLBuilder from "../modules/HTMLbuilder.js";

class DOM {
  static grads = document.querySelector("#grads");
  static companies = document.querySelector("#companies");
  static displayCompanies = companies.querySelector(".grid-container");
  static info = document.querySelector("#info");
  static displayInfo = info.querySelector(".display-info");
  static displayGrads = grads.querySelector(".grid-container");
  static searchGradButton = document.querySelector("#searchGrad");

  static renderNewGradForm() {
    this.grads.children[0].innerHTML += '<p class="close">close X</p>';
    this.grads.children[0].innerHTML += HTMLBuilder.formBuilder();
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
      if (event.target.id == "searchGrad") {
        DOM.makeSearch(this);
      }
      else if (event.target.id == "new-grad") {
        DOM.renderNewGradForm();
      }
      else if (event.target.className == "close") {
        DOM.toggleForm();
      }
      else if (event.target.value == "submit") {
        event.preventDefault();
        console.log(event.target);
        let newGradObj = DOM.grabValuesForm(
          event.target.previousSibling.children
        );
        ApiAdapter.postNewGrad(newGradObj);
      }
    });

    companies.addEventListener("click", function companiesEvents(event) {
      console.log(event.target.tagName);
      if (event.target.className == "button__search") {
        DOM.searchCompany(event);
      }
      if (event.target.tagName == "LI") {
        let id = event.target.parentElement.id;
        ApiAdapter.fetchCompany(id);
      }
    });
  }

  static renderCompany({ logo, name, slug, users }) {
    if (users.length == 0) {
      return "";
    }
    return `
          <div class="company">
            <img
              src="${logo}"
              alt="${slug}-logo"
            />
            <div class="company__info" >
              <ul id="${slug}">
                <li>${name}</li>
                <li>${users.length} grads working here as:</li>
                  ${helper(users)}
              </ul>
              
              
            </div>
          </div>
  `;
    function helper(users){
      let myArray = users.map(u => u.course)
      return [...new Set(myArray)].map(course => `<li>${course}</li>`).join('')
      
    }

  }

  static renderGrad({ name, avatar, campus, cohort, course, id }) {
    return `
        <div class="gradcard" id='${id}'>
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
      output = ApiAdapter.allGrads.filter(
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
    Map.init(result);
    this.renderSearch(result);
    filter.value = "all";
    query.value = "";
  }

  static grabValuesForm(nodes) {
    let postObj = {};
    for (let i = 0; i < nodes.length - 1; i++) {
      const element = nodes[i];
      postObj[element.children[0].name] = element.children[0].value;
    }
    return postObj;
  }
  static renderError(grad) {
    document
      .querySelector(".form-container")
      .insertAdjacentHTML("afterbegin", HTMLBuilder.errors(grad.message));
    setTimeout(this.deleteErrors, 5000);
  }

  static deleteErrors() {
    let errors = document.querySelector(".errors");
    errors.style.opacity = 0;
    setTimeout(() => errors.remove(), 1000);
  }

  static searchCompany(event) {
    let value = event.target.previousElementSibling.value;
    let company = ApiAdapter.Allcompanies.find((e) => e.name == value);
    this.displayCompanies.innerHTML = "";
    if (company) {
      this.displayCompanies.innerHTML += this.renderCompany(company);
    } else {
      this.displayCompanies.innerHTML += this.HTMLify(
        ApiAdapter.Allcompanies,
        this.renderCompany
      );
    }
  }
}

export default DOM;
