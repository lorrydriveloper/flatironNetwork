const companies = document.querySelector('#companies .grid-container')

document.addEventListener('DOMContentLoaded', function () {
  fetchCompanies()
  
})

function fetchCompanies() {
  let configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // body: JSON.stringify({ trainer_id: trainerId }),
  };

  fetch("http://localhost:3000/api/v1/companies", configurationObject)
    .then((response) => response.json())
    .then((json) => {
        companies.innerHTML += json.map(renderCompany).join('')
    })
    .catch((error) => console.log(error.message));
}

function renderCompany({logo, name, slug, users}) {
  if(users.length == 0){
    return ''
  }
  return `
          <div class="company">
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