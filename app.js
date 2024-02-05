const tableContainerEl = document.querySelector(".table-container");
const buttonsContainerEl = document.querySelector(".buttons-container");

const peopleImgEl = document.querySelector(".people-image");
const shipsImgEl = document.querySelector(".ships-image");
const errorEl = document.querySelector(".error");

const PEOPLE_URL = "https://swapi.dev/api/people/?page=1";
const SHIPS_URL = "https://swapi.dev/api/starships/?page=1";

const displayError = error => {
  errorEl.innerText = error;
  tableContainerEl.innerHTML = "";
  buttonsContainerEl.innerHTML = "";
};

const toggleError = isShown => {
  if (isShown) {
    errorEl.classList.remove("hide");
  } else {
    errorEl.classList.add("hide");
  }
};

const renderNextPrevBtns = (element, data, callback) => {
  element.innerHTML = "";

  if (data.previous) {
    const previousBtn = document.createElement("BUTTON");
    previousBtn.innerText = "Previous";
    element.appendChild(previousBtn);
    previousBtn.addEventListener("click", () => {
      callback(data.previous);
    });
  }

  if (data.next) {
    const nextBtn = document.createElement("BUTTON");
    nextBtn.innerHTML = "Next";
    element.appendChild(nextBtn);
    nextBtn.addEventListener("click", () => {
      callback(data.next);
    });
  }
};

// People

const fetchPeople = async url => {

  try {
    const res = await fetch(url);
    const peopleData = await res.json();
    console.log(peopleData);

    renderPeoplePage(tableContainerEl, peopleData);
    renderNextPrevBtns(buttonsContainerEl, peopleData, fetchPeople);
    toggleError(false);
  } catch (error) {
    displayError(error);
    toggleError(true);
  }
};

const generatePeopleTableHTML = peopleList => {
  const tableBodyHTML = peopleList.reduce((acc, people) => {
    const tableRowHTML = `
       <tr>
         <td>${people.name}</td>
         <td>${people.height}</td>
         <td>${people.mass}</td>
         <td>${people.gender}</td>
         <td>${people.birth_year}</td>
         <td>${people.films.length}</td>
       </tr>
       `;

    return acc + tableRowHTML;
  }, "");

  const tableHTML = `
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Films</th>
          </tr>
        </thead>
        <tbody>
        ${tableBodyHTML}
        </tbody>
    </table
  `;

  return tableHTML;
};

const renderPeoplePage = (element, peopleData) => {
  element.innerHTML = generatePeopleTableHTML(peopleData.results);
};

peopleImgEl.addEventListener("click", () => {
  console.log("people image clicked");
  fetchPeople(PEOPLE_URL);
});

// Ships

const fetchShips = async url => {

  try {
    const res = await fetch(url);
    const shipsData = await res.json();
    console.log(shipsData);

    renderShipsPage(tableContainerEl, shipsData);
    renderNextPrevBtns(buttonsContainerEl, shipsData, fetchShips);
    toggleError(false);
  } catch (error) {
    displayError(error);
    toggleError(true);
  }
};

const generateShipsTableHTML = shipsList => {
  const tableBodyHTML = shipsList.reduce((acc, ships) => {
    const tableRowHTML = `
       <tr>
         <td>${ships.name}</td>
         <td>${ships.model}</td>
         <td>${ships.manufacturer}</td>
         <td>${ships.cost_in_credits}</td>
         <td>${ships.passengers}</td>
         <td>${ships.starship_class}</td>
       </tr>
       `;

    return acc + tableRowHTML;
  }, "");

  const tableHTML = `
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost In Credits</th>
            <th>Passengers</th>
            <th>Starship Class</th>
          </tr>
        </thead>
        <tbody>
        ${tableBodyHTML}
        </tbody>
    </table
  `;

  return tableHTML;
};

const renderShipsPage = (element, shipsData) => {
  element.innerHTML = generateShipsTableHTML(shipsData.results);
};

shipsImgEl.addEventListener("click", () => {
  console.log("ships image clicked");
  fetchShips(SHIPS_URL);
});