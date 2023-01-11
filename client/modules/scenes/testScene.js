import { TestActor } from "../actors/testActor.js";

const testScene0 = {
    load: () => {
        let actors = [];

        actors.push(new TestActor(10, 10));
        actors.push(new TestActor(100, 100));

        return actors;
    }
}

const testScene1 = {
    load: () => {
        let actors = [];

        actors.push(new TestActor(200, 200));

        return actors;
    }
}

export {testScene0, testScene1}