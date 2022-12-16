
import { print } from "./print"
const space = '--------------------------------------------------'
import { Players, Dealer } from "./interfaces"

export const roundResults = (player: Players, dealer: Dealer): Players => {
        //scenarios if player or dealer get blackjack
        if (player.isBlackjack && dealer.isBlackjack) {
            print(`${player.name}: Blackjack -- Push`)
            player.bank += player.bet
        } else if (player.isBlackjack && !dealer.isBlackjack) {
            print(`${player.name}: Blackjack! -- ${player.name} wins!`)
            player.bank += player.bet * 2.5
            player.roundsWon++
        } else if (!player.isBlackjack && dealer.isBlackjack) {
            print(`${player.name}'s sum: ${player.sum} -- The dealer won`)
        } else if (player.sum > 21 && dealer.isBlackjack) {
            print(`${player.name}'s sum: ${player.sum} -- ${player.name} bust -- The dealer won`)
        }

        //scenarios if player or dealer bust 
        else if (player.sum > 21 && dealer.sum > 21) {
            print(`${player.name}'s sum: ${player.sum} -- ${player.name} Bust! -- Push `)
            player.bank += player.bet
        } else if (player.sum > 21 && dealer.sum <= 21) {
            print(`${player.name}'s sum: ${player.sum} -- bust! The dealer won`)
        } else if (player.sum <= 21 && dealer.sum > 21) {
            print(`${player.name}'s sum: ${player.sum} -- ${player.name} won!`)
            player.bank += player.bet * 2
            player.roundsWon++
        }

        //if neither player nor dealer bust 
        else if (player.sum > dealer.sum) {
            print(`${player.name}'s sum: ${player.sum} -- ${player.name} won!`)
            player.bank += player.bet * 2
            player.roundsWon++
        } else if (player.sum === dealer.sum) {
            print(`${player.name}'s sum: ${player.sum} -- Push`)
            player.bank += player.bet
        } else {
            print(`${player.name}'s sum: ${player.sum} -- The dealer won`)
        }
    print(space)
    return player;
}

