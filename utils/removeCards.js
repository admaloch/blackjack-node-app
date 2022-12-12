const dataUtils = require("./data")

// subtract the cards that get delt from the deck
const removeFromDeck = (deck, cardNames) => {
    return deck.filter(item => cardNames.includes(item.cardName))
        .forEach(x => x.numInDeck -= 1)
}

module.exports = {removeFromDeck} 