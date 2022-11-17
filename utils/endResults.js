const dataUtils = require("./data")
const print = require('./print')


// displays final stats when player loses or leaves the table
function endGameResults() {
    const space = '--------------------------------------------------'
    const loss = (1000 - dataUtils.mainPlayer.bank);
    const gain = (dataUtils.mainPlayer.bank - 1000);
    print(space)
    print('Game results:')
    print(space)
    print(`Rounds played: ${dataUtils.roundNum}`)
    print(`Current bank: $${dataUtils.mainPlayer.bank}`)
    if (dataUtils.mainPlayer.bank <= 1000) print(`Money lost: $${loss}`)
    if (dataUtils.mainPlayer.bank > 1000) print(`Money earned: $${gain}`)
    print(space)
}

module.exports = { endGameResults }