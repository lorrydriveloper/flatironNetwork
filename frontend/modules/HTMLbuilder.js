import ApiAdapter from "../modules/api.js";

class HTMLBuilder {
  static errors(messages) {
   let toDisplay =  messages ? messages : 'Oops, An error has ocurred please try again'
    return `
    <div class="errors">
      <p>${toDisplay}</p>
    </div>
        
    `;
  }

  static datalist(collection) {
    return `
      <datalist id="companies">
         ${collection
           .map((c) => `<option value="${c.slug}">${c.name}</option>`)
           .join("")}
      </datalist>
    `;
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
      "remote_work",
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
        } else if (attr == "remote_work") {
          return `
            <div class="float-label">
              <input type="radio" id="Remote" name='remote_work' value="true">
              <label for="Remote">Working Remotely</label><br>
              <input type="radio" id="Office" name='remote_work' value="false" checked>
              <label for="Office">Office Base</label><br>
            </div>
            `;
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
    html +=
      '</form><input type="submit" value="submit" class="button__add button__submit">';
    return html;
  }

  static optionsBuilder(collection, attr) {
    return `     
    <div class="float-label">     
    <select name="${attr}" id="${attr} required">
      <option>select you ${attr}</option>
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
}


export default HTMLBuilder


// <datalist id="ice-cream-flavors">
//     <option value="Chocolate">
//     <option value="Coconut">
//     <option value="Mint">
//     <option value="Strawberry">
//     <option value="Vanilla">
// </datalist>