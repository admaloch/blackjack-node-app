"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromDeck = void 0;
const deck_1 = require("./deck");
// subtract the cards that get delt from the deck
const removeFromDeck = (cardNames) => {
    const updatedDeck = deck_1.deck;
    updatedDeck.forEach(a => cardNames.forEach(b => a.cardName === b ? a.numInDeck-- : a));
    return updatedDeck;
};
exports.removeFromDeck = removeFromDeck;
