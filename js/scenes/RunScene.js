import Scene from "./Scene.js";
import CombatScene from "./CombatScene.js";

export default class RunScene extends Scene {

    enter() {

        const run = this.game.runManager;

        const room = run.getCurrentRoom();

        document.getElementById("app").innerHTML = `
            <div class="menu">

                <h1>${run.age.name}</h1>

                <h2>
                    Room ${run.roomIndex + 1}
                    /
                    ${run.rooms.length}
                </h2>

                <p>
                    Type: ${room.type}
                </p>

                <p>
                    Enemy: ${room.enemy}
                </p>

                <button id="combatBtn">
                    BEGIN
                </button>

            </div>
        `;

        document
            .getElementById("combatBtn")
            .onclick = () => {
                this.game.sceneManager.changeScene(
                    new CombatScene(this.game, room.enemy)
                );
            };
    }
}