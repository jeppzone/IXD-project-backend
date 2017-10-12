const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Board = require('./models/board')
const index = require('./routes/index');

function accessControlAllowOrigin(req, res, next){
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, Content-Type, Content-Length')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method == 'OPTIONS'){
    return res.status(200).end()
  }

  next()
}

app.use(accessControlAllowOrigin);
app.use('/', index(express))
app.use(logger);

mongoose.connect('mongodb://localhost:27017/ixdproject');
let db = mongoose.connection;

// Setup our board
db.once('open', () => {
  Board.findOne({}, (err, document) => {
    if (err){
      console.log(err);
      return;
    }

    if (!document){
      const array = []
      for (var i = 0; i < 1000; i++){
        array.push(0)
      }

      let temp = new Board({
        board: array
      })

      temp.save()
    }
  })
})

app.listen(3000, () => {
  console.log('Magic happens on 3000');
})
