export default class SceneManager {

    constructor() {
        this.currentScene = null;
    }

    changeScene(scene) {

        if (this.currentScene) {
            this.currentScene.exit();
        }

        this.currentScene = scene;
        this.currentScene.enter();
    }
}