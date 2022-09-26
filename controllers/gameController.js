const models = require('../models')

module.exports = {
  join: async (req, res) => {
    const { roomCode, userId } = req.body;
    const findRoom = await models.user_game_room.findOne({
      where: {roomCode: roomCode}
    })

    if (findRoom) {
      console.log('ini id guest', userId)
      findRoom.gameGuestUserId = userId;
      await findRoom.save();

      return res.json({
        status: true,
        roomCode,
        mode: 'guest',
        message: 'you are guest'
      })
    }
    console.log("ini id gameMaster", userId)
    await models.user_game_room.create({
    roomCode: roomCode,
    gameMasterUserId: userId,
    })

    res.json({
      status: true,
      roomCode,
      mode: 'master',
      message: 'you are game master'
    })
  },
  status: async (req, res) => {
    const {roomCode} = req.params;

    const findRoom = await models.user_game_room.findOne({
      where: {roomCode: roomCode}
    })
    
    if (!findRoom) {
      return res.json({
        status: false,
        message: 'room not found',
      })
    }

    const checkUserHistory = await models.user_game_histories.findOne({
      where: {UserGameRoomId: findRoom.id}
    })
    if (!checkUserHistory) {
      return res.json({
        status: false,
        message: 'game not found',
      })
    }
    res.json({
      status: ((checkUserHistory.playerOneStatus != null) && (checkUserHistory.playerTwoStatus != null)),
      data: checkUserHistory,
    })
  },
  submit: async (req, res) => {
    const { roomCode, pick, userId } = req.body;
    const findRoom = await models.user_game_room.findOne({
      where: {roomCode: roomCode}
    })
    if (!findRoom) {
      return res.json({
        success: false,
        status: 'settled',
        message: 'room not found',
      })
    }
    const payload = {
      UserGameRoomId: findRoom.id,
    }
    if (userId == findRoom.gameMasterUserId) {
      Object.assign(payload, {
        playerOneUserId : userId,
        playerOnePick: pick,
      })
      await models.user_game_histories.create(payload);
      return res.json({
      success: true,
      status: 'pending'
      })
    }

    const checkUserHistory = await models.user_game_histories.findOne({
      where: {
        UserGameRoomId: findRoom.id,
      }
    })
    if (!checkUserHistory) {
      return res.json({
        success: false,
         status: 'settled',
         message: 'history not found',
       })
     }
    //  checkUserHistory.playerTwoUserId = userId;
    //  checkUserHistory.playerTwoPick = pick;
     await checkUserHistory.update({playerTwoUserId: userId, playerTwoPick: pick});



     const {playerOnePick, playerTwoPick} = checkUserHistory;


     const calculate = (p1Pick, p2Pick) => {
      const schema = {
        scissor: {
          rock: false,
          paper: true,
        },
        rock: {
          paper: false,
          scissor: true
        },
        paper: {
          scissor: false,
          rock: true
        }
      }
    
      return schema[p1Pick][p2Pick];
    } 


     const result = calculate(playerOnePick, playerTwoPick)
   
     if (typeof result == 'undefined') {
       checkUserHistory.playerOneStatus = 'draw';
       checkUserHistory.playerTwoStatus = 'draw';
       checkUserHistory.winnerUserId = null;
     } else if (result === true) {
       checkUserHistory.playerOneStatus = 'win';
       checkUserHistory.playerTwoStatus = 'lose';
       checkUserHistory.winnerUserId = checkUserHistory.playerOneUserId;
   
     } else if (result === false) {
       checkUserHistory.playerOneStatus = 'lose';
       checkUserHistory.playerTwoStatus = 'win';
       checkUserHistory.winnerUserId = checkUserHistory.playerTwoUserId;
     }
   
     await checkUserHistory.save();

     res.json({
       success: true,
       status: 'settled',
       roomCode,
     })
  },

  // calculate: (p1Pick, p2Pick) => {
  //   const schema = {
  //     scissor: {
  //       rock: false,
  //       paper: true,
  //     },
  //     rock: {
  //       paper: false,
  //       scissor: true
  //     },
  //     paper: {
  //       scissor: false,
  //       rock: true
  //     }
  //   }
  
  //   return schema[p1Pick][p2Pick];
  // } 
}

