const Express = require('express');
const router = Express.Router()
const user = require('./controllers/userController');
const game = require('./controllers/gameController')
const userAuth = require('./middleware/auth')

// post create new user_games and user_game_biodatas data by passing autoincremented user_game id as user_game_biodata foreign key
router.post('/register', user.register)

// render login page for user games, returns jwt token for authentication
router.post('/login', user.login)

// getting username object list from user_games table
router.get('/users', user.dashboard)

// deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
router.delete('/delete', userAuth, user.delete)

// request body for editing user data
router.put('/update', userAuth, user.edit)

router.get('/users/profile', userAuth, user.profile)

router.post('/game', userAuth, game.point)

router.get('/points', userAuth, game.totalPoint)

router.get('/history', userAuth, game.history)

module.exports = router