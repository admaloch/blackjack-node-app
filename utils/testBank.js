const dataUtils = require("./data")
const print = require('./print')
const endUtils = require("./endResults")

// when player leaves or runs out of money
function isBankEmpty() {
    const player = dataUtils.playerHands
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (player[i].bank < 5 && player[i].isPlayerActive === true) {
            print(`${player[i].name} ran out of money and has left the table`)
            print('--------------------------------------------------')
            player[i].isPlayerActive = false
            dataUtils.playerLeftTable.push(player[i])
        }
    }
}

function isGameOver() {
    if (dataUtils.playerLeftTable.length === dataUtils.numPlayers) {
        
        endUtils.endGameResults()
        dataUtils.isGameActive = false;
    }
}



module.exports = { isBankEmpty, isGameOver }