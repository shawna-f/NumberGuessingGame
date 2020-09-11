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
      messageUIE = document.querySelector(".message");

//Display the min and max number range in the UI
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

    //Check if user won
    if(guess === winningNum){
        //Game over (user won)
        gameOver(true, `${winningNum} is correct! You win!`);
    } else if(isNaN(guess) || guess < min || guess > max){
        //User did not input a valid number
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
        //Clear input field for new number input
        guessInputUIE.value = "";
    } else {
        //The number they put in was valid but incorrect
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game over (user lost)
            gameOver(false, `Sorry, Game Over. The correct number was ${winningNum}`);
        } else {  //They have guesses left
            //Make border red
            guessInputUIE.style.borderColor = "red";
            //Clear input field
            guessInputUIE.value = "";
            //Set message
            setMessage(`${guess} is not correct. ${guessesLeft} guesses left.`, "red");
        }
    }
});

//Game has ended (function code)
function gameOver(won, msg){  //Won is either true or false
    let color;
    won === true ? color = "green" : color = "red";

    //Disable input
    guessInputUIE.disabled = true;
    //Change border color
    guessInputUIE.style.borderColor = color;
    //Set text color
    messageUIE.style.color = color;
    //Set message
    messageUIE.textContent = msg;

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
    messageUIE.style.color = color;
    messageUIE.textContent = msg;
}
