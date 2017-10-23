const Board = require('./models/board');

module.exports = {
  createNewBoard: createNewBoard,
  clearBoard: clearBoard
}

function createNewBoard(callback) {
  const array = []
  for (var i = 0; i < 800; i++){
    array.push(0);
  }
  for (var i = 0; i < 200; i++){
    array.push(1);
  }

  shuffle(array);

  let temp = new Board({
    board: array,
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

function shuffle(a) {
   var j, x, i;
   for (i = a.length - 1; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       x = a[i];
       a[i] = a[j];
       a[j] = x;
   }
}
