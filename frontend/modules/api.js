import DOM from "../modules/dom.js";
import Map from "../modules/map.js";
import HTMLBuilder from "./HTMLbuilder.js";

class ApiAdapter {
  static URL = "http://localhost:3000/api/v1/";
  static allGrads = [];
  static allCompanies = [];

  static async getRequest(url) {
    let configurationObject = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const response = await fetch(this.URL + url, configurationObject);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  static async postRequest(url, object) {
    let configurationObject = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(object),
    };
    try {
      const response = await fetch(this.URL + url, configurationObject);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async postNewGrad(object) {
    let grad = await this.postRequest("users", { user: object });
    if (grad.error) {
      DOM.renderError(grad, DOM.grads);
    } else {
      DOM.displayGrads.insertAdjacentHTML(
        "afterbegin",
        HTMLBuilder.gradCard(grad)
      );
      DOM.toggleForm(DOM.grads);
      Map.createMarker(grad);
    }
  }
  static async postNewCompany(object) {
    let company = await this.postRequest("companies", { company: object });
    if (company.error) {
      DOM.renderError(company, DOM.companies);
    } else {
      this.Allcompanies.push(company);
      DOM.displayCompanies.insertAdjacentHTML(
        "afterbegin",
        HTMLBuilder.companyDiv(company)
      );
      DOM.toggleForm(DOM.companies);
    }
  }

  static async fetchGrads() {
    let grads = await this.getRequest("users");
    this.allGrads = grads;
    Map.init(grads);
    DOM.displayGrads.innerHTML += HTMLBuilder.HTMLify(
      grads,
      HTMLBuilder.gradCard
    );
  }

  static async fetchCompanies() {
    let companies = (this.Allcompanies = await this.getRequest("companies"));
    DOM.displayCompanies.innerHTML += HTMLBuilder.HTMLify(
      companies,
      HTMLBuilder.companyDiv
    );
    // adding datalist companies to toolkit
    DOM.displayCompanies.previousElementSibling.innerHTML += HTMLBuilder.datalist(
      companies
    );
  }
  static async fetchCompany(id) {
    let company = await this.getRequest(`companies/${id}`);
    company.users.forEach(
      (u) =>
        (u.company = { name: company.name, logo: company.logo, slug: company.slug })
    );
    Map.init(company.users);
    DOM.displayInfo.innerHTML = "";
    DOM.displayInfo.innerHTML += HTMLBuilder.HTMLify(
      company.users,
      HTMLBuilder.gradCard
    );
  }
}

export default ApiAdapter;
