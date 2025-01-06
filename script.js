"use strict";

let boxNum = document.querySelectorAll(".box1");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-modal");
let closeModalBtn;
let currentGameModal;
let ballContainer;

for (let i = 0; i < boxNum.length; i++) {
  boxNum[i].addEventListener("click", function () {
    currentGameModal = document.querySelector(`.game-${i}`);
    closeModalBtn = document.querySelector(`.modal-button-${i}`);

    currentGameModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    console.log(closeModalBtn);
    closeModalBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // ballgame Logic
    ballContainer = document
      .querySelector(".ballContainer")
      .getBoundingClientRect();
    console.log(ballContainer, "Hii");
    // ball game logic
    let ball = document.getElementById("ball");
    let ballBtn = document.getElementById("actionBtn");

    let xPos = 50;
    let yPos = 50;
    let xSpeed = 2;
    let ySpeed = 2;

    let isMoving = false;
    let intervalId;
    console.log();
    function moveBall() {
      let height = ballContainer.height - 25;
      let width = ballContainer.width - 25;
      console.log(height, width, "hello");
      // let containerWidth = window.innerWidth - 25;
      // let conatinerHeight = window.innerHeight - 25;
      xPos = xPos + xSpeed;
      yPos = yPos + ySpeed;
      if (xPos > width || xPos - 25 < 0) {
        xSpeed = -xSpeed;
      }
      if (yPos > height || yPos - 25 < 0) {
        ySpeed = -ySpeed;
      }
      ball.style.left = `${xPos}px`;
      ball.style.top = `${yPos}px`;
    }

    // intervalId = setInterval(moveBall, 10);
    ballBtn.addEventListener("click", function () {
      if (isMoving) {
        clearInterval(intervalId);
        ballBtn.textContent = "Play";
      } else {
        intervalId = setInterval(moveBall, 10);
        ballBtn.textContent = "Stop";
      }
      isMoving = !isMoving;
    });
  });
}

function closeModal() {
  currentGameModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

// closeBtn.addEventListener("click", closeModal);
// overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    console.log(e.key);
    if (!modal.classList.contains("hidden")) {
      closeModal();
      console.log("hii");
    }
  }
});

//Number guessing game logic
// let randomNumber = Math.floor(Math.random() * 20) + 1;
let randomNumber = Math.trunc(Math.random() * 20) + 1;
let highestScore = 0;
console.log(randomNumber, "Number");
let btnValid = true;

document.querySelector(".check").addEventListener("click", function () {
  let guess = Number(document.querySelector(".guess").value);
  let totalChance = Number(document.querySelector(".score").textContent);

  console.log(totalChance, typeof totalChance, "this");

  if (totalChance > 0 && btnValid) {
    if (!guess) {
      document.querySelector(".message").textContent = "No number entered";
      document.querySelector(".score").textContent = totalChance;
    } else {
      totalChance = totalChance - 1;

      if (guess === randomNumber) {
        document.querySelector(".message").textContent = "Matched!!";
        document.querySelector(".number").textContent = randomNumber;
        document.querySelector(".score").textContent = totalChance;
        currentGameModal.style.backgroundColor = "green";
        btnValid = false;
        if (totalChance > highestScore) {
          highestScore = totalChance;
          document.querySelector(".highscore").textContent = totalChance;
        }
      } else {
        document.querySelector(".score").textContent = totalChance;
        if (guess > randomNumber) {
          document.querySelector(".message").textContent =
            "Your guess is high!!";
        } else {
          document.querySelector(".message").textContent =
            "Your guess is low!!";
        }
      }
    }
  } else {
    document.querySelector("h1").textContent =
      "Please try again your chances are empty";
  }
});

document.querySelector(".again").addEventListener("click", function () {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  btnValid = true;
  console.log(randomNumber, "Number");
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = "20";
  currentGameModal.style.backgroundColor = "#77a0a0";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  document.querySelector("h1").textContent = "Guess My Number!";
});

// tic tac toe game logic

let turnIndicator = document.querySelector(".turn-indicator");
let winner = document.querySelector(".winner");
let btn = document.getElementById("restart-btn");

let isClickable = true;
let currentPlayer = "X";
let arr = Array(9).fill(null);

winner.classList.add("hidden");

function checkWinner() {
  if (
    (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) ||
    (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) ||
    (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) ||
    (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) ||
    (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) ||
    (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) ||
    (arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6])
  ) {
    isClickable = false;
    turnIndicator.classList.add("hidden");
    winner.classList.remove("hidden");
    winner.textContent = `${currentPlayer}'s wins`;
    return;
  }

  if (!arr.some((e) => e === null)) {
    turnIndicator.classList.add("hidden");
    winner.classList.remove("hidden");
    winner.textContent = `Match Draw`;
  }
}

function handleClick(ele) {
  if (isClickable) {
    let id = ele.id;
    if (arr[id] !== null) return;
    arr[id] = currentPlayer;
    //   if (arr[id] !== null) return;
    ele.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer == "X" ? "0" : "X";
    turnIndicator.textContent = `${currentPlayer}'s turn`;
  }
}

btn.addEventListener("click", function () {
  isClickable = true;
  arr = Array(9).fill(null);
  currentPlayer = "X";
  const cells = document.querySelectorAll(".col");
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  turnIndicator.classList.remove("hidden");
  winner.classList.add("hidden");
  turnIndicator.textContent = "X's turn";
});

// Add click event listener to the button
document.querySelector(".hangman").addEventListener("click", function () {
  window.location.href = "https://hangmanpro.netlify.app/";
});

document.querySelector(".calculator").addEventListener("click", function () {
  window.location.href = "https://cal-calculator01.netlify.app/";
});
document.querySelector(".alarm").addEventListener("click", function () {
  window.location.href = "https://alaram01.netlify.app/";
});
