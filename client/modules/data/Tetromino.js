

const TetrominoType = {
    RED: 0,
    GREEN: 1,
    CYAN: 2,
    PURPLE: 3,
    YELLOW: 4,
    ORANGE: 5,
    BLUE: 6,
    random: () => {return Math.floor(Math.random()*6.999)},
}

class Tetromino {
    constructor(type) {
        this.type = type;
        this.rotation = 3; // Increments of 90 degrees clockwise
        this.xPos = 3;
        this.yPos = 2;
    }

    setRotation(r) {
        this.rotation = r % 4;
    }

    setX(x) {this.xPos = x;}
    setY(y) {this.yPos = y;}
    get x() {return this.xPos;}
    get y() {return this.yPos;}

    get map() {
        let baseMap;

        switch (this.type) {
            case TetrominoType.CYAN:
                baseMap = [
                    [1],
                    [1],
                    [1],
                    [1],
                ];
                break;
            case TetrominoType.GREEN:
                baseMap = [
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ];
                break;
            case TetrominoType.RED:
                baseMap = [
                    [0, 1,],
                    [1, 1,],
                    [1, 0,],
                ];
                break;
            case TetrominoType.YELLOW:
                baseMap = [
                    [1, 1],
                    [1, 1],
                ];
                break;
            case TetrominoType.ORANGE:
                baseMap = [
                    [1, 1],
                    [0, 1],
                    [0, 1],
                ];
                break;
            
            case TetrominoType.BLUE:
                baseMap = [
                    [1, 1],
                    [1, 0],
                    [1, 0],
                ];
                break;
            case TetrominoType.PURPLE:
                baseMap = [
                    [1, 1, 1],
                    [0, 1, 0],
                ];
                break;
        }

        let rotatedMap = [];
        switch (this.rotation) {
            case 0:
                rotatedMap = baseMap;
                break;
            case 1:
                for (let i = 0; i < baseMap.length; ++i) {
                    for (let j = 0; j < baseMap[0].length; ++j) {
                        if (!rotatedMap[j]) rotatedMap[j] = [];
                        rotatedMap[j][baseMap.length - 1 - i] = baseMap[i][j];
                    }
                }
                break;
            case 2:
                for (let i = 0; i < baseMap.length; ++i) {
                    for (let j = 0; j < baseMap[0].length; ++j) {
                        if (!rotatedMap[baseMap.length - 1 - i]) rotatedMap[baseMap.length - 1 - i] = [];
                        rotatedMap[baseMap.length - 1 - i][baseMap[0].length - 1 - j] = baseMap[i][j];
                    }
                }
                break;
            case 3:
                for (let i = 0; i < baseMap.length; ++i) {
                    for (let j = 0; j < baseMap[0].length; ++j) {
                        if (!rotatedMap[baseMap[0].length - 1 - j]) rotatedMap[baseMap[0].length - 1 - j] = [];
                        rotatedMap[baseMap[0].length - 1 - j][i] = baseMap[i][j];
                    }
                }
                break;
        }

        return rotatedMap;
    }
}

const tetrominoTypeToColor = (type, a) => {
    switch (type) 
    {
        case TetrominoType.RED:    return {r: 255, g: 0, b: 0, a: a};
        case TetrominoType.GREEN:  return {r: 0, g: 255, b: 0, a: a};
        case TetrominoType.PURPLE: return {r: 128, g: 0, b: 255, a: a};
        case TetrominoType.ORANGE: return {r: 255, g: 128, b: 0, a: a};
        case TetrominoType.CYAN:   return {r: 0, g: 255, b: 255, a: a};
        case TetrominoType.YELLOW: return {r: 255, g: 255, b: 0, a: a};
        case TetrominoType.BLUE:   return {r: 0, g: 0, b: 255, a: a};
        default:               return {r: 255, g: 0, b: 255, a: a};
    }
}

export { TetrominoType, Tetromino, tetrominoTypeToColor }