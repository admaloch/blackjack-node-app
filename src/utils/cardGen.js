"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.removeFromDeck = exports.cardNamesArr = exports.dealCards = void 0;
var dealCards = function (deck, player, numCards) {
    var emptyCardArr = testForEmptyCards(deck);
    var randNumsArr = genRandomNums(numCards, emptyCardArr);
    var updatedPlayer = updatePlayerObj(randNumsArr, deck, player);
    return updatedPlayer;
};
exports.dealCards = dealCards;
// test for and generates an array of empty cards from the main deck
var testForEmptyCards = function (deck) {
    var addDeckIndex = deck.map(function (obj, i) { return Object.assign(obj, { index: i }); });
    var filterEmptyCards = addDeckIndex.filter(function (x) { return x.numInDeck == 0; });
    var mapEmptyCards = filterEmptyCards.map(function (y) { return (y.index + 1); });
    return mapEmptyCards;
};
//generates a random arry based on numCards, and filters empty cards if needed
var genRandomNums = function (numCards, emptyCardArr) {
    var randomNums = [];
    for (var i = 0; i < numCards; i++) {
        emptyCardArr.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCardArr));
    }
    return randomNums;
};
// --- returns random number that excludes empty cards in deck-- only runs in the unlikely event any cards run out
//takes array of empty numbers from the deck
//loops from 1-13 and adds the indexes that are not in the empty array to a new array
// ex. empty array = [4,6] nums = [1,2,3,5,7,8,9,10,11,12,13]
//save a random number to var randomIndex based on length of nums[]
//return nums[randomIndex] - this will gen a random number that was not included in the empty array input
var randomExcluded = function (emptyCardArr) {
    var nums = [];
    for (var i = 1; i <= 13; i++) {
        if (!emptyCardArr.includes(i))
            nums.push(i);
    }
    var randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
};
//use the randNumsArr to interate over the deck and determine the correct cardNames
var genCardNames = function (randNumsArr, deck) {
    var cardNamesArr = randNumsArr.map(function (nums) { return deck[nums - 1].cardName; });
    return cardNamesArr;
};
//does the same but for card values ^
var genCardValues = function (randNumsArr, deck) {
    var cardValuesArr = randNumsArr.map(function (nums) { return deck[nums - 1].cardValue; });
    return cardValuesArr;
};
exports.cardNamesArr = [];
// runs whenever cards are dealt and returns an updated object for the inputted player
var updatePlayerObj = function (randNumsArr, deck, player) {
    exports.cardNamesArr = genCardNames(randNumsArr, deck);
    var cardValuesArr = genCardValues(randNumsArr, deck);
    player.hand = __spreadArray(__spreadArray([], player.hand, true), exports.cardNamesArr, true);
    player.handValues = __spreadArray(__spreadArray([], player.handValues, true), cardValuesArr, true);
    player.sum = player.handValues.reduce(function (a, b) { return a + b; });
    player = alterAceValue(player);
    return player;
};
//changes the last index of ace from 11 to 1 as long as the players sum is > 21
var alterAceValue = function (player) {
    if (player.hand.includes('Ace')) {
        while (player.sum > 21) {
            var lastIndex = player.handValues.lastIndexOf(11);
            player.handValues[lastIndex] = 1;
            player.sum = player.handValues.reduce(function (p, c) { return p + c; });
            if (!player.handValues.includes(11))
                break;
        }
    }
    return player;
};
// subtract the cards that get delt from the deck
var removeFromDeck = function (deck, cardNamesArr) {
    var updatedDeck = deck;
    updatedDeck.forEach(function (a) {
        return cardNamesArr.forEach(function (b) {
            return a.cardName === b ? a.numInDeck-- : a;
        });
    });
    return updatedDeck;
};
exports.removeFromDeck = removeFromDeck;
