const print = require('./print')
const dataUtils = require("./data")

// reset card amount in card possibilities array once 1/2 of deck used
function shuffle() {
    const space = '--------------------------------------------------'
    const sum = dataUtils.cardPossibilities.map(x => x.numInDeck).reduce((p, c) => p + c)
    if (sum < 52) {
        dataUtils.cardPossibilities.forEach(cards => cards.numInDeck = dataUtils.initCardAmount)
        print('Deck is being shuffled')
        print(space)
    }
}
module.exports = {shuffle}