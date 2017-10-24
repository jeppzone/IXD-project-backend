const Board = require('../models/board');
const util = require('../util');

module.exports = function(express) {
  const Router = express.Router();

  Router.route('/board')
  .get((req, res) => {
    Board.findOne({}, (err, document) => {
      if(err) return res.status(404).send({message: 'Board not found'});
      return res.status(200).json(document);
    })
  })
  .post((req, res) => {
    console.log(req.body);
    Board.findOne({}, (err, document) => {
      let board = document.board;
      let index = Math.floor(Math.random() * (board.length));
      var isSet = false;
      for(var i = index; i < board.length; i++){
        if(board[i] === 0){
          board[i] = 1;
          isSet = true;
          break;
        }
      }
      if(!isSet){
        for(var j = 0; j < index; j++){
          if(board[j] === 0){
            board[j] = 1;
            isSet = true;
            break;
          }
        }
      }
      var newBoard = new Board();
      newBoard.board = board;
      newBoard.hamburgers = document.hamburgers ? parseInt(document.hamburgers) + parseInt(req.body.hamburgers): parseInt(req.body.hamburgers);
      newBoard.forestGone = document.forestGone ? document.forestGone + req.body.rainforestGone: req.body.rainforestGone;
      newBoard.homelessAnimals = document.homelessAnimals ? parseInt(document.homelessAnimals) + parseInt(req.body.homelessAnimals): parseInt(req.body.homelessAnimals);
      newBoard.nbrOfGamesPlayed = document.nbrOfGamesPlayed++;
      console.log(newBoard.hamburgers);
      console.log(newBoard.forestGone);
      console.log(newBoard.homelessAnimals);
      Board.remove({}, (err) =>{
        newBoard.save((err, document) => {
          res.status(200).json(document);
        })
      })
    })
  })
  .put((req, res) => {
    console.log('In /put with request: ', req);
  })
  .delete((req, res) => {
    util.clearBoard(function() {
      util.createNewBoard(function() {
        res.status(200).send();
      })
    })
  });

  Router.route('/information')
    .get((req, res) => {
      Board.findOne({}, (err, document) => {
        console.log(err);
        console.log(document);
        if(document)res.status(200).json({hamburgers: document.hamburgers, homelessAnimals: document.homelessAnimals, forestGone: document.forestGone});
        res.status(404).send();
      })
    })

    Router.route('/fix')
    .post((req, res){
      Board.findOne({}, (err, doc) => {
        var newBoard = new Board();
        newBoard.hamburgers = doc.burgers;
        newBoard.forestGone = doc.forestGone;
        newBoard.homelessAnimals = doc.homelessAnimals;
        var arr = [];
        for(var i = 0; i < 900; i++){
          arr.push(1);
        }
        for(var i = 0; i < 100; i++){
          arr.push(0);
        }
        shuffle(arr);
        newBoard.board = arr;
        newBoard.save();
      }
    })

  return Router;
}

function shuffle(a) {
   var j, x, i;
   for (i = a.length - 1; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       x = a[i];
       a[i] = a[j];
       a[j] = x;
   }
}
