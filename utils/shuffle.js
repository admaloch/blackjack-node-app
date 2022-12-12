const print = require('./print')
const dataUtils = require("./data")
const space = '--------------------------------------------------'
//8 decks of cards = 416 cards. 416/2 = 208.. shuffle when it gets 1/2 through
function shuffle(deck) {
    const initCardAmount = 32;
    const sum = deck.map(x => x.numInDeck).reduce((p, c) => p + c)
    if (sum < 208) {
        deck.forEach(cards => cards.numInDeck = initCardAmount)
        print('Deck is being shuffled')
        print(space)
    }
    return deck
}
module.exports = {shuffle}