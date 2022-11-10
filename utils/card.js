const numsUtils = require("./nums")

// runs whenever cards are dealt
// generates hands for players
// updates hand info in the playerHands array
//updates the cardUtils.cardPossibilities array
function randomCardGen(numCards, player) {
    let emptyCardArray = isCardEmpty()
    let randomNums = []
    numsUtils.genRandomNums(numCards, emptyCardArray, randomNums)
    let cardNames = randomNums.map(nums => cardPossibilities[nums - 1].cardName)
    let cardValues = randomNums.map(nums => cardPossibilities[nums - 1].cardValue)
    let cardSum = cardValues.reduce((p, c) => p + c)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.sum += cardSum
    removeFromDeck(cardNames)
    alterAceValue(player)
}

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

// test if card type is empty before cards get dealt to avoid dealing these cards
function isCardEmpty() {
    let cardPossibilitiesAddingIndex = cardPossibilities.map((obj, i) => Object.assign(obj, { index: i }))
    const numsEqual0 = cardPossibilitiesAddingIndex.filter(x => x.numInDeck == 0)
    const emptyCardIndex = numsEqual0.map(y => (y.index + 1))
    return emptyCardIndex

}




// subtract cards that get delt from the cardUtils.cardPossibilities object
function removeFromDeck(cardNames) {
    return cardPossibilities.filter(item => cardNames.includes(item.cardName))
        .forEach(x => x.numInDeck -= 1)
}


//changes the last instance of ace from 11 to 1 as long as the players sum is > 21
function alterAceValue(player) {
    if (player.hand.includes('Ace')) {
        while (player.sum > 21) {
            let lastIndex = player.handValues.lastIndexOf(11);
            player.handValues[lastIndex] = 1
            player.sum = player.handValues.reduce((p, c) => p + c)
            if (player.handValues.includes(11) === false) break;
        }
    }
}

// generates cards but accepts an array of cards to exclude if they are empty in the card object
function randomExcluded(exclude) {
    const nums = [];
    for (let i = 1; i <= 13; i++) {
        if (!exclude.includes(i)) nums.push(i);
    }
    if (nums.length === 0) return false;
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}

module.exports = { randomCardGen, isCardEmpty, cardPossibilities }