import { print } from "./print";
const space = '--------------------------------------------------'
import { CardObj } from "./interfaces";

//8 decks of cards = 416 cards. 416/2 = 208.. shuffle when it gets 1/2 through
export const shuffle = (deck: CardObj[], initCardAmt: number): CardObj[] => {
    const halfThruDeck = initCardAmt * 13 / 2;
    const sum = deck.map(x => x.numInDeck).reduce((p, c) => p + c)
    if (sum < halfThruDeck) {
        deck.forEach(cards => cards.numInDeck = initCardAmt)
        print('Deck is being shuffled')
        print(space)
    }
    return deck
}