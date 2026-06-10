import { Enemies } from "../data/enemies.js";

export default class Enemy {
    constructor(enemyId) {
        const def = Enemies[enemyId];
        this.id = def.id;
        this.name = def.name;
        this.maxHp = def.maxHp;
        this.hp = def.hp;
        this.attack = def.attack;
        this.defense = 0;
        this.effects = [...def.effects];
    }

    takeDamage(amount) {
        const actualDamage = Math.max(0, amount - this.defense);
        this.hp = Math.max(0, this.hp - actualDamage);
        this.defense = 0; // Reset defense after damage
        return actualDamage;
    }

    gainDefense(amount) {
        this.defense += amount;
    }

    isDead() {
        return this.hp <= 0;
    }

    getAttackValue() {
        return this.attack;
    }
}
