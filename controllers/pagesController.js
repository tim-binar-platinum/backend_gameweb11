
module.exports = {
  login: (req, res) => {
    res.render('pages/login.ejs', {status: ''})
  },
  index: (req, res) => {
    res.render('pages/index.ejs')
  },
  suitGame: (req, res) => {
    res.render('pages/suit-game.ejs')
  }
}