const Express = require('express');
const app = Express();
const router = Express.Router()
const models = require ('./models')
const {Op} = require('sequelize');
app.set('view engine', 'ejs')

// getting username object list from user_games table
router.get('/main-users', async (req, res) => {
  const searchName = req.query.search_name;
  let users;
  if (!searchName) {
    users = await models.user_games.findAll({include: [models.user_game_biodatas, models.user_game_histories]})
  } else {
    users = await models.user_games.findAll({
      where: {
        username: {
          [Op.iLike]: `%${searchName}%`
        }
      },
    })
  }
  res.render('pages/main-users.ejs', {
    users: users,
    searchName: searchName
    })
})

// getting username biodatas from relation with user_game_biodata table
router.get('/detail-user/:id', async (req, res) => {
  const { id } = req.params;
  let users;
  users = await models.user_games.findOne({
    where: {
      id: id
    },
    include: [models.user_game_biodatas, models.user_game_histories]
  })
  console.log(users.user_game_biodata)
  res.render('pages/detail-user.ejs', {
    users: users,
  })
})

// render add user page
router.get('/add-user', (req, res) => {
  res.render('pages/add-user.ejs')
})

// post create new user_games and user_game_biodatas data by passing autoincremented user_game id as user_game_biodata foreign key
router.post('/create', async (req, res) => {
    const {username, password, dob, pob, city, gender} = req.body;
    const addUser = await models.user_games.create({
      username: username,
      password: password,
    })

    await models.user_game_biodatas.create({
      dob: dob,
      pob: pob,
      city: city,
      gender: gender,
      userGameId: addUser.id
    })
    res.redirect('/page/main-users')
})

// deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;

  await models.user_game_biodatas.destroy({
    where: {
      id: id
    }
  })

  await models.user_game_histories.destroy({
    where: {
      id: id
    }
  })

  await models.user_games.destroy({
    where: {
      id: id
    }
  })
  res.redirect('/page/main-users')
})

// renders user data edit page
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  users = await models.user_games.findOne({
    where: {
      id: id
    },
    include: [models.user_game_biodatas]
  })
  res.render('pages/edit-user.ejs', {
    users : users
  })
})

// request body for editing user data
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const user = await models.user_games.findOne({
    where: {
      id: id
    }
  })

  const bio = await models.user_game_biodatas.findOne({
    where: {
      userGameId: id
    }
  })
  console.log(req.body.password)
  await user.update(req.body);
  await bio.update(req.body);
  res.redirect('/page/main-users');
})

// render index page
router.get('/index', (req, res) => {
  res.render('pages/index.ejs')
})

// render suit-game page
router.get('/suit-game', (req, res) => {
  res.render('pages/suit-game.ejs')
})


module.exports = router