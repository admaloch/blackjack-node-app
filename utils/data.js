let numPlayers = 0;
let roundNum = 0;
let isPlayerNumValid = false;
let isLeaveIntro = false;
let isGameActive = false;
const initCardAmount = 32;
let playerHands = []
let inactivePlayers = []

let dealerHand = {
    name: 'The Dealer',
    hand: [],
    handValues: [],
    sum: 0,
    isBlackJack: false,
}

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
module.exports = { numPlayers, cardPossibilities, initCardAmount, playerHands, dealerHand, roundNum, isGameActive, isLeaveIntro, isPlayerNumValid, inactivePlayers }