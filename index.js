const gameboard = (function () {
  const board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  let tilesRemaining = 9;

  const updateBoard = (row, col, player) => {
    board[row][col] = player.getShape();
    tilesRemaining--;
  };

  const checkWin = (row, col, player) => {
    console.log(board);
    for (let i = 0, j = col; i < 3; i++) {
      if (board[i][j] !== player.getShape()) return false;
      else if (i == 2) return true;
    }
    for (let i = row, j = 0; j < 3; j++) {
      if (board[i][j] !== player.getShape()) return false;
      else if (j == 2) return true;
    }
    for (let i = 0, j = 0; i < 3; i++, j++) {
      if (board[i][j] !== player.getShape()) return false;
      else if (i == 2) return true;
    }
    for (let i = 2, j = 0; i >= 0; i--, j++) {
      if (board[i][j] !== player.getShape()) return false;
      else if (i == 0) return true;
    }
  };

  const getTilesRemaining = () => {
    return tilesRemaining;
  };

  return { board, updateBoard, checkWin, getTilesRemaining };
})();

function createPlayer(playerNum, shape) {
  this.playerNum = playerNum;
  this.shape = shape;

  const getPlayerNum = () => {
    return playerNum;
  };

  const getShape = () => {
    return shape;
  };

  return { getPlayerNum, getShape };
}

const playerOne = createPlayer(1, "X");
const playerTwo = createPlayer(2, "O");

while (true) {
  const row1 = prompt("Enter row");
  const col1 = prompt("Enter col");
  gameboard.updateBoard(row1, col1, playerOne);

  if (gameboard.checkWin(row1, col1, playerOne)) {
    console.log("Player 1 Won!");
    break;
  } else if (gameboard.getTilesRemaining() == 0) {
    console.log("It's a draw!");
    break;
  }

  //   const row2 = prompt("Enter row");
  //   const col2 = prompt("Enter col");
  //   gameboard.updateBoard(row2, col2, playerTwo);

  //   if (gameboard.checkWin(row2, col2, playerTwo)) {
  //     console.log("Player 2 Won!");
  //     break;
  //   }
}
