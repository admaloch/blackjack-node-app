const dataUtils = require("./data")

// resets hand info in playerHands array
function handReset() {
    const player = dataUtils.playerHands
    const dealer = dataUtils.dealerHand[0]
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        player[i].hand = []
        player[i].handValues = []
        player[i].sum = 0
        player[i].betDoubled = false
        player[i].isBlackjack = false
        dealer.hand = []
        dealer.handValues = []
        dealer.sum = 0
        dealer.isBlackjack = false
    }
}

module.exports = { handReset }