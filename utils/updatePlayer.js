const dataUtils = require("./data")

// runs whenever cards are dealt and returns an updated object for the inputted player
function updatePlayerObj(cardNames, player) {
    const cardValues = cardNames.map(nums => dataUtils.cardPossibilities[nums - 1].cardValue)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.handValues.reduce((a, b) => a + b)
    return player
}









module.exports = { updatePlayerObj, genCards }