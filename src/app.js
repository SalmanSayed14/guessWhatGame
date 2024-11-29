// app.js
const clues = [
  { phrase: "Animal that says 'meow'", word: "cat" },
  { phrase: "Famous wizard", word: "harry" },
  { phrase: "Capital of Kuwait", word: "kuwait" },
  { phrase: "President of Egypt", word: "sisi" },
  { phrase: "Fruit that's yellow and monkeys love", word: "banana" }
];

let usedClues = [];  // To track used clues
let currentClue;
let maskedWord;
let incorrectGuesses = [];
let guessesLeft = 6;

// Select DOM elements
const clueElement = document.getElementById("clue-phrase");
const wordElement = document.getElementById("masked-word");
const guessesLeftElement = document.getElementById("guesses-left");
const incorrectGuessesElement = document.getElementById("incorrect-guesses");
const letterButtonsElement = document.getElementById("letter-buttons");
const messageElement = document.getElementById("message");
const nextWordButton = document.getElementById("next-word-btn");
const returnButton = document.getElementById("return-btn");
const playAgainButton = document.getElementById("play-again-btn");

function getRandomClue() {
  if (usedClues.length === clues.length) {
      return null;  // Return null when all clues are used
  }

  // Get a random clue that hasn't been used yet
  let randomClue;
  do {
      randomClue = clues[Math.floor(Math.random() * clues.length)];
  } while (usedClues.includes(randomClue));
  
  usedClues.push(randomClue);  // Mark this clue as used
  return randomClue;
}

function renderWord() {
  wordElement.textContent = maskedWord.split("").join(" ");
}

function renderButtons() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  letterButtonsElement.innerHTML = "";
  letters.forEach(letter => {
      const button = document.createElement("button");
      button.textContent = letter;
      button.addEventListener("click", () => handleGuess(letter));
      letterButtonsElement.appendChild(button);
  });
}

function handleGuess(letter) {
  // Disable the button once clicked
  const button = event.target;
  button.disabled = true;

  // Check if the guessed letter is in the word
  if (currentClue.word.includes(letter)) {
      let newMaskedWord = "";
      for (let i = 0; i < currentClue.word.length; i++) {
          if (currentClue.word[i] === letter) {
              newMaskedWord += letter;
          } else {
              newMaskedWord += maskedWord[i];
          }
      }
      maskedWord = newMaskedWord;
  } else {
      incorrectGuesses.push(letter);
      guessesLeft--;
  }

  // Update the UI
  renderWord();
  renderGameInfo();

  // Check for win or lose
  if (maskedWord === currentClue.word) {
      messageElement.textContent = "Congratulations! You've guessed the word!";
      messageElement.style.color = "green";
      nextWordButton.style.display = "inline-block"; // Show the "Next Word" button
      returnButton.style.display = "none"; // Hide the "Return" button
  } else if (guessesLeft === 0) {
      messageElement.textContent = `Game Over! The word was: ${currentClue.word}`;
      messageElement.style.color = "red";
      nextWordButton.style.display = "none"; // Hide the "Next Word" button
      returnButton.style.display = "inline-block"; // Show the "Return" button
  }
}

function renderGameInfo() {
  guessesLeftElement.textContent = guessesLeft;
  incorrectGuessesElement.textContent = incorrectGuesses.join(", ");
}

function startNewGame() {
  currentClue = getRandomClue(); // Get a new random clue
  if (!currentClue) {
      // If no more clues are available (game completed)
      messageElement.textContent = "Congratulations! You've completed all rounds!";
      messageElement.style.color = "blue";
      nextWordButton.style.display = "none"; // Hide the "Next Word" button
      returnButton.style.display = "none"; // Hide the "Return" button
      playAgainButton.style.display = "inline-block"; // Show "Play Again"
      return;
  }

  maskedWord = "_".repeat(currentClue.word.length);
  incorrectGuesses = [];
  guessesLeft = 6;
  messageElement.textContent = "";
  nextWordButton.style.display = "none"; // Hide the "Next Word" button
  returnButton.style.display = "none"; // Hide the "Return" button
  playAgainButton.style.display = "none"; // Hide the "Play Again" button

  // Update the clue phrase with the new one
  clueElement.textContent = `Clue: ${currentClue.phrase}`;
  
  renderWord();
  renderButtons();
  renderGameInfo();
}

function resetGame() {
  // Reset everything to start over with the first word
  usedClues = [];
  startNewGame();  // Start from the first clue
}

function playAgain() {
  // Reset everything and start a new game from the first word
  usedClues = [];
  startNewGame();
}

startNewGame();
