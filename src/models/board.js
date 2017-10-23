const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var BoardSchema = new Schema({
  board: {type: [Number]},
  nbrOfGamesPlayed: {default: 0},
  forestGone: {default: 20.0},
  hamburgers: {default: 0},
  homelessAnimals: {default: 0}
})

module.exports = mongoose.model('Board', BoardSchema);
