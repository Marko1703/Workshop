console.log("Script is working!");

const personEl = document.querySelector(".person");
const logoEl = document.querySelector(".logo");
const shipEl = document.querySelector(".ship");
const personImgEl = document.querySelector(".personImg");

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
 <button class="characterNextPage">Previous Page</button>
 <button class="characterPrevPage">Next Page</button>`;

 const characterNextBtn = document.querySelector(".characterNextPage");
 const characterPrevBtn = document.querySelector(".characterPrevPage");

 if (!peopleInfo.next) {
  characterNextBtn.disabled = true
 }

 if (!peopleInfo.next) {
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
    });
}

fetchShips();