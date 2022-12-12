const dataUtils = require("./data")

// resets hand info in playerHands array
function handReset(player) {
        player.hand = []
        player.handValues = []
        player.sum = 0
        player.betDoubled = false
        player.isBlackjack = false
        return player;
}


// dealer.hand = []
// dealer.handValues = []
// dealer.sum = 0
// dealer.isBlackJack = false

module.exports = { handReset }