const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var BoardSchema = new Schema({
  board: {type: [Number]},
  nbrOfGamesPlayed: {type: Number},
  forestGone: {type: Number},
  hamburgers: {type: Number},
  homelessAnimals: {type: Number}
})

module.exports = mongoose.model('Board', BoardSchema);
