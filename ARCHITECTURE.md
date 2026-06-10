# Dummy Delve - Architecture Guide

## Core Systems

### 1. Game (js/core/Game.js)
**Responsibility**: Main game controller
- Creates and owns the SceneManager
- Manages the RunManager (created when a run starts)
- Entry point for all game logic

**Key Methods**:
- `constructor()`: Initialize game and show menu

### 2. SceneManager (js/core/SceneManager.js)
**Responsibility**: Scene lifecycle and transitions
- Tracks current scene
- Handles scene changes
- Calls `exit()` on old scene, `enter()` on new scene

**Key Methods**:
- `changeScene(scene)`: Switch to a new scene
- Scenes override `enter()` and `exit()` for lifecycle

### 3. RunManager (js/core/RunManager.js)
**Responsibility**: Single run state
- Owns current age and room list
- Tracks player progress through rooms
- Manages room progression

**Key Methods**:
- `getCurrentRoom()`: Get room at current index
- `nextRoom()`: Advance to next room

## Data Layer

### 1. Cards (js/data/cards.js)
**Structure**: Card definitions with effects
```javascript
{
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
}
```

**Effect Operations**:
- `add`: Add to stat (negative for subtract)
- `multiply`: Multiply stat
- `set`: Set stat to exact value

### 2. Enemies (js/data/enemies.js)
**Structure**: Enemy definitions
```javascript
{
    id: "goblin",
    name: "Goblin",
    hp: 15,
    maxHp: 15,
    attack: 3,
    effects: []
}
```

### 3. Ages (js/data/ages.js)
**Structure**: Age/difficulty definitions
```javascript
{
    id: "goblins",
    name: "Age of Goblins",
    roomCount: 10,
    enemies: ["goblin", "goblinArcher", ...],
    boss: "goblinKing",
    modifiers: []
}
```

### 4. Rooms (js/data/rooms.js)
**Responsibility**: Room generation
- Generates rooms procedurally based on age
- Creates combat and boss rooms
- Random enemy selection from age pool

## Entity Layer

### 1. Player (js/entities/Player.js)
**Responsibility**: Player state and mechanics
**Properties**:
- `hp`, `maxHp`: Health tracking
- `energy`, `maxEnergy`: Action points per turn
- `deck`, `hand`, `discardPile`: Card management
- `defense`: Temporary damage reduction

**Key Methods**:
- `takeDamage()`: Receive damage (reduced by defense)
- `heal()`: Restore HP
- `gainDefense()`: Add temporary defense
- `playCard()`: Move card from hand to discard
- `resetTurn()`: Clear hand, refill from deck, reset energy
- `isDead()`: Check defeat condition

### 2. Enemy (js/entities/Enemy.js)
**Responsibility**: Enemy state and mechanics
**Properties**: 
- `hp`, `maxHp`: Health tracking
- `attack`: Damage per turn
- `defense`: Temporary damage reduction

**Key Methods**:
- `takeDamage()`: Receive damage
- `gainDefense()`: Add temporary defense
- `isDead()`: Check defeat condition

## Manager Layer

### 1. DeckManager (js/managers/DeckManager.js)
**Responsibility**: Deck initialization and card management
**Key Methods**:
- `initializeDeck()`: Create starting deck from StarterDeck
- `drawInitialHand()`: Draw 5 cards at combat start
- `getCardDefinition()`: Fetch card data

### 2. CombatManager (js/managers/CombatManager.js)
**Responsibility**: Combat system core logic
**Properties**:
- `player`: Player entity
- `enemy`: Current enemy entity
- `deckManager`: Deck management
- `combatLog`: History of combat events
- `combatOver`, `playerWon`: Combat state

**Key Methods**:
- `startCombat(enemyId)`: Initialize combat
- `playCard(cardIndex)`: Player plays a card
- `applyCardEffects(card)`: Process card effects
- `applyEffect(effect)`: Apply single effect
- `endPlayerTurn()`: Enemy turn + state check
- `enemyTurn()`: Simple AI (just attack)
- `getState()`: Return full combat state for UI

### 3. ModifierManager (js/managers/ModifierManager.js)
**Responsibility**: Modifier system (expandable for future)
**Purpose**: Apply stat modifications without hardcoding
**Key Methods**:
- `addModifier()`: Add a modifier
- `applyModifiers()`: Calculate modified stat
- `getModifiersForStat()`: Get modifiers for specific stat

## Scene Layer

### Base Scene (js/scenes/Scene.js)
**Responsibility**: Scene interface
```javascript
class Scene {
    constructor(game) { }
    enter() { }      // Called when scene becomes active
    exit() { }       // Called when scene is replaced
    render() { }     // Update UI (optional)
}
```

### MenuScene (js/scenes/MenuScene.js)
**Flow**: Show title and start button
- Displays "DUMMY DELVE" title
- "START RUN" button creates RunManager and goes to RunScene

### RunScene (js/scenes/RunScene.js)
**Flow**: Room exploration
- Shows current age and room number
- Displays enemy name
- "BEGIN" button starts CombatScene

### CombatScene (js/scenes/CombatScene.js)
**Flow**: Turn-based combat
- Renders player/enemy HP bars
- Displays playable cards
- Handles card clicks
- "END TURN" button triggers enemy turn
- On victory: "NEXT" button goes to RewardScene
- On defeat: "RETURN TO MENU" button goes back

### RewardScene (js/scenes/RewardScene.js)
**Flow**: Reward selection or victory
- Post-combat: Choose 1 of 3 rewards
- Victory: Show win screen
- Returns to RunScene or MenuScene

## Data Flow

### Initialization
```
Game
  → SceneManager
    → MenuScene.enter()
```

### Starting a Run
```
MenuScene
  → RunManager created
  → RunScene.enter()
    → Shows current room
```

### Starting Combat
```
RunScene.enter()
  → CombatScene created (with enemyId)
  → CombatManager.startCombat(enemyId)
    → Creates Player, Enemy, DeckManager
    → Draws initial hand
  → CombatScene.render()
```

### Playing Cards
```
Player clicks card
  → CombatScene.playCard(index)
    → CombatManager.playCard(index)
      → applyCardEffects()
        → applyEffect() for each effect
      → Reduce energy
  → CombatScene.render() (update UI)
```

### Enemy Turn
```
Player clicks "END TURN"
  → CombatManager.endPlayerTurn()
    → enemyTurn()
      → Player.takeDamage()
    → Check combat state
    → Player.resetTurn()
  → CombatScene.render()
```

### Combat End
```
Enemy.isDead() or Player.isDead()
  → combatOver = true
  → playerWon = true/false
  → CombatScene.render()
    → Show "NEXT" or "RETURN TO MENU"
```

## Design Patterns

### Data-Driven
- All content in data files (cards, enemies, ages)
- No hardcoded game logic
- Easy to expand with new content

### Manager Pattern
- DeckManager: Card deck operations
- CombatManager: Combat rules and logic
- ModifierManager: Stat modifications

### Scene Pattern
- Each scene owns its UI rendering
- Scenes are stateless except for initialization
- Scene transitions through SceneManager

### Effect System
- Cards defined with effects array
- Effects are data-driven operations
- Easy to add new effect types

## Extensibility

### Adding New Cards
```javascript
// In js/data/cards.js
export const Cards = {
    newCard: {
        id: "newCard",
        name: "New Card",
        description: "Does something cool",
        cost: 1,
        type: "attack",
        effects: [
            { target: "enemy", stat: "hp", operation: "add", value: -10 }
        ]
    }
};

// Add to StarterDeck if desired
export const StarterDeck = [
    ...,
    "newCard"
];
```

### Adding New Enemies
```javascript
// In js/data/enemies.js
export const Enemies = {
    newEnemy: {
        id: "newEnemy",
        name: "New Enemy",
        hp: 20,
        maxHp: 20,
        attack: 4,
        effects: []
    }
};
```

### Adding New Ages
```javascript
// In js/data/ages.js
export const Ages = {
    newAge: {
        id: "newAge",
        name: "Age of Something",
        roomCount: 10,
        enemies: ["enemy1", "enemy2"],
        boss: "bossenemy",
        modifiers: []
    }
};
```

### Adding New Effect Types
```javascript
// In CombatManager.applyEffect()
case "newStat":
    if (effect.operation === "newOp") {
        // Handle new operation
    }
    break;
```

## File Organization

```
js/
├── core/                 # Core game systems
│   ├── Game.js          # Main controller
│   ├── SceneManager.js  # Scene transitions
│   └── RunManager.js    # Run state
│
├── data/                 # Game content (data-driven)
│   ├── cards.js         # Card definitions
│   ├── enemies.js       # Enemy definitions
│   ├── ages.js          # Age definitions
│   └── rooms.js         # Room generation
│
├── entities/             # Game entities (stateful)
│   ├── Player.js        # Player entity
│   └── Enemy.js         # Enemy entity
│
├── managers/             # Game logic (stateless)
│   ├── CombatManager.js # Combat system
│   ├── DeckManager.js   # Deck management
│   └── ModifierManager.js # Modifiers (future)
│
├── scenes/               # UI scenes
│   ├── Scene.js         # Base class
│   ├── MenuScene.js     # Menu
│   ├── RunScene.js      # Room exploration
│   ├── CombatScene.js   # Combat
│   └── RewardScene.js   # Rewards
│
├── ui/                   # UI components (future)
├── utils/                # Utility functions
│   └── helpers.js       # Helper functions
│
└── main.js              # Entry point
```

## Performance Considerations

1. **No Re-renders on Every Update**: Scenes only render when needed
2. **Efficient DOM Updates**: Entire scene re-rendered as string
3. **No Animation Library**: Vanilla CSS for performance
4. **Minimal Allocations**: Reuse objects where possible
5. **Card Effects Array**: Fast lookup for effect processing

## Future Enhancements

1. **Relics System**: Add passive effects
2. **Spell Cards**: New card type with special mechanics
3. **Status Effects**: Poison, vulnerable, etc.
4. **Advanced AI**: Enemy decision-making based on board state
5. **Animations**: CSS transitions and keyframes
6. **Sound**: Audio feedback for actions
7. **Save/Load**: Persist run state
8. **Multiple Ages**: Dragons, Thieves, etc.
