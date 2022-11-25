const dataUtils = require("./data")
const endUtils = require("./endResults")
const print = require('./print')

//if player quits or leaves table

const playerLeftTable = () =>{
    
}

const removePlayers = ()=>{
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