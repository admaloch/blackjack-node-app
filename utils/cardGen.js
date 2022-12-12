const dataUtils = require("./data")

//generates a random arry based on number input
const genCards = (numCards) => {
    const randomNumArr = randomNums(numCards)
    const cardNames = randomNumArr.map(nums => dataUtils.cardPossibilities[nums - 1].cardName)
    return cardNames;
}

//returns an array of random nums from 1-13 based on user numCards input and wether any cards are empty
const randomNums = (numcards) => {
    let emptyCardArray = testForEmptyCards()
    let randomNums = []
    for (let i = 0; i < numCards; i++) {
        emptyCardArray.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCardArray))
    }
    return randomNums;
}

// test for and generates an array of empty cards from the main deck
function testForEmptyCards() {
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










module.exports = { genCards }