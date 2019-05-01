const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const Game = require('./models/Game');
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// mogo
app.get('/showAllGame', ensureAuthenticated, function(req, res) {
  // mongoose operations are asynchronous, so you need to wait 
  Game.find({}, function(err, data) {
      // note that data is an array of objects, not a single object!
      res.render('showAllGame.ejs', {
          user : req.user,
          games: data
          
      });
      
  });
});

app.post('/updateGame', ensureAuthenticated, function(req, res) {
  // Process the data received in req.body
  res.render('updateGame', {
    user: req.user,
    gameName123: req.param('gameName123'),
    ok:"ok123"
  })
  res.redirect('/updateGame');
});
//

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
