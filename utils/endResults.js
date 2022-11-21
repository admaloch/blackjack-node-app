const dataUtils = require("./data")
const print = require('./print')

// displays final stats when player loses or leaves the table
function endGameResults() {
    const space = '--------------------------------------------------'
    print(space)
    print('Game results:')
    print(`Rounds played: ${dataUtils.roundNum}`)
    print(space)
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        const loss = (1000 - dataUtils.playerHands[i].bank);
        const gain = (dataUtils.playerHands[i].bank - 1000);
        print(`${dataUtils.playerHands[i]}:`)
        print(`Bank: $${dataUtils.playerHands[i].bank}`)
        if (dataUtils.playerHands[i].bank <= 1000) print(`Money lost: $${loss}`)
        else print(`Money earned: $${gain}`)
        print(space)
    }
}

module.exports = { endGameResults }