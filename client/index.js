import { Game } from "./modules/game.js";

let canvas = document.createElement("canvas");
canvas.width = 600;
canvas.height = 600;
canvas.tabIndex = 1;
document.body.appendChild(canvas);

let game = new Game(canvas);
game.Run();