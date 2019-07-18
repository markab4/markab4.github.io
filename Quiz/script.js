/* Let's build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include:
    a) question itself
    b) the answers from which the player can choose the correct one (choose an adequate data structure here,
    array, object, etc.)
    c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each
question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of
the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct at nor (Hint:
write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all
your code is private and doesn't interfere with the other programmers code (Hint: we learned a special
technique to do exactly that).
*/
(function () {
    for(let i=0; i<3; i++) {
        let Question = function (question, optionsArray, correctIndex) {
            this.question = question;
            this.optionsArray = optionsArray;
            this.correctIndex = correctIndex;
        };

        Question.prototype.ask = function () {
            console.log(this.question);
            for (let i = 0; i < this.optionsArray.length; i++) {
                console.log("#" + (i + 1) + ": " + this.optionsArray[i]);
            }
        };

        Question.prototype.check = function (guess) {
            // console.log("guess", guess, "this.correctIndex", this.correctIndex);
            if (guess == this.correctIndex + 1) console.log("That's correct!");
            else console.log("Sorry, that's incorrect");
        };


        let questions = [
            new Question("How many stars are there on the American flag?", [50, 13, 47, 48, 35, "51 because of Puerto Rico"], 0),
            new Question("What is 13 - 50?", [-50, 63, 47, 48, -37], 4),
            new Question("If donuts are 12 cents a dozen, how much do 100 donuts cost?",
                ["$2.00", "$0.50", "$1.00", "$1.20", "$12.00", "$1.44"], 2),
            new Question("Whose face is on the $1 bill?", ["There is no $1 bill", "Ben Franklin", "Andrew Jackson",
                "George Washington", "Abraham Lincoln"], 3),
        ];

        let randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        randomQuestion.ask();
        // console.log("should type in: ", randomQuestion.correctIndex + 1);
        let guess = prompt("What is the correct answer? Input the number of the correct answer displayed in the console.");
        randomQuestion.check(guess);
    }
})();