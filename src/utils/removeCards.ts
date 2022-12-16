import { CardObj } from "./interfaces"
import { deck } from "./deck";


// subtract the cards that get delt from the deck
export const removeFromDeck = (cardNames:string[]):CardObj[] => {
    const updatedDeck: CardObj[] = deck;
    updatedDeck.forEach(a =>
        cardNames.forEach(b =>
            a.cardName === b ? a.numInDeck-- : a))
    return updatedDeck
}

