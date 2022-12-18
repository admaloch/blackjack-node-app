"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMinBet = exports.changeBetOptions = void 0;
// updates bet options based on amount in players bank
const changeBetOptions = (player) => {
    let betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All'];
    if (player.bank < 1000) {
        const strToNums = betOptions.map(x => parseInt(x.replace(/\D/g, "")));
        const filterBank = strToNums.filter(x => x <= player.bank);
        betOptions = filterBank.map(x => '$' + x);
        betOptions.push('All');
    }
    return betOptions;
};
exports.changeBetOptions = changeBetOptions;
// updates min bet for player based on previous bet/amount in bank
const setMinBet = (player) => {
    if (player.bet <= player.bank && !player.betDoubled) {
        return player.bet;
    }
    else if (player.bet <= player.bank && player.betDoubled === true) {
        return player.bet / 2;
    }
    else
        return 5;
};
exports.setMinBet = setMinBet;
