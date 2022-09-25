const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const models = require('../models')
const bcrypt = require('bcrypt')

async function authenticate (username, password, done) {
  try {  
    checkPassword = password => bcrypt.compareSync(password, user.password)

    // find matching user admins in database
    const user = await models.user_admin.findOne()
  
    console.log(user.password)
    if (user.username != username) {
      // continues in authController
      return done(null, false)
    }
    const userPassword = await checkPassword(password, user.password)
    console.log(userPassword)
    if (!userPassword) {
      // continues in authController
      return done(null, false)
    }
    // continues in authController
    return done(null, user)
  }
  catch(err) {
    done(err)
  }
}

// local strategy used
passport.use(
  new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticate)
)

//inserting user data into sessions
passport.serializeUser(
  (user, done) => done(null, user.id)
)
//retrieving user data from session
passport.deserializeUser(
  async (id, done) => done(null, await models.user_admin.findByPk(id))
)
 
module.exports = passport

