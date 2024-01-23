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

const personImg = document.querySelector(".personImg");
