const statusElement = document.getElementById('status')
const joinBtn = document.getElementById('submitRoomCode')
const txtRoomCode = document.getElementById('txtRoomCode')
const windowP1 = document.getElementById('p1-container')
const windowP2 = document.getElementById('p2-container')
const resultContainer = document.getElementById('result-container')
const masterPick = document.getElementById('master-pick')
const guestPick = document.getElementById('guest-pick')
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
const userId = urlParams.get('id');

windowP1.style.display = 'none'
windowP2.style.display = 'none'
resultContainer.style.display = 'none'


function checkStatusPeriodicaly () {
  txtRoomCode.innerText = txtRoomCode.value
  statusText.innerText = 'WAITING FOR OPPONENT';
  const roomCode = txtRoomCode.value;
  const interval = setInterval(async () => {
    const response = await axios.get('/suit-game/status/' + roomCode)

    if (response.data.status == true) {
      clearInterval(interval)
      resultContainer.style.display = 'block'
      masterPick.innerText = "Master Picks " + response.data.data.playerOnePick
      guestPick.innerText = "Guest Picks " + response.data.data.playerTwoPick
      if (response.data.data.winnerUserId == userId) {
        statusText.innerText = 'YOU WIN';
        statusText.style.color = 'white'
        statusElement.className = 'win-status'
      } else if (response.data.data.winnerUserId == null) {
        statusText.innerText = 'DRAW';
        statusText.style.color = 'white'
        statusElement.className = 'draw-status'
      } else {
        statusText.innerText = 'YOU LOSE';
        statusText.style.color = 'white'
        statusElement.className = 'lose-status'
      }
    }

  }, 2000)
}

// Disable button function
const btnDisableMaster = () => {
  playerMasterOptions.forEach((option) => {
    option.disabled = true
  })
}
const btnDisableGuest = () => {
  playerGuestOptions.forEach((option) => {
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
    statusText.innerText = 'PICK ONE';
    
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
      btnDisableMaster()
      console.log("pilihan", option.value)
      const pick = option.value;
      document.querySelector("." + option.className).style.borderRadius = '10%';
      document.querySelector("." + option.className).style.backgroundColor = '#C4C4C4'; 
      submitPick(pick)
    })
  })
  playerGuestOptions.forEach((option) => {
    option.addEventListener(('click'), function onClick (){
      btnDisableGuest()
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
    userId: userId,
    pick: pick,
   
  })
  const data = response.data;
  console.log("ini respon dari submit pick",data)
  if (
    data.status == 'pending' && data.success == true
    || data.status == 'settled' && data.success == true
  ) {
    checkStatusPeriodicaly()
  }
}