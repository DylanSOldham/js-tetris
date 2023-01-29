import { TetrominoType, Tetromino, tetrominoTypeToColor } from "../data/Tetrimino.js";
import { Logger } from "../logger.js";

class UIActor {

    constructor() {
        this.activePieces = [];
        this.setPieces = [];
        this.boardWidth = 10;
        this.boardHeight = 18;
        this.lastTime = 0;

        this.activePiece = new Tetromino(TetrominoType.random());

        for (let i = 0; i < this.boardWidth * this.boardHeight; ++i) {
            this.activePieces.push(null);
            this.setPieces.push(null);
        }

        this.modifyActiveLayer();
    }

    Update (input) {

        let currentTime = Date.now();
        if (currentTime - this.lastTime > 200) {
            let newActivePieces = this.modifyActiveLayer(0, 1);
            if (!newActivePieces) {
                this.mergeActivePieces();
                this.activePiece = new Tetromino(TetrominoType.random());
            } else {
                this.activePieces = newActivePieces;
            }

            this.lastTime = currentTime;
        }

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
                this.drawPiece(renderer, i, j, this.activePieces[i + this.boardWidth*j]);
            }
        }
    }

    modifyActiveLayer (moveX, moveY) {
        this.activePiece.setX(this.activePiece.x + moveX);
        this.activePiece.setY(this.activePiece.y + moveY);

        let newActivePieces = this.activePieces.map(() => null);
        let activeMap = this.activePiece.map;

        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                let boardX = this.activePiece.x + i;
                let boardY = this.activePiece.y + j;


                if (activeMap[i + 4 * j]) {
                    let boardPos = boardX + this.boardWidth * boardY;
                    if (this.setPieces[boardPos] === null) {
                        newActivePieces[boardPos] = this.activePiece.type;
                    } else {
                        this.activePiece.setY(this.activePiece.y - 1);
                        return null;
                    }
                }
            }
        }

        return newActivePieces;
    }

    mergeActivePieces () {
        let activeMap = this.activePiece.map;
        
        for (let i = 0; i < 4; ++i) {
            for (let j = 0; j < 4; ++j) {
                let boardX = this.activePiece.x + i;
                let boardY = this.activePiece.y + j;

                if (activeMap[i + 4 * j]) {
                    let boardPos = boardX + this.boardWidth * boardY;
                    this.setPieces[boardPos] = this.activePiece.type;
                }
            }
        }
    }
}

export { UIActor }