/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Element
const game = document.querySelector('#game'),
  minNum = document.querySelector('#min-num'),
  maxNum = document.querySelector('#max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    // GAME OVER - WON
    gameOver(true, `${winningNum} is correct, YOU WIN!!!`);
  } else {
    // Wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // GAME OVER - LOST
      gameOver(false, `GAME OVER, YOU LOST. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      guessInput.value = '';
    }
  }
});

// GAME OVER
function gameOver(won, msg) {

  let color;
  won === true ? color = 'green' : color = 'red';
  // Disabled input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set Message
  setMessage(msg, color);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

// Get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}