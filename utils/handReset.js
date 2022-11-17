const dataUtils = require("./data")

// resets hand info in playerHands array
function handReset() {
    dataUtils.mainPlayer.hand = []
    dataUtils.mainPlayer.handValues = []
    dataUtils.mainPlayer.sum = 0
    dataUtils.mainPlayer.betDoubled = false
    dataUtils.dealer.hand = []
    dataUtils.dealer.handValues = []
    dataUtils.dealer.sum = 0
}

module.exports = { handReset }