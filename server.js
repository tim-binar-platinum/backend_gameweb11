const Express = require('express');
const login = require('./login')
const pages = require('./page')
const models = require('./models')
const app = Express();

app.set('view engine', 'ejs')
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }));

// serving static files 
app.use(Express.static('static'))

// serving static files for pages in in page route
app.use('/page', Express.static('static'))

// serving static files for pages in in login route
app.use('/login', Express.static('static'))

// using imported routers
app.use('/login', login)
app.use('/page', pages)

// getting login page
app.get('/', (req, res) => {
  res.render('pages/login.ejs', {status: ''})
})

models.sequelize.authenticate().then(() => {
  app.listen(4000, () => {
    console.log('listening port 4000')
  })
}).catch(console.log)


