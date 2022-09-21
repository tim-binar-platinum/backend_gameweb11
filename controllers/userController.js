const models = require ('../models')
const {Op} = require('sequelize');

module.exports = {
  dashboard: async (req, res) => {
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
  },
  detail: async (req, res) => {
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
  },
  add: async (req, res) => {
    res.render('pages/add-user.ejs')
  },
  userCreate: async (req, res) => {
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
    res.redirect('/main-users')
  },
  delete: async (req, res) => {
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
    res.redirect('/main-users')
  },
  edit: async (req, res) => {
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
  },
  update: async (req, res) => {
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
    res.redirect('/main-users');
  },
}