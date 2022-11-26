const dataUtils = require("./data")
const endUtils = require("./endResults")
const print = require('./print')

const playerLeftTable = (player) =>{
    print(`${player.name} left the table`)
    dataUtils.playerLeftTable.push(player)
    player.isPlayerActive = false;

}

// loops over players and changes isPlayerActive to false and adds to players left table array
const removePlayers = () => {
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        dataUtils.playerHands[i].isPlayerActive = false
        dataUtils.playerLeftTable.push(dataUtils.playerHands[i])
        
    }
}

const quitGame = () => {
    print('You quit the game')
    removePlayers()
    endUtils.endGameResults()
    dataUtils.isGameActive = false;
}


module.exports = { quitGame, playerLeftTable }