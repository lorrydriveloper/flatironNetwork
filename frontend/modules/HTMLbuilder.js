import ApiAdapter from "../modules/api.js";

class HTMLBuilder {
  static HTMLify(array, method) {
    return array.map(method).join("");
  }
  static gradCard({ name, avatar, campus, cohort, course, id }) {
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

  static companyDiv({ logo, name, slug, users }) {
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
                <li><span>${users.length} grads</span> working here as:</li>
                  ${helper(users)}
              </ul>
              
              
            </div>
          </div>
  `;
    function helper(users) {
      let myArray = users.map((u) => u.course);
      return [...new Set(myArray)]
        .map((course) => `<li>${course}</li>`)
        .join("");
    }
  }

  static errors(messages) {
    let toDisplay = messages
      ? messages
      : "Oops, An error has ocurred please try again";
    return `
    <div class="errors">
      <p>${toDisplay}</p>
    </div>
        
    `;
  }

  static datalist(collection) {
    return `
      <datalist id="companies__list">
         ${collection
           .map((c) => `<option value="${c.name}"></option>`)
           .join("")}
      </datalist>
    `;
  }

  static gradsFormBuilder() {
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
          return this.optionsBuilder(ApiAdapter.Allcompanies, attr);
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
  static companiesFormBuilder(){
    return `
    <form>
      <div class="float-label">
        <input type="text" id="name" name="name" >
        <label for="name">What your Company name</label>
      </div>
      <div class="float-label">
        <input type="text" id="logo" name="logo" >
        <label for="logo">Paste your company logo Url</label>
      </div>
      <input type="submit" value="submit" class="button__add button__submit">
    </form>
    `;
  }
}

export default HTMLBuilder;
