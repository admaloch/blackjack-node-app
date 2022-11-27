const dataUtils = require("./data")
const endUtils = require("./endResults")
const print = require('./print')
const space = '--------------------------------------------------'
const player = dataUtils.playerHands

const playerLeftTable = (player) => {
    print(`${player.name} left the table`)
    dataUtils.inactivePlayers.push(player)
    player.isPlayerActive = false;
}

// loops over players and changes isPlayerActive to false and adds to inactive array
const removePlayers = () => {
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (player[i].isPlayerActive) {
            player[i].isPlayerActive = false
            dataUtils.inactivePlayers.push(player[i])
        }
    }
}

//if a player quits the game -- entire game is done
const quitGame = (player) => {
    print(space)
    print(`${player} quit the game`)
    print(space)
    removePlayers()
    endUtils.endGameResults()
    dataUtils.isGameActive = false;
}
module.exports = { quitGame, playerLeftTable }