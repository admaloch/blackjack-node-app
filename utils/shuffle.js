const print = require('./print')
const dataUtils = require("./data")

// reset card amount in card possibilities array once 1/2 of deck used
function shuffle() {
    const space = '--------------------------------------------------'
    const sum = dataUtils.cardPossibilities.map(x => x.numInDeck).reduce((p, c) => p + c)
    //8 decks of cards = 416 cards. 416/2 = 208.. shuffle when it gets 1/2 through
    if (sum < 208) {
        dataUtils.cardPossibilities.forEach(cards => cards.numInDeck = dataUtils.initCardAmount)
        print('Deck is being shuffled')
        print(space)
    }
}
module.exports = {shuffle}