## Guess The Word Game - API and App

Welcome to the Guess The Word Game! This is a fun and interactive game where players must guess a word based on a clue. The game is divided into two parts:

A Backend API that manages the game logic (starting a game, processing guesses, and updating game state).
A Frontend App where users interact with the game by making guesses and seeing game updates.

## Overview

This project is a "Guess The Word" game where players are presented with a clue and need to guess the corresponding word by selecting letters. The game has multiple rounds, and the player can make a fixed number of incorrect guesses before losing a round.
* Backend (API): Written in Node.js using Express.
* Frontend (App): Built with HTML, CSS, and JavaScript.
The player can interact with the API through various endpoints and make guesses. The game progresses based on the player's actions, and the final status of the game is provided at the end.

## Features
Game Flow:
* Start a new game and receive the first clue.
* Make guesses by selecting letters.
* Track incorrect guesses and the number of guesses left.
* Move to the next word once the current word is guessed correctly.
* End the game when all clues are used or if the player runs out of guesses.

API Integration:
* All game logic is handled by an API, providing a clear separation of concerns between the frontend and backend.

Game Completion:
* When the player completes all rounds, they are shown a "Play Again" button to restart the game.

## Technology Stack
Backend:
* Node.js (JavaScript runtime)
* Express.js (Web framework for Node.js)
* UUID (For generating unique game IDs)


Frontend:
* HTML (Markup language)
* CSS (For styling the app)
* JavaScript (For game logic and interaction with the API)