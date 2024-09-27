const url = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);

const gameId = addressBarContent.get("gameId");
console.log("ECCO L'_ID RECUPERATO", gameId);
console.log("Fetching game from:", url + "/" + gameId);

const getSingleGame = function () {
  console.log("Fetching game from:", url + "/" + gameId);
  fetch(url + "/" + gameId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWM0Mjc5YzQ1ZjAwMTU2OWI0YmEiLCJpYXQiOjE3Mjc0MjE1MDYsImV4cCI6MTcyODYzMTEwNn0.zCiqjefrZpOCrdJAovLdIA5UP44Zlo0ZjeH975X5UA4",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recuperare il singolo videogame");
      }
    })
    .then((singleGame) => {
      console.log("GAME", singleGame);
      if (!singleGame || !singleGame.name) {
        throw new Error("dettagli del gioco non validi");
      }

      createDetailsGame(singleGame);
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

const createDetailsGame = function (gameDetails) {
  const row = document.getElementById("Gameshopdetails");
  const newCol = document.createElement("div");
  newCol.classList.add("col", "col-12", "col-md-6");
  newCol.innerHTML = `
          <div class="card text-center">
              <img src="./joy.jpg" class="card-img-top" alt="">
              <div class="game-body">
                  <h5 class="game-title">${gameDetails.name}</h5>
                  <p class="game-text">${gameDetails.description}</p>
                  <p class="game-text">${gameDetails.brand}</p>
                  <p class="game-text">${gameDetails.price}</p>
                  
                  <a href="./index.html" class="btn btn-primary">Torna in Home</a>
                  <button onclick="deleteEvent()" class="btn btn-danger">ELIMINA GIOCO</button>
                  <a href="./BackOffice.html?gameId=${gameDetails._id}" class="btn btn-warning">MODIFICA GIOCO</a>
              </div>
          </div>
      `;
  row.appendChild(newCol);
};
const deleteEvent = function () {
  fetch(url + gameId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWM0Mjc5YzQ1ZjAwMTU2OWI0YmEiLCJpYXQiOjE3Mjc0MjE1MDYsImV4cCI6MTcyODYzMTEwNn0.zCiqjefrZpOCrdJAovLdIA5UP44Zlo0ZjeH975X5UA4",
      "Content-type": "application/json",
    },

    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Hai eliminato questo gioco");
        location.assign("./index.html");
      } else {
        throw new Error("Errore nella cancellazione del gioco");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getSingleGame();
