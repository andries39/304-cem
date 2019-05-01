const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
  },
  gameDetail: {
    type: String,
    required: true
  },
  gameProducer: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  ignScore: {
    type: Number,
    required: true
  },
  userID: {
    type: String,
    required: true
  },

  
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
