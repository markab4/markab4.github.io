#Match Up
Match Up is a matching game which tests the player's memory. A deck of cards with pairs is laid out face down in a grid. The player needs to match each pair to win, while only being able to flip two cards at a time.

## Use Cases
- The cards are shuffled on website load
- When the player starts the game, a visible timer also starts
- A counter displays the current number of moves the user has made
- When a matching pair is found, that pair is kept face-up.
- When a mismatching pair is found, that pair is returned to its face-down position
- Once the game wins the game, the timer stops
- When the player wins, a congratulations modal appears, displaying:
    - a button to play again
    - how much time it took for them to win
    - a star rating (from 1-3) that reflects the player's performance based on the number of moves taken
 - Cards are shuffled again on restart