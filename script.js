const gameboard = (() => {
  const board = [null, null, null, null, null, null, null, null, null];
  const solutions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const render = () => {
    const wrapper = document.getElementById("gameboard-wrapper");
    wrapper.textContent = "";
    const domBoard = document.createElement("div");
    domBoard.id = "gameboard";
    board.forEach((element, index) => {
      const individualWrapper = document.createElement("div");
      individualWrapper.classList.add("gamepiece-wrapper");

      const domElement = document.createElement("div");
      domElement.classList.add("gamepiece");
      domElement.dataset.index = index;
      switch (element) {
        case "X":
          domElement.classList.add("x");
          break;
        case "O":
          domElement.classList.add("o");
          break;
        case null:
          domElement.classList.add("blank");
          break;
      }
      domElement.addEventListener("click", game.handleTileClick);
      individualWrapper.appendChild(domElement);
      domBoard.appendChild(individualWrapper);
    });
    wrapper.appendChild(domBoard);
  };

  const update = (token, tileIndex) => {
    board[tileIndex] = token;
    gameboard.render();
  };

  const isGameOver = (lastToken) => {
    let allTokenLocations = [];
    let winningSolution;

    for (let i in board) {
      if (board[i] === lastToken) {
        allTokenLocations.push(parseInt(i));
      }
    }

    const isFull = !board.includes(null);

    const won = solutions.some((solution) => {
      let matches = 0;
      for (let i in solution) {
        for (let j in allTokenLocations) {
          if (solution[i] === allTokenLocations[j]) matches++;
        }
      }
      if (matches === 3) {
        winningSolution = solution;
        return true;
      }
    });

    const is = isFull || won;

    return {
      is,
      won,
      winner: lastToken,
      winningSolution,
    };
  };

  const clear = () => {
    for (let i in board) {
      board[i] = null;
    }
    gameboard.render();
  };

  const deleteBoard = () => {
    gameboard.clear();
    const wrapper = document.getElementById("gameboard-wrapper");
    wrapper.textContent = "";
  };

  const gameOver = (gameOverObj) => {
    const allTiles = document.querySelectorAll(".gamepiece");
    allTiles.forEach((tile, index) => {
      tile.removeEventListener("click", game.handleTileClick);

      if (gameOverObj.won) {
        if (gameOverObj.winningSolution.includes(index)) {
          tile.classList.add("three-in-a-row");
        } else if (board[index] === "X" || board[index] === "O") {
          tile.classList.add("losing-tile");
        }
      }
    });
  };

  return {
    render,
    update,
    isGameOver,
    clear,
    deleteBoard,
    gameOver,
  };
})();

const menu = (() => {
  const render = (() => {
    const header = (id, value) => {
      const domMenu = document.getElementById("menu");
      const domHeader = document.createElement("h2");
      domHeader.id = id;
      domHeader.textContent = value;
      domMenu.appendChild(domHeader);
    };

    const textBox = (id, value) => {
      const domMenu = document.getElementById("menu");
      const domTextBox = document.createElement("input");
      domTextBox.id = id;
      domTextBox.name = id;
      domTextBox.value = value;
      domMenu.appendChild(domTextBox);
    };

    const button = (id, value) => {
      const domMenu = document.getElementById("menu");
      const domButton = document.createElement("button");
      domButton.type = "submit";
      domButton.id = id;
      domButton.textContent = value;
      domButton.addEventListener("click", () => {
        game.play(menu.returnValues());
      });
      domMenu.appendChild(domButton);
    };

    return {
      header,
      textBox,
      button,
    };
  })();

  const clear = () => {
    const domMenu = document.getElementById("menu");
    domMenu.textContent = "";
  };

  const returnValues = () => {
    const inputElements = document.querySelectorAll("input");
    let inputValues = [];

    inputElements.forEach((element) => {
      inputValues.push(element.value);
    });

    menu.clear();
    return inputValues;
  };

  const getPlayerNames = () => {
    const xId = "player-x";
    const oId = "player-o";
    const submitId = "submit-players";

    menu.render.header("menu-header", "Enter player names:");
    menu.render.textBox(xId, "Player X");
    menu.render.textBox(oId, "Player O");
    menu.render.button(submitId, "Play!");
  };

  return {
    render,
    clear,
    returnValues,
    getPlayerNames,
  };
})();

const dashboard = (() => {
  const newGameButtons = (restartText) => {
    const buttonContainer = document.createElement("div");

    const newGameSamePlayers = document.createElement("button");
    newGameSamePlayers.id = "new-game-same-players";
    newGameSamePlayers.textContent = restartText + " with same players";
    newGameSamePlayers.addEventListener("click", game.restartWithSamePlayers);

    const newGameNewPlayers = document.createElement("button");
    newGameNewPlayers.id = "new-game-new-players";
    newGameNewPlayers.textContent = restartText + " with new players";
    newGameNewPlayers.addEventListener("click", game.restartWithNewPlayers);

    buttonContainer.appendChild(newGameSamePlayers);
    buttonContainer.appendChild(newGameNewPlayers);

    return buttonContainer;
  };

  const render = () => {
    dashboard.clear();

    const domDashboard = document.getElementById("dashboard");
    const header = document.createElement("h2");
    header.textContent = "It's your turn,";

    const currentPlayer = document.createElement("p");
    currentPlayer.textContent = game.getCurrentPlayerName();

    domDashboard.appendChild(header);
    domDashboard.appendChild(currentPlayer);
    domDashboard.appendChild(dashboard.newGameButtons("Restart"));
  };

  const gameOver = (gameOverObj) => {
    dashboard.clear();

    const domDashboard = document.getElementById("dashboard");
    const header = document.createElement("h2");
    header.textContent = "Game over!";

    const winningPlayer = document.createElement("p");
    if (gameOverObj.won) {
      winningPlayer.textContent = game.getPlayerNameBySymbol(
        gameOverObj.winner
      );
    } else {
      winningPlayer.textContent = "It's a tie!";
    }

    const winText = document.createElement("p");
    winText.id = "subtitle";
    winText.textContent = "wins!";

    domDashboard.appendChild(header);
    domDashboard.appendChild(winningPlayer);
    if (gameOverObj.won) domDashboard.appendChild(winText);

    domDashboard.appendChild(dashboard.newGameButtons("New game"));
  };

  const clear = () => {
    const domDashboard = document.getElementById("dashboard");
    domDashboard.textContent = "";
  };

  return {
    newGameButtons,
    render,
    gameOver,
    clear,
  };
})();

const Player = (name, token) => {
  const getName = () => name;

  const play = (tile) => {
    const tileElement = document.querySelector(`div[data-index="${tile}"]`);
    const tileIsBlank = [...tileElement.classList].includes("blank");

    if (tileIsBlank) {
      gameboard.update(token, tile);
      game.switchCurrentPlayer();
      dashboard.render();

      const gameOverObj = gameboard.isGameOver(token);

      if (gameOverObj.is) {
        dashboard.gameOver(gameOverObj);
        gameboard.gameOver(gameOverObj);
      }
    } else {
      tileElement.classList.remove("animate__animated", "animate__shakeX");
      setTimeout(() => {
        tileElement.classList.add("animate__animated", "animate__shakeX");
      }, 20);
    }
  };

  return {
    getName,
    play,
  };
};

const game = (() => {
  let currentPlayerSymbol = "X";
  let playerX, playerO;

  const begin = () => {
    menu.getPlayerNames();
  };

  const play = (playerNames) => {
    playerX = Player(playerNames[0], "X");
    playerO = Player(playerNames[1], "O");

    gameboard.render();
    dashboard.render();
  };

  const getCurrentPlayerSymbol = () => currentPlayerSymbol;

  const getCurrentPlayerName = () => {
    if (currentPlayerSymbol === "X") {
      return playerX.getName();
    } else {
      return playerO.getName();
    }
  };

  const getPlayerNameBySymbol = (symbol) => {
    if (symbol === "X") {
      return playerX.getName();
    } else {
      return playerO.getName();
    }
  };

  const switchCurrentPlayer = () => {
    if (currentPlayerSymbol === "X") {
      currentPlayerSymbol = "O";
    } else {
      currentPlayerSymbol = "X";
    }
  };

  const handleTileClick = (event) => {
    const clickedTile = event.target.dataset.index;
    if (currentPlayerSymbol === "X") {
      playerX.play(clickedTile);
    } else {
      playerO.play(clickedTile);
    }
  };

  const restartWithSamePlayers = () => {
    gameboard.clear();
    if (currentPlayerSymbol === "O") switchCurrentPlayer();
    game.play([playerX.getName(), playerO.getName()]);
  };

  const restartWithNewPlayers = () => {
    gameboard.deleteBoard();
    dashboard.clear();
    if (currentPlayerSymbol === "O") switchCurrentPlayer();
    game.begin();
  };

  return {
    begin,
    play,
    getCurrentPlayerSymbol,
    getCurrentPlayerName,
    getPlayerNameBySymbol,
    switchCurrentPlayer,
    handleTileClick,
    restartWithSamePlayers,
    restartWithNewPlayers,
  };
})();

document.addEventListener("DOMContentLoaded", game.begin);
