const dataUtils = require("./data")
const endUtils = require("./endResults")
const print = require('./print')
const space = '--------------------------------------------------'


const playerLeftTable = (player) => {
    print(`${player.name} left the table`)
    dataUtils.inactivePlayers.push(player)
    player.isPlayerActive = false;
}


// loops over players and changes isPlayerActive to false and returns as an array
const removePlayers = (player) => {
    const removedPlayers = []
    for (let i = 0; i < player.length; i++) {
        if (player[i].isPlayerActive) {
            player[i].isPlayerActive = false
            removedPlayers.push(player[i])
        }
        return removedPlayers;
    }
}

//if a player quits the game -- entire game is done
const quitGame = (player) => {
    print(space)
    print(`${player} quit the game`)
    print(space)
    const printResults = endUtils.endGameResults()
    return printResults
}
module.exports = { quitGame, playerLeftTable, removePlayers }