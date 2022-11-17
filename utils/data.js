

// array with user data

// let dealer = {
//     name: 'The dealer', hand: [], handValues: [], sum: 0
// }

let playerHands = [
    {name: 'The dealer', hand: [], handValues: [], sum: 0},
    { name: '', hand: [], handValues: [], sum: 0, bank: 1000, bet: 0, minBet: 5, betDoubled: false },
]

const dealer = playerHands[0];
const mainPlayer = playerHands[1];
let roundNum = 0;
let isGameActive = false;
let isLeaveIntro = false;
const initCardAmount = 8;

const cardPossibilities = [
    { cardName: 'Ace', cardValue: 11, numInDeck: 8 },
    { cardName: '2', cardValue: 2, numInDeck: 8 },
    { cardName: '3', cardValue: 3, numInDeck: 8 },
    { cardName: '4', cardValue: 4, numInDeck: 8 },
    { cardName: '5', cardValue: 5, numInDeck: 8 },
    { cardName: '6', cardValue: 6, numInDeck: 8 },
    { cardName: '7', cardValue: 7, numInDeck: 8 },
    { cardName: '8', cardValue: 8, numInDeck: 8 },
    { cardName: '9', cardValue: 9, numInDeck: 8 },
    { cardName: '10', cardValue: 10, numInDeck: 8 },
    { cardName: 'Jack', cardValue: 10, numInDeck: 8 },
    { cardName: 'Queen', cardValue: 10, numInDeck: 8 },
    { cardName: 'King', cardValue: 10, numInDeck: 8 },
]

let betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']

module.exports = { cardPossibilities, initCardAmount, playerHands, betOptions, dealer, mainPlayer, roundNum, isGameActive, isLeaveIntro }