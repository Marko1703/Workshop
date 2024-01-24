console.log("Script is working!");

const personEl = document.querySelector(".person");
const logoEl = document.querySelector(".logo");
const shipEl = document.querySelector(".ship");
const personImgEl = document.querySelector(".personImg");
const shipImgEl = document.querySelector(".shipImg");

const People_URL = "https://swapi.dev/api/people/?page=1";

function fetchPeople() {
  fetch(People_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      renderPeopleTable(personEl, data)
    });
}

personImgEl.addEventListener("click", function() {
  fetchPeople(People_URL)
})

function renderPeopleTable(containerEl, peopleInfo) {
  let tableHTML = ""

  for (let people of peopleInfo.results) {
    tableHTML += `
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

  containerEl.innerHTML +=
`<table class = "mainTable">
    <thead>
     <tr>
         <th>Name</th>
         <th>Height</th>
         <th>Mass</th>
         <th>Gender</th>
         <th>Birth Year</th>
         <th>Appearances</th>
     </tr>
    </thead>
    <tbody>${tableHTML}</tbody>
 </table>
 <button class="characterNextPage">Next Page</button>
 <button class="characterPrevPage">Previous Page</button>`;

 const characterNextBtn = document.querySelector(".characterNextPage");
 const characterPrevBtn = document.querySelector(".characterPrevPage");

 if (!peopleInfo.next) {
  characterNextBtn.disabled = true
 }

 if (!peopleInfo.previous) {
  characterPrevBtn.disabled = true
 }

 characterNextBtn.addEventListener("click", function (){
  fetchPeople(peopleInfo.next)
})

characterPrevBtn.addEventListener("click", function (){
fetchPeople(peopleInfo.previous)
})

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

      renderShipsTable(shipEl, data)
    });
}

shipImgEl.addEventListener("click", function() {
  fetchShips(Ships_URL)
})

function renderShipsTable(containerEl, shipsInfo) {
  let tableHTML = ""

  for (let ship of shipsInfo.results) {
    tableHTML += `
    <tr>
      <td>${ship.name}</td>
      <td>${ship.model}</td>
      <td>${ship.manufacturer}</td>
      <td>${ship.cost}</td>
      <td>${ship.people_capacity}</td>
      <td>${ship.class}</td>
    </tr>
        `;
  }

  containerEl.innerHTML +=
`<table class = "mainTable">
    <thead>
     <tr>
         <th>Name</th>
         <th>Model</th>
         <th>Manufacturer</th>
         <th>Cost</th>
         <th>People Capacity</th>
         <th>Class</th>
     </tr>
    </thead>
    <tbody>${tableHTML}</tbody>
 </table>
 <button class="shipsNextPage">Next Page</button>
 <button class="shipsPrevPage">Previous Page</button>`;

 const shipsNextBtn = document.querySelector(".shipsNextPage");
 const shipsPrevBtn = document.querySelector(".shipsPrevPage");

 if (!shipsInfo.next) {
  shipsNextBtn.disabled = true
 }

 if (!shipsInfo.previous) {
  shipsPrevBtn.disabled = true
 }

 shipsNextBtn.addEventListener("click", function (){
  fetchShips(shipsInfo.next)
})

shipsPrevBtn.addEventListener("click", function (){
fetchShips(shipsInfo.previous)
})

}

fetchShips();