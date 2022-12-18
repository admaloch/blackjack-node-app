"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDealerObj = exports.updatePlayerObj = exports.genCardNames = void 0;
const genCardNames = (randNums, deck) => {
    const cardNames = randNums.map(nums => deck[nums - 1].cardName);
    return cardNames;
};
exports.genCardNames = genCardNames;
// runs whenever cards are dealt and returns an updated object for the inputted player
const updatePlayerObj = (randNums, cardNames, deck, player) => {
    const cardValues = randNums.map(nums => deck[nums - 1].cardValue);
    player.hand = [...player.hand, ...cardNames];
    player.handValues = [...player.handValues, ...cardValues];
    player.sum = player.handValues.reduce((a, b) => a + b);
    return player;
};
exports.updatePlayerObj = updatePlayerObj;
// runs whenever cards are dealt and returns an updated object for the inputted player
const updateDealerObj = (randNums, cardNames, deck, dealer) => {
    const cardValues = randNums.map(nums => deck[nums - 1].cardValue);
    dealer.hand = [...dealer.hand, ...cardNames];
    dealer.handValues = [...dealer.handValues, ...cardValues];
    dealer.sum = dealer.handValues.reduce((a, b) => a + b);
    return dealer;
};
exports.updateDealerObj = updateDealerObj;
