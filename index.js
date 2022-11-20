const print = require('./utils/print')
const cardUtils = require("./utils/cardGen")
const shuffleUtils = require("./utils/shuffle")
const dataUtils = require("./utils/data")
const endUtils = require("./utils/endResults")
const betUtils = require("./utils/betOptions")
const resetUtils = require("./utils/handReset")
const bankUtils = require("./utils/testBank")
const hideDealerUtils = require("./utils/hideDealer")
const addPlayersUtils = require('./utils/addPlayers')
const prompt = require('prompt-sync')()
const dealer = dataUtils.dealer

// Begin game
const space = '--------------------------------------------------'
print(space)
print('Welcome to the Blackjack table')
print(space)

while (!dataUtils.isPlayersValid) {
    dataUtils.numPlayers = parseInt(prompt("How many players? "));
    print(space)
    if (dataUtils.numPlayers > 0 && dataUtils.numPlayers <= 5) {
        addPlayersUtils.addPlayers()
        dataUtils.isPlayersValid = true;
    } else if (dataUtils.numPlayers > 5) {
        print('Invalid response. Maximum number of players is 5')
        print(space)
    } else {
        print('Invalid response. Make sure you pick between 1 and 5 players')
    }
}

while (!dataUtils.isLeaveIntro) {
    print(space)
    let begin = prompt(`Are all players ready to start the game? (Yes or No) `).trim().toLowerCase()
    if (begin == 'yes' || begin == 'ya' || begin == 'y') {
        print(space)
        print('Type leave anytime to exit the table or quit to end the game');
        print(space)
        print(`${dealer.name} has entered the table`)
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
    // Bets -- prompts the user for a bet until a valid bet is placed or the user quits the game
    let isBetValid = false
    for (let i = 0; i < dataUtils.numPlayers; i++) {
        isBetValid = false;
        let betNotNum = ''
        while (isBetValid !== true) {
            print(`${dataUtils.playerHands[i].name}:`)
            print(`Current bank: $${dataUtils.playerHands[i].bank} -- Minimum bet: $${dataUtils.playerHands[i].minBet}`)
            dataUtils.playerHands[i].bet = prompt(`Place your bet using any combination of the available chips (${dataUtils.betOptions}) `)
            betNotNum = dataUtils.playerHands[i].bet.trim().toLowerCase()
            dataUtils.playerHands[i].bet = parseInt(dataUtils.playerHands[i].bet.replace(/\D/g, ""))
            if (dataUtils.playerHands[i].bet % 5 === 0 && dataUtils.playerHands[i].bet >= dataUtils.playerHands[i].minBet && dataUtils.playerHands[i].bet <= dataUtils.playerHands[i].bank || betNotNum === 'all') {
                if (betNotNum === 'all') {
                    dataUtils.playerHands[i].bet = dataUtils.playerHands[i].bank
                }
                dataUtils.playerHands[i].bank -= dataUtils.playerHands[i].bet
                print(`Current bet: $${dataUtils.playerHands[i].bet} -- Current bank: $${dataUtils.playerHands[i].bank}`)
                print(space)
                isBetValid = true
            }
            else {
                if (betNotNum === 'quit' || betNotNum === 'q') {
                    print('You left the table')
                    endUtils.endGameResults()
                    isBetValid = true
                    dataUtils.isGameActive = false
                } else if (dataUtils.playerHands[i].minBet === 5 && bet < 5) {
                    print('Bet amount is too low. $5 is the minimum bid')
                } else if (dataUtils.playerHands[i].minBet > 5 && dataUtils.playerHands[i].bet < dataUtils.playerHands[i].minBet) {
                    print(`Minimum bet: $${dataUtils.playerHands[i].minBet}. Amount can't be lower than the bet from the previous round.`)
                } else if (dataUtils.playerHands[i].bet > dataUtils.playerHands[i].bank) {
                    print('Bet is too high. The amount cannot exceed the value in your bank')
                } else {
                    print('Invalid input. Make sure your bet is a valid number and is a combination of the available chips')
                }
            }
        }
    }

    dataUtils.roundNum++
    print('Dealing cards:')
    print(space)
    cardUtils.randomCardGen(2, dealer)
    print(`The dealer's hand: ${hideDealerUtils.hideDearlerCards(dealer.hand)}`)

    for (let i = 0; i < dataUtils.numPlayers; i++) {
        cardUtils.randomCardGen(2, dataUtils.playerHands[i])
        print(`${dataUtils.playerHands[i].name}'s hand: ${dataUtils.playerHands[i].hand} -- Total: ${dataUtils.playerHands[i].sum}`)
    }
    print(space)

    //if dataUtils.playerHands[0] gets blackjack
    if (dataUtils.playerHands[0].sum === 21) {
        print('Blackjack!')
        print(space)
        print(`The dealer's hand revealed: ${dealer.hand} -- Total: ${dealer.sum} `)
        if (dealer.sum !== 21) {
            print(space)
            print('You win!')
            dataUtils.playerHands[0].bank += dataUtils.playerHands[0].bet * 2.5
            print(space)
        } else {
            print(space)
            print('The dealer got a blackjack!')
            print(space)
            print('Push!')
            print(space)
            dataUtils.playerHands[0].bank += dataUtils.playerHands[0].bet * 1
        }
    }

    // if player doesn't get blackjack and has to draw
    else {
        let hitOrStay = ''
        // determine if bank is big enough for doubleup
        if (dataUtils.playerHands[0].bet <= dataUtils.playerHands[0].bank) {
            let doubleUp = prompt("Double up? (Yes or No) ").trim().toLowerCase()
            while (doubleUp !== 'yes' && doubleUp !== 'y' && doubleUp !== 'no' && doubleUp !== 'n' && doubleUp !== 'quit' && doubleUp !== 'q') {
                doubleUp = prompt("Invalid response. Pick (Yes or No) ")
            }
            if (doubleUp === 'yes' || doubleUp === 'y') {
                print(space)
                dataUtils.playerHands[0].betDoubled = true
                dataUtils.playerHands[0].bank -= dataUtils.playerHands[0].bet
                dataUtils.playerHands[0].bet = dataUtils.playerHands[0].bet * 2
                print(`Doubled bet: $${dataUtils.playerHands[0].bet} -- Current bank: $${dataUtils.playerHands[0].bank}`)
                cardUtils.randomCardGen(1, dataUtils.playerHands[0])
                print(`You hit: ${dataUtils.playerHands[0].hand} -- Total: ${dataUtils.playerHands[0].sum}`)
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
            && dataUtils.playerHands[0].sum < 21 && dataUtils.isGameActive !== false) {
            hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
            if (hitOrStay === 'hit' || hitOrStay === 'h') {
                cardUtils.randomCardGen(1, dataUtils.playerHands[0])
                print(`You hit: ${dataUtils.playerHands[0].hand} -- Total: ${dataUtils.playerHands[0].sum}`)
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
        if (dataUtils.playerHands[0].sum > 21) {
            print(space)
            print('Bust!')
            print(space)
            print(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
            print('Dealer wins!')
            print(space)
        }

        // if user chooses to stay or gets 21 (non blackjack)
        else if (hitOrStay === 'stay' || hitOrStay === 's' || dataUtils.playerHands[0].sum === 21) {
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
                    print(`Your hand: ${dataUtils.playerHands[0].hand} -- Total: ${dataUtils.playerHands[0].sum}`)
                    print('You win!')
                    print(space)
                    dataUtils.playerHands[0].bank += dataUtils.playerHands[0].bet * 2
                }
                // if dealers sum is >= 17.. he has to stay and the hands are compared
                else if (dealer.sum >= 17) {
                    print('The dealer stays')
                    print(`Your total: ${dataUtils.playerHands[0].sum} -- Dealer total: ${dealer.sum} `)
                    if (dataUtils.playerHands[0].sum > dealer.sum) {
                        print(space)
                        print('You win!')
                        dataUtils.playerHands[0].bank += dataUtils.playerHands[0].bet * 2
                    } else if (dataUtils.playerHands[0].sum === dealer.sum) {
                        print(space)
                        print('Push!')
                        dataUtils.playerHands[0].bank += dataUtils.playerHands[0].bet * 1
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

