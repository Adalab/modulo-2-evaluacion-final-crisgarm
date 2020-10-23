"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
const container = document.querySelector(".js-container");
let results = "";

function getInfoFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
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
  html += `<img src="${results.image.medium}">`;
  html += "</li>";
  container.innerHTML += html;
}

button.addEventListener("click", getInfoFromApi);
