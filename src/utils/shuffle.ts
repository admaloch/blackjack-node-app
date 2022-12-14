const print = require('./print')
const space = '--------------------------------------------------'
//8 decks of cards = 416 cards. 416/2 = 208.. shuffle when it gets 1/2 through
function shuffle(deck, initCardAmt) {
    const halfThruDeck = initCardAmt * 13/2;
    const sum = deck.map(x => x.numInDeck).reduce((p, c) => p + c)
    if (sum < halfThruDeck) {
        deck.forEach(cards => cards.numInDeck = initCardAmt)
        print('Deck is being shuffled')
        print(space)
    }
    return deck
}
module.exports = {shuffle}