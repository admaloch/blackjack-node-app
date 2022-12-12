const dataUtils = require("./data")

// runs whenever cards are dealt
function randomCardGen(numCards) {
    let emptyCardArray = isCardEmpty()
    let randonNums = []
    for (let i = 0; i < numCards; i++) {
        emptyCardArray.length === 0
            ? randonNums.push(Math.floor(Math.random() * 13) + 1)
            : randonNums.push(randomExcluded(emptyCardArray))
    }
    return randonNums;
}

const cardNames = (randomNums) => {
   return randomNums.map(nums => dataUtils.cardPossibilities[nums - 1].cardName)
} 

const cardValues = (randomNums) => {
    return randomNums.map(nums => dataUtils.cardPossibilities[nums - 1].cardValue)
} 

const cardSum = () => cardValues.reduce((p, c) => p + c)

// test if card is empty and add to an array
function isCardEmpty() {
    const addDeckIndex = dataUtils.cardPossibilities.map((obj, i) => Object.assign(obj, { index: i }))
    const filterEmptyCards = addDeckIndex.filter(x => x.numInDeck == 0)
    const mapEmptyCards = filterEmptyCards.map(y => (y.index + 1))
    return mapEmptyCards
}

//takes an array of numbers and gens random num that excludes them
function randomExcluded(exclude) {
    const nums = [];
    for (let i = 1; i <= 13; i++) {
        if (!exclude.includes(i)) nums.push(i);
    }
    if (nums.length === 0) return false;
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}

// subtract the cards that get delt from the deck
const removeCardsFromDeck = (deck) => {
    return deck.filter(item => cardNames().includes(item.cardName))
        .forEach(x => x.numInDeck -= 1)
}



module.exports = { randomCardGen, cardNames, cardValues, cardSum, removeCardsFromDeck }