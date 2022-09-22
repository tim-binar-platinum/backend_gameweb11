const passport = require("../lib/passport");

module.exports = {
  login: passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/' })
}

// login: passport.authenticate('local', function (err, user, next) {
//   if (!user) {
//     return res.redirect('/', { status: 'username not found'})
//   }
//   if (err) {
//     return res.redirect('/', { status: 'error'})
//   }
//   if (user) {
//     return res.redirect('/index')
//   }
// })(req, res)