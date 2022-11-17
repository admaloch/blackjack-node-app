const dataUtils = require("./data")

// test if card type is empty before cards get dealt to avoid dealing these cards
function isCardEmpty() {
    const addDeckIndex = dataUtils.cardPossibilities.map((obj, i) => Object.assign(obj, { index: i }))
    const filterEmptyCards = addDeckIndex.filter(x => x.numInDeck == 0)
    const mapEmptyCards = filterEmptyCards.map(y => (y.index + 1))
    return mapEmptyCards
}

// subtract cards that get delt from the cardUtils.dataUtils.cardPossibilities object
function removeFromDeck(cardNames) {
    return dataUtils.cardPossibilities.filter(item => cardNames.includes(item.cardName))
        .forEach(x => x.numInDeck -= 1)
}

module.exports = { isCardEmpty, removeFromDeck }