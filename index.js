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
const playerActiveUtils = require("./utils/playerActive")
const resultsUtils = require("./utils/roundResults")
const dealer = dataUtils.dealer

// Begin game
const space = '--------------------------------------------------'
print(space)
print('Welcome to the Blackjack table')
print(space)

//asks for number of people playing
while (!dataUtils.isPlayerNumValid) {
    dataUtils.numPlayers = parseInt(prompt("How many players? "));
    print(space)
    if (dataUtils.numPlayers > 0 && dataUtils.numPlayers <= 5) {
        addPlayersUtils.addPlayers()
        dataUtils.isPlayerNumValid = true;
    } else if (dataUtils.numPlayers > 5) {
        print('Invalid response. Maximum number of players is 5')
        print(space)
    } else {
        print('Invalid response. Make sure you pick between 1 and 5 players')
    }
}

//asks players to confirm start of the game
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
            dataUtils.playerHands[i].isPlayerActive = true
        }
        print(space)
        dataUtils.isLeaveIntro = true;
        dataUtils.isGameActive = true;
    } else if (begin == 'no' || begin == 'nope' || begin == 'n') {
        print(space)
        print('Feel free to return and play again later')
        dataUtils.isLeaveIntro = true;
        print(space)
    } else {
        print(space)
        print('Invalid response. Respond with (Yes or No)')
    }
}

// begin game. game active until all players run out of money, leave the table, or someone quits.
while (dataUtils.isGameActive) {

    // all players place bets-- checks to make sure bets are valid
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

    //2 cards are dealt to everyone-- only one of the dealers is shown
    dataUtils.roundNum++
    print('Dealing cards:')
    print(space)
    cardUtils.randomCardGen(2, dealer)
    print(`The dealer's hand: ${hideDealerUtils.hideDearlerCards(dealer.hand)}`)

    for (let i = 0; i < dataUtils.numPlayers; i++) {
        cardUtils.randomCardGen(2, dataUtils.playerHands[i])
        if (dataUtils.playerHands[i].sum === 21) {
            dataUtils.playerHands[i].isPlayerActive = false;
            dataUtils.playerHands[i].isBlackjack = true;
            print(`${dataUtils.playerHands[i].name}'s hand: ${dataUtils.playerHands[i].hand} -- Blackjack!`)
        } else {
            print(`${dataUtils.playerHands[i].name}'s hand: ${dataUtils.playerHands[i].hand} -- Total: ${dataUtils.playerHands[i].sum}`)
        }
    }
    print(space)

    // player move on if they didn't get a blackjack on first 2 cards
    let hitOrStay = ''
    playerActiveUtils.checkIfActive()
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        // players given option to double up if their bank has enough $
        if (dataUtils.playerHands[i].bet <= dataUtils.playerHands[i].bank) {
            print(`${dataUtils.playerHands[i].name}:`)
            let doubleUp = prompt("Double up? (Yes or No) ").trim().toLowerCase()
            while (doubleUp !== 'yes' && doubleUp !== 'y' && doubleUp !== 'no' && doubleUp !== 'n' && doubleUp !== 'quit' && doubleUp !== 'q') {
                doubleUp = prompt("Invalid response. Pick (Yes or No) ")
            }
            if (doubleUp === 'yes' || doubleUp === 'y') {
                dataUtils.playerHands[i].betDoubled = true
                dataUtils.playerHands[i].bank -= dataUtils.playerHands[i].bet
                dataUtils.playerHands[i].bet = dataUtils.playerHands[i].bet * 2
                print(`Doubled bet: $${dataUtils.playerHands[i].bet} -- Current bank: $${dataUtils.playerHands[i].bank}`)
                cardUtils.randomCardGen(1, dataUtils.playerHands[i])
                print(`You hit: ${dataUtils.playerHands[i].hand} -- Total: ${dataUtils.playerHands[i].sum}`)
                hitOrStay = 'stay'
            } else if (doubleUp === 'quit' || doubleUp === 'q') {
                print('You have left the table')
                endUtils.endGameResults()
                dataUtils.isGameActive = false
            } else {
                hitOrStay = ''
            }
        }

        // loop option to hit or stay until player chooses stay or busts
        while (hitOrStay !== 'stay' && hitOrStay !== 's' && hitOrStay !== 'quit' && hitOrStay !== 'q'
            && dataUtils.playerHands[i].sum < 21 && dataUtils.isGameActive !== false) {
            hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
            if (hitOrStay === 'hit' || hitOrStay === 'h') {
                cardUtils.randomCardGen(1, dataUtils.playerHands[i])
                print(`You hit: ${dataUtils.playerHands[i].hand} -- Total: ${dataUtils.playerHands[i].sum}`)
            } else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                print('You have left the table')
                endUtils.endGameResults()
                dataUtils.isGameActive = false
            } else if (hitOrStay === 'stay' || hitOrStay === 's') {
                print('You have decided to stay')
                print(space)
            } else {
                print(`Invalid resonse. Pick hit or stay`)
            }
        }

        // if player busts
        if (dataUtils.playerHands[i].sum > 21) {
            print('Bust!')
            print(space)
        }
    }

    //once all players finished drawing
    //return players who got a blackjack to the original playerHands array
    dataUtils.playerHands = [...dataUtils.playerHands, ...dataUtils.playerGotBlackjack]

    //The dealer now finishes their hand
    print(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
    if (dealer.sum === 21) {
        print('Blackjack!')
        dataUtils.dealerHand.isBlackjack = true;
    } else {
        while (dealer.sum < 17) {
            cardUtils.randomCardGen(1, dealer)
            print(`The dealer hit: ${dealer.hand} -- Total: ${dealer.sum} `)
        } if (dealer.sum >= 17) {
            print('The dealer stays')
        } else {
            print('Dealer bust!')
            print(space)
        }
    }
    resultsUtils.roundResults()
    shuffleUtils.shuffle()
    betUtils.changeBetOptions()
    betUtils.setMinBet()
    resetUtils.handReset()
    bankUtils.isBankEmpty()
}




