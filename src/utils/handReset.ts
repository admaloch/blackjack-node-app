import { Players, Dealer } from "./interfaces"

// resets hand info in playerHands array
export const handReset = (player: Players | Dealer): Players | Dealer => {
        player.hand = []
        player.handValues = []
        player.sum = 0
        player.isBlackjack = false
        if (player.betDoubled) {
                player.betDoubled = false
        }
        return player;
}
