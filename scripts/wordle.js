// Code for Wordle game consisting of my favorite things.
import { myWords, wordleDictionary } from './wordleDictionary.js';

// Structure of the Current State of the game, intialized at the top left position
var currentState = {
    array: [],
    currentRow: 0,
    currentColumn: 0,
    answer: myWords[Math.floor(Math.random() * myWords.length)]
};

// Create the empty 6 row 5 column array
for (var i = 0; i < 6; i++) {
  currentState.array[i] = new Array(5);
}

// Initialize the game
function initWordle() {

    // Add event listener to the info icon that brings up howto instructions
    document.getElementById('infoIcon').addEventListener('click', function () {
        document.querySelector('.popupContainer').classList.remove('popupHidden');
        document.querySelector('.wordleMainContent').classList.remove('wordleMainContentUnblur');
        setTimeout(() => {
            document.querySelector('.popupContainer').classList.remove('popupClose');
        }, 100);
    });

    // Add event listener to the close popup button
    document.getElementById('closePopup').addEventListener('click', function () {
        document.querySelector('.popupContainer').classList.add('popupClose');
        document.querySelector('.wordleMainContent').classList.add('wordleMainContentUnblur');
        setTimeout(() => {
            document.querySelector('.popupContainer').classList.add('popupHidden');
        }, 500);
    });

    const wordleGame = document.querySelector('.gridContainer');
    createGrid(wordleGame);

    processKeyboard();

    console.log(currentState.answer);
}

// Create a square in the grid
function createSquare(grid, row, column, letter = '') {
    const square = document.createElement('div');
    square.className = 'square';
    square.id = `square-${row}-${column}`;
    square.textContent = letter;

    grid.appendChild(square);
    return square;
}

// Create the starting grid
function createGrid(wordleGame) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 5; column++) {
            createSquare(grid, row, column);
        }
    }

    wordleGame.appendChild(grid);
    return grid;
}

// Update the grid with the current state of the game as established by the currentState structure variable
function updateGrid() {
    for (let row = 0; row < 6; row++) {
        for (let column = 0; column < 5; column++) {
            const square = document.querySelector(`#square-${row}-${column}`);
            square.textContent = currentState.array[row][column];
        }
    }
}

function processKeyboard() {
    document.body.onkeydown = function (event) {
        const key = event.key;
        switch (key) {
            case 'Backspace':
                removeLetter();
                break;
            case 'Enter':
                // Check if the word is correct
                if (currentState.currentColumn === 5) {
                    const word = getCurrentWord();
                    if (validWord(word)) {
                        revealWord(word);
                        currentState.currentRow++;
                        currentState.currentColumn = 0;
                    } else {
                        // Do a shake animation instead with a display of "Invalid Word"
                        notValidWord();
                    }
                }
                break;
            default:
                // Check if the key is a letter
                if (isKeyLetter(key)) {
                    addLetter(key);
                }
        }
        updateGrid();
    }
}

// Get the current word from the grid row
function getCurrentWord() {
    let word = '';
    for (let column = 0; column < 5; column++) {
        word += currentState.array[currentState.currentRow][column];
    }
    return word;
}

// Check if the word is in the dictionary
function validWord(word) {
    return wordleDictionary.includes(word) || myWords.includes(word);
}

function notValidWord() {
    for (let column = 0; column < 5; column++) {
        const square = document.querySelector(`#square-${currentState.currentRow}-${column}`);
        square.classList.add('animateShake');
    }
    setTimeout(() => {
        for (let column = 0; column < 5; column++) {
            const square = document.querySelector(`#square-${currentState.currentRow}-${column}`);
            square.classList.remove('animateShake');
        };
    }, 500);
}

// Reveal the word and check if the user won or lost
function revealWord(word) {
    const animationDuration = 500;             // 0.5 seconds
    let correctArray = [0, 0, 0, 0, 0];
    let remainingLetters = currentState.answer;

    // Check for correct positions in the word and removes the letter from the remaining letters
    for (let column = 0; column < 5; column++) {
        if (word[column] === currentState.answer[column]) {
            correctArray[column] = 1;
            remainingLetters = remainingLetters.replace(word[column], '');  //Replace only affects the first occurence of the letter
        }
    }

    for (let column = 0; column < 5; column++) {
        const square = document.querySelector(`#square-${currentState.currentRow}-${column}`);
        const letter = square.textContent;

        setTimeout(() => {
            if (correctArray[column] === 1) {
                square.classList.add('correct');
            }
            else if (remainingLetters.includes(letter)) {
                square.classList.add('wrongPlace');
                remainingLetters = remainingLetters.replace(letter, '');
            } else {
                square.classList.add('incorrect');
            }
            square.classList.remove('inputted');
        }, (((column + 1) * animationDuration)) / 2);

        square.classList.add('animateFlip');
        square.style.animationDelay = `${(column * animationDuration) / 2}ms`;
    }

    const guessedCorrect = currentState.answer === word ? true : false;
    const loseFlag = currentState.currentRow === 5 ? true : false;

    if (guessedCorrect) {
        // Pop up a win message
        setTimeout(() => {
            document.getElementById('winPopupContainer').classList.remove('popupHidden');
            document.querySelector('.wordleMainContent').classList.remove('wordleMainContentUnblur');
        }, 1500);
    } else if (loseFlag) {
        // Pop up a lose message which also reveals correct answer
        setTimeout(() => {
            document.getElementById('losePopupContainer').classList.remove('popupHidden');
            document.querySelector('.wordleMainContent').classList.remove('wordleMainContentUnblur');
            document.getElementById('correctAnswer').textContent = currentState.answer.toUpperCase();
        }, 1500);
    }
}

function isKeyLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

function removeLetter() {
    if (currentState.currentColumn > 0) {
        const square = document.querySelector(`#square-${currentState.currentRow}-${currentState.currentColumn - 1}`);
        currentState.array[currentState.currentRow][currentState.currentColumn - 1] = '';
        square.classList.remove('inputted');
        currentState.currentColumn--;
    }
}

function addLetter(key) {
    if (currentState.currentColumn < 5) {
        const square = document.querySelector(`#square-${currentState.currentRow}-${currentState.currentColumn}`);
        currentState.array[currentState.currentRow][currentState.currentColumn] = key;
        currentState.currentColumn++;
        square.classList.add('inputted');
    }
}

initWordle();