const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var BoardSchema = new Schema({
  board: {type: [Number]},
  nbrOfGamesPlayed: {type: Number, default: 0},
  forestGone: {type: Number, default: 20.0},
  hamburgers: {type: Number, default: 0},
  homelessAnimals: {type: Number, default: 0}
})

module.exports = mongoose.model('Board', BoardSchema);
