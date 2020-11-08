"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const listContainer = document.querySelector(".js-list");
const listFavourites = document.querySelector(".js-list-favourites");
const paragraph = document.querySelector(".js-paragraph");
let dataResults = [];
let listFav = [];
let localFav = {};

function search() {
  if (input.value === "") {
    paragraph.innerHTML = "You must enter a TV show name";
  } else {
    paragraph.innerHTML = "";
    getInfoFromApi();
  }
}

function getInfoFromApi() {
  fetch("//api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      dataResults = data;
      paintSearch();
      listenItem();
    });
}

function paintSearch() {
  listContainer.innerHTML = "";
  for (let i = 0; i < dataResults.length; i++) {
    const liElement = document.createElement("li");
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    const pContent = document.createTextNode(`${dataResults[i].show.name}`);
    listContainer.appendChild(liElement);
    liElement.classList.add("js-item");
    liElement.classList.add("list__item");
    liElement.setAttribute("id", `${dataResults[i].show.id}`);
    if (dataResults[i].show.image === null) {
      imgElement.setAttribute(
        "src",
        "//via.placeholder.com/210x295/ffffff/666666"
      );
    } else {
      const image = dataResults[i].show.image.medium.replace("http:", "");
      imgElement.setAttribute("src", image);
    }
    liElement.appendChild(imgElement);
    imgElement.classList.add("list__item--image");
    liElement.appendChild(pElement);
    pElement.appendChild(pContent);
    pElement.classList.add("list__item--title");
    //   const daysElement = document.createElement("p");
    //   let daysContent;
    //   if (dataResults[i].show.schedule.days.length === 0) {
    //     daysContent = document.createTextNode(
    //       "No hay días definidos para esta serie"
    //     );
    //   } else {
    //     daysContent = document.createTextNode(
    //       `${dataResults[i].show.schedule.days}`
    //     );
    //   }
    //   liElement.appendChild(daysElement);
    //   daysElement.appendChild(daysContent);
    // }
  }
}

function paintFavourites() {
  listFavourites.innerHTML = "";
  for (let f = 0; f < listFav.length; f++) {
    const liElement = document.createElement("li");
    const imgElement = document.createElement("img");
    const pElement = document.createElement("p");
    const pContent = document.createTextNode(`${listFav[f].name}`);
    listFavourites.appendChild(liElement);
    liElement.classList.add("list__item--favourite");
    liElement.setAttribute("id", `${listFav[f].id}`);
    if (listFav[f].image === null) {
      imgElement.setAttribute(
        "src",
        "//via.placeholder.com/210x295/ffffff/666666"
      );
    } else {
      const image = listFav[f].image.medium.replace("http:", "");
      imgElement.setAttribute("src", image);
    }
    liElement.appendChild(imgElement);
    imgElement.classList.add("list__item--favourite-image");
    liElement.appendChild(pElement);
    pElement.appendChild(pContent);
    pElement.classList.add("list__item--favourite-title");
  }
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
  for (let i = 0; i < dataResults.length; i++) {
    if (event.currentTarget.id == dataResults[i].show.id) {
      localFav = {
        id: dataResults[i].show.id,
        name: dataResults[i].show.name,
        image: dataResults[i].show.image,
      };
    }
  }
  const itemClicked = parseInt(event.currentTarget.id);
  const check = (fav) => fav.id == event.currentTarget.id;
  const indexFav = listFav.findIndex(check);
  const isFavourite = indexFav === -1;
  if (isFavourite === true) {
    listFav.push(localFav);
    addFav(itemClicked);
    paintFavourites();
    listenFav();
  } else {
    listFav.splice(indexFav, 1);
    paintFavourites();
    listenFav();
    removeFav(itemClicked);
  }
  setInLocalStorage();
}

function showContent(event) {
  for (let i = 0; i < listFav.length; i++) {
    if (event.currentTarget.id == listFav[i].id) {
      console.log(listFav[i].name);
    }
  }
}

function listenFav() {
  const listFavs = document.querySelectorAll(".list__item--favourite");
  for (const listFav of listFavs) {
    listFav.addEventListener("click", showContent);
  }
}

function listenItem() {
  const listItems = document.querySelectorAll(".js-item");
  for (const listItem of listItems) {
    listItem.addEventListener("click", favouriteSeries);
  }
}

function setInLocalStorage() {
  localStorage.setItem("favourites", JSON.stringify(listFav));
}

function getFromLocalStorage() {
  const stringFav = localStorage.getItem("favourites");
  const savedFav = JSON.parse(stringFav);
  if (savedFav === null) {
    getInfoFromApi();
  } else {
    listFav = savedFav;
    paintFavourites();
    listenFav();
  }
}

button.addEventListener("click", search);
getFromLocalStorage();
