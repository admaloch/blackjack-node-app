const print = require('./utils/print')
const cardUtils = require("./utils/card")
const shuffleUtils = require("./utils/shuffle")
const dataUtils = require("./utils/data")
const endUtils = require("./utils/endResults")
const betUtils = require("./utils/betOptions")
const resetUtils = require("./utils/handReset")
const bankUtils = require("./utils/testBank")
const hideDealerUtils = require("./utils/hideDealer")
const prompt = require('prompt-sync')()

const dealer = dataUtils.playerHands[0];
const mainPlayer = dataUtils.playerHands[1];

// Begin game
const space = '--------------------------------------------------'
print(space)
print('Welcome to the Blackjack table')
print(space)
let name = prompt('What is your name? ')
name = name[0].toUpperCase() + name.slice(1).trim()
dataUtils.mainPlayer.name = name


while (!dataUtils.isLeaveIntro) {
    print(space)
    let begin = prompt(`Welcome ${name}. Are you ready to start the game? (Yes or No) `).trim().toLowerCase()
    if (begin == 'yes' || begin == 'ya' || begin == 'y') {
        print(space)
        print('Type quit anytime to leave the table');
        print(space)
        for (let i = 0; i < dataUtils.playerHands.length; i++) {
            print(`${dataUtils.playerHands[i].name} has entered the table`)
        }
        print(space)
        dataUtils.isLeaveIntro = true;
        dataUtils.isGameActive = true;
    } else if (begin == 'no' || begin == 'nope' || begin == 'n') {
        print(space)
        print('Feel free to return and play again later')
        dataUtils.isLeaveIntro = true;
        print(space)
    }
    else {
        print(space)
        print('Invalid response. Respond with (Yes or No)')
    }
}




// begin game loop
while (dataUtils.isGameActive) {
    print(`Current bank: $${mainPlayer.bank} -- Minimum bet: $${mainPlayer.minBet}`)
    // Bets -- prompts the user for a bet until a valid bet is placed or the user quits the game
    let isBetValid = false
    while (isBetValid !== true) {
        mainPlayer.bet = prompt(`Place your bet using any combination of the available chips (${dataUtils.betOptions}) `)
        print(space)
        let betNotNum = mainPlayer.bet.trim().toLowerCase()
        mainPlayer.bet = parseInt(mainPlayer.bet.replace(/\D/g, ""))
        if (mainPlayer.bet % 5 === 0 && mainPlayer.bet >= mainPlayer.minBet && mainPlayer.bet <= mainPlayer.bank || betNotNum === 'all') {
            if (betNotNum === 'all') {
                mainPlayer.bet = mainPlayer.bank
            }
            dataUtils.roundNum++
            mainPlayer.bank -= mainPlayer.bet
            print(`Current bet: $${mainPlayer.bet} -- Current bank: $${mainPlayer.bank}`)
            cardUtils.randomCardGen(2, dealer)
            cardUtils.randomCardGen(2, mainPlayer)
            print(`The dealer's hand: ${hideDealerUtils.hideDearlerCards(dealer.hand)}`)
            print(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
            print(space)
            isBetValid = true
        }
        else {
            if (betNotNum === 'quit' || betNotNum === 'q') {
                print('You left the table')
                endUtils.endGameResults()
                isBetValid = true
                dataUtils.isGameActive = false
            } else if (mainPlayer.minBet === 5 && bet < 5) {
                print('Bet amount is too low. $5 is the minimum bid')
            } else if (mainPlayer.minBet > 5 && mainPlayer.bet < mainPlayer.minBet) {
                print(`Minimum bet: $${mainPlayer.minBet}. Amount can't be lower than the bet from the previous round.`)
            } else if (mainPlayer.bet > mainPlayer.bank) {
                print('Bet is too high. The amount cannot exceed the value in your bank')
            } else {
                print('Invalid input. Make sure your bet is a valid number and is a combination of the available chips')
            }
        }
    }

    //if mainplayer gets blackjack
    if (mainPlayer.sum === 21) {
        print('Blackjack!')
        print(space)
        print(`The dealer's hand revealed: ${dealer.hand} -- Total: ${dealer.sum} `)
        if (dealer.sum !== 21) {
            print(space)
            print('You win!')
            mainPlayer.bank += mainPlayer.bet * 2.5
            print(space)
        } else {
            print(space)
            print('The dealer got a blackjack!')
            print(space)
            print('Push!')
            print(space)
            mainPlayer.bank += mainPlayer.bet * 1
        }
    }

    // if player doesn't get blackjack and has to draw
    else {
        let hitOrStay = ''
        // determine if bank is big enough for doubleup
        if (mainPlayer.bet <= mainPlayer.bank) {
            let doubleUp = prompt("Double up? (Yes or No) ").trim().toLowerCase()
            while (doubleUp !== 'yes' && doubleUp !== 'y' && doubleUp !== 'no' && doubleUp !== 'n' && doubleUp !== 'quit' && doubleUp !== 'q') {
                doubleUp = prompt("Invalid response. Pick (Yes or No) ")
            }
            if (doubleUp === 'yes' || doubleUp === 'y') {
                print(space)
                mainPlayer.betDoubled = true
                mainPlayer.bank -= mainPlayer.bet
                mainPlayer.bet = mainPlayer.bet * 2
                print(`Doubled bet: $${mainPlayer.bet} -- Current bank: $${mainPlayer.bank}`)
                cardUtils.randomCardGen(1, mainPlayer)
                print(`You hit: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
                hitOrStay = 'stay'
            } else if (doubleUp === 'quit' || doubleUp === 'q') {
                print('You have left the table')
                endUtils.endGameResults()
                dataUtils.isGameActive = false
            }
            else {
                hitOrStay = ''
                print(space)
            }
        }  // loop option to hit or stay until player chooses stay or busts

        while (hitOrStay !== 'stay' && hitOrStay !== 's' && hitOrStay !== 'quit' && hitOrStay !== 'q'
            && mainPlayer.sum < 21 && dataUtils.isGameActive !== false) {
            hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
            if (hitOrStay === 'hit' || hitOrStay === 'h') {
                cardUtils.randomCardGen(1, mainPlayer)
                print(`You hit: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
            }
            else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                print('You have left the table')
                endUtils.endGameResults()
                dataUtils.isGameActive = false
            } else if (hitOrStay === 'stay' || hitOrStay === 's') {
                print('You have decided to stay')
            }
            else {
                print(`Invalid resonse. Pick hit or stay`)
            }
        }

        // if player busts
        if (mainPlayer.sum > 21) {
            print(space)
            print('Bust!')
            print(space)
            print(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
            print('Dealer wins!')
            print(space)
        }

        // if user chooses to stay or gets 21 (non blackjack)
        else if (hitOrStay === 'stay' || hitOrStay === 's' || mainPlayer.sum === 21) {
            print(space)
            print(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
            print(space)
            // if blackjack.. dealer wins
            if (dealer.sum === 21) {
                print('Blackjack!')
                print(space)
                print('Dealer wins!')
                print(space)
            }
            else {
                // loop as long as the dealers sum is below 17 he has to draw
                while (dealer.sum < 17) {
                    cardUtils.randomCardGen(1, dealer)
                    print(`The dealer hit: ${dealer.hand} -- Total: ${dealer.sum} `)
                }
                if (dealer.sum > 21) {
                    print(space)
                    print('Dealer bust!')
                    print(space)
                    print(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
                    print('You win!')
                    print(space)
                    mainPlayer.bank += mainPlayer.bet * 2
                }
                // if dealers sum is >= 17.. he has to stay and the hands are compared
                else if (dealer.sum >= 17) {
                    print('The dealer stays')
                    print(`Your total: ${mainPlayer.sum} -- Dealer total: ${dealer.sum} `)
                    if (mainPlayer.sum > dealer.sum) {
                        print(space)
                        print('You win!')
                        mainPlayer.bank += mainPlayer.bet * 2
                    } else if (mainPlayer.sum === dealer.sum) {
                        print(space)
                        print('Push!')
                        mainPlayer.bank += mainPlayer.bet * 1
                    } else {
                        print(space)
                        print('The dealer won!')
                    }
                    print(space)
                }
            }
        }
    }
    shuffleUtils.shuffle()
    betUtils.changeBetOptions()
    betUtils.setMinBet()
    resetUtils.handReset()
    bankUtils.isBankEmpty()
}

