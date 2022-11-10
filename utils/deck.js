const cardUtils = require("./card")
// reset card amount in card possibilities array once 1/2 of deck used
function shuffle() {
    const sum = cardUtils.cardPossibilities.map(x => x.numInDeck).reduce((p, c) => p + c)
    if (sum < 52) {
        cardUtils.cardPossibilities.forEach(cards => cards.numInDeck = initCardAmount)
        console.log('Deck is being shuffled')
        console.log(space)
    }
}

module.exports = {shuffle}