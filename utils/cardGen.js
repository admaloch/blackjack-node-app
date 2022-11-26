const dataUtils = require("./data")
const numsUtils = require("./genNums")
const aceUtils = require("./alterAce")
const testDeckUtils = require("./testDeck")

// runs whenever cards are dealt
// generates hands for players
// updates hand info in the playerHands array
//updates the cardPossibilities array
function randomCardGen(numCards, player) {
    let emptyCardArray = testDeckUtils.isCardEmpty()
    let randomNums = []
    numsUtils.genRandomNums(numCards, emptyCardArray, randomNums)
    let cardNames = randomNums.map(nums => dataUtils.cardPossibilities[nums - 1].cardName)
    let cardValues = randomNums.map(nums => dataUtils.cardPossibilities[nums - 1].cardValue)
    let cardSum = cardValues.reduce((p, c) => p + c)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.sum += cardSum
    testDeckUtils.removeFromDeck(cardNames)
    aceUtils.alterAceValue(player)
}

module.exports = { randomCardGen }