let deck = require("./deck")
import { Players, Dealer } from "./interfaces"

function genCardNames(randNums: number[]){
    const cardNames = randNums.map(nums => deck[nums - 1].cardName);
    return cardNames;
}
// runs whenever cards are dealt and returns an updated object for the inputted player
function updatePlayerObj(randNums:number[], cardNames:string[], player: Players | Dealer):Players | Dealer {
    
    const cardValues = randNums.map(nums => deck[nums - 1].cardValue)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.handValues.reduce((a, b) => a + b)
    return player
}

module.exports = { updatePlayerObj, genCardNames }