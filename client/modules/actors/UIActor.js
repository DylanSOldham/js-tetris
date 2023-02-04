import { TetrominoType, Tetromino, tetrominoTypeToColor } from "../data/Tetromino.js";
import { Logger } from "../logger.js";

class UIActor {

    constructor() {
        this.activePieces = [];
        this.setPieces = [];
        this.boardWidth = 10;
        this.boardHeight = 18;
        this.lastTick = 0;
        this.lastMove = 0;

        this.mainBoardX = 0.35;
        this.mainBoardY = 0.1;
        this.mainBoardW = 0.3;
        this.mainBoardH = 0.7;

        this.activePiece = new Tetromino(TetrominoType.random());
        this.gameOver = false;

        for (let i = 0; i < this.boardWidth * this.boardHeight; ++i) {
            this.activePieces.push(null);
            this.setPieces.push(null);
        }

        this.modifyActiveLayer(0, 0);
    }

    Update (input) {

        if (this.gameOver) return;

        let moveX = 0;
        let moveY = 0;
        let rotated = false;

        let currentTime = Date.now();
        if (currentTime - this.lastTick > 500) {
            moveY = 1;
            this.lastTick = currentTime;
        }

        if (currentTime - this.lastMove > 50) {
            moveX += input.isKeyDown("ArrowRight") ? 1 : 0;
            moveX += input.isKeyDown("ArrowLeft") ? -1 : 0;
            moveY = input.isKeyDown("ArrowDown") ? 1 : moveY;

            if (moveX || moveY) this.lastMove = currentTime;
        }

        if (input.isKeyJustDown("ArrowUp")) {
            if (!this.moveIsIllegal(this.activePiece, 0, 0, 3)) {
                this.activePiece.setRotation(this.activePiece.rotation + 3);
                rotated = true;
            }
        }

        if (moveX || rotated) {
            let transformedPieces = this.modifyActiveLayer(moveX, 0);
            if (transformedPieces) {
                this.activePieces = transformedPieces;
            }
        }

        if (moveY) {
            let transformedPieces = this.modifyActiveLayer(0, moveY);
            if (!transformedPieces) {
                this.emplacePiece(this.setPieces, this.activePiece);
                this.activePiece = new Tetromino(TetrominoType.random());
                let newActivePiece = this.modifyActiveLayer(0, 0);
                if (!newActivePiece) {
                    this.gameOver = true;
                } else {
                    this.activePieces = newActivePiece;
                }
            } else {
                this.activePieces = transformedPieces;
            }
        }

        this.removeCompleteRows();
    }

    Render (renderer) {
        let thickness = 0.01;
        this.drawBasket(renderer, this.mainBoardX, this.mainBoardY, this.mainBoardW, this.mainBoardH, thickness);
        this.drawBackground(renderer, this.mainBoardX, this.mainBoardY);
        this.drawPieces(renderer, this.mainBoardX, this.mainBoardY);
    }

    drawBasket(renderer, x, y, w, h, thickness) {
        renderer.drawRect(x, y, thickness, h, {r: 155, g: 155, b: 155}, renderer.CoordSystem.UI);
        renderer.drawRect(x+w, y, thickness, h, {r: 155, g: 155, b: 155}, renderer.CoordSystem.UI);
        renderer.drawRect(x, y+h, w+thickness, thickness, {r: 155, g: 155, b: 155}, renderer.CoordSystem.UI);
    }

    drawBackground(renderer, x, y) {
        let w = 0.029;
        let h = w * 4/3;

        for (let i = 0; i < this.boardWidth; ++i) {
            for (let j = 0; j < this.boardHeight; ++j) {
                renderer.drawRect(
                    x + .013 + w*i, y + .005 + h*j, w - 0.005, h - 0.005, 
                    {b: 25}, 
                    renderer.CoordSystem.UI
                );
            }
        }
    }

    drawPiece(renderer, x, y, i, j, type) {
        if (type !== null) {
            let w = 0.029;
            let h = w * 4/3;

            renderer.drawImage(
                x + 0.01 + w*i, y + 0.003 + h*j, w, h, 
                "../../assets/piece.png", 
                renderer.CoordSystem.UI
            );

            if (!this.gameOver) {
                renderer.drawRect(
                    x + 0.01 + w*i, y + 0.003 + h*j, w, h,
                    tetrominoTypeToColor(type, 155), 
                    renderer.CoordSystem.UI
                );
            }
        }
    }

    drawPieces(renderer) {
        for (let i = 0; i < this.boardWidth; ++i) {
            for (let j = 0; j < this.boardHeight; ++j) {
                this.drawPiece(
                    renderer, 
                    this.mainBoardX, this.mainBoardY, i, j, 
                    this.setPieces[i + this.boardWidth*j]
                );
                this.drawPiece(
                    renderer, 
                    this.mainBoardX, this.mainBoardY, 
                    i, j, this.activePieces[i + this.boardWidth*j]
                );
            }
        }
    }

    moveIsIllegal (piece, moveX, moveY, rotation = 0) {

        this.activePiece.setRotation(this.activePiece.rotation + rotation);
        let activeMap = piece.map;
        this.activePiece.setRotation(this.activePiece.rotation + (4-rotation));

        for (let i = 0; i < activeMap.length; ++i) {
            for (let j = 0; j < activeMap[i].length; ++j) {
                let boardX = piece.x + i + moveX;
                let boardY = piece.y + j + moveY;

                if (activeMap[i][j]) {

                    if (boardX >= this.boardWidth || boardX < 0) return true;
                    if (boardY >= this.boardHeight) return true;

                    let boardPos = boardX + this.boardWidth * boardY;
                    if (this.setPieces[boardPos] !== null) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    emplacePiece(board, piece) {
        let activeMap = piece.map;

        for (let i = 0; i < activeMap.length; ++i) {
            for (let j = 0; j < activeMap[i].length; ++j) {
                let boardX = piece.x + i;
                let boardY = piece.y + j;
                let boardPos = boardX + this.boardWidth * boardY;

                if (activeMap[i][j]) board[boardPos] = piece.type;
            }
        }
    }

    modifyActiveLayer (moveX, moveY) {

        if (!this.moveIsIllegal(this.activePiece, moveX, moveY)) {
            this.activePiece.setX(this.activePiece.x + moveX);
            this.activePiece.setY(this.activePiece.y + moveY);
            
            let newActivePieces = this.activePieces.map(() => null);
            this.emplacePiece(newActivePieces, this.activePiece);

            return newActivePieces;
        } else {
            return null;
        }
    }

    removeCompleteRows() {
        for (let y = 0; y < this.boardHeight; ++y) {
            let complete = true;
            for (let x = 0; x < this.boardWidth; ++x) {
                complete = complete && this.setPieces[x + this.boardWidth*y] !== null;
            }

            if (complete) {
                this.setPieces.splice(this.boardWidth*y, this.boardWidth);
                for (let x = 0; x < this.boardWidth; ++x) {
                    this.setPieces.unshift(null);
                }
            }
        }
    }
}

export { UIActor }