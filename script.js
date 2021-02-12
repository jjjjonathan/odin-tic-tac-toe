const game = (() => {

})();

const gameboard = (() => {
  const board = ["X", "O", "X", "O", "O", null, "O", "X", "X"];
  const render = () => {
    const domBoard = document.getElementById("gameboard");
    board.forEach((element) => {
      const domElement = document.createElement("div");
      domElement.classList.add("gamepiece");
      switch (element) {
        case "X":
          domElement.classList.add("x"); break;
        case "O":
          domElement.classList.add("o"); break;
        case null:
          domElement.classList.add("blank"); break;
      }
      domBoard.appendChild(domElement);
    })
  };

  return {
    render,
  };
})();

const Player = (name, token) => {
  const getName = () => name;
  const getToken = () => token;

  return {
    getName,
    getToken,
  }
}



const onload = () => {
  gameboard.render();
};

document.addEventListener("DOMContentLoaded", onload);