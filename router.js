const Express = require('express');
const app = Express();
const router = Express.Router()
const game = require('./controllers/gameController')
const auth = require('./controllers/authController');
const page = require('./controllers/pagesController');
const user = require('./controllers/userController');
const userAuth = require('./middleware/auth')

app.set('view engine', 'ejs')

// render login page for admins
router.get('/login-admin', page.loginAdmin)

// render login page for admins if authentication failed
router.get('/invalid', auth.loginInvalid)

// local passport strategy
router.post('/auth', auth.login)

// render login page for user
router.get('/login', page.login)

// render login page for user games, returns jwt token for authentication
router.post('/verify', user.login)

// render index page require bearer token for authentication
router.get('/index',userAuth, page.index)

// render suit-game page require bearer token for authentication
router.get('/suit-game', page.suitGame)

// getting username object list from user_games table
router.get('/main-users', auth.restrict, user.dashboard)

// getting username biodatas from relation with user_game_biodata table
router.get('/detail-user/:id', auth.restrict, user.detail)

// render add user page
router.get('/add-user', auth.restrict, user.add)

// post create new user_games and user_game_biodatas data by passing autoincremented user_game id as user_game_biodata foreign key
router.post('/create', auth.restrict, user.create)

// deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
router.get('/delete/:id', auth.restrict, user.delete)

// renders user data edit page
router.get('/edit/:id', auth.restrict, user.edit)

// request body for editing user data
router.post('/update/:id', auth.restrict, user.update)

router.post('/suit-game/join', game.join)

router.post('/suit-game/submit', game.submit)

router.get('/suit-game/:roomCode', game.status)

module.exports = router