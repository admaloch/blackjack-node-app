const dataUtils = require("./data")

// resets hand info in playerHands array
function handReset() {
    dataUtils.playerHands[0].hand = []
    dataUtils.playerHands[0].handValues = []
    dataUtils.playerHands[0].sum = 0
    dataUtils.playerHands[0].betDoubled = false
    dataUtils.playerHands[0].isBlackjack = false
    dataUtils.dealer.hand = []
    dataUtils.dealer.handValues = []
    dataUtils.dealer.sum = 0
    dataUtils.dealer.isBlackjack = false
}

module.exports = { handReset }