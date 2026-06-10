export default class Player {
    constructor() {
        this.maxHp = 50;
        this.hp = 50;
        this.maxEnergy = 3;
        this.energy = 3;
        this.deck = [];
        this.hand = [];
        this.discardPile = [];
        this.defense = 0;
    }

    takeDamage(amount) {
        const actualDamage = Math.max(0, amount - this.defense);
        this.hp = Math.max(0, this.hp - actualDamage);
        this.defense = 0; // Reset defense after damage
        return actualDamage;
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    gainDefense(amount) {
        this.defense += amount;
    }

    drawCard() {
        // If hand is empty and deck is empty, shuffle discard pile back to deck
        if (this.deck.length === 0 && this.discardPile.length > 0) {
            this.deck = this.discardPile.sort(() => Math.random() - 0.5);
            this.discardPile = [];
        }

        // Draw card if available
        if (this.deck.length > 0) {
            this.hand.push(this.deck.pop());
        }
    }

    playCard(cardIndex) {
        if (cardIndex >= 0 && cardIndex < this.hand.length) {
            const card = this.hand[cardIndex];
            this.hand.splice(cardIndex, 1);
            this.discardPile.push(card);
            return card;
        }
        return null;
    }

    resetTurn() {
        this.energy = this.maxEnergy;
        this.defense = 0;
        // Discard remaining hand
        this.discardPile.push(...this.hand);
        this.hand = [];
        // Draw new hand
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }
    }

    isDead() {
        return this.hp <= 0;
    }
}
