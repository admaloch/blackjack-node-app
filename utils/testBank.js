const dataUtils = require("./data")
const print = require('./print')
const space = '--------------------------------------------------'

// when player leaves or runs out of money
function isBankEmpty(player) {
    const newPlayerObj = player
    if (player.bank < 5) {
        print(`${player.name} ran out of money and has left the table`)
        print(space)
    }
    return false;
}

//tests if there are any active players left
const isGameOver = (inactivePlayers, numPlayers) => {
    if (inactivePlayers.length === numPlayers) {
        print(space)
        print('All players have left the table')
        print(space)
        return false;
    }
}

module.exports = { isBankEmpty, isGameOver }