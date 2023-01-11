import { Logger } from "./logger.js";

class ActorManager {

    constructor () {
        this.actors = [];
        this.nextActorId = 0;
    }

    addActor (actor, tags) 
    {
        if (!actor.Update && !actor.Render) {
            Logger.err("Actor must have an Update or Render function: " + JSON.stringify(actor));
            return;
        }

        actor.id = this.nextActorId++;
        actor.tags = tags;
        actor.delete = false;

        this.actors.push(actor);
    }

    updateActors (kb) {
        for (let i = 0; i < this.actors.length; ++i) {
            let actor = this.actors[i];

            if (!actor.delete) {
                actor.Update?.(kb);
            } else {
                this.actors.splice(index, 1);
            }
        }
    }

    renderActors (renderer) {
        for (let actor of this.actors) {
            actor.Render?.(renderer);
        }
    }
};

export { ActorManager };