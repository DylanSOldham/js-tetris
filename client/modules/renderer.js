import { Logger } from "./logger.js";

const makeColor = (r, g, b, a) => {
    return `rgba(${r || 0}, ${g || 0}, ${b || 0}, ${a || 255})`;
}

class Renderer {

    constructor (canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.imageCache = {};

        this.CoordSystem = {
            UI: {xoff: 0, yoff: 0, xscale: canvas.width, yscale: canvas.height},
            SCREEN: {xoff: 0, yoff: 0, xscale: 1, yscale: 1},
        };

        if (!this.ctx) 
        {
            Logger.err("Canvas 2D Context was null");
        }

        window.addEventListener("resize", () => {
            this.CoordSystem.UI.xscale = canvas.width;
            this.CoordSystem.UI.yscale = canvas.height;
        });
    }

    clearScreen (r, g, b, a) {
        this.ctx.fillStyle = makeColor(r, g, b, a);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect (x, y, w, h, color, cs = this.CoordSystem.SCREEN) {
        this.ctx.fillStyle = makeColor(color.r, color.g, color.b, color.a);
        this.ctx.globalAlpha = color.a / 255;
        this.ctx.fillRect(cs.xscale*x + cs.xoff, cs.yscale*y + cs.yoff, cs.xscale*w, cs.yscale*h);
        this.ctx.globalAlpha = 255;
    }

    loadImage(imagePath) {
        let img = document.createElement("img");
        img.src = imagePath;
        this.imageCache[imagePath] = img;
    }

    drawImage(x, y, w, h, imagePath, cs = this.CoordSystem.SCREEN) {

        if (!this.imageCache[imagePath]) {
            this.loadImage(imagePath);
            Logger.err("Error: Image not loaded: " + imagePath);
            return;
        }

        this.ctx.drawImage(
            this.imageCache[imagePath], 
            cs.xscale*x + cs.xoff, cs.yscale*y + cs.yoff, 
            cs.xscale*w, cs.yscale*h
        );
    }
};

export { Renderer };