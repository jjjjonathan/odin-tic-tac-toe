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
    [2, 4, 6]
  ];

  const render = () => {
    const wrapper = document.getElementById("gameboard-wrapper");
    wrapper.textContent = "";
    const domBoard = document.createElement("div");
    domBoard.id = "gameboard";
    board.forEach((element, index) => {
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
      domBoard.appendChild(domElement);
      wrapper.appendChild(domBoard);
    })
  };

  const update = (token, tileIndex) => {
    board[tileIndex] = token;
    gameboard.render();
  }

  const isGameOver = (lastToken) => {
    let allTokenLocations = [];
    let winningSolution;

    for (let i in board) {
      if (board[i] === lastToken) {
        allTokenLocations.push(parseInt(i))
      }
    }
    
    const is = solutions.some(solution => {
      let matches = 0;
      for (let i in solution) {
        for (let j in allTokenLocations) {
          if (solution[i] === allTokenLocations[j]) matches++;
        }
      }
      if (matches === 3) {
        winningSolution = solution;
        return true;
      };
    })

    return {
      is,
      winner: lastToken,
      winningSolution
    }
  }

  return {
    render,
    update,
    isGameOver,
  };
})();

const menu = (() => {
  const render = (() => {

    const textBox = (id, value) => {
      const domMenu = document.getElementById("menu");
      const domTextBox = document.createElement("input");
      domTextBox.id = id;
      domTextBox.name = id;
      domTextBox.value = value;
      domMenu.appendChild(domTextBox);
    }

    const button = (id, value) => {
      const domMenu = document.getElementById("menu");
      const domButton = document.createElement("button");
      domButton.id = id;
      domButton.textContent = value;
      domButton.addEventListener("click", game.play);
      domMenu.appendChild(domButton);
    }

    return {
      textBox,
      button,
    }

  })();

  const clear = () => {
    const domMenu = document.getElementById("menu");
    domMenu.textContent = "";
  }

  const returnValues = () => {
    const inputElements = document.querySelectorAll("input")
    let inputValues = [];

    inputElements.forEach(element => {
      inputValues.push(element.value);
    })
    
    menu.clear();
    return inputValues;
  }

  const getPlayerNames = () => {
    const xId = "player-x";
    const oId = "player-o";
    const submitId = "submit-players";

    menu.render.textBox(xId, "Player X");
    menu.render.textBox(oId, "Player O");
    menu.render.button(submitId, "Play!");
  }

  return {
    render,
    clear,
    returnValues,
    getPlayerNames,
  };
})();

const dashboard = (() => {
  const render = () => {
    dashboard.clear();

    const domDashboard = document.getElementById("dashboard");
    const header = document.createElement("h2");
    header.textContent = "it's your turn,";

    const currentPlayer = document.createElement("p");
    currentPlayer.textContent = game.getCurrentPlayerName().toLowerCase();

    domDashboard.appendChild(header);
    domDashboard.appendChild(currentPlayer);
  }

  const gameOver = (gameOverObj) => {
    dashboard.clear();

    const domDashboard = document.getElementById("dashboard");
    const header = document.createElement("h2");
    header.textContent = "GAMe oVeR";

    const winningPlayer = document.createElement("p");
    winningPlayer.textContent = game.getPlayerNameBySymbol(gameOverObj.winner).toLowerCase();

    const winText = document.createElement("p");
    winText.id = "subtitle";
    winText.textContent = "wins!"

    domDashboard.appendChild(header);
    domDashboard.appendChild(winningPlayer);
    domDashboard.appendChild(winText);
  }

  const clear = () => {
    const domDashboard = document.getElementById("dashboard");
    domDashboard.textContent = "";
  }

  return {
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
      dashboard.render()

      const gameOverObj = gameboard.isGameOver(token);
      
      if (gameOverObj.is) {
        dashboard.gameOver(gameOverObj);
      }
    } else {
      tileElement.classList.remove("animate__animated", "animate__shakeX");
      setTimeout(() => {
        tileElement.classList.add("animate__animated", "animate__shakeX");
      }, 20)
    }
  };

  return {
    getName,
    play,
  }
};

const game = (() => {
  let currentPlayerSymbol = "X";
  let playerX, playerO;
  
  const begin = () => {
    menu.getPlayerNames();
  }

  const play = () => {
    const playerNames = menu.returnValues();
    playerX = Player(playerNames[0], "X")
    playerO = Player(playerNames[1], "O")

    gameboard.render();
    dashboard.render();
  }

  const getCurrentPlayerSymbol = () => currentPlayerSymbol;

  const getCurrentPlayerName = () => {
    if (currentPlayerSymbol === "X") {
      return playerX.getName()
    } else {
      return playerO.getName()
    }
  }

  const getPlayerNameBySymbol = (symbol) => {
    if (symbol === "X") {
      return playerX.getName()
    } else {
      return playerO.getName()
    }
  }

  const switchCurrentPlayer = () => {
    if (currentPlayerSymbol === "X") {
      currentPlayerSymbol = "O"
    } else {
      currentPlayerSymbol = "X"
    }
  }

  const handleTileClick = (event) => {
    const clickedTile = event.target.dataset.index;
    if (currentPlayerSymbol === "X") {
      playerX.play(clickedTile);
    } else {
      playerO.play(clickedTile);
    }
  }

  return {
    begin,
    play,
    getCurrentPlayerSymbol,
    getCurrentPlayerName,
    getPlayerNameBySymbol,
    switchCurrentPlayer,
    handleTileClick,
  }
})();

document.addEventListener("DOMContentLoaded", game.begin);