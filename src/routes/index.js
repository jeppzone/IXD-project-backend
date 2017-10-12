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
      Board.remove({}, (err) =>{
        newBoard.save((err, document) => {
          res.status(200).json(document.board);
        })
      })
    })
  })
  .put((req, res) => {

  })
  .delete((req, res) => {
    util.clearBoard(function() {
      util.createNewBoard(function() {
        res.status(200).send();
      })
    })
  })

  return Router;
}
