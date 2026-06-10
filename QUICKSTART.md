# Dummy Delve - Quick Start

## Play the Game in 3 Minutes ⏱️

### Step 1: Start a Web Server

Choose your operating system:

**macOS / Linux:**
```bash
cd /path/to/potential-webgame
python3 -m http.server 8000
```

**Windows (PowerShell):**
```powershell
cd \path\to\potential-webgame
python -m http.server 8000
```

**With Node.js (Any OS):**
```bash
npx serve
```

**With PHP (Any OS):**
```bash
php -S localhost:8000
```

### Step 2: Open in Browser

Navigate to: **http://localhost:8000**

### Step 3: Play!

1. Click **"START RUN"**
2. Click **"BEGIN"** to start combat
3. Click cards to play them
4. Click **"END TURN"** after playing cards
5. Defeat 10 rooms to win!

## What You'll See

### Menu Screen
- Title: "DUMMY DELVE"
- Button: "START RUN"

### Room Screen
- Your progress (e.g., "Room 1 / 10")
- Enemy name (e.g., "Goblin")
- "BEGIN" button

### Combat Screen
- Enemy HP bar at top
- Your HP bar below that
- Your cards at bottom
- "END TURN" button
- Combat log in middle

### Victory/Defeat
- Win: Proceed to rewards
- Lose: Return to menu

## Game Tips

1. **Energy**: You have 3 energy per turn
2. **Cards Cost Energy**: Slash costs 1, Heavy Strike costs 2
3. **Defense**: Use Guard/Fortify to reduce damage
4. **Healing**: Use Regenerate or food cards
5. **Strategy**: Mix offense and defense

## Game Stats

- **Your HP**: 50
- **Your Energy**: 3 per turn
- **Starting Deck**: 7 cards
- **Rooms per Run**: 10
- **Enemies**: 4 types

## Card Guide

### Attacks (Deal Damage)
- **Slash** (1E): 5 damage
- **Heavy Strike** (2E): 10 damage
- **Double Strike** (2E): 3+3 damage

### Defense (Reduce Damage)
- **Guard** (1E): 5 defense
- **Fortify** (2E): 10 defense

### Healing
- **Regenerate** (2E): 8 HP
- **Bread** (0E): 3 HP
- **Antidote** (1E): 5 HP

## Enemy Guide

| Enemy | HP | Attack |
|-------|-----|--------|
| Goblin | 15 | 3 |
| Goblin Archer | 12 | 5 |
| Goblin Chief | 25 | 7 |
| Goblin King | 50 | 10 |

## Strategy Examples

### Aggressive (Fast Win)
1. Play attack cards aggressively
2. End turn quickly
3. Finish enemy before taking too much damage

### Defensive (Safe Win)
1. Use Guard/Fortify to gain defense
2. Heal with Regenerate when needed
3. Attack when safe
4. Control pace of combat

### Balanced
1. Mix offensive and defensive cards
2. Heal as needed
3. Attack when you have energy
4. Adapt to enemy damage

## Keyboard vs Mouse

- **Mouse Only**: Click all buttons and cards
- **No Keyboard Needed**: Fully mouse-driven UI

## Troubleshooting

### "Module not found" error
→ Make sure your web server is running in the correct directory

### Cards don't appear
→ Refresh the page (Ctrl+R or Cmd+R)

### Enemy doesn't take damage
→ Make sure you've clicked "END TURN" to apply your damage

### Game won't start
→ Check browser console (F12) for errors

## Files to Know

- `index.html` - Start here
- `js/main.js` - Game entry
- `css/main.css` - Styling
- `README.md` - Project info
- `GAMEPLAY.md` - Full rules
- `ARCHITECTURE.md` - Technical details

## What Happens Next?

1. **You Click START RUN**
   - Game generates Age of Goblins
   - Shuffles 10 rooms with random enemies

2. **You See Room 1**
   - Enemy is randomized
   - Shows enemy name and type

3. **You Click BEGIN**
   - Combat scene loads
   - Combat starts
   - You draw 5 cards

4. **You Play Combat**
   - Click cards to play (costs energy)
   - Click "END TURN" to finish
   - Enemy attacks you
   - Repeat until one dies

5. **You Win/Lose**
   - Win: See rewards screen
   - Lose: Return to menu

6. **You Choose Reward** (if won)
   - Pick 1 of 3 rewards
   - Continue to next room

7. **You Advance Rooms**
   - Defeat all 10 enemies
   - Beat Goblin King (boss)
   - Victory!

## Play Time

- First Run: 10-15 minutes
- Normal Run: 5-10 minutes
- Challenge Run: 3-5 minutes (aggressive play)

## What's Implemented (MVP)

✅ Menu system
✅ Run generation
✅ 10 rooms per run
✅ 4 enemy types
✅ 8 cards to play
✅ Turn-based combat
✅ Energy system
✅ Defense mechanics
✅ HP tracking
✅ Victory/defeat
✅ Rewards screen
✅ Full UI

## What's NOT Implemented (Yet)

- Relics (passive bonuses)
- Multiple difficulties
- Advanced enemy AI
- Sound effects
- Animations
- Save/load
- Other ages
- Leaderboards

## Questions?

1. Read **GAMEPLAY.md** for detailed rules
2. Read **ARCHITECTURE.md** for how the game works
3. Read **DEVELOPMENT.md** to add new content
4. Check browser console (F12) for errors

## Have Fun! 🎮

Enjoy defeating goblins and building your deck!

---

**Ready?** Open your browser and play! 🚀
