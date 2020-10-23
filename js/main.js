"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const listContainer = document.querySelector(".js-list");
let results = "";

function getInfoFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      listContainer.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        results = data[i].show;
        console.log(data[i].show);
        render();
      }
    });
}

function render() {
  let html = "";
  html += "<li>";
  html += `<p>${results.name}</p>`;
  if (results.image === null) {
    html += `<img src="https://via.placeholder.com/210x295/ffffff/666666"/>`;
  } else {
    html += `<img src="${results.image.medium}">`;
  }
  html += "</li>";
  listContainer.innerHTML += html;
}

button.addEventListener("click", getInfoFromApi);
