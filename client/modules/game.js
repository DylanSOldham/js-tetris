import { Renderer } from "./renderer.js";
import { KeyboardManager } from "./keyboardmanager.js";
import { ActorManager } from "./actormanager.js";

import { testScene0, testScene1 } from "./scenes/testScene.js";

class Game {

    constructor (canvas) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas);

        this.actorManager = new ActorManager();

        this.kb = new KeyboardManager(canvas);

        this.quitGame = false;
    }

    Run () {

        this.actorManager.loadScene(testScene1);

        this.Loop();
    }

    Loop () {
        this.Update();
        this.Render();

        if (!this.quitGame) 
        {
            requestAnimationFrame(() => this.Loop());
        }
    }

    Update () {
        this.actorManager.updateActors(this.kb);
    }

    Render () {
        this.renderer.clearScreen(0, 13, 22, 255);
        this.actorManager.renderActors(this.renderer);
    }
};

export {Game};