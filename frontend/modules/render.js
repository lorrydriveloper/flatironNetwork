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
        makeSearch(this);
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
        fetchCompany(id);
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
    <div class='card'>
      <h1>${name}</h1>
    </div>
  `;
  }
}

export default DOM;
