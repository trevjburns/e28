/**
 * Variables
 */

let generatedNumber = -1;
let guessedNumbers = [];
let gameActive = false;

const playButton = document.getElementById("btn-play");
const numberButtons = document.getElementById("buttons-container");
const endOutput = document.getElementById("end-output");
const buttonGroup = document.getElementById("buttons-container");
const playAgain = document.getElementById("play-again");
const output = document.getElementById("output");

/**
 *  Helper Functions 
 */

function getRandomNumber(min, max) {
  // min inclusive, max exclusive
  return Math.floor(Math.random() * (max - min) + min);
}

function hideElement(el) {
  el.classList.add("hidden");
}

function showElement(el) {
  el.classList.remove("hidden");
}

function restartGame() {
  output.innerHTML = "";
  generatedNumber = getRandomNumber(1, 10);
  guessedNumbers = [];
  playButton.innerHTML = "Guess a number...";
  document.querySelectorAll("#buttons-container button").forEach(function (el) {
    el.disabled = false;
    el.classList.remove("was-selected");
  });
  hideElement(playAgain);
  gameActive = true;
}

/**
 *  Event Listeners
 */

playButton.addEventListener("click", function (e) {
  showElement(buttonGroup);
  playButton.innerHTML = "Guess a number...";
  playButton.classList.add("game-active");
  playButton.classList.remove("game-start");
  playButton.disabled = true;
  generatedNumber = getRandomNumber(1, 10);
  gameActive = true;
});

playAgain.addEventListener("click", function (e) {
  restartGame();
});

numberButtons.addEventListener("click", function (e) {
  let selectedNumber = Number(e.target.innerHTML);

  if (!gameActive || isNaN(selectedNumber)) {
    return;
  }

  e.target.disabled = true;
  e.target.classList.add("was-selected");
  guessedNumbers.push(selectedNumber);

  // check if it is the number
  if (selectedNumber === generatedNumber) {
    gameActive = false;
    playButton.innerHTML = "Correct!";
    showElement(playAgain);

    // Win message
    if (guessedNumbers.length > 1) {
      output.innerHTML = `You got it! It only took you ${guessedNumbers.length} guesses!`;
    } else {
      output.innerHTML = `Wow! You guessed it on the first try!`;
    }
  } else {
      // Hint message
    if (selectedNumber > generatedNumber) {
      playButton.innerHTML = "Guess lower...";
    } else {
      playButton.innerHTML = "Guess higher...";
    }
  }
});
