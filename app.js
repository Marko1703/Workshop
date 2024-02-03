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
    // This removes a css class from an element
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
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost (credits)</th>
            <th>People Capacity (passengers)</th>
            <th>Class</th>
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