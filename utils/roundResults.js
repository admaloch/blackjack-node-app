const dataUtils = require("./data")
const print = require('./print')

const roundResults = () => {
    const space = '--------------------------------------------------'
    const player = dataUtils.playerHands
    const dealer = dataUtils.dealerHand
    print(`Round ${dataUtils.roundNum} results: `)
    print(space)
    if (dealer.isBlackJack) {
        print(`Dealer: Blackjack`)
    } else if (dealer.sum > 21) {
        print('Dealer bust')
    } else {
        print(`Dealer sum: ${dealer.sum}`)
    }
    print(space)
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (player[i].isPlayerActive === true) {
            //both player and dealer get blackjack
            if (player[i].isBlackjack === true && dealer.isBlackJack === true) {
                print(`${player[i].name}: Blackjack -- Push`)
                player[i].bank += player[i].bets
            }//player gets blackjack
            else if (player[i].isBlackjack === true && dealer.isBlackJack === false) {
                print(`${player[i].name}: Blackjack -- ${player[i].name} wins!`)
                player[i].bank += player[i].bet * 2.5
            }//dealer gets blackjack
            else if (player[i].isBlackjack === false && dealer.isBlackJack === true) {
                print(`${player[i].name}'s sum: ${player[i].sum} -- The dealer won`)
            }//both player and dealer bust
            else if (player[i].sum > 21 && dealer.sum > 21) {
                print(`${player[i].name}'s sum: ${player[i].sum} -- ${player[i].name} Bust! -- Push `)
                player[i].bank += player[i].bet
            }//player busts
            else if (player[i].sum > 21 && dealer.sum <= 21) {
                print(`${player[i].name}'s sum: ${player[i].sum} -- ${player[i].name} bust! The dealer won`)
            }//dealer busts
            else if (player[i].sum <= 21 && dealer.sum > 21) {
                print(`${player[i].name}'s sum: ${player[i].sum} -- ${player[i].name} won!`)
                player[i].bank += player[i].bet * 2
            }//player wins
            else if (player[i].sum > dealer.sum) {
                print(`${player[i].name}'s sum: ${player[i].sum} -- ${player[i].name} won!`)
                player[i].bank += player[i].bet * 2
            } //push
            else if (player[i].sum === dealer.sum) {
                print(`${player[i].name}'s sum: ${player[i].sum} -- Push`)
                player[i].bank += player[i].bet
            }//dealer wins
            else {
                print(`${player[i].name}'s sum: ${player[i].sum} -- The dealer won`)
            }
        }
    }
    print(space)
}

module.exports = { roundResults }