import { UIActor } from "../actors/UIActor.js"

const Scene_Tetris = {
    load: () => {
        let actors = [];

        actors.push(new UIActor());

        return actors;
    }
};

export { Scene_Tetris };