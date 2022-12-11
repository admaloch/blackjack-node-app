const dataUtils = require("./data")
const print = require('./print')
const printEndResults = require("./endResults")
const space = '--------------------------------------------------'

// when player leaves or runs out of money
function isBankEmpty() {
    const player = dataUtils.playerHands
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (player[i].bank < 5 && player[i].isPlayerActive === true) {
            print(`${player[i].name} ran out of money and has left the table`)
            print(space)
            player[i].isPlayerActive = false
            dataUtils.inactivePlayers.push(player[i])
        }
    }
}
//tests if there are any active players left
const isGameOver = (inactivePlayers, numPlayers, isGameActive) => {
    if (inactivePlayers.length === numPlayers) {
        print(space)
        print('All players have left the table')
        print(space)
       isGameActive = false;
    }
}

module.exports = { isBankEmpty, isGameOver }