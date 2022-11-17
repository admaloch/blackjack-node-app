const dataUtils = require("./data")
const endUtils = require("./endResults")

// ends game when the player runs out of money :(
    function isBankEmpty() {
        if (dataUtils.mainPlayer.bank < 5) {
            print('You have run out of money')
            print('The dealer wins the game')
            endUtils.endGameResults()
            dataUtils.isGameActive = false
        }
    }

    module.exports = { isBankEmpty }