import DOM from "../modules/render.js";

class ApiAdapter {
  static URL = "http://localhost:3000/api/v1/";

  static getRequest(url) {
    let configurationObject = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    return fetch(this.URL + url, configurationObject)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => console.log(error.message));
  }

  static async fetchGrads() {
    let grads = await this.getRequest("users");
    DOM.displayGrads.innerHTML += grads.map(DOM.renderGrad).join("");
  }

  static async fetchCompanies() {
    let companies = await this.getRequest("companies");
    DOM.displayCompanies.innerHTML += companies.map(DOM.renderCompany).join("");
  }
}

export default ApiAdapter;
