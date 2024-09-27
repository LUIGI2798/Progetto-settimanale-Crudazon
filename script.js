class Game {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const url = "https://striveschool-api.herokuapp.com/api/product/";

const getGame = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWM0Mjc5YzQ1ZjAwMTU2OWI0YmEiLCJpYXQiOjE3Mjc0MjE1MDYsImV4cCI6MTcyODYzMTEwNn0.zCiqjefrZpOCrdJAovLdIA5UP44Zlo0ZjeH975X5UA4",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore di response");
      }
    })
    .then((data) => {
      createCartFromGame(data);
    })

    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const createCartFromGame = function (arrayGame) {
  arrayGame.forEach((game) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `<div class="card">
    <img src="joy.jpg" class="card-img-top"/>

    
  <div class="card-body">
    <h5 class="card-title">${game.name}</h5>
    <p class="card-text">${game.brand}</p>
    <p class="card-text">${game.description}</p>
    <p class="card-text">${game.price} € </p>
    <a href="./details.html?gameId=${game._id}" class="btn btn-primary">Vai ai Dettagli </a>
  </div>
</div>`;
    const rowShop = document.getElementById("Gameshopdetails");
    Gameshopdetails.appendChild(newCol);
  });
};

getGame();
