const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');

const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let timerId = null;
let currentTime = 20;
let countDownTimerId;
let numMoleAppear = 0;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });
    let randomPosition = squares[Math.floor(Math.random() * 9)];
    ++numMoleAppear;
    randomPosition.classList.add('mole');
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.classList.contains('mole')) {
            result++;
            score.textContent = result;
            square.classList.remove('mole');
        }
    });
});

function moveMole() {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    countDownTimerId = setInterval(countDown, 1000);
    timerId = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        console.log('test');
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result + '\n' + 'With a success ratio of ' + result + '/' + numMoleAppear + ' = ' + Math.round((result / numMoleAppear) * 100) / 100);
        squares.forEach(square => {
            square.classList.remove('mole');
        });
    }
}

function restartGame() {
    result = 0;
    score.textContent = result;
    currentTime = 20;
    timeLeft.textContent = currentTime;
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    squares.forEach(square => {
        square.classList.remove('mole');
    });
}