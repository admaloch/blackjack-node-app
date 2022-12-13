const dataUtils = require("./data")


// subtract the cards that get delt from the deck
const removeFromDeck = (cardNames) => {
    const updatedDeck = dataUtils.cardPossibilities
    updatedDeck.forEach(a =>
        cardNames.forEach(b =>
            a.cardName === b ? a.numInDeck-- : a))
    return updatedDeck
}

module.exports = { removeFromDeck } 