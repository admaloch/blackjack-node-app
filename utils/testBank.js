const dataUtils = require("./data")
const endUtils = require("./endResults")
const print = require('./print')

// ends game when the player runs out of money :(
function isBankEmpty() {
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (dataUtils.playerHands[i].bank < 5) {
            print('You have run out of money')
            print('The dealer wins the game')
            endUtils.endGameResults()
            dataUtils.isGameActive = false
        }
    }
}

module.exports = { isBankEmpty }