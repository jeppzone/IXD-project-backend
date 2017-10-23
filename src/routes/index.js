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
    console.log('In post on /board with req: ', req);
    console.log(req.query);
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
      if(req.body){
        newBoard.hamburgers = document.hamburgers + req.body.hamburgers;
        newBoard.forestGone = document.forestGone + req.body.forestGone;
        newBoard.homelessAnimals = document.homelessAnimals + req.body.homelessAnimals;
      }
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
        res.status(200).json({hamburgers: document.hamburgers, homelessAnimals: document.homelessAnimals, forestGone: document.forestGone});
      })
    })

  return Router;
}
