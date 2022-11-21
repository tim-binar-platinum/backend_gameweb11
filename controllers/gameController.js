const models = require ('../models')
const {Op} = require('sequelize');

module.exports = {
  point: async (req, res) => {
    const id  = req.userId;
    console.log(id)
    const { status } = req.body;
    
    const game = await models.game_history.create({
      user_id: id,
      status
    })
    const points = await models.game_history.findAndCountAll({
      where: {
        user_id: id,
        status: 'win'
      }
    })
    const user = await models.user_game.findOne({
      where : {
        id : id
      }
    })
    await user.update({
      points : points.count
    })
    return res.status(200).json({
      history: game,
      points: points.count
    })
  },

  totalPoint: async (req, res) => {
    const id = req.userId;

    const points = await models.game_history.findAndCountAll({
      where: {
        user_id: id,
        status: 'win'
      }
    })
    return res.status(200).json(points.count)
  },

  history: async (req, res) => {
    const id = req.userId;

    const history = await models.game_history.findAll({
      where: {
        user_id: id
      }
    })
    return res.status(200).json(history)
  }
}