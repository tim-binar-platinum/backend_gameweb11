const Express = require('express');
const lodash = require ('lodash');
const users = require ('./users.json')
const router = Express.Router()
const _ = lodash

router.post('/auth', (req, res, next) => {
 const username = req.body.username;
 const password = req.body.password;

  // find matching user in mockup user datas
 const user = _.find(users, function(x) {return x.username == username})
  
  // logic for authentication
  if (!user) {
    return res.render('pages/login.ejs', { status: 'username not found'})
  }
  if (user.password != password) {
    return res.render('pages/login.ejs', { status: 'wrong password'})
  }
  // redirect to index page if authenticated
  return res.redirect('/page/index') 
})

module.exports = router 

