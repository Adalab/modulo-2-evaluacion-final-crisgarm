"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const listContainer = document.querySelector(".js-list");
let results = "";
let listFav = [];

function getInfoFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      listContainer.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        results = data[i].show;
        console.log(data[i].show);
        paintSearch();
        listenItem();
      }
    });
}

function paintSearch() {
  let html = "";
  html += `<li class="js-item list__item" id=${results.id}>`;
  html += `<p>${results.name}</p>`;
  if (results.image === null) {
    html += `<img src="https://via.placeholder.com/210x295/ffffff/666666"/>`;
  } else {
    html += `<img src="${results.image.medium}">`;
  }
  html += `</li>`;
  listContainer.innerHTML += html;
}

function addFav(itemClicked) {
  const liElement = document.getElementById(itemClicked);
  liElement.classList.remove("list__item");
  liElement.classList.add("list__item--favourite");
}

function removeFav(itemClicked) {
  const liElement = document.getElementById(itemClicked);
  liElement.classList.remove("list__item--favourite");
  liElement.classList.add("list__item");
}

function favouriteSeries(event) {
  const itemClicked = parseInt(event.currentTarget.id);
  const indexFav = listFav.indexOf(itemClicked);
  const isFavourite = indexFav === -1;
  if (isFavourite === true) {
    addFav(itemClicked);
    listFav.push(itemClicked);
  } else {
    removeFav(itemClicked);
    listFav.splice(indexFav, 1);
  }
  console.log(listFav);
}

function listenItem() {
  console.log("Entro en listenItm");
  const listItems = document.querySelectorAll(".js-item");
  for (const listItem of listItems) {
    listItem.addEventListener("click", favouriteSeries);
  }
}

button.addEventListener("click", getInfoFromApi);
