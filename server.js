const Express = require('express');
const router = require('./router');
const models = require('./models');
const app = Express();
const cors = require("cors");
app.use(cors());
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }));
app.use(router)

models.sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('listening port 4000')
  })
}).catch(console.log)


