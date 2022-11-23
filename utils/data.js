let numPlayers = 0;
let roundNum = 0;
let isPlayerNumValid = false;
let isLeaveIntro = false;
let isGameActive = false;
const initCardAmount = 32;

let dealerHand = [{ name: 'The Dealer', hand: [], handValues: [], sum: 0, isBlackJack: false }]


let playerHands = [
// { name: '', hand: [], handValues: [], sum: 0, bank: 1000, bet: 0, minBet: 5, betDoubled: false, isPlayerActive: false, isBlackjack: false },
]

let playerGotBlackjack = []

const cardPossibilities = [
    { cardName: 'Ace', cardValue: 11, numInDeck: 32 },
    { cardName: '2', cardValue: 2, numInDeck: 32 },
    { cardName: '3', cardValue: 3, numInDeck: 32 },
    { cardName: '4', cardValue: 4, numInDeck: 32 },
    { cardName: '5', cardValue: 5, numInDeck: 32 },
    { cardName: '6', cardValue: 6, numInDeck: 32 },
    { cardName: '7', cardValue: 7, numInDeck: 32 },
    { cardName: '8', cardValue: 8, numInDeck: 32 },
    { cardName: '9', cardValue: 9, numInDeck: 32 },
    { cardName: '10', cardValue: 10, numInDeck: 32 },
    { cardName: 'Jack', cardValue: 10, numInDeck: 32 },
    { cardName: 'Queen', cardValue: 10, numInDeck: 32 },
    { cardName: 'King', cardValue: 10, numInDeck: 32 },
]

let betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']

module.exports = { numPlayers, cardPossibilities, initCardAmount, playerHands, betOptions, dealerHand, roundNum, isGameActive, isLeaveIntro, isPlayerNumValid, playerGotBlackjack }