"use strict";

const input = document.querySelector(".js-input");
const button = document.querySelector(".js-button");
let results = "";

function getInfoFromApi() {
  fetch("http://api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        results = data[i].show;
        console.log(data[i].show);
      }
    });
}

button.addEventListener("click", getInfoFromApi);
