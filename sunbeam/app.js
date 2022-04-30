
//fetching API and storing it
let carsApi = [];
//fetch("https://ispasdani.github.io/carsAPI/data.json")
fetch("https://anastasia115.github.io/apijson/info.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    carsApi = data.carlist;
    console.log(carsApi)
  });
  ///////////////////////////////////////////////////////////////
////////////////////////content logic//////////////////////////
///////////////////////////////////////////////////////////////
const dateStart = document.querySelector("#date-start");
const dateEnd = document.querySelector("#date-end");
const form = document.querySelector("#form");
const carSection = document.querySelector(".cars");
const numPersons = document.querySelector("#num-of-persons");
const carOutput = document.querySelector(".car-output");



// always get the current date
dateStart.valueAsDate = new Date();

//this function checks if our date is valid
function validDates(dateStart, dateEnd) {
  const arrival = new Date(dateStart.value);
  const done = new Date(dateEnd.value);
  if (arrival > done) {
    return false;
  } else {
    return true;
  }
}

//this function will calculate the rental days
function calcRentalDays(dateStart, dateEnd) {
  const arrival = new Date(dateStart);
  const end = new Date(dateEnd);
  const timeDiff = end.getTime() - arrival.getTime();
  const diffInDays = timeDiff / (1000 * 3600 * 24) + 1;
  return diffInDays;
}

//this function will calculate the price for your selected period
function calcRentalCost(days, priceperday) {
  const totalprice = priceperday * days;
  return totalprice;
}

//event listener applied to form
form.addEventListener("submit", function (e) {
  e.preventDefault(); //this will prevent from reloading the page

  if (validDates(dateStart, dateEnd)) {
    carSection.innerHTML = "";
    for (const car of carsApi) {
      const cost = calcRentalCost(
        calcRentalDays(dateStart.value, dateEnd.value),
        car.price
      );
      if (numPersons.value <= 5) {
        if (car.category === "Standard") {
          const clon = carOutput.content.cloneNode(true);
          const carImage = clon.querySelector("#car-logo");
          const carName = clon.querySelector("#car-name");
          const carPrice = clon.querySelector("#car-price");
          const carCategory = clon.querySelector("#car-category");
          const carPersons = clon.querySelector("#car-persons");
          const carSuitcases = clon.querySelector("#car-suitcases");
          const carBookBtn = clon.querySelector("#car-book-btn");

          carImage.src = car.image;
          carName.textContent = car.name;
          carPrice.textContent = `${cost} kr`;
          carCategory.textContent = `Category: ${car.type}`;
          carPersons.textContent = `Persons: ${car.persons}`;
          carSuitcases.textContent = `Suitcases: ${car.suitcases}`;

          carSection.appendChild(clon);

          carBookBtn.addEventListener("click", function () {
            sessionStorage.setItem("carName", carName.textContent);
            sessionStorage.setItem("dateStart", dateStart.value);
            sessionStorage.setItem("dateEnd", dateEnd.value);
            sessionStorage.setItem(
              "rentalDays",
              calcRentalDays(dateStart.value, dateEnd.value)
            );
            sessionStorage.setItem("rentalCost", carPrice.textContent);
          });
        }
      }
      if (numPersons.value >= 6) {
        if (car.category === "Van" || car.category === "Limousine") {
          const clon = carOutput.content.cloneNode(true);
          const carImage = clon.querySelector("#car-logo");
          const carName = clon.querySelector("#car-name");
          const carPrice = clon.querySelector("#car-price");
          const carCategory = clon.querySelector("#car-category");
          const carPersons = clon.querySelector("#car-persons");
          const carSuitcases = clon.querySelector("#car-suitcases");
          const carBookBtn = clon.querySelector("#car-book-btn");

          carImage.src = car.image;
          carName.textContent = car.name;
          carPrice.textContent = `${cost} kr`;
          carCategory.textContent = `Category: ${car.type}`;
          carPersons.textContent = `Persons: ${car.persons}`;
          carSuitcases.textContent = `Suitcases: ${car.suitcases}`;

          carSection.appendChild(clon);

          carBookBtn.addEventListener("click", function () {
            sessionStorage.setItem("carName", carName.textContent);
            sessionStorage.setItem("dateStart", dateStart.value);
            sessionStorage.setItem("dateEnd", dateEnd.value);
            sessionStorage.setItem(
              "rentalDays",
              calcRentalDays(dateStart.value, dateEnd.value)
            );
            sessionStorage.setItem("rentalCost", carPrice.textContent);
          });
          ///////////////////////////////////////////////////////////////
          //I know that I repeat a lot of code but in this way I avoided a
          //few bugs that you can encounter when you press press "go back button in browser multiple times"
          ///////////////////////////////////////////////////////////////
        }
      }
    }
  }
});

//this will trigger the popup info bar for the 3d model
const infoBtn = document.getElementById("info-btn");
const modal = document.getElementById("modal-content");

infoBtn.addEventListener("click", function () {});

function removeActive(modal) {
  if (modal.classList.contains("active")) {
    modal.classList.remove("active");
  }
}

function addActive(modal) {
  if (!modal.classList.contains("active")) {
    modal.classList.add("active");
  }
}
