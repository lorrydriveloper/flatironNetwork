import DOM from "../modules/render.js";

class ApiAdapter {

  static URL = "http://localhost:3000/api/v1/";

  static getRequest(url) {
 
    let configurationObject = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    };
     return fetch(this.URL + url, configurationObject)
      .then((response) => response.json())
      .then((json) => json)
      .catch((error) => console.log(error.message));
  }

  static async fetchGrads() {
    let grads = await this.getRequest('users')
    console.log(grads)
  }

  static async fetchCompany(companySlug) {
    // let configurationObject = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   // body: JSON.stringify({ trainer_id: trainerId }),
    // };
    // fetch(URL + "companies/" + companySlug, configurationObject)
    //   .then((response) => response.json())
    //   .then((json) => {
    //     initMap(json.users);
    //     displayInfo.innerHTML = "";
    //     displayInfo.innerHTML += json.users.map(renderGrad).join("");
    //   })
    //   .catch((error) => console.log(error.message));
  }
}

export default ApiAdapter;
