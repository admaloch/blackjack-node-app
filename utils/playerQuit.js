const dataUtils = require("./data")
const endUtils = require("./endResults")
const print = require('./print')
const space = '--------------------------------------------------'

const playerLeftTable = (player) => {
    print(`${player.name} left the table`)
    dataUtils.inactivePlayers.push(player)
    player.isPlayerActive = false;
}

// loops over players and changes isPlayerActive to false and adds to players left table array
const removePlayers = () => {
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        dataUtils.playerHands[i].isPlayerActive = false
        dataUtils.inactivePlayers.push(dataUtils.playerHands[i])

    }
}

const quitGame = () => {
    print(space)
    print('You quit the game')
    print(space)
    removePlayers()
    endUtils.endGameResults()
    dataUtils.isGameActive = false;
}


module.exports = { quitGame, playerLeftTable }