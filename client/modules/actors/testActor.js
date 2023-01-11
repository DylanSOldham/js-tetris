import { Logger } from "../logger.js";

class TestActor {

    constructor () {
        this.x = 10;
        this.y = 10;
        this.speed = 3;
    }

    Update (kb) {
        if (kb.isKeyDown("ArrowUp")) this.y -= this.speed;
        if (kb.isKeyDown("ArrowDown")) this.y += this.speed;
        if (kb.isKeyDown("ArrowLeft")) this.x -= this.speed;
        if (kb.isKeyDown("ArrowRight")) this.x += this.speed;
    }

    Render (renderer) 
    {
        renderer.drawRect(this.x, this.y, 100, 100, {r: 255});
    }
};

const testActor = new TestActor();

export { testActor };