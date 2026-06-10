# Dummy Delve - Development Guide

## Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code recommended)
- Basic understanding of JavaScript ES Modules

### Running the Game

1. **Start a Local Server**
   ```bash
   # Using Python 3
   cd /path/to/potential-webgame
   python3 -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (with npx/npm)
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

2. **Open in Browser**
   - Navigate to `http://localhost:8000`
   - Game should start showing menu

### Project Structure
```
potential-webgame/
├── index.html           # Entry HTML
├── css/
│   └── main.css        # All styling
├── js/
│   ├── main.js         # Entry point
│   ├── core/           # Core systems
│   ├── data/           # Content definitions
│   ├── entities/       # Game entities
│   ├── managers/       # Game logic
│   ├── scenes/         # UI scenes
│   ├── ui/             # UI components (empty)
│   └── utils/          # Helper functions
├── README.md           # Project overview
├── GAMEPLAY.md         # How to play
├── ARCHITECTURE.md     # Technical design
└── DEVELOPMENT.md      # This file
```

## Adding New Content

### Adding a New Card

1. **Edit `js/data/cards.js`**:
```javascript
export const Cards = {
    // ... existing cards ...
    
    powerStrike: {
        id: "powerStrike",
        name: "Power Strike",
        description: "Deal 15 damage",
        cost: 3,
        type: "attack",
        effects: [
            {
                target: "enemy",
                stat: "hp",
                operation: "add",
                value: -15
            }
        ]
    }
};
```

2. **Optional: Add to Starter Deck**
```javascript
export const StarterDeck = [
    "slash",
    "slash",
    "slash",
    "guard",
    "bread",
    "bread",
    "antidote",
    "powerStrike"  // Add here
];
```

3. **Test**: Start a new game and verify card appears in hand

### Adding a New Enemy

1. **Edit `js/data/enemies.js`**:
```javascript
export const Enemies = {
    // ... existing enemies ...
    
    goblinShaman: {
        id: "goblinShaman",
        name: "Goblin Shaman",
        hp: 18,
        maxHp: 18,
        attack: 6,
        effects: []
    }
};
```

2. **Add to Age Enemies Pool** (`js/data/ages.js`):
```javascript
export const Ages = {
    goblins: {
        // ...
        enemies: [
            "goblin",
            "goblin",
            "goblinArcher",
            "goblinChief",
            "goblinShaman"  // Add here
        ],
        // ...
    }
};
```

3. **Test**: Generate a new run and encounter the new enemy

### Adding a New Effect Type

1. **Add Effect Data Structure** (document in card definition):
```javascript
// New effect type example:
{
    target: "player",
    stat: "maxHp",      // New stat
    operation: "add",
    value: 5
}
```

2. **Handle in `CombatManager.applyEffect()`**:
```javascript
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
            // ... existing code ...
            break;
        
        case "defense":
            // ... existing code ...
            break;
        
        case "maxHp":  // New effect type
            if (effect.operation === "add") {
                target.maxHp += effect.value;
                this.combatLog.push(
                    `${effect.target === "player" ? "Player" : "Enemy"} max HP increased by ${effect.value}`
                );
            }
            break;
    }
}
```

3. **Add to Card Definition**:
```javascript
export const Cards = {
    fortifyBody: {
        id: "fortifyBody",
        name: "Fortify Body",
        description: "Permanently gain 5 max HP",
        cost: 3,
        type: "skill",
        effects: [
            {
                target: "player",
                stat: "maxHp",
                operation: "add",
                value: 5
            }
        ]
    }
};
```

## Common Tasks

### Add a New Skill Card (Defensive)

1. Add to `cards.js`:
```javascript
shieldWall: {
    id: "shieldWall",
    name: "Shield Wall",
    description: "Gain 20 defense",
    cost: 2,
    type: "skill",
    effects: [
        {
            target: "player",
            stat: "defense",
            operation: "add",
            value: 20
        }
    ]
}
```

2. Test by playing in combat

### Modify Enemy Difficulty

Edit `js/data/enemies.js`:
```javascript
goblinArcher: {
    id: "goblinArcher",
    name: "Goblin Archer",
    hp: 12,      // Change HP
    maxHp: 12,
    attack: 5,   // Change attack power
    effects: []
}
```

### Change Room Count

Edit `js/data/ages.js`:
```javascript
goblins: {
    // ...
    roomCount: 15,  // Was 10, now 15 rooms
    // ...
}
```

## Debugging

### Using Browser Console

1. **Open DevTools**: F12 or Ctrl+Shift+I
2. **Check Console Tab** for errors
3. **View Network Tab** for failed requests

### Common Issues

**Error: Module not found**
- Check file paths (case-sensitive on Linux)
- Ensure `.js` extension on imports
- Verify file exists

**Card doesn't appear**
- Check it's added to `StarterDeck` in cards.js
- Verify card ID matches import

**Enemy not spawning**
- Check it's added to age `enemies` array
- Verify enemy ID in `Enemies` object

**Combat not starting**
- Check CombatScene imports
- Verify enemy ID exists in `Enemies`

### Debug Logging

Add to `CombatManager`:
```javascript
playCard(cardIndex) {
    console.log(`Playing card at index ${cardIndex}`);
    console.log(`Card:`, this.player.hand[cardIndex]);
    const result = this.combatManager.playCard(cardIndex);
    console.log(`Result:`, result);
    return result;
}
```

## Performance Tips

1. **Minimize DOM Updates**: Only re-render when necessary
2. **Use Event Delegation**: Single listener vs. multiple
3. **Cache Frequently Used Elements**
4. **Avoid Inline Styles**: Use CSS classes

## Code Style Guidelines

### File Organization
- One class per file (with rare exceptions)
- Clear file names matching class names
- Logical grouping in folders

### Naming Conventions
```javascript
// Classes: PascalCase
class PlayerManager { }

// Functions/Methods: camelCase
function playCard() { }

// Constants: UPPER_SNAKE_CASE
const MAX_HP = 50;

// IDs: kebab-case
id="start-btn"
```

### Comments
```javascript
// Single line comments for clarity
const hp = player.hp; // Current health

// Multi-line for complex logic
/**
 * Applies card effect to target
 * @param {Object} effect - Effect definition
 * @param {string} effect.target - "player" or "enemy"
 */
function applyEffect(effect) {
    // Implementation
}
```

## Testing Checklist

When adding new features:

- [ ] Game starts without errors
- [ ] Menu button works
- [ ] New run generates
- [ ] Rooms display correctly
- [ ] Combat starts without errors
- [ ] Cards play and apply effects
- [ ] Enemy attacks work
- [ ] Victory/defeat states trigger
- [ ] Rewards screen shows
- [ ] Returning to menu works
- [ ] Multiple runs work sequentially

## Next Steps for Development

### Short Term (Easy Additions)
1. Add more card types
2. Add more enemy types
3. Increase room count
4. Add visual polish (CSS)

### Medium Term (Moderate Features)
1. Implement relic system
2. Add status effects (poison, etc.)
3. Create new age (Dragons)
4. Add advanced enemy AI

### Long Term (Major Systems)
1. Difficulty modifiers
2. Character progression (meta)
3. Leaderboard/scoring
4. Save/load system
5. Animation system
6. Sound system

## Resources

### JavaScript ES Modules
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ES6 Module Syntax](https://javascript.info/modules)

### Game Development Patterns
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [MVC Pattern for Games](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

### Web Standards
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)

## Getting Help

1. **Check existing code**: Look at similar implementations
2. **Read ARCHITECTURE.md**: Understand system design
3. **Console logging**: Debug with `console.log()`
4. **Browser DevTools**: Use to inspect HTML/CSS
5. **Check imports**: Ensure all dependencies are imported

## Version History

- v0.1.0: MVP Implementation
  - Menu scene
  - Run generation
  - Turn-based combat
  - Card system
  - Basic enemies
  - Reward system

Happy developing!
