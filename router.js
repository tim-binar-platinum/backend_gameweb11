const Express = require('express');
const app = Express();
const router = Express.Router()
const auth = require('./controllers/authController');
const page = require('./controllers/pagesController');
const user = require('./controllers/userController');
app.set('view engine', 'ejs')

// render login page
router.get('/', page.login)

router.post('/auth', auth.login, function(res) {
  console.log('ini')
  res.redirect('/index', page.index)
})
// render index page
router.get('/index', page.index)

// render suit-game page
router.get('/suit-game', page.suitGame)

// getting username object list from user_games table
router.get('/main-users', user.dashboard)

// getting username biodatas from relation with user_game_biodata table
router.get('/detail-user/:id', user.detail)

// render add user page
router.get('/add-user', user.add)

// post create new user_games and user_game_biodatas data by passing autoincremented user_game id as user_game_biodata foreign key
router.post('/create', user.create)

// deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
router.get('/delete/:id', user.delete)

// renders user data edit page
router.get('/edit/:id', user.edit)

// request body for editing user data
router.post('/update/:id', user.update)

module.exports = router