const Board = require('./models/board');

module.exports = {
  createNewBoard: createNewBoard,
  clearBoard: clearBoard
}

function createNewBoard(callback) {
  const array = []
  for (var i = 0; i < 1000; i++){
    array.push(0)
  }

  let temp = new Board({
    board: array,
    nbrOfGamesPlayed: 0,
    forestDestroyed: 0,
    forestLeft: 10000
  })

  temp.save(() => {
    callback();
  })
}

function clearBoard(callback) {
  return Board.remove({}, ()=> {
    callback();
  });
}
