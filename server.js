const Express = require('express');
const router = require('./router');
const models = require('./models');
const app = Express();

app.use(Express.json())
app.use(Express.urlencoded({ extended: false }));
app.use(router)

models.sequelize.authenticate().then(() => {
  app.listen(4000, () => {
    console.log('listening port 4000')
  })
}).catch(console.log)


