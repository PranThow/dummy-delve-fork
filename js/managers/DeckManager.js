import { Cards, StarterDeck } from "../data/cards.js";

export default class DeckManager {
    constructor(player) {
        this.player = player;
        this.initializeDeck();
    }

    initializeDeck() {
        // Create starting deck from card IDs
        this.player.deck = StarterDeck
            .map(cardId => ({ ...Cards[cardId] }))
            .sort(() => Math.random() - 0.5);
        
        this.player.hand = [];
        this.player.discardPile = [];
    }

    getCardDefinition(cardId) {
        return Cards[cardId];
    }

    drawInitialHand() {
        for (let i = 0; i < 5; i++) {
            this.player.drawCard();
        }
    }

    getAllCards() {
        return {
            deck: this.player.deck.length,
            hand: this.player.hand,
            discard: this.player.discardPile.length
        };
    }
}
