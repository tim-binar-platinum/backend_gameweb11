const statusElement = document.getElementById('status')
const joinBtn = document.getElementById('submitRoomCode')
const txtRoomCode = document.getElementById('txtRoomCode')
const windowP1 = document.getElementById('p1-container')
const windowP2 = document.getElementById('p2-container')
const gameStatus = document.querySelector('.game-status')
const statusText = document.querySelector('.status-text')
const rockBtn = document.querySelector('.rock')
const paperBtn = document.querySelector('.paper')
const scissorsBtn = document.querySelector('.scissors')
const rockBtnG = document.querySelector('.rock-g')
const paperBtnG = document.querySelector('.paper-g')
const scissorsBtnG = document.querySelector('.scissors-g')
const playerMasterOptions = [rockBtn, paperBtn, scissorsBtn]
const playerGuestOptions = [rockBtnG, paperBtnG, scissorsBtnG]
const refreshBtn = document.querySelector('.refresh')
const list = document.querySelectorAll(".select-container button")

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

function checkStatusPeriodicaly () {
  txtRoomCode.innerText = txtRoomCode.value
  const roomCode = txtRoomCode.value;
  const interval = setInterval(async () => {
    const response = await axios.get('/suit-game/status/' + roomCode)

    if (response.data.status == true) {
      // kalo uda kedua belah pihak antar p1 dan p2 sudah memilih giliran makan stop interval
      clearInterval(interval)
      if (response.data.data.winnerUserId == userId) {
        alert('You Are The Winner !')
      } else if (response.data.data.winnerUserId == null) {
        alert('Draw !')
      } else {
        alert('You Are The Loser !')
      }
    }

  }, 2000)
}

windowP1.style.display = 'none'
windowP2.style.display = 'none'
// Disable button function
const btnDisable = () => {
  playerMasterOptions.forEach((option) => {
    option.disabled = true
  })
}
// Enable button function
const btnEnable = () => {
  playerMasterOptions.forEach((option) => {
    option.disabled = false
  })
}

joinBtn.addEventListener('click', function onClick(){
  txtRoomCode.innerText = txtRoomCode.value
  console.log("ini code", txtRoomCode.value)
  const roomCode = txtRoomCode.value;

  axios.post('/suit-game/join', {
    userId: userId,
    roomCode: roomCode
  }).then(res => {
    alert(res.data.message)
    
    if (res.data.mode == 'master') {
      windowP1.style.display = 'flex'  
      windowP2.style.display = 'none'          
    }
    if (res.data.mode == 'guest') {
      windowP2.style.display = 'flex'
      windowP1.style.display = 'none'             
    }       
  })
  playerMasterOptions.forEach((option) => {
    option.addEventListener(('click'), function onClick (){
  
      console.log("pilihan", option.value)
      const pick = option.value;
      document.querySelector("." + option.className).style.borderRadius = '10%';
      document.querySelector("." + option.className).style.backgroundColor = '#C4C4C4'; 
      submitPick(pick)
    })
  })
  playerGuestOptions.forEach((option) => {
    option.addEventListener(('click'), function onClick (){
    
      console.log("pilihan",  option.value)
      const pick =  option.value;
      document.querySelector("." + option.className).style.borderRadius = '10%';
      document.querySelector("." + option.className).style.backgroundColor = '#C4C4C4'; 
      submitPick(pick)
    })
  })
})

async function submitPick (pick) {
  txtRoomCode.innerText = txtRoomCode.value
  const roomCode = txtRoomCode.value;
  const response = await axios.post('/suit-game/submit', {
    roomCode: roomCode,
    pick: pick,
    userId: userId
  })
  const data = response.data;
  if (
    data.status == 'pending' && data.success == true
    || data.status == 'settled' && data.success == true
  ) {
    checkStatusPeriodicaly()
  }

}
// Function to start the game
// const startGame = () => {
//   playerOptions.forEach((option, index) => {
//     option.addEventListener('click',function onClick(){
//       // Disable the button when player picks option
//       btnDisable()

//       // Get random option for Com
//       const comIndex = Math.floor(Math.random()*3);
//       const comChoice = comOptions[comIndex];

//       // Set com option style
//       document.querySelector(comChoice).style.borderRadius = '10%';
//       document.querySelector(comChoice).style.backgroundColor = '#C4C4C4';

//       // Set player option style
//       document.querySelector("." + option.className).style.borderRadius = '10%';
//       document.querySelector("." + option.className).style.backgroundColor = '#C4C4C4';  
      
//       // Logic for Rock Paper Scissors game
//       const playerIndex = index;

//       if (playerIndex == comIndex) {
//         statusText.innerText = 'DRAW';
//         statusText.style.color = 'white'
//         statusElement.className = 'draw-status'
//         return console.log(playerIndex-comIndex, 'draw')
//       }
//       if ((playerIndex-comIndex) == -2) {
//         statusText.innerText = 'PLAYER WIN';
//         statusText.style.color = 'white'
//         statusElement.className = 'win-status'
//         return console.log(playerIndex-comIndex, 'player win')
//       }
//       if ((playerIndex-comIndex) == 1) {
//         statusText.innerText = 'PLAYER WIN';
//         statusText.style.color = 'white'
//         statusElement.className = 'win-status'
//         return console.log(playerIndex-comIndex, 'player win')
//       }
//       else {
//         statusText.innerText = 'COM WIN';
//         statusText.style.color = 'white'
//         statusElement.className = 'lose-status'
//         return console.log(playerIndex-comIndex, 'player lose')
//       }
//     })
//   })
// }

// // Function to reload the game
// const reloadGame = () => { 
//   refreshBtn.addEventListener('click', function onClick() {
//     // Enable the button when player picks option
//     btnEnable()
//     statusElement.className = 'game-status'
//     statusText.innerText = 'VS'
//     statusText.style.color = '#BD0000'
//     list.forEach((item) => {
//       item.style.backgroundColor = null;
//       item.style.border = null;
//     })
//   })
// }

// startGame();
// reloadGame();
