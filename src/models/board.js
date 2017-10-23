const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var BoardSchema = new Schema({
  board: {type: [Number]},
  nbrOfGamesPlayed: {},
  forestGone: {},
  hamburgers: {},
  homelessAnimals: {}
})

module.exports = mongoose.model('Board', BoardSchema);
