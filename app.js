console.log("Script is working!");

const personEl = document.querySelector(".person");
const logoEl = document.querySelector(".logo");
const shipEl = document.querySelector(".ship");

const People_URL = "https://swapi.dev/api/people/?page=1";

function fetchPeople() {
  fetch(People_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function renderPeopleTable(containerEl, peopleInfo) {
  let peopleInfoHTML = `
  <tr>
    <td>${people.name}</td>
    <td>${people.height}</td>
    <td>${people.mass}</td>
    <td>${people.gender}</td>
    <td>${people.birth_year}</td>
    <td>${people.films.length}</td>
  </tr>
  `;
}

fetchPeople();

const Ships_URL = "https://swapi.dev/api/starships/?page=1";

function fetchShips() {
  fetch(Ships_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

fetchShips();