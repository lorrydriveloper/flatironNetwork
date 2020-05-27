import ApiAdapter from "./api.js";
import Map from "./map.js";
import HTMLBuilder from "./HTMLbuilder.js";

class DOM {
  static grads = document.querySelector("#grads");
  static companies = document.querySelector("#companies");
  static displayCompanies = companies.querySelector(".grid-container");
  static info = document.querySelector("#info");
  static displayInfo = info.querySelector(".display-info");
  static displayGrads = grads.querySelector(".grid-container");
  static searchGradButton = document.querySelector("#searchGrad");
  static query = document.querySelector("#query");

  static renderNewGradForm() {
    this.grads.children[0].innerHTML += '<p class="close">close X</p>';
    this.grads.children[0].innerHTML += HTMLBuilder.gradsFormBuilder();
    this.toggleForm(this.grads);
  }
  static renderCompaniesForm() {
    this.companies.children[0].innerHTML += '<p class="close">close X</p>';
    this.companies.children[0].innerHTML += HTMLBuilder.companiesFormBuilder();
    this.toggleForm(this.companies);
  }

  static toggleForm(formContainer) {
    formContainer.children[0].classList.toggle("reveal");
    if (!formContainer.children[0].classList.contains("reveal")) {
      formContainer.children[0].innerHTML = "";
    }
  }

  static addListeners() {
    query.addEventListener("keydown", function enterEvent(event) {
      if (event.keyCode == 13) {
        DOM.makeSearch(grads);
      }
    });

    grads.addEventListener("click", function gradsEvents(event) {
      if (event.target.id == "searchGrad") {
        DOM.makeSearch(this);
      } else if (event.target.id == "new-grad") {
        DOM.renderNewGradForm();
      } else if (event.target.className == "close") {
        DOM.toggleForm(this);
      } else if (event.target.value == "submit") {
        event.preventDefault();
        let newGradObj = DOM.grabValuesForm(
          event.target.previousSibling.children
        );
        ApiAdapter.postNewGrad(newGradObj);
      }
    });

    companies.addEventListener("click", function companiesEvents(event) {
      if (event.target.className == "button__search") {
        DOM.searchCompany(event);
      } else if (event.target.tagName == "LI") {
        let id = event.target.parentElement.id;
        ApiAdapter.fetchCompany(id);
      } else if (event.target.className == "button__add") {
        DOM.renderCompaniesForm();
      } else if (event.target.className == "close") {
        DOM.toggleForm(this);
      } else if (event.target.value == "submit") {
        event.preventDefault();
        let companyObj = DOM.grabValuesForm(
          event.target.parentElement.children
        );
        console.log(companyObj);
      }
    });
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
    this.displayGrads.innerHTML = array.map(HTMLBuilder.gradCard).join("");
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
