const dataUtils = require("./data")

// resets hand info in playerHands array
function handReset() {
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        dataUtils.playerHands[i].hand = []
        dataUtils.playerHands[i].handValues = []
        dataUtils.playerHands[i].sum = 0
        dataUtils.playerHands[i].betDoubled = false
        dataUtils.playerHands[i].isBlackjack = false
        dataUtils.dealer.hand = []
        dataUtils.dealer.handValues = []
        dataUtils.dealer.sum = 0
        dataUtils.dealer.isBlackjack = false
    }
}

module.exports = { handReset }