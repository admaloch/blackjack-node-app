let deck = require("./deck")

function genCardNames(randNums){
    const cardNames = randNums.map(nums => deck[nums - 1].cardName);
    return cardNames;
}
// runs whenever cards are dealt and returns an updated object for the inputted player
function updatePlayerObj(randNums, cardNames, player) {
    
    const cardValues = randNums.map(nums => deck[nums - 1].cardValue)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.handValues.reduce((a, b) => a + b)
    return player
}

module.exports = { updatePlayerObj, genCardNames }