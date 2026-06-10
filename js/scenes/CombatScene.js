import Scene from "./Scene.js";
import CombatManager from "../managers/CombatManager.js";
import RewardScene from "./RewardScene.js";
import RunScene from "./RunScene.js";

export default class CombatScene extends Scene {
    constructor(game, enemyId) {
        super(game);
        this.enemyId = enemyId;
        this.combatManager = new CombatManager();
    }

    enter() {
        this.combatManager.startCombat(this.enemyId);
        this.render();
    }

    render() {
        const state = this.combatManager.getState();
        const app = document.getElementById("app");

        // Calculate health bar percentages
        const playerHealthPercent = (state.playerHp / state.playerMaxHp) * 100;
        const enemyHealthPercent = (state.enemyHp / state.enemyMaxHp) * 100;

        let html = `
            <div class="combat">
                <div class="combat-header">
                    <div class="enemy-section">
                        <h2>${state.enemyName}</h2>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${enemyHealthPercent}%"></div>
                            <p>${state.enemyHp} / ${state.enemyMaxHp}</p>
                        </div>
                    </div>
                    
                    <div class="player-section">
                        <h2>You</h2>
                        <div class="health-bar">
                            <div class="health-fill" style="width: ${playerHealthPercent}%"></div>
                            <p>${state.playerHp} / ${state.playerMaxHp}</p>
                        </div>
                        ${state.playerDefense > 0 ? `<p class="defense">Defense: ${state.playerDefense}</p>` : ""}
                    </div>
                </div>

                <div class="combat-log">
                    ${state.combatLog.map(log => `<p>${log}</p>`).join("")}
                </div>

                <div class="hand-section">
                    <p>Energy: ${state.playerEnergy} / ${state.playerMaxEnergy}</p>
                    <div class="hand">
        `;

        // Render hand
        state.hand.forEach((card, index) => {
            const canPlay = card.cost <= state.playerEnergy;
            html += `
                <div class="card ${canPlay ? "playable" : "disabled"}" ${canPlay ? `id="card-${index}"` : ""}>
                    <div class="card-name">${card.name}</div>
                    <div class="card-cost">${card.cost}</div>
                    <div class="card-desc">${card.description}</div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
        `;

        if (!state.combatOver) {
            html += `
                <button id="endTurnBtn" class="btn-primary">END TURN</button>
            `;
        } else {
            if (state.playerWon) {
                html += `
                    <button id="nextBtn" class="btn-primary">NEXT</button>
                `;
            } else {
                html += `
                    <button id="menuBtn" class="btn-primary">RETURN TO MENU</button>
                `;
            }
        }

        html += `</div>`;

        app.innerHTML = html;

        // Attach event listeners
        if (!state.combatOver) {
            // Card click handlers
            state.hand.forEach((card, index) => {
                const cardElement = document.getElementById(`card-${index}`);
                if (cardElement && card.cost <= state.playerEnergy) {
                    cardElement.onclick = () => this.playCard(index);
                }
            });

            // End turn button
            document.getElementById("endTurnBtn").onclick = () => {
                this.combatManager.endPlayerTurn();
                this.render();
            };
        } else {
            if (state.playerWon) {
                document.getElementById("nextBtn").onclick = () => {
                    this.game.runManager.nextRoom();
                    
                    // Check if run is over (defeated boss)
                    const room = this.game.runManager.getCurrentRoom();
                    if (room.type === "boss" && this.game.runManager.roomIndex >= this.game.runManager.rooms.length - 1) {
                        // Player won the run
                        this.game.sceneManager.changeScene(
                            new RewardScene(this.game, true)
                        );
                    } else {
                        // Show rewards for regular combat
                        this.game.sceneManager.changeScene(
                            new RewardScene(this.game, false)
                        );
                    }
                };
            } else {
                document.getElementById("menuBtn").onclick = () => {
                    import("./MenuScene.js").then(module => {
                        this.game.runManager = null;
                        this.game.sceneManager.changeScene(
                            new module.default(this.game)
                        );
                    });
                };
            }
        }
    }

    playCard(index) {
        const result = this.combatManager.playCard(index);
        if (result.success) {
            this.render();
        }
    }
}
