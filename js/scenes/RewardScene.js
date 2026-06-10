import Scene from "./Scene.js";
import RunScene from "./RunScene.js";

export default class RewardScene extends Scene {
    constructor(game, runWon = false) {
        super(game);
        this.runWon = runWon;
    }

    enter() {
        this.render();
    }

    render() {
        const app = document.getElementById("app");

        if (this.runWon) {
            // Show victory screen
            app.innerHTML = `
                <div class="menu">
                    <h1>VICTORY!</h1>
                    <p>You defeated the Goblin King!</p>
                    <button id="menuBtn" class="btn-primary">RETURN TO MENU</button>
                </div>
            `;

            document.getElementById("menuBtn").onclick = () => {
                import("./MenuScene.js").then(module => {
                    this.game.runManager = null;
                    this.game.sceneManager.changeScene(
                        new module.default(this.game)
                    );
                });
            };
        } else {
            // Show reward selection
            app.innerHTML = `
                <div class="menu">
                    <h1>REWARDS</h1>
                    <p>Choose 1 of 3 rewards:</p>
                    
                    <div class="reward-options">
                        <button id="reward-0" class="btn-reward">
                            <span class="reward-type">NEW CARD</span>
                            <span class="reward-desc">Slash</span>
                        </button>
                        
                        <button id="reward-1" class="btn-reward">
                            <span class="reward-type">GOLD</span>
                            <span class="reward-desc">50 Gold</span>
                        </button>
                        
                        <button id="reward-2" class="btn-reward">
                            <span class="reward-type">HEALTH</span>
                            <span class="reward-desc">Heal 20 HP</span>
                        </button>
                    </div>
                </div>
            `;

            // Reward handlers
            document.getElementById("reward-0").onclick = () => {
                this.selectReward(0);
            };
            document.getElementById("reward-1").onclick = () => {
                this.selectReward(1);
            };
            document.getElementById("reward-2").onclick = () => {
                this.selectReward(2);
            };
        }
    }

    selectReward(rewardIndex) {
        // TODO: Apply reward to player state
        
        // Move to next room
        this.game.sceneManager.changeScene(
            new RunScene(this.game)
        );
    }
}
