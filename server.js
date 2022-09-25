const Express = require('express');
const router = require('./router');
const models = require('./models');
const session = require('express-session');
const passport = require('./lib/passport')
const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }));

// using session for middleware
app.use(session({
  secret: '199719',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(Express.static('static'))

// checking if there is a session object
app.use(passport.initialize())
// checking if there is already a user in session, and passes to passport.deserializeUser and continue to next step
// if not put in session user using the passport.serializeUser function
app.use(passport.session())

app.use('/router', Express.static('static'))
app.use(router)

models.sequelize.authenticate().then(() => {
  app.listen(4000, () => {
    console.log('listening port 4000')
  })
}).catch(console.log)


