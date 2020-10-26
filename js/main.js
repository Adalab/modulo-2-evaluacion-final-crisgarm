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
    paragraph.innerHTML = "Introduce the name of the serie";
  } else {
    paragraph.innerHTML = "";
    getInfoFromApi(); //Aquí deberá pasar primero por getFromLocalStorage(cuando funcione bien);
  }
}

function getInfoFromApi() {
  fetch("//api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      dataResults = data;
      listContainer.innerHTML = "";
      //listFavourites.innerHTML = "";
      paintSearch();
      listenItem();
    });
  // console.log("Una vez hago click, me pide la información a la api y me la pinta");
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
  //console.log("Me pinta la lista de búsqueda");
}
// function paintSearch() {
//   const liElement = document.createElement("li");
//   const imgElement = document.createElement("img");
//   const pElement = document.createElement("p");
//   const pContent = document.createTextNode(`${dataResults[i].show.name}`);
//   listContainer.appendChild(liElement);
//   liElement.classList.add("js-item");
//   liElement.classList.add("list__item");
//   liElement.setAttribute("id", `${dataResults[i].show.id}`);
//   liElement.appendChild(pElement);
//   pElement.appendChild(pContent);
//   if (`${dataResults[i].show.image}` === null) {
//     imgElement.setAttribute =
//       ("src", "https://via.placeholder.com/210x295/ffffff/666666");
//   } else {
//     imgElement.setAttribute = ("src", `${dataResults[i].show.image.medium}`);
//   }
//   liElement.appendChild(imgElement);
// }

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
        // console.log("entro en este if y pinta los favoritos");
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
  //console.log("Cuando hago click en cada item, me lo pinta de otro color y lo añade a la columna de la izquierda");
  console.log(localFav);
  setInLocalStorage();
  //console.log("Me guarda el array de fav en el local storage");
}

function listenItem() {
  //console.log("Escucho cada item");
  const listItems = document.querySelectorAll(".js-item");
  for (const listItem of listItems) {
    listItem.addEventListener("click", favouriteSeries);
  }
}

function setInLocalStorage() {
  localStorage.setItem("favourites", JSON.stringify(localFav));
}

function getFromLocalStorage() {
  //console.log("entro de getfromlocalstorage");
  const stringFav = localStorage.getItem("favourites");
  const savedFav = JSON.parse(stringFav);
  if (savedFav === null) {
    getInfoFromApi();
  } else {
    localFav = savedFav;
    paintFavourites();
  }
}

button.addEventListener("click", search);
console.log("Se carga la página y hasta que no hago click no pasa nada");
getFromLocalStorage();
