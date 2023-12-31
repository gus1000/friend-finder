import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
console.clear();
const ul = document.querySelector("ul");
const input = document.querySelector("#names");
const minimumAgeSelect = document.querySelector("#minimum-age");
const maximumAgeSelect = document.querySelector("#maximum-age");
const people = [];

for (let i = 0; i < 200; i++) {
  people.push({
    name: faker.person.firstName(),
    age: Math.round(Math.random() * 23) + 10,
    favoriteColor: faker.color.human()
  });
}

function renderPeople(people) {
  people.forEach((person) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h4>${person.name}</h4>
    <div>
      <div>Age: <span>${person.age}</span></div>
      <div>
        Favorite color: <span>${person.favoriteColor}</span>
      </div>
    </div>
  `;
    ul.appendChild(li);
  });
}

renderPeople(people);

let minimumAge;
let maximumAge;

let selectedMinimumAge;
let selectedMaximumAge;
let searchValue = "";

createAgeRanges(people);

function renderAges(ageRange, select) {
  select.innerHTML = "";
  ageRange.forEach(function (age) {
    const option = document.createElement("option");
    option.innerText = age;
    option.value = age;
    select.appendChild(option);
  });
}

function createAgeRanges(people) {
  const ages = people.map((person) => person.age);
  minimumAge = Math.min(...ages);
  maximumAge = Math.max(...ages);
  selectedMinimumAge = minimumAge;
  selectedMaximumAge = maximumAge;
  const ageRange = [];

  for (let i = minimumAge; i <= maximumAge; i++) {
    ageRange.push(i);
  }

  renderAges(ageRange, minimumAgeSelect);
  renderAges(ageRange.reverse(), maximumAgeSelect);
}

function filterByName() {
  return people.filter(function (person) {
    return person.name.toLowerCase().includes(searchValue);
  });
}

function filterPeople() {
  const filteredPeople = filterByName()
    .filter(function (person) {
      return person.age >= selectedMinimumAge;
    })
    .filter(function (person) {
      return person.age <= selectedMaximumAge;
    });

  return filteredPeople;
}


input.addEventListener("input", function (e) {
  const { value } = e.target;
  console.log(value);
  searchValue = value.toLowerCase();
  const filteredPeople = filterPeople();
  console.log(selectedMinimumAge, selectedMaximumAge);
  createAgeRanges(filterByName());
  ul.innerHTML = "";
  renderPeople(filteredPeople);
});


minimumAgeSelect.addEventListener("change", function (e) {
  const { value } = e.target;
  const age = parseInt(value);
  selectedMinimumAge = age;
  const filteredPeople = filterPeople();
  ul.innerHTML = "";

  renderPeople(filteredPeople);
});

maximumAgeSelect.addEventListener("change", function (e) {
  const { value } = e.target;
  const age = parseInt(value);
  selectedMaximumAge = age;

  const filteredPeople = filterPeople();
  ul.innerHTML = "";
  renderPeople(filteredPeople);
});
