const clues = [
  { phrase: "Animal that says 'meow'", word: "cat" },
  { phrase: "Famous wizard", word: "harry" },
  { phrase: "Capital of Kuwait", word: "kuwait" },
  { phrase: "President of Egypt", word: "sisi" },
  { phrase: "Fruit that's yellow and monkeys love", word: "banana" }
];

let usedClues = [];
let currentClue;
let maskedWord;
let incorrectGuesses = [];
let guessesLeft = 6;

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
      return null; 
  }

  let randomClue;
  do {
      randomClue = clues[Math.floor(Math.random() * clues.length)];
  } while (usedClues.includes(randomClue));
  
  usedClues.push(randomClue); 
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
  const button = event.target;
  button.disabled = true;

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

  renderWord();
  renderGameInfo();

  if (maskedWord === currentClue.word) {
      messageElement.textContent = "Congratulations! You've guessed the word!";
      messageElement.style.color = "green";
      nextWordButton.style.display = "inline-block";
      returnButton.style.display = "none"; 
  } else if (guessesLeft === 0) {
      messageElement.textContent = `Game Over! The word was: ${currentClue.word}`;
      messageElement.style.color = "red";
      nextWordButton.style.display = "none"; 
      returnButton.style.display = "inline-block"; 
  }
}

function renderGameInfo() {
  guessesLeftElement.textContent = guessesLeft;
  incorrectGuessesElement.textContent = incorrectGuesses.join(", ");
}

function startNewGame() {
  currentClue = getRandomClue(); 
  if (!currentClue) {
      messageElement.textContent = "Congratulations! You've completed all rounds!";
      messageElement.style.color = "blue";
      nextWordButton.style.display = "none"; 
      returnButton.style.display = "none"; 
      playAgainButton.style.display = "inline-block"; 
      return;
  }

  maskedWord = "_".repeat(currentClue.word.length);
  incorrectGuesses = [];
  guessesLeft = 6;
  messageElement.textContent = "";
  nextWordButton.style.display = "none"; 
  returnButton.style.display = "none"; 
  playAgainButton.style.display = "none";

  clueElement.textContent = `Clue: ${currentClue.phrase}`;
  
  renderWord();
  renderButtons();
  renderGameInfo();
}

function resetGame() {
  usedClues = [];
  startNewGame(); 
}

function playAgain() {
  usedClues = [];
  startNewGame();
}

startNewGame();
