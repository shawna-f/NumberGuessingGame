//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const gameUIE = document.querySelector("#game"),
      minNumUIE = document.querySelector(".min-num"),
      maxNumUIE = document.querySelector(".max-num"),
      guessBtnUIE = document.querySelector("#guess-btn"),
      guessInputUIE = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

//Assign UI min and max
minNumUIE.textContent = min;
maxNumUIE.textContent = max;

//Play again event listener
gameUIE.addEventListener("mousedown", function(e){
    if(e.target.className === "play-again"){
        window.location.reload();
    }
});

//Listen for guess
guessBtnUIE.addEventListener("click", function(){
    let guess = parseInt(guessInputUIE.value);

    //Validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    //Check if won
    if(guess === winningNum){
        //Game over (won)
        gameOver(true, `${winningNum} is correct! You win!`);
    } else {
        //Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game over (lost)
            gameOver(false, `Sorry, Game Over. The correct number was ${winningNum}`);
        } else {
            //Game continues (answer wrong)
            //Make border red
            guessInputUIE.style.borderColor = "red";
            //Clear input field
            guessInputUIE.value = "";
            //Set message
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, "red");
        }
    }

});

//Game over (function code)
function gameOver(won, msg){
    let color;
    won === true ? color = "green" : color = "red";

    //Disable input
    guessInputUIE.disabled = true;
    //Change border color
    guessInputUIE.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play again?
    guessBtnUIE.value = "Play Again";
    guessBtnUIE.className += "play-again";

}

//Get random number to use as winning number (function code)
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message (function code)
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
