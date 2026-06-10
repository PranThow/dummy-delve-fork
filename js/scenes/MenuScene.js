import RunManager from "../core/RunManager.js";
import RunScene from "./RunScene.js";
import Scene from "./Scene.js";

export default class MenuScene extends Scene {

    enter() {

        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="menu">

                <h1>DUMMY DELVE</h1>

                <button id="startBtn">
                    START RUN
                </button>

            </div>
        `;

        document
            .getElementById("startBtn")
            .onclick = () => {

                this.game.runManager =
                    new RunManager();

                this.game.sceneManager.changeScene(
                    new RunScene(this.game)
                );
            };
    }
}