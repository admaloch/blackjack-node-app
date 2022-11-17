const dataUtils = require("./data")
const print = require('./print')


// displays final stats when player loses or leaves the table
function endGameResults() {
    const space = '--------------------------------------------------'
    const loss = (1000 - dataUtils.playerHands[0].bank);
    const gain = (dataUtils.playerHands[0].bank - 1000);
    print(space)
    print('Game results:')
    print(space)
    print(`Rounds played: ${dataUtils.roundNum}`)
    print(`Current bank: $${dataUtils.playerHands[0].bank}`)
    if (dataUtils.playerHands[0].bank <= 1000) print(`Money lost: $${loss}`)
    if (dataUtils.playerHands[0].bank > 1000) print(`Money earned: $${gain}`)
    print(space)
}

module.exports = { endGameResults }