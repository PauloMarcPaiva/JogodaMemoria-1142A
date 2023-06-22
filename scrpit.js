var params = new URLSearchParams(window.location.search);
var nome = params.get("nome");
var turma = params.get("turma");

const images = [
  "ciclopropano.jpg",
  "propeno.jpg",
];


const cards = images.slice();

let firstCard = null;
let secondCard = null;
let lockBoard = false;

cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");
cards.forEach((image) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = "socrates.jpg";

  img.setAttribute("data-image", image);

  card.appendChild(img);
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  const clickedImage = this.querySelector("img");

  clickedImage.src = clickedImage.getAttribute("data-image");

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const firstImage = firstCard.querySelector("img").getAttribute("data-image");
  const secondImage = secondCard.querySelector("img").getAttribute("data-image");

  if ((firstImage === "ciclopropano.jpg" && secondImage === "propeno.jpg") || 
      (firstImage === "propeno.jpg" && secondImage === "ciclopropano.jpg")) {
    handleMatch();
  } else {
    handleMismatch();
  }
}


function handleMatch() {
  const clickedImages = document.querySelectorAll(".flip img");

  clickedImages.forEach((image) => {
    image.parentElement.classList.add("match");
  });

showNotification("Acertou!!!");

resetBoard()
}

function handleMismatch() {
  setTimeout(() => {
    const clickedImages = document.querySelectorAll(".flip img");

    clickedImages.forEach((image) => {
      image.src = "socrates.jpg";
    });

    resetBoard();
  }, 2000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
  const flippedCards = document.querySelectorAll(".flip");
  flippedCards.forEach((card) => {
    card.classList.remove("flip");
  });
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);

}
