export const Enemies = {
    goblin: {
        id: "goblin",
        name: "Goblin",
        hp: 15,
        maxHp: 15,
        attack: 3,
        effects: []
    },

    goblinArcher: {
        id: "goblinArcher",
        name: "Goblin Archer",
        hp: 12,
        maxHp: 12,
        attack: 5,
        effects: []
    },

    goblinChief: {
        id: "goblinChief",
        name: "Goblin Chief",
        hp: 25,
        maxHp: 25,
        attack: 7,
        effects: []
    },

    goblinKing: {
        id: "goblinKing",
        name: "Goblin King",
        hp: 50,
        maxHp: 50,
        attack: 10,
        effects: []
    }
};

// Simple enemy AI - just attacks
export function getEnemyAction(enemy) {
    return {
        type: "attack",
        value: enemy.attack
    };
}
