import { Players, Dealer } from "./interfaces"
import { CardObj } from "./interfaces";

export const genCardNames = (randNums: number[], deck: CardObj[]) => {
    const cardNames = randNums.map(nums => deck[nums - 1].cardName);
    return cardNames;
}



// runs whenever cards are dealt and returns an updated object for the inputted player
export const updatePlayerObj = (randNums: number[], cardNames: string[], deck: CardObj[], player: Players): Players => {
    const cardValues = randNums.map(nums => deck[nums - 1].cardValue)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.handValues.reduce((a, b) => a + b)
    return player
}

// runs whenever cards are dealt and returns an updated object for the inputted player
export const updateDealerObj = (randNums: number[], cardNames: string[], deck: CardObj[], dealer: Dealer): Dealer => {
    const cardValues = randNums.map(nums => deck[nums - 1].cardValue)
    dealer.hand = [...dealer.hand, ...cardNames]
    dealer.handValues = [...dealer.handValues, ...cardValues]
    dealer.sum = dealer.handValues.reduce((a, b) => a + b)
    return dealer
}
