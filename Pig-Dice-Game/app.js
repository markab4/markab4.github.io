/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let diceDom = document.querySelector(".dice"),
    scores, roundScore, activePlayer, gamePlaying;

init();

function nextPlayer() {
    activePlayer = (activePlayer === 0 ? 1 : 0);
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // diceDom.style.display = 'none';
}

document.querySelector(".btn-roll").addEventListener("click", function () {
    if(gamePlaying) {
        // random number
        let dice = Math.floor(Math.random() * 6) + 1;
        // display result
        diceDom.style.display = "block";
        diceDom.src = "dice-" + dice + ".png";
        //update round score if number not a 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else { // if player scores a 1
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;
        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            diceDom.style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else
            nextPlayer();
    }
});

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    let player0panel = document.querySelector(".player-0-panel");
    let player1panel = document.querySelector(".player-1-panel");
    player0panel.classList.remove("winner");
    player1panel.classList.remove("winner");
    player0panel.classList.remove("active");
    player1panel.classList.remove("active");
    player0panel.classList.add("active");


    diceDom.style.display = "none";
    gamePlaying = true;
}


document.querySelector(".btn-new").addEventListener("click", init);
