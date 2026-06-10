import { Cards } from "../data/cards.js";
import { getEnemyAction } from "../data/enemies.js";
import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import DeckManager from "./DeckManager.js";

export default class CombatManager {
    constructor() {
        this.player = new Player();
        this.enemy = null;
        this.deckManager = new DeckManager(this.player);
        this.combatLog = [];
        this.combatOver = false;
        this.playerWon = false;
    }

    startCombat(enemyId) {
        this.enemy = new Enemy(enemyId);
        this.deckManager.initializeDeck();
        this.deckManager.drawInitialHand();
        this.combatLog = [];
        this.combatOver = false;
        this.playerWon = false;
    }

    playCard(cardIndex) {
        if (cardIndex < 0 || cardIndex >= this.player.hand.length) {
            return { success: false, message: "Invalid card index" };
        }

        const card = this.player.hand[cardIndex];

        // Check energy cost
        if (card.cost > this.player.energy) {
            return { success: false, message: "Not enough energy" };
        }

        // Apply card effects
        this.applyCardEffects(card);
        this.player.energy -= card.cost;

        this.combatLog.push(`Played ${card.name}`);

        this.checkCombatOver();

        return { success: true, card, combatOver: this.combatOver };
    }

    applyCardEffects(card) {
        for (const effect of card.effects) {
            this.applyEffect(effect);
        }
    }

    applyEffect(effect) {
        let target;
        if (effect.target === "player") {
            target = this.player;
        } else if (effect.target === "enemy") {
            target = this.enemy;
        }

        if (!target) return;

        switch (effect.stat) {
            case "hp":
                if (effect.operation === "add") {
                    if (effect.value < 0) {
                        const damage = Math.abs(effect.value);
                        target.takeDamage(damage);
                        this.combatLog.push(
                            `${effect.target === "player" ? "Player" : "Enemy"} took ${damage} damage`
                        );
                    } else {
                        target.heal(effect.value);
                        this.combatLog.push(
                            `${effect.target === "player" ? "Player" : "Enemy"} healed ${effect.value} HP`
                        );
                    }
                }
                break;

            case "defense":
                if (effect.operation === "add") {
                    target.gainDefense(effect.value);
                    this.combatLog.push(
                        `${effect.target === "player" ? "Player" : "Enemy"} gained ${effect.value} defense`
                    );
                }
                break;
        }
    }

    endPlayerTurn() {
        // If the enemy is already dead, do not let it take a turn.
        if (this.enemy.isDead()) {
            this.combatOver = true;
            this.playerWon = true;
            this.combatLog.push("Enemy defeated!");
            return;
        }

        // Enemy turn
        this.enemyTurn();

        this.checkCombatOver();

        if (!this.combatOver) {
            // Start new player turn
            this.player.resetTurn();
        }
    }

    enemyTurn() {
        const action = getEnemyAction(this.enemy);
        
        if (action.type === "attack") {
            const damageDealt = this.player.takeDamage(action.value);
            this.combatLog.push(
                `${this.enemy.name} attacked for ${damageDealt} damage`
            );
        }
    }

    checkCombatOver() {
        if (this.enemy && this.enemy.isDead()) {
            this.combatOver = true;
            this.playerWon = true;
            if (!this.combatLog.includes("Enemy defeated!")) {
                this.combatLog.push("Enemy defeated!");
            }
            return;
        }

        if (this.player && this.player.isDead()) {
            this.combatOver = true;
            this.playerWon = false;
            if (!this.combatLog.includes("Player defeated!")) {
                this.combatLog.push("Player defeated!");
            }
        }
    }

    getState() {
        return {
            playerHp: this.player.hp,
            playerMaxHp: this.player.maxHp,
            playerEnergy: this.player.energy,
            playerMaxEnergy: this.player.maxEnergy,
            playerDefense: this.player.defense,
            hand: this.player.hand,
            enemyName: this.enemy.name,
            enemyHp: this.enemy.hp,
            enemyMaxHp: this.enemy.maxHp,
            combatLog: this.combatLog,
            combatOver: this.combatOver,
            playerWon: this.playerWon
        };
    }
}
