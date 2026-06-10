export const Cards = {
    // Attack cards
    slash: {
        id: "slash",
        name: "Slash",
        description: "Deal 5 damage",
        cost: 1,
        type: "attack",
        effects: [
            {
                target: "enemy",
                stat: "hp",
                operation: "add",
                value: -5
            }
        ]
    },

    heavyStrike: {
        id: "heavyStrike",
        name: "Heavy Strike",
        description: "Deal 10 damage",
        cost: 2,
        type: "attack",
        effects: [
            {
                target: "enemy",
                stat: "hp",
                operation: "add",
                value: -10
            }
        ]
    },

    doubleStrike: {
        id: "doubleStrike",
        name: "Double Strike",
        description: "Deal 3 damage twice",
        cost: 2,
        type: "attack",
        effects: [
            {
                target: "enemy",
                stat: "hp",
                operation: "add",
                value: -3
            },
            {
                target: "enemy",
                stat: "hp",
                operation: "add",
                value: -3
            }
        ]
    },

    // Skill cards
    guard: {
        id: "guard",
        name: "Guard",
        description: "Gain 5 defense",
        cost: 1,
        type: "skill",
        effects: [
            {
                target: "player",
                stat: "defense",
                operation: "add",
                value: 5
            }
        ]
    },

    fortify: {
        id: "fortify",
        name: "Fortify",
        description: "Gain 10 defense",
        cost: 2,
        type: "skill",
        effects: [
            {
                target: "player",
                stat: "defense",
                operation: "add",
                value: 10
            }
        ]
    },

    regenerate: {
        id: "regenerate",
        name: "Regenerate",
        description: "Heal 8 HP",
        cost: 2,
        type: "skill",
        effects: [
            {
                target: "player",
                stat: "hp",
                operation: "add",
                value: 8
            }
        ]
    },

    // Item cards
    bread: {
        id: "bread",
        name: "Bread",
        description: "Heal 3 HP",
        cost: 0,
        type: "item",
        effects: [
            {
                target: "player",
                stat: "hp",
                operation: "add",
                value: 3
            }
        ]
    },

    antidote: {
        id: "antidote",
        name: "Antidote",
        description: "Heal 5 HP",
        cost: 1,
        type: "item",
        effects: [
            {
                target: "player",
                stat: "hp",
                operation: "add",
                value: 5
            }
        ]
    }
};

// Starting deck for new runs
export const StarterDeck = [
    "slash",
    "slash",
    "slash",
    "guard",
    "bread",
    "bread",
    "antidote"
];
