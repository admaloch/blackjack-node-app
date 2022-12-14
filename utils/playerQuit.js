const print = require('./print')

const playerLeftTable = (player) => {
    print(`${player.name} left the table`)
    player.isPlayerActive = false;
    return player;
}

// loops over players and changes isPlayerActive to false and returns as an array
const removePlayers = (player) => {
    let newPlayers = player
    let removedPlayers = []
    for (let i = 0; i < newPlayers.length; i++) {
        if (newPlayers[i].isPlayerActive) {
            print(newPlayers[i])
            newPlayers[i].isPlayerActive = false
            removedPlayers.push(newPlayers[i])
        }
        return removedPlayers;
    }
}

module.exports = { removePlayers, playerLeftTable }