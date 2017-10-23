const express = require('express');
var bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Board = require('./models/board')
const index = require('./routes/index');
const util = require('./util');

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(accessControlAllowOrigin);
app.use('/', index(express))
app.use(logger);

var mongoAdress = process.env.MONGODB_URI || 'mongodb://localhost:27017/ixdproject';
mongoose.connect(mongoAdress);
let db = mongoose.connection;

// Setup our board
db.once('open', () => {
  Board.findOne({}, (err, document) => {
    if (err){
      console.log(err);
      return;
    }

    if (!document){
      util.createNewBoard(() => {
        console.log('Done creating board');
      });
    }
  })
})
var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Magic happens on ' + port);
})
