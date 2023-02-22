import { Game } from "./modules/game.js";

let canvas = document.querySelector("#game-canvas");
canvas.tabIndex = 1;
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
canvas.focus();

window.addEventListener("resize", (event) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
})

let helpButton = document.querySelector("#help-button");
let helpDropdown = document.querySelector("#help-dropdown");
helpButton.addEventListener("click", (event) => {
    if (!helpButton.open) {
        helpButton.open = true;
        helpButton.textContent = "Close Controls";
        helpDropdown.style = "position: relative; visibility: visible;";
    } else {
        helpButton.open = false;
        helpButton.textContent = "View Controls";
        helpDropdown.style = "position: fixed; visibility: hidden;";
    }
});

let game = new Game(canvas);
game.Run();