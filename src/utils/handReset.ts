
import { Dealer } from "./interfaces"

// resets hand info in playerHands array
export const handReset = <T extends Dealer>(player: T): T => {
        if("betDoubled" in player) player.betDoubled = false
        player.hand = []
        player.handValues = []
        player.sum = 0
        player.isBlackjack = false
        return player;
}
