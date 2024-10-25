document.querySelector('.js-rock-button').
addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').
addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').
addEventListener('click', () => {
    playGame('Scissors');
});

document.querySelector('.js-reset-score-button').
addEventListener('click', () =>{
    showResetConfirmation();   
} );


document.body.addEventListener('keydown', (event) =>{
    if(event.key==='r')
    {
        playGame('Rock');
    }
    else if(event.key==='p')
    {
        playGame('Paper');
    }
    else if(event.key==='s')
    {
        playGame('Scissors');
    }
    else if(event.key==='a')
    {
        autoPlay();
    }
    else if(event.key==='Backspace')
    {
        showResetConfirmation();
    }
});
document.querySelector('.js-auto-play-button').
addEventListener('click', () => {
    autoPlay();
})

function showResetConfirmation(){
    document.querySelector('.js-reset-confirmation').
    innerHTML= `Are you super, you want to reset the score? 
    <button class="js-reset-yes-confirm reset-confirm-button"> Yes </button>
    <button class="js-reset-no-confrim reset-confirm-button"> No </button>`;
    document.querySelector('.js-reset-yes-confirm').
    addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
    })

    document.querySelector('.js-reset-no-confrim').
    addEventListener('click', () => {
        hideResetConfirmation();
    })

}
 function hideResetConfirmation(){
        document.querySelector('.js-reset-confirmation').
       innerHTML='';
}


// Initialize score from localStorage or default values
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function getComputerPick() {
    const randomNumber = Math.random();
    if (randomNumber < 1/3) {
        return 'Rock';
    } else if (randomNumber < 2/3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

function getResult(playerPick, computerPick) {
    if (playerPick === computerPick) {
        return 'Tie';
    } else if (
        (playerPick === 'Rock' && computerPick === 'Scissors') ||
        (playerPick === 'Paper' && computerPick === 'Rock') ||
        (playerPick === 'Scissors' && computerPick === 'Paper')
    ) {
        return 'You won';
    } else {
        return 'You lose';
    }
}

isAutoplaying=false;
let intervalId;

function autoPlay(){
    if(!isAutoplaying){
   intervalId= setInterval(function(){
        const playerPick=getComputerPick();
        playGame(playerPick);
    },1000);
    isAutoplaying=true;
    document.querySelector('.js-auto-play-button').innerHTML='Stop playing';
    }   
    else{
        clearInterval(intervalId);
        isAutoplaying=false;
    document.querySelector('.js-auto-play-button').innerHTML='Auto play';
    }
}

function playGame(playerPick) {
    const computerPick = getComputerPick();
    const result = getResult(playerPick, computerPick);

    if (result === 'You won') {
        score.wins += 1;
    } else if (result === 'You lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }
    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerPick}.png" class="moves-icon">   
    <img src="images/${computerPick}.png" class="moves-icon"> Computer`;
    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
    
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.setItem('score', JSON.stringify(score)); // Update localStorage with the reset score
    updateScoreElement();
   
}
