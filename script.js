const gameboard = (() => {
  const render = () => {
    console.log("Console Gameboard!");
  };
  return {
    render,
  };
})();



const onload = () => {
  gameboard.render();
};

document.addEventListener("DOMContentLoaded", onload);