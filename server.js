const express = require('express');
const path = require('path');
const app = express();
const hcaptcha = require('hcaptcha');
const token = require("./modules/token");
const bodyParser = require("body-parser");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/verify/:id', (req, res) => {
  if (!req.params.id) {
    res.render('notfound');
    return;
  } 
  if(!token.tokenExists(req.params.id)) {
    res.render('notfound');
    return;
  }
  res.render('verify');
});

app.post('/verify/:id', (req, res) => {
  if (!req.params.id) {
    res.render('notfound');
    return;
  } 
  if(!token.tokenExists(req.params.id)) {
    res.render('notfound');
    return;
  }
  if(!req.body && !req.body['h-captcha-response']) {
    res.render('notfound');
    return;
  }
  hcaptcha.verify(process.env.hcaptcha_secretkey, req.body['h-captcha-response']) //data-hcaptcha-response
    .then((data) => {
    if (data.success === true) {
      const userid = token.getUserId(req.params.id);
      let guild = client.guilds.cache.get(process.env.serverid);
      let role = guild.roles.cache.find((r) => r.id === process.env.roleid);
      let user = guild.members.cache.get(userid);
      user.roles.add(role);
      /*
      user.send("successfully verified, enjoy!");
      */
      token.deleteToken(req.params.id);
      res.render("success");
      return;
    } else {
      res.render("failed");
      return;
    }
  })
  .catch(console.error);
});


app.get("*", (req, res) => {
  res.render('notfound')
});

const server = app.listen(3000, () => {
    console.log(`The application started on port ${server.address().port}`);
});

module.exports = server;
