"use strict";
exports.__esModule = true;
exports.setMinBet = exports.changeBetOptions = void 0;
// updates bet options based on amount in players bank
var changeBetOptions = function (player) {
    var betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All'];
    if (player.bank < 1000) {
        var strToNums = betOptions.map(function (x) { return parseInt(x.replace(/\D/g, "")); });
        var filterBank = strToNums.filter(function (x) { return x <= player.bank; });
        betOptions = filterBank.map(function (x) { return '$' + x; });
        betOptions.push('All');
    }
    return betOptions;
};
exports.changeBetOptions = changeBetOptions;
// updates min bet for player based on previous bet/amount in bank
var setMinBet = function (player) {
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
