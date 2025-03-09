'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1 ');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceImage = document.querySelector('.dice');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
game();
function game() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  let scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
  let playing = true;

  diceImage.classList.add('hidden');

  btnRoll.addEventListener('click', function () {
    if (playing == true) {
      //Generating a random dice numnber
      let dice = Math.trunc(Math.random() * 6) + 1;

      //Displaying the dice
      diceImage.classList.remove('hidden');
      diceImage.src = `dice-${dice}.png`;

      //Update the Score
      //When not "1"
      if (dice !== 1) {
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent =
          currentScore;
      }
      // When "1" -> Switch player & make the current score 0
      else {
        swicthPlayer();
        console.log(`Active player :-${activePlayer}`);
      }
    }
  });

  btnHold.addEventListener('click', function () {
    if (playing == true) {
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] >= 100) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        playing = false;
      }
      swicthPlayer();
      console.log(scores);
    }
  });

  function swicthPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    activePlayer = activePlayer ? 0 : 1;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
}

btnNewGame.addEventListener('click', function () {
  resetGame();
  game();
});

function resetGame() {
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
}
function checkScreenSize() {
  if (window.innerWidth < 600) {
    alert(
      'Not designed for mobile use , for better experience please use a bigger screen'
    );
  }
}

// Run when the page loads
window.onload = checkScreenSize;

// Run when the window is resized
window.onresize = checkScreenSize;
