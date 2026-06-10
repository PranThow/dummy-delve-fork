import SceneManager from "./SceneManager.js";
import MenuScene from "../scenes/MenuScene.js";
import RunManager from "./RunManager.js";

export default class Game {

    constructor() {

        this.sceneManager = new SceneManager();

        this.runManager = null;

        this.sceneManager.changeScene(
            new MenuScene(this)
        );
    }
}