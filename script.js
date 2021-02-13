const gameboard = (() => {
  const board = ["X", "O", "X", "O", "O", null, "O", "X", "X"];
  const render = () => {
    const wrapper = document.getElementById("gameboard-wrapper");
    const domBoard = document.createElement("div");
    domBoard.id = "gameboard";
    board.forEach((element, index) => {
      const domElement = document.createElement("div");
      domElement.classList.add("gamepiece");
      domElement.classList.add("hvr-rectangle-out");
      domElement.dataset.index = index;
      switch (element) {
        case "X":
          domElement.classList.add("x"); break;
        case "O":
          domElement.classList.add("o"); break;
        case null:
          domElement.classList.add("blank"); break;
      }
      domElement.addEventListener("click", gameboard.play);
      domBoard.appendChild(domElement);
      wrapper.appendChild(domBoard);
    })
  };

  const play = (event) => {
    console.log(event);
    console.log(game.getCurrentPlayer())
  }

  return {
    render,
    play,
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
    const domDashboard = document.getElementById("dashboard");

    
  }

  return {
    render,
  };

})();

const Player = (name) => {
  const getName = () => name;

  const play = (event) => {
    console.log(event);
  };

  return {
    getName,
    play,
  }
};

const game = (() => {
  let currentPlayer = "X";
  
  const begin = () => {
    menu.getPlayerNames();
  }

  const play = () => {
    const playerNames = menu.returnValues();
    const playerX = Player(playerNames[0])
    const playerO = Player(playerNames[1])

    console.log(playerX.getName())
    console.log(playerO.getName())

    gameboard.render();
  }

  const getCurrentPlayer = () => currentPlayer;

  return {
    begin,
    play,
    getCurrentPlayer,
  }
})();

document.addEventListener("DOMContentLoaded", game.begin);