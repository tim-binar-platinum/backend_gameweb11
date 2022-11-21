require('dotenv').config()
const models = require ('../models')
const {Op} = require('sequelize');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken')


module.exports = {
  login: async (req, res) => {
    const {username, password} = req.body;
    const user = await models.user_game.findOne({
      where: {
        username : username
      }
    })
    if (!user) {
      return res.status(400).json({message: 'user not found'})
    }
    const passwordCheck = await bcrypt.compareSync(password, user.password)
    if (!passwordCheck) {
      return res.status(400).json({message: 'wrong password'})
    }
    else {
      const token = jwt.sign({
        user_id: user.id
      },
        secret= process.env.JWT_SECRET, { expiresIn: '1h'}
      )
      const payload = {
        user_id: user.id,
        token: token
      }
      return res.status(200).json(payload)
    }
  },
  dashboard: async (req, res) => {
    const searchName = req.query.search_name;
    let users;
    if (!searchName) {
      users = await models.user_game.findAll()
    } else {
      users = await models.user_game.findAll({
        where: {
          username: {
            [Op.iLike]: `%${searchName}%`
          }
        },
      })
    }
    res.status(200).json({
      data: users,
      searchName: searchName
      })
  },
  profile: async (req, res) => {
    const id  = req.userId;
    const user = await models.user_game.findOne({
      where: id
    })
    console.log(id, user)
    if(!user) {
      res.status(400).json({
        message:'user not found'
      })
    }
    res.status(200).json({
      message: 'success',
      data: user
    })
  },

  // can be user for returning game details
  // detail: async (req, res) => {
  //   const { id } = req.params;
  //   let users;
  //   users = await models.user_games.findOne({
  //     where: {
  //       id: id
  //     },
  //     include: [models.user_game_biodatas]
  //   })
  //   console.log(users.user_game_biodata)
  //   res.render('pages/detail-user.ejs', {
  //     users: users,
  //   })
  // },

  register: async (req, res) => {
    const {username, password, name, birth_place, gender, email} = req.body;
    console.log(req.body)
    const hash = bcrypt.hashSync(password, 10)
    console.log(hash)
    const addUser = await models.user_game.create({
      email: email,
      username: username,
      password: hash,
      name: name,
      birth_place: birth_place,
      gender: gender,
    })
    res.status(201).json({
      message: 'user created',
      data: addUser
    })
  },

  delete: async (req, res) => {
    const id = req.userId;
    await models.user_game.destroy({
      where: {
        id: id
      }
    })
    res.status(200).json({message: 'user deleted'})
  },

  edit: async (req, res) => {
    const id  = req.userId;
    console.log(req.userId, req.token)
    users = await models.user_game.findOne({
      where: {
        id: id
      },
    })
    if(!users){
      res.status(400).json({
        message: 'unauthorized'
      })
    }
    await users.update(req.body);
    res.status(200).json({
      message: 'user updated',
      data: users
    })
  },
}