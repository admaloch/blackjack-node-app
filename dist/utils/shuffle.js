"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffle = void 0;
const print_1 = require("./print");
const space = '--------------------------------------------------';
//8 decks of cards = 416 cards. 416/2 = 208.. shuffle when it gets 1/2 through
const shuffle = (deck, initCardAmt) => {
    const halfThruDeck = initCardAmt * 13 / 2;
    const sum = deck.map(x => x.numInDeck).reduce((p, c) => p + c);
    if (sum < halfThruDeck) {
        deck.forEach(cards => cards.numInDeck = initCardAmt);
        (0, print_1.print)('Deck is being shuffled');
        (0, print_1.print)(space);
    }
    return deck;
};
exports.shuffle = shuffle;
