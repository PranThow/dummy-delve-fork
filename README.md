# Dummy Delve Fork

A fork of the browser-based dungeon crawler with turn-based combat, built with vanilla HTML, CSS, and JavaScript.

## Overview

Dummy Delve is a single-player roguelike with a focus on clean architecture and data-driven design. Defeat the Goblin King by progressing through procedurally generated rooms, engaging in turn-based combat, and acquiring new cards and relics as rewards.

## Features

- **Turn-Based Combat**: Strategic card-based combat system
- **Procedural Generation**: Randomly generated room layouts and enemy encounters
- **Data-Driven Design**: All content (cards, enemies, ages) defined in modular data files
- **Clean Architecture**: Modular code structure with clear separation of concerns
- **Monochrome Visual Style**: Minimalist aesthetic focusing on readability

## Tech Stack

- Vanilla HTML5
- Vanilla CSS3
- Vanilla JavaScript (ES Modules)
- No frameworks, no build tools, no external dependencies

## How to Run

1. Start a local web server in the project directory:
   ```bash
   python3 -m http.server 8000
   ```
   Or use any other local server (e.g., `php -S localhost:8000`, `npx serve`)

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

## Project Structure

```
js/
├── core/                    # Core game systems
│   ├── Game.js             # Main game controller
│   ├── SceneManager.js     # Scene switching logic
│   └── RunManager.js       # Run state management
│
├── data/                    # Data-driven content
│   ├── cards.js            # Card definitions
│   ├── enemies.js          # Enemy definitions
│   ├── ages.js             # Age/difficulty definitions
│   └── rooms.js            # Room generation logic
│
├── entities/                # Game entities
│   ├── Player.js           # Player class
│   └── Enemy.js            # Enemy class
│
├── managers/                # Game logic managers
│   ├── CombatManager.js    # Combat system
│   ├── DeckManager.js      # Deck management
│   └── ModifierManager.js  # Modifier system
│
├── scenes/                  # Game scenes
│   ├── Scene.js            # Base scene class
│   ├── MenuScene.js        # Menu
│   ├── RunScene.js         # Room exploration
│   ├── CombatScene.js      # Combat
│   └── RewardScene.js      # Reward selection
│
└── main.js                  # Entry point
```

## Game Loop

1. **Menu** - Start a new run
2. **Run Generation** - Generate Age of Goblins with procedural rooms
3. **Room Progression** - Explore through 10 rooms
4. **Combat** - Turn-based card combat
5. **Rewards** - Choose from 3 reward options
6. **Victory/Defeat** - Defeat final boss or lose HP
7. **Return to Menu**

## MVP Features Implemented

- ✅ Menu screen with start button
- ✅ Procedural run generation (Age of Goblins)
- ✅ Room progression system
- ✅ Turn-based combat scene
- ✅ Card-based player actions
- ✅ Player and enemy HP tracking
- ✅ Defense mechanics
- ✅ End turn system with enemy AI
- ✅ Reward screen
- ✅ Victory and defeat states
- ✅ Modular, data-driven architecture

## Design Principles

- **Data-Driven**: Content defined in data files, not hardcoded logic
- **Modular**: Clear separation between systems
- **Expandable**: Easy to add new cards, enemies, ages, and mechanics
- **No Magic Numbers**: All values centralized in data definitions
- **Performance**: Vanilla JS with no unnecessary overhead

## Future Expansions

- Additional ages (Dragons, Thieves, etc.)
- Relic system
- More card types and effects
- Advanced enemy behaviors
- Visual polish and animations
- Sound effects
- Difficulty modifiers
- Character progression across runs
