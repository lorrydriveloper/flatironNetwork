import DOM from "./modules/dom.js";
import ApiAdapter from "./modules/api.js";


document.addEventListener("DOMContentLoaded", function () {
  ApiAdapter.fetchCompanies();
  ApiAdapter.fetchGrads();
  DOM.addListeners();
});
