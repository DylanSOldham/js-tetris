import { TetrominoType, Tetromino, tetrominoTypeToColor } from "../data/Tetrimino.js";

class UIActor {

    constructor() {
        this.activePieces = [];
        this.setPieces = [];
        this.boardWidth = 10;
        this.boardHeight = 18;

        for (let i = 0; i < this.boardWidth; ++i) {
            for (let j = 0; j < this.boardHeight; ++j) {
                if (Math.random()*3 < 1) {
                    this.setPieces.push(TetrominoType.GREEN);
                } else {
                    this.setPieces.push(null);
                }
            }
        }
    }

    Update (input) {

    }

    Render (renderer) {
        this.drawBasket(renderer);
        this.drawBackground(renderer);
        this.drawPieces(renderer);
    }

    drawBasket(renderer) {
        renderer.drawRect(0.3, 0.1, 0.01, 0.7, {r: 155, g: 155, b: 155}, renderer.CoordSystem.UI);
        renderer.drawRect(0.6, 0.1, 0.01, 0.7, {r: 155, g: 155, b: 155}, renderer.CoordSystem.UI);
        renderer.drawRect(0.3, 0.8, 0.31, 0.01, {r: 155, g: 155, b: 155}, renderer.CoordSystem.UI);
    }

    drawBackground(renderer) {
        let w = 0.029;
        let h = w * 4/3;

        for (let i = 0; i < this.boardWidth; ++i) {
            for (let j = 0; j < this.boardHeight; ++j) {
                renderer.drawRect(
                    0.313 + w*i, 0.105 + h*j, w - 0.005, h - 0.005, 
                    {b: 25}, 
                    renderer.CoordSystem.UI
                );
            }
        }
    }

    drawPiece(renderer, i, j, type) {
        if (type !== null) {
            let w = 0.029;
            let h = w * 4/3;

            renderer.drawImage(
                0.31 + w*i, 0.103 + h*j, w, h, 
                "../../assets/piece.png", 
                renderer.CoordSystem.UI
            );
        
            renderer.drawRect(
                0.31 + w*i, 0.103 + h*j, w, h,
                tetrominoTypeToColor(type, 155), 
                renderer.CoordSystem.UI
            );
        }
    }

    drawPieces(renderer) {
        for (let i = 0; i < this.boardWidth; ++i) {
            for (let j = 0; j < this.boardHeight; ++j) {
                this.drawPiece(renderer, i, j, this.setPieces[i + this.boardWidth*j]);
            }
        }
    }
}

export { UIActor }