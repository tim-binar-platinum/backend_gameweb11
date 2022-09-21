const express = require("express")

module.exports = {
  page: (req, res) => {
    res.render('pages/login.ejs', {status: ''})
  }
}