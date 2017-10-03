const Board = require('../models/board');

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
      let index = board.findIndex(value => value === 0);
      board[index] = 1;
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

  return Router;
}
