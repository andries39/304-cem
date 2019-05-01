const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Game = require('../models/Game');

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
      res.status(200).json({
          docs:[game]
      });
      
  })
  .catch(err => {
      console.log(err);
  });
  res.redirect('/createGame');
});

router.post("/deleteGame", (req, res, next) => {
  const rid = req.body.gameName;
  
  Game.findOne({gameName:rid})
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






module.exports = router;
