const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const models = require('../models')
const bcrypt = require('bcrypt')

async function authenticate (username, password, done) {
  try {  
    checkPassword = password => bcrypt.compareSync(password, user.password)

    // find matching user in mockup user datas
    const user = await models.user_admin.findOne()
  
    console.log(user.password)
    if (user.username != username) {
      return done(null, false)
    }
    const userPassword = await checkPassword(password, user.password)
    console.log(userPassword)
    if (!userPassword) {
      return done(null, false)
    }
    // redirect to index page if authenticated
    return done(null, user)
  }
  catch(err) {
    done(err)
  }
}


passport.use(
  new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticate)
)

passport.serializeUser(
  (user, done) => done(null, user.id)
)
passport.deserializeUser(
  async (id, done) => done(null, await models.user_admin.findByPk(id))
)
 
module.exports = passport

