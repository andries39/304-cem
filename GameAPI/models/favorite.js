const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
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
  userEvaluation: {
    type: String,
    
  },
  userScore: {
    type: Number,
    
  },

  
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
