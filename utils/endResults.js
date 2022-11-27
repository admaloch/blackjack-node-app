const dataUtils = require("./data")
const print = require('./print')
dataUtils.isGameActive = false;
const player = dataUtils.playerHands
const space = '--------------------------------------------------'

// displays final stats when game is over
function endGameResults() {
    print('Game results:')
    print(space)
    print(`Total rounds played: ${dataUtils.roundNum}`)
    print(space)
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        const loss = (1000 - player[i].bank);
        const gain = (player[i].bank - 1000);
        print(`${player[i].name}:`)
        print(`Bank: $${player[i].bank}`)
        print(`Rounds won: ${player[i].roundsWon}`)
        player[i].bank <= 1000 ? print(`Money lost: $${loss}`)
            : print(`Money earned: $${gain}`)
        print(space)
    }
}

module.exports = { endGameResults }