import ApiAdapter from "../modules/api.js";
import Map from "../modules/map.js";

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
    grads.children[0].innerHTML += this.formBuilder();

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
      if (event.target.id == "new-grad") {
        DOM.renderNewGradForm();
      }
      if (event.target.className == "close") {
        DOM.toggleForm();
      }
      if (event.target.value == "submit") {
        event.preventDefault();
        let newGradObj = DOM.grabValuesForm(event.target.parentElement.children);
        console.log(newGradObj)
      }
    });

    companies.addEventListener("click", function companiesEvents(event) {
      let id = event.target.parentElement.id || event.target.id;
      if (id) {
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

  static formBuilder() {
    let html = '<form action="">';
    let course = [
      "Software Engineering",
      "Data Science",
      "Cybersecurity",
      "UX/UI Design",
    ];
    let campus = [
      "Austin",
      "Chicago",
      "Denver",
      "Houston",
      "New York",
      "San Francisco",
      "Seattle",
      "Washington, D.C.",
      "London",
      "Online",
    ];

    let attributes = [
      "name",
      "email",
      "avatar",
      "cohort",
      "course",
      "campus",
      "company",
      "street",
      "city",
      "postcode",
      "state",
      "country",
    ];
    html += attributes
      .map((attr) => {
        if (attr == "course") {
          return this.optionsBuilder(course, attr);
        } else if (attr == "company") {
          return this.optionsBuilder(ApiAdapter.companies, attr);
        } else if (attr == "cohort") {
          return `
            <div class="float-label">
              <input type="month" id="cohort" name="cohort"
                min="2012-01">
               <label for="cohort">Select you Cohort:</label>
            </div>
            `;
        } else if (attr == "campus") {
          return this.optionsBuilder(campus, attr);
        } else {
          return `   
       <div class="float-label">
          <input type="text" name="${attr}" required />
            <label for="${attr}">${attr}</label>
        </div>
            `;
        }
      })
      .join("");
    html += '<input type="submit" value="submit" class="button__add"></form>';
    return html;
  }
  static optionsBuilder(collection, attr) {
    return `     
    <div class="float-label">     
    <select name="${attr}" id="${attr}">
      ${collection
        .map((c) => {
          let option = "";
          if (typeof c == "object") {
            option = `<option value="${c.slug}">${c.name}</option>`;
          } else {
            option = `<option value="${c}">${c}</option>`;
          }
          return option;
        })
        .join("")}
    </select>
    </div>`;
  }

  static grabValuesForm(nodes) {
    let postObj = {};
    for (let i = 0; i < nodes.length - 1; i++) {
      const element = nodes[i];
      postObj[element.children[0].name] = element.children[0].value;
    }
    return postObj
  }
}

export default DOM;
