"use strict";

function getUserRepos() {
  const input = document.getElementById("userInput")["value"];
  fetch(`https://api.github.com/users/${input}/repos`)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.status && responseJson.status === "error") {
        throw new Error(responseJson.message);
      } else {
        return responseJson;
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert(error));
}

function displayResults(responseJson) {
  console.log(responseJson);

  const repos = responseJson.map(obj => {
    return {
      name: obj.name,
      url: obj.html_url
    };
  });

  console.log(repos);

  repos.forEach(repo => {
    $(".repo-results").append(`<p>${repo.name}</p>`);
    $(".repo-results").append(`<p>${repo.url}</p>`);
  });

  $(".results").removeClass("hidden");
}

function watchForm() {
  $("form").submit(submitHandler);
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});

const submitHandler = event => {
  event.preventDefault();
  getUserRepos();
  $(".repo-results").html("");
};
