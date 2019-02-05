const diceDOM = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const newGameBtn = document.querySelector('.btn-new');
let scores;
let roundScore;
let activePlayer;

function blockGameBtns(tf) {
  rollBtn.disabled = tf;
  holdBtn.disabled = tf;
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  diceDOM.style.display = 'none';
  blockGameBtns(false);
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
}

function nextPlayer() {
  activePlayer = (activePlayer === 0 ? 1 : 0);
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  diceDOM.style.display = 'none';
  blockGameBtns(false);
}

init();

newGameBtn.addEventListener('click', init);

rollBtn.addEventListener('click', () => {
  const dice = Math.floor(Math.random() * 6) + 1;
  diceDOM.style.display = 'block';
  diceDOM.src = `dice/${dice}.png`;

  if (dice !== 1) {
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    blockGameBtns(true);
    setTimeout(() => {
      nextPlayer();
    }, 1000);
  }
});

holdBtn.addEventListener('click', () => {
  scores[activePlayer] += roundScore;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

  const input = document.querySelector('.final-score').value;
  let winningScore;

  if (input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }

  if (scores[activePlayer] >= winningScore) {
    document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
    diceDOM.style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    blockGameBtns(true);
  } else {
    nextPlayer();
  }
});
