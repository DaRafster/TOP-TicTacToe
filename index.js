const gameboard = (function () {
  const board = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  let tilesRemaining = 9;
  let playerOneTurn = true;
  let gameOver = false;

  const updateBoard = (row, col, player) => {
    board[row][col] = player.getShape();
    tilesRemaining--;
  };

  const checkWin = (row, col, player) => {
    for (let i = 0, j = col; i < 3; i++) {
      if (board[i][j] !== player.getShape()) break;
      else if (i == 2) return true;
    }
    for (let i = row, j = 0; j < 3; j++) {
      if (board[i][j] !== player.getShape()) break;
      else if (j == 2) return true;
    }
    for (let i = 0, j = 0; i < 3; i++, j++) {
      if (board[i][j] !== player.getShape()) break;
      else if (i == 2) return true;
    }
    for (let i = 2, j = 0; i >= 0; i--, j++) {
      if (board[i][j] !== player.getShape()) break;
      else if (i == 0) return true;
    }

    return false;
  };

  const getTileContent = (row, col) => {
    return board[row][col];
  };

  const getTilesRemaining = () => {
    return tilesRemaining;
  };

  const isPlayerOneTurn = () => {
    return playerOneTurn;
  };

  const setPlayerOneTurn = (isTurn) => {
    playerOneTurn = isTurn;
  };

  const setGameOver = (isGameOver) => {
    gameOver = isGameOver;
  };

  const isGameOver = () => {
    return gameOver;
  };

  const restartGame = () => {
    for (let i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        board[i][j] = ".";
      }
    }

    playerOneTurn = true;
    gameOver = false;
    tilesRemaining = 9;

    const gameStatus = document.querySelector(".game-status");
    gameStatus.innerHTML = "Player 1's Turn";
  };

  return {
    updateBoard,
    checkWin,
    getTilesRemaining,
    isPlayerOneTurn,
    setPlayerOneTurn,
    setGameOver,
    isGameOver,
    getTileContent,
    restartGame,
  };
})();

function createPlayer(shape, playerNum) {
  this.shape = shape;
  this.playerNum = playerNum;

  const getShape = () => {
    return shape;
  };

  const getPlayerNum = () => {
    return playerNum;
  };

  return { getShape, getPlayerNum };
}

const playerOne = createPlayer("X", 1);
const playerTwo = createPlayer("O", 2);

const tiles = [...document.querySelectorAll(".grid > div")];
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const idx = tiles.indexOf(tile);
    const row = parseInt(idx / 3);
    const col = idx % 3;
    if (gameboard.isGameOver() || gameboard.getTileContent(row, col) !== ".") {
      return;
    }

    const player = gameboard.isPlayerOneTurn() ? playerOne : playerTwo;
    const gameStatus = document.querySelector(".game-status");
    tile.innerHTML = player.getShape();
    gameboard.setPlayerOneTurn(!gameboard.isPlayerOneTurn());
    gameStatus.innerHTML = `Player ${player.getPlayerNum()}'s Turn`;
    gameboard.updateBoard(row, col, player);

    if (gameboard.checkWin(row, col, player)) {
      gameStatus.innerHTML =
        "Game Over! Player " + player.getPlayerNum() + " wins!";
      gameboard.setGameOver(true);
      restartButton.style.visibility = "visible";
    } else if (gameboard.getTilesRemaining() == 0) {
      gameStatus.innerHTML = "Game Over! It's a tie!";
      gameboard.setGameOver(true);
      restartButton.style.visibility = "visible";
    }
  });
});

const restartButton = document.querySelector("button");
restartButton.addEventListener("click", () => {
  gameboard.restartGame();
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });
  restartButton.style.visibility = "hidden";
});
