const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = mongoose.Schema.types.ObjectId;

var BoardSchema = new Schema({
  board: {type: [[]]}
})

module.exports = mongoose.model('Board', BoardSchema);
