const passport = require("../lib/passport");
const models= require("../models")

module.exports = {
  //login local strategy for admin
  login: passport.authenticate('local', { successRedirect: '/main-users', failureRedirect: '/invalid' , passReqToCallback: true}),
  loginInvalid: (req, res) => {res.render('pages/login-admin.ejs', { status: 'incorrect credentials'})},
  restrict: (req, res, next) =>
  {
  if (req.isAuthenticated()) { 
    return next()
  }
    else res.send('unauthorized')
  },
  restrictUser: (res, req) => {
  }
}