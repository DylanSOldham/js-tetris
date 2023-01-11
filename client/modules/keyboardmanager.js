
class KeyboardManager {

    constructor (canvas) 
    {
        this.keysdown = {};
        this.keysjustdown = {};
        this.keysjustup = {};

        canvas.addEventListener("keydown", (event) => {
            this.keysdown[event.code] = true;
            this.keysjustdown[event.code] = true;
            event.preventDefault();
        });

        canvas.addEventListener("keyup", (event) => {
            this.keysdown[event.code] = false;
            this.keysjustup[event.code] = true;
        });
    }

    refreshKeys () {
        this.keysjustdown = {};
        this.keysjustup = {};
    }

    isKeyDown (code) {
        return this.keysdown[code];
    }

    isKeyJustDown (code) {
        return this.keysjustdown[code];
    }

    isKeyJustUp (code) {
        return this.keysjustup[code];
    }

}

export { KeyboardManager };