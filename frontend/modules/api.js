import DOM from "../modules/render.js";
import Map from "../modules/map.js";

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
      return error
    }
  }

  static async postRequest(url,object) {
    let configurationObject = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(object)
    };
    try {
      const response = await fetch(this.URL + url, configurationObject);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
      return error  
    }
  }

  static async postNewGrad(object){
    let grad = await this.postRequest("users", { user: object });
    if (grad.status == 'error') {
       DOM.renderError(grad)
    } else {
      DOM.displayGrads.insertAdjacentHTML(
       "afterbegin",
       DOM.renderGrad(grad)
     );
     DOM.toggleForm()
     Map.createMarker(grad)
    }
  }

  static async fetchGrads() {
    let grads = await this.getRequest("users");
    this.allGrads = grads;
    Map.init(grads);
    DOM.displayGrads.innerHTML += DOM.HTMLify(grads, DOM.renderGrad);
  }

  static async fetchCompanies() {
    let companies = await this.getRequest("companies");
    this.companies = companies;
    DOM.displayCompanies.innerHTML += DOM.HTMLify(companies, DOM.renderCompany);
  }
  static async fetchCompany(id) {
    let company = await this.getRequest(`companies/${id}`);
    Map.init(company.users);
    DOM.displayInfo.innerHTML = "";
    DOM.displayInfo.innerHTML += DOM.HTMLify(company.users, DOM.renderGrad);
  }
}

export default ApiAdapter;
