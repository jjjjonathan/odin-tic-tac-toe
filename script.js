const gameboard = (() => {
  const board = ["X", "O", "X", "O", "O", null, "O", "X", "X"];
  const render = () => {
    const wrapper = document.getElementById("gameboard-wrapper");
    const domBoard = document.createElement("div");
    domBoard.id = "gameboard";
    board.forEach((element) => {
      const domElement = document.createElement("div");
      domElement.classList.add("gamepiece");
      domElement.classList.add("hvr-rectangle-out");
      switch (element) {
        case "X":
          domElement.classList.add("x"); break;
        case "O":
          domElement.classList.add("o"); break;
        case null:
          domElement.classList.add("blank"); break;
      }
      domBoard.appendChild(domElement);
      wrapper.appendChild(domBoard);
    })
  };

  return {
    render,
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
      domMenu.appendChild(domButton);
    }

    return {
      textBox,
      button,
    }

  })();

  const getPlayerNames = () => {
    menu.render.textBox("player-x", "Player X");
    menu.render.textBox("player-o", "Player O");
    menu.render.button("submit-players", "Play!");
    // return [playerX, playerO]
  }

  return {
    getPlayerNames,
    render,
  };
})();

const Player = (name) => {
  const getName = () => name;

  return {
    getName,
  }
};

const game = (() => {
  let playerNames, playerX, playerO;
  


  const begin = () => {
    playerNames = menu.getPlayerNames()
    playerX = Player("Jonny")
    playerO = Player("Mom")
  }


  return {
    begin,
  }

})();


document.addEventListener("DOMContentLoaded", game.begin);