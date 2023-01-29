

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
        this.rotation = 0; // Increments of 90 degrees clockwise from up.
        this.xPos = 0;
        this.yPos = 0;
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
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                ];
                break;
            case TetrominoType.GREEN:
                baseMap = [
                    0, 1, 0, 0,
                    0, 1, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 0,
                ];
                break;
            case TetrominoType.RED:
                baseMap = [
                    0, 0, 1, 0,
                    0, 1, 1, 0,
                    0, 1, 0, 0,
                    0, 0, 0, 0,
                ];
                break;
            case TetrominoType.YELLOW:
                baseMap = [
                    0, 0, 0, 0,
                    0, 1, 1, 0,
                    0, 1, 1, 0,
                    0, 0, 0, 0,
                ];
                break;
            case TetrominoType.ORANGE:
                baseMap = [
                    0, 0, 0, 0,
                    0, 1, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 1, 0,
                ];
                break;
            
            case TetrominoType.BLUE:
                baseMap = [
                    0, 0, 0, 0,
                    0, 1, 1, 0,
                    0, 1, 0, 0,
                    0, 1, 0, 0,
                ];
                break;
            case TetrominoType.PURPLE:
                baseMap = [
                    0, 0, 1, 0,
                    0, 1, 1, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 0,
                ];
                break;
        }

        let rotatedMap = [];

        switch (this.rotation) {
            case 0:
                rotatedMap = baseMap;
                break;
            case 1:
                for (let i = 0; i < rotatedMap.length(); ++i) {
                    let x = i%4 - 2;
                    let y = Math.floor(i/4) - 2;
                    let newX = -y + 2;
                    let newY = x + 2;
                    rotatedMap[i] = baseMap[newX + 4*newY]
                }
                break;
            case 2:
                for (let i = 0; i < rotatedMap.length(); ++i) {
                    let x = i%4 - 2;
                    let y = Math.floor(i/4) - 2;
                    let newX = -x + 2;
                    let newY = -y + 2;
                    rotatedMap[i] = baseMap[newX + 4*newY]
                }
                break;
            case 3:
                for (let i = 0; i < rotatedMap.length(); ++i) {
                    let x = i%4 - 2;
                    let y = Math.floor(i/4) - 2;
                    let newX = y + 2;
                    let newY = -x + 2;
                    rotatedMap[i] = baseMap[newX + 4*newY]
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