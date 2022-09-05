const statusElement = document.getElementById('status')
const gameStatus = document.querySelector('.game-status')
const statusText = document.querySelector('.status-text')
const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorsBtn = document.querySelector('.scissors')
const playerOptions = [rockBtn, paperBtn, scissorsBtn]
const comOptions = ['.a', '.b', '.c']
const refreshBtn = document.querySelector('.refresh')
const list = document.querySelectorAll(".select-container button")

// Disable button function
const btnDisable = () => {
  playerOptions.forEach((option) => {
    option.disabled = true
  })
}
// Enable button function
const btnEnable = () => {
  playerOptions.forEach((option) => {
    option.disabled = false
  })
}
// Function to start the game
const startGame = () => {
  playerOptions.forEach((option, index) => {
    option.addEventListener('click',function onClick(){
      // Disable the button when player picks option
      btnDisable()

      // Get random option for Com
      const comIndex = Math.floor(Math.random()*3);
      const comChoice = comOptions[comIndex];

      // Set com option style
      document.querySelector(comChoice).style.borderRadius = '10%';
      document.querySelector(comChoice).style.backgroundColor = '#C4C4C4';

      // Set player option style
      document.querySelector("." + option.className).style.borderRadius = '10%';
      document.querySelector("." + option.className).style.backgroundColor = '#C4C4C4';  
      
      // Logic for Rock Paper Scissors game
      const playerIndex = index;

      if (playerIndex == comIndex) {
        statusText.innerText = 'DRAW';
        statusText.style.color = 'white'
        statusElement.className = 'draw-status'
        return console.log(playerIndex-comIndex, 'draw')
      }
      if ((playerIndex-comIndex) == -2) {
        statusText.innerText = 'PLAYER WIN';
        statusText.style.color = 'white'
        statusElement.className = 'win-status'
        return console.log(playerIndex-comIndex, 'player win')
      }
      if ((playerIndex-comIndex) == 1) {
        statusText.innerText = 'PLAYER WIN';
        statusText.style.color = 'white'
        statusElement.className = 'win-status'
        return console.log(playerIndex-comIndex, 'player win')
      }
      else {
        statusText.innerText = 'COM WIN';
        statusText.style.color = 'white'
        statusElement.className = 'lose-status'
        return console.log(playerIndex-comIndex, 'player lose')
      }
    })
  })
}

// Function to reload the game
const reloadGame = () => { 
  refreshBtn.addEventListener('click', function onClick() {
    // Enable the button when player picks option
    btnEnable()
    statusElement.className = 'game-status'
    statusText.innerText = 'VS'
    statusText.style.color = '#BD0000'
    list.forEach((item) => {
      item.style.backgroundColor = null;
      item.style.border = null;
    })
  })
}

startGame();
reloadGame();
