

// resets hand info in playerHands array
function handReset(player) {
        player.hand = []
        player.handValues = []
        player.sum = 0
        player.isBlackjack = false
        if (player.isBetDoubled) {
                player.isBetDoubled = false
        }
        return player;
}



module.exports = { handReset }