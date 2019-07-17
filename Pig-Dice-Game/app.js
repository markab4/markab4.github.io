/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0,0],
    roundScore = 0,
    activePlayer = 0;
let diceDom = document.querySelector(".dice");

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

diceDom.style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function(){
    // random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // display result
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";
    //update round score if number not a 1
    if(dice !== 1){
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else { // if player scores a 1
        activePlayer = (activePlayer === 0 ? 1 : 0);
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        diceDom.style.display = 'none';
    }
});

