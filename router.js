const Express = require('express');
const router = Express.Router()
const user = require('./controllers/userController');
const userAuth = require('./middleware/auth')

// post create new user_games and user_game_biodatas data by passing autoincremented user_game id as user_game_biodata foreign key
router.post('/register', user.register)

// render login page for user games, returns jwt token for authentication
router.post('/login', user.login)

// getting username object list from user_games table
router.get('/users', userAuth, user.dashboard)

// deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
router.delete('/delete/', userAuth, user.delete)

// request body for editing user data
router.put('/update/', userAuth, user.edit)

// plan to be used for getting user game histories
// router.get('/detail-user/:id', userAuth, user.detail)

// router.post('/suit-game/join',userAuth, game.join)

// router.post('/suit-game/submit',userAuth, game.submit)

// router.get('/suit-game/status/:roomCode',userAuth, game.status)

module.exports = router