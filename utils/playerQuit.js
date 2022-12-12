
const print = require('./print')



const playerLeftTable = (player) => {
    print(`${player.name} left the table`)
    player.isPlayerActive = false;
    return player;
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

module.exports = { playerLeftTable, removePlayers }