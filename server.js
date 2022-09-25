const Express = require('express');
const router = require('./router');
const models = require('./models');
const session = require('express-session');
const flash = require('express-flash');
const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }));

app.use(session({
  secret: '199719',
  resave: false,
  saveUninitialized: false
}))

const passport = require('./lib/passport')

app.use(flash())

app.use(function(req, res, next) {
  res.locals.success_alert_message = req.flash('success_alert_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});

app.set('view engine', 'ejs')
app.use(Express.static('static'))

app.use(passport.initialize())
app.use(passport.session())
app.use('/router', Express.static('static'))

app.use(passport.initialize())
app.use(passport.session())
app.use(router)

models.sequelize.authenticate().then(() => {
  app.listen(4000, () => {
    console.log('listening port 4000')
  })
}).catch(console.log)


