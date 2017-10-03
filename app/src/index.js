const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');

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

const index = require('./routes/index');

app.use('/', index(express));

app.use(accessControlAllowOrigin);
app.use(logger);

mongoose.connect('mongodb://localhost:27017/ixdproject');

app.listen(3000, () => {
  console.log('Magic happens on 3000');
})
