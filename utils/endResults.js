const dataUtils = require("./data")
const print = require('./print')

// displays final stats when player loses or leaves the table
function endGameResults() {
    dataUtils.isGameActive = false;
    const player = dataUtils.playerHands
    const space = '--------------------------------------------------'
    print(space)
    print('Game results:')
    print(space)
    print(`Rounds played: ${dataUtils.roundNum}`)
    print(space)

    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        const loss = (1000 - player[i].bank);
        const gain = (player[i].bank - 1000);
        print(`${player[i].name}:`)
        print(`Bank: $${player[i].bank}`)
        if (player[i].bank <= 1000) print(`Money lost: $${loss}`)
        else print(`Money earned: $${gain}`)
        print(space)
    }
    
    
}

module.exports = { endGameResults }