const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var BoardSchema = new Schema({
  board: {type: [[]]}
})

module.exports = mongoose.model('Board', BoardSchema);
