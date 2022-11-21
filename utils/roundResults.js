const dataUtils = require("./data")

const roundResults = () => {

    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        const player = dataUtils.playerHands[i]
        const dealer = dataUtils.dealerHand

        if (dealer.isBlackjack === true) {
            print(`Dealer: Blackjack`)
        } else {
            print(`Dealer score: ${dealer.sum}`)
        }

        //both player and dealer get blackjack
        if (player.isBlackjack === true && dealer.isBlackjack === true) {
            print(`${player.name}: Blackjack -- Push`)
            player.bank += player.bet
        }
        //player gets blackjack
        if (player.isBlackjack === true && dealer.isBlackjack === false) {
            print(`${player.name}: Blackjack -- ${player.name} wins!`)
            player.bank += player.bet * 2.5
        }
        //dealer gets blackjack
        if (player.isBlackjack === false && dealer.isBlackjack === true) {
            print(`The dealer won`)
        }
        //both player and dealer bust
        if (player.sum > 21 && dealer.sum > 21) {
            print(`${player.name}'s score: ${player.sum} -- ${player.name} Bust! -- Push `)
            player.bank += player.bet
        }
        //player busts
        if (player.sum > 21 && dealer.sum < 21) {
            print(`${player.name}'s score: ${player.sum} -- ${player.name} bust! The dealer won`)
        }
        //dealer busts
        if (player.sum < 21 && dealer.sum > 21) {
            print(`${player.name}'s score: ${player.sum} -- ${player.name} won!`)
            player.bank += player.bet * 2
        }
         //player wins
         if (player.sum > dealer.sum) {
            print(`${player.name}'s score: ${player.sum} -- ${player.name} won!`)
            player.bank += player.bet * 2
        }
        //dealer wins
        else {
            print(`${player.name}'s score: ${player.sum} -- The dealer won`)
        }
        
    }

}

module.exports = { roundResults }