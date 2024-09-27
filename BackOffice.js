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

const GameForm = document.getElementById("object-form");
GameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const imageUrl = document.getElementById("imageUrl").src;
  const brand = document.getElementById("brand").value;
  const newGame = new Game(name, description, brand, imageUrl, price);

  fetch(url, {
    method: "POST",
    body: JSON.stringify(newGame),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWM0Mjc5YzQ1ZjAwMTU2OWI0YmEiLCJpYXQiOjE3Mjc0MjE1MDYsImV4cCI6MTcyODYzMTEwNn0.zCiqjefrZpOCrdJAovLdIA5UP44Zlo0ZjeH975X5UA4",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Gioco aggiunto");
        objectForm.reset();
      } else {
        throw new Error("Errore della risposta");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});
