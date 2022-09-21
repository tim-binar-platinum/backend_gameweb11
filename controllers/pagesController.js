const express = require("express")

module.exports = {
  // login: (req, res) => {
  //   res.render('pages/index.ejs')
  // },
  index: (req, res) => {
    res.render('pages/index.ejs')
  },
  suitGame: (req, res) => {
    res.render('pages/suit-game.ejs')
  }
}