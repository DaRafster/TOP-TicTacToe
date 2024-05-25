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
    gameStatus.innerHTML = `${playerOne.getPlayerName()}'s Turn`;
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

function createPlayer(shape, playerNum, name) {
  this.shape = shape;
  this.playerNum = playerNum;
  this.name = name;

  const getShape = () => {
    return shape;
  };

  const getPlayerNum = () => {
    return playerNum;
  };

  const getPlayerName = () => {
    return name;
  };

  const setPlayerName = (pName) => {
    name = pName;
  };

  return { getShape, getPlayerNum, getPlayerName, setPlayerName };
}

const playerOne = createPlayer("X", 1, "Player One");
const playerTwo = createPlayer("O", 2, "Player Two");

const tiles = [...document.querySelectorAll(".grid > div")];
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const idx = tiles.indexOf(tile);
    const row = parseInt(idx / 3);
    const col = idx % 3;
    if (gameboard.isGameOver() || gameboard.getTileContent(row, col) !== ".") {
      return;
    }

    gameboard.setPlayerOneTurn(!gameboard.isPlayerOneTurn());
    const player = gameboard.isPlayerOneTurn() ? playerOne : playerTwo;
    const gameStatus = document.querySelector(".game-status");
    tile.innerHTML = player.getShape();
    gameStatus.innerHTML = `${player.getPlayerName()}'s Turn`;
    gameboard.updateBoard(row, col, player);

    if (gameboard.checkWin(row, col, player)) {
      gameStatus.innerHTML = "Game Over! " + player.getPlayerName() + " wins!";
      gameboard.setGameOver(true);
    } else if (gameboard.getTilesRemaining() == 0) {
      gameStatus.innerHTML = "Game Over! It's a tie!";
      gameboard.setGameOver(true);
    }
  });
});

const restartButton = document.querySelector(".restart-game-btn");
restartButton.addEventListener("click", () => {
  gameboard.restartGame();
  tiles.forEach((tile) => {
    tile.innerHTML = "";
  });
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const [pOneName, pTwoName] = document.querySelectorAll("form input");
  if (pOneName.value === pTwoName.value) {
    document.querySelector(".error").style.visibility = "visible";
    return;
  }
  document.querySelector(".grid").style.display = "grid";
  document.querySelector(".game-status").style.display = "block";
  document.querySelector(".game-status").innerHTML = `${pOneName.value}'s Turn`;
  form.style.display = "none";
  playerOne.setPlayerName(pOneName.value);
  playerTwo.setPlayerName(pTwoName.value);
  restartButton.style.visibility = "visible";
});
