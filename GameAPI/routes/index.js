const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Game = require('../models/Game');
const Favorite = require('../models/Favorite');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/createGame', ensureAuthenticated, (req, res) =>
  res.render('createGame', {
    user: req.user
  })
);

/*router.get('/updateGame', ensureAuthenticated, (req, res) =>
  res.render('updateGame', {
    user: req.user,
    gameName123: req.param('gameName123'),
    ok:"ok123"
  })
);*/

router.get('/errorPage', ensureAuthenticated, (req, res) =>
  res.render('errorPage', {
    user: req.user
  })
);



router.post("/createGame", (req, res) => {
 
  const game = new Game({
      
      gameName: req.body.gameName,
      gameDetail:req.body.gameDetail,
      gameProducer:req.body.gameProducer,
      company:req.body.company,
      ignScore:req.body.ignScore,
      userID:req.body.userID
      
  });

  game.save()
  .then(result => {
      
      
  })
  .catch(err => {
      console.log(err);
  });
  res.redirect('/createGame');
});

router.post("/deleteGame", (req, res, next) => {
  const rid = req.body.gameID;
  
  Game.findById(rid)
      .exec()
      .then(docs => {
          docs.remove();
          res.status(200).json({
              deleted:true
          });
      })
      .catch(err => {
          console.log(err)
      });
      res.redirect('/showAllGame');
});

router.get('/showAllGame', ensureAuthenticated, function(req, res) {
  // mongoose operations are asynchronous, so you need to wait 
  const uID = req.user._id;
  console.log("uID:"+uID);
  Game.find({userID:uID}, function(err, data) {
      // note that data is an array of objects, not a single object!
      res.render('showAllGame.ejs', {
          user : req.user,
          games: data
          
      });
      
  });
});


router.post('/updateGame', ensureAuthenticated, function(req, res) {
  // Process the data received in req.body
  const game = new Game({
      
    gameName: req.body.gameName,
    gameDetail:req.body.gameDetail,
    gameProducer:req.body.gameProducer,
    company:req.body.company,
    ignScore:req.body.ignScore,
    userID:req.body.userID
    
});
  
  res.render('updateGame', {
    user: req.user,
    game: game,
    uid :req.body.gameuID
    
  })
  
});

router.post('/updateGameInfo', function(req, res) {
  
  const rid = req.body.gameuID;
  Game.findByIdAndUpdate(rid,
    {
      gameName: req.body.gameName,
      gameDetail:req.body.gameDetail,
      gameProducer:req.body.gameProducer,
      company:req.body.company,
      ignScore:req.body.ignScore,
      userID:req.body.userID           
    },  
    function(err, response){
            if (err) {
res.send(err);
} else {
        console.log(response);
        console.log('user updated!');
        res.redirect('/showAllGame');
                        }
    });
});


router.post("/addToFavorite", (req, res) => {
  let errors = [];
  errors.push({ msg: 'Email already exists' });
  const favorite = new Favorite({
      
      gameName: req.body.gameName,
      gameDetail:req.body.gameDetail,
      gameProducer:req.body.gameProducer,
      company:req.body.company,
      ignScore:req.body.ignScore,
      userID:req.body.userID,
      userEvaluation:req.body.userEvaluation,
      userScore:req.body.userScore
      
  });
  Favorite.findOne({ gameName: req.body.gameName }).then(game => {
    if (game) {
      console.log("already added");
      res.redirect('/errorPage');
    }else{
      favorite.save()
      
  .catch(err => {
      console.log(err);
  });
  res.redirect('/showFavoriteGame');
    }
  });
  
});

router.get('/showFavoriteGame', ensureAuthenticated, function(req, res) {
  // mongoose operations are asynchronous, so you need to wait 
  const uID = req.user._id;
  console.log("uID:"+uID);
  Favorite.find({userID:uID}, function(err, data) {
      // note that data is an array of objects, not a single object!
      res.render('showFavoriteGame.ejs', {
          user : req.user,
          games: data
          
      });
      
  });
});

router.post("/deleteFavorite", (req, res, next) => {
  const rid = req.body.gameID;
  
  Favorite.findById(rid)
      .exec()
      .then(docs => {
          docs.remove();
          
      })
      .catch(err => {
          console.log(err)
      });
      res.redirect('/showFavoriteGame');
});

router.post('/updateFavorite', ensureAuthenticated, function(req, res) {
  // Process the data received in req.body
  const favorite = new Favorite({
      
    gameName: req.body.gameName,
    gameDetail:req.body.gameDetail,
    gameProducer:req.body.gameProducer,
    company:req.body.company,
    ignScore:req.body.ignScore,
    userID:req.body.userID,
    userEvaluation:req.body.userEvaluation,
    userScore:req.body.userScore
    
});
  
  res.render('updateFavorite', {
    user: req.user,
    game: favorite,
    uid :req.body.gameuID
    
  })
  
});

router.post('/updateFavoriteInfo', function(req, res) {
  
  const rid = req.body.gameuID;
  Favorite.findByIdAndUpdate(rid,
    {
      gameName: req.body.gameName,
      gameDetail:req.body.gameDetail,
      gameProducer:req.body.gameProducer,
      company:req.body.company,
      ignScore:req.body.ignScore,
      userID:req.body.userID,
      userEvaluation:req.body.userEvaluation,
      userScore:req.body.userScore           
    },  
    function(err, response){
            if (err) {
res.send(err);
} else {
        console.log(response);
        console.log('Favorite updated!');
        res.redirect('/showFavoriteGame');
                        }
    });
});




module.exports = router;
