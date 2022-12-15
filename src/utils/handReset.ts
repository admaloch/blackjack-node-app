import { Players } from "./interfaces"

// resets hand info in playerHands array
function handReset(player: Players):Players {
        player.hand = []
        player.handValues = []
        player.sum = 0
        player.isBlackjack = false
        if (player.betDoubled) {
                player.betDoubled = false
        }
        return player;
}



module.exports = { handReset }