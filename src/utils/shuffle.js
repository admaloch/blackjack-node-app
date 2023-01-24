"use strict";
exports.__esModule = true;
exports.shuffle = void 0;
var print_1 = require("./print");
var space = '--------------------------------------------------';
//8 decks of cards = 416 cards. 416/2 = 208.. shuffle when it gets 1/2 through
var shuffle = function (deck, initCardAmt) {
    var halfThruDeck = initCardAmt * 13 / 2;
    var sum = deck.map(function (x) { return x.numInDeck; }).reduce(function (p, c) { return p + c; });
    if (sum < halfThruDeck) {
        deck.forEach(function (cards) { return cards.numInDeck = initCardAmt; });
        (0, print_1.print)('Deck is being shuffled');
        (0, print_1.print)(space);
    }
    return deck;
};
exports.shuffle = shuffle;
