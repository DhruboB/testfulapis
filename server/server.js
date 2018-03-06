'use strict';
require('newrelic');
var loopback = require('loopback');
var boot = require('loopback-boot');

//.......................................................
var _ = require('underscore');
var util = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = module.exports = loopback();

var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);
var bodyParser = require('body-parser');


//Load the provider configurations
var config = {};

try {
  config = require('../providers.json');
} catch (err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}

boot(app, __dirname);

//.....middlewares.....
app.middleware('session:before', require("cookie-parser")('techpenguins home ewa'));

app.use(require("express-session")({
  secret: ' techpenguins home ewa',
  saveUninitialized: true,
  resave: true
}));

 app.use(flash());       // We need flash messages to see passport errors
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(loopback.token());

 var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

// app.get('/', function(req, res, next) {
//   res.render('pages/index', {user:
//     req.user,
//     url: req.url,
//   });
// });

app.get('/login', function(req, res, next) {

    console.log('.......req.signedCookies..........',req.signedCookies);
    res.send(req.accessToken);
});

app.get('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('pages/loginProfiles', {
    user: req.user,
    url: req.url,
  });
});

// boot scripts mount components like REST API
app.start = function() {
  // start the web server
  return app.listen(process.env.PORT || 3000, function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse testful REST APIs at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

//Initialize passport
passportConfigurator.init();

// Set up related models
passportConfigurator.setupModels({
  userModel: app.models.USERS,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});

//Configure passport strategies for third party auth providers
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}