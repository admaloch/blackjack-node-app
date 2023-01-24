"use strict";
exports.__esModule = true;
exports.addPlayers = void 0;
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1["default"])();
//add players at beginning of game
var playerArray = [];
var addPlayers = function (numPlayers) {
    for (var i = 0; i < numPlayers; i++) {
        playerArray[i] = {
            name: '',
            hand: [],
            handValues: [],
            sum: 0,
            bank: 1000,
            bet: 0,
            minBet: 5,
            betDoubled: false,
            isPlayerActive: false,
            isBlackjack: false,
            betOptions: ['$5', '$25', '$50', '$100', '$500', '$1000', 'All'],
            roundsWon: 0
        };
        var name_1 = prompt("Player ".concat(i + 1, ": Enter your name: "));
        name_1 = name_1[0].toUpperCase() + name_1.slice(1).trim();
        playerArray[i].name = name_1;
    }
    return playerArray;
};
exports.addPlayers = addPlayers;
