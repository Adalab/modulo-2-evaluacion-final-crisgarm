"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const listContainer = document.querySelector(".js-list");
const listFavourites = document.querySelector(".js-list-favourites");
let dataResults = [];
let listFav = [];

function getInfoFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      dataResults = data;
      listContainer.innerHTML = "";
      listFavourites.innerHTML = "";
      paintSearch();
      listenItem();
    });
}

function paintSearch() {
  for (let i = 0; i < dataResults.length; i++) {
    let html = "";
    html += `<li class="js-item list__item" id=${dataResults[i].show.id}>`;
    html += `<p>${dataResults[i].show.name}</p>`;
    if (dataResults[i].show.image === null) {
      html += `<img src="https://via.placeholder.com/210x295/ffffff/666666"/>`;
    } else {
      html += `<img src="${dataResults[i].show.image.medium}">`;
    }
    html += `</li>`;
    listContainer.innerHTML += html;
  }
}

function paintFavourites() {
  if (listFav.length === 0) {
    //Cuando la lista está vacía, elimina el último li
    listFavourites.innerHTML = "";
  }
  let content = "";
  for (let f = 0; f < listFav.length; f++) {
    // console.log("entra aquí");
    for (let r = 0; r < dataResults.length; r++) {
      // console.log("entra aquí 2");
      if (listFav[f] === dataResults[r].show.id) {
        console.log("entro en este if");
        content += `<li class="list__item--favourite" id=${dataResults[r].show.id}>`;
        content += `<p>${dataResults[r].show.name}</p>`;
        if (dataResults[r].show.image === null) {
          content += `<img src="https://via.placeholder.com/210x295/ffffff/666666"/>`;
        } else {
          content += `<img src="${dataResults[r].show.image.medium}">`;
        }
        content += `</li>`;
        listFavourites.innerHTML = content;
      }
    }
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
  const itemClicked = parseInt(event.currentTarget.id);
  const indexFav = listFav.indexOf(itemClicked);
  const isFavourite = indexFav === -1;
  if (isFavourite === true) {
    listFav.push(itemClicked);
    addFav(itemClicked);
    paintFavourites();
  } else {
    listFav.splice(indexFav, 1);
    paintFavourites();
    removeFav(itemClicked);
  }
  console.log(listFav);
}

function listenItem() {
  // console.log("Entro en listenItm");
  const listItems = document.querySelectorAll(".js-item");
  for (const listItem of listItems) {
    listItem.addEventListener("click", favouriteSeries);
  }
}

button.addEventListener("click", getInfoFromApi);
