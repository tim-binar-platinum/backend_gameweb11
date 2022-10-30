const Express = require('express');
const router = require('./router');
const models = require('./models');
const session = require('express-session');
const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }));

// using session for middleware
app.use(session({
  secret: '199719',
  resave: false,
  saveUninitialized: false
}))

app.use(Express.static('static'))

app.use('/router', Express.static('static'))
app.use(router)

models.sequelize.authenticate().then(() => {
  app.listen(4000, () => {
    console.log('listening port 4000')
  })
}).catch(console.log)


