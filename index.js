const print = require('./utils/print')
const cardUtils = require("./utils/cardGen")
const shuffleUtils = require("./utils/shuffle")
const data = require("./utils/data")
const quitUtils = require("./utils/playerQuit")
const betUtils = require("./utils/betOptions")
const resetUtils = require("./utils/handReset")
const bankUtils = require("./utils/testBank")
const hideDealerUtils = require("./utils/hideDealer")
const addPlayersUtils = require('./utils/addPlayers')
const prompt = require('prompt-sync')()
const resultsUtils = require("./utils/roundResults")
const player = data.playerHands
const dealer = data.dealerHand

// Begin game
const space = '--------------------------------------------------'
print(space)
print('Welcome to the Blackjack table')
print(space)

//num players section
//ask for number of players and confirm it is valid
while (!data.isPlayerNumValid) {
    data.numPlayers = parseInt(prompt("How many players? "));
    print(space)
    if (data.numPlayers > 0 && data.numPlayers <= 5) {
        addPlayersUtils.addPlayers()
        data.isPlayerNumValid = true;
    } else if (data.numPlayers > 5) {
        print('Invalid response. Maximum number of players is 5')
        print(space)
    } else {
        print('Invalid response. Make sure you pick between 1 and 5 players')
    }
}
//asks players to confirm start of the game
while (!data.isLeaveIntro) {
    print(space)
    let begin = '';
    if (data.numPlayers > 1) {
        begin = prompt(`Are all players ready to start the game? (Yes or No) `).trim().toLowerCase()
    } else {
        begin = prompt(`Are you ready to start the game? (Yes or No) `).trim().toLowerCase()
    }
    if (begin == 'yes' || begin == 'ya' || begin == 'y') {
        print(space)
        print('Type leave anytime to leave the table or quit to end the game');
        print(space)
        print(`${dealer.name} has entered the table`)
        for (let i = 0; i < data.playerHands.length; i++) {
            print(`${player[i].name} has entered the table`)
            player[i].isPlayerActive = true
        }
        print(space)
        data.isLeaveIntro = true;
        data.isGameActive = true;
    } else if (begin == 'no' || begin == 'n' || begin == 'quit' || begin == 'q') {
        print(space)
        print('Feel free to return and play again later')
        data.isLeaveIntro = true;
        print(space)
    } else {
        print(space)
        print('Invalid response. Respond with (Yes or No)')
    }
}
// begin game. 
//game active until all players run out of money, leave the table, or someone quits.
while (data.isGameActive) {
    data.roundNum++
    print(`Begin round ${data.roundNum}`)
    print(space)
    // bet section
    for (let i = 0; i < data.playerHands.length; i++) {
        if (player[i].isPlayerActive === true) {
            data.isBetValid = false;

            print(`${player[i].name}:`)
            print(`Current bank: $${player[i].bank} -- Minimum bet: $${player[i].minBet}`)
            player[i].bet = prompt(`Place your bet using any combination of the available chips (${player[i].betOptions}) `)

            while (!data.isBetValid) {
                data.betNotNum = player[i].bet.trim().toLowerCase()
                player[i].bet = parseInt(player[i].bet.replace(/\D/g, ""))
                if (player[i].bet % 5 === 0 && player[i].bet >= player[i].minBet && player[i].bet <= player[i].bank || data.betNotNum === 'all') {
                    if (data.betNotNum === 'all') {
                        player[i].bet = player[i].bank
                    }
                    player[i].bank -= player[i].bet
                    print(`Current bet: $${player[i].bet} -- Current bank: $${player[i].bank}`)
                    print(space)
                    data.isBetValid = true
                } else {
                    if (data.betNotNum === 'quit' || data.betNotNum === 'q') {
                        quitUtils.quitGame(player[i].name)
                        data.isBetValid = true

                    } else if (data.betNotNum === 'leave' || data.betNotNum === 'l') {
                        quitUtils.playerLeftTable(player[i])
                        bankUtils.isGameOver()
                        data.isBetValid = true;
                        print(space)
                    } else {
                        if (player[i].minBet === 5 && player[i].bet < 5) {
                            print('--- Bet amount is too low. $5 is the minimum bid')

                        } else if (player[i].minBet > 5 && player[i].bet < player[i].minBet) {
                            print(`--- Minimum bet: $${player[i].minBet}. Amount can't be lower than the bet from the previous round.`)
                        } else if (player[i].bet > player[i].bank) {
                            print('--- Bet is too high. The amount cannot exceed the value in your bank')
                        } else {
                            print('--- Invalid input. Make sure your bet is a valid number and is a combination of the available chips')
                        }
                        player[i].bet = prompt('Please place a new bet -- ')
                    }
                }
            }
        }
    }
    if (data.inactivePlayers.length !== data.numPlayers) {
        print('Dealing cards:')
        print(space)
        cardUtils.randomCardGen(2, dealer)
        print(`The dealer's hand: ${hideDealerUtils.hideDearlerCards(dealer.hand)}`)
    }
    //deal cards section
    //2 cards are dealt to everyone-- only one of the dealers is shown
    if (data.inactivePlayers.length !== data.numPlayers) {
        for (let i = 0; i < data.playerHands.length; i++) {
            if (player[i].isPlayerActive === true) {
                cardUtils.randomCardGen(2, player[i])
                if (player[i].sum === 21) {
                    player[i].isBlackjack = true;
                    print(`${player[i].name}'s hand: ${player[i].hand} -- Blackjack!`)
                } else {
                    print(`${player[i].name}'s hand: ${player[i].hand} -- Total: ${player[i].sum}`)
                }
            }
        }
        print(space)
    }
    //Player round section
    for (let i = 0; i < data.playerHands.length; i++) {
        if (player[i].sum < 21 && player[i].isPlayerActive === true) {
            let playerCanHit = false
            print(`${player[i].name}:`)
            print(`Hand: ${player[i].hand} -- Total: ${player[i].sum}`)
            print(`Current bet: $${player[i].bet} -- Current bank: $${player[i].bank}`)
            // double up section
            if (player[i].bet <= player[i].bank) {
                let doubleUp = prompt("Double up? (Yes or No) ").trim().toLowerCase()
                let isDoubleUpValid = false
                while (isDoubleUpValid === false) {
                    if (doubleUp === 'yes' || doubleUp === 'y') {
                        player[i].betDoubled = true
                        player[i].bank -= player[i].bet
                        player[i].bet = player[i].bet * 2
                        print(`Doubled bet: $${player[i].bet} -- Current bank: $${player[i].bank}`)
                        cardUtils.randomCardGen(1, player[i])
                        print(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`)
                        isDoubleUpValid = true;
                    } else if (doubleUp === 'no' || doubleUp === 'n') {
                        playerCanHit = true
                        isDoubleUpValid = true;
                    } else if (doubleUp === 'quit' || doubleUp === 'q') {
                        isDoubleUpValid = true;
                        quitUtils.quitGame(player[i].name)
                    } else if (doubleUp === 'leave' || doubleUp === 'l') {
                        isDoubleUpValid = true;
                        quitUtils.playerLeftTable(player[i])
                        bankUtils.isGameOver()
                    } else {
                        doubleUp = prompt("Invalid response. Pick (Yes or No) ")
                    }
                }
            } else {
                playerCanHit = true
            }
            // hit or stay section
            if (playerCanHit === true) {
                let playerIsDone = false
                while (playerIsDone === false && player[i].sum < 21) {
                    hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
                    if (hitOrStay === 'hit' || hitOrStay === 'h') {
                        cardUtils.randomCardGen(1, player[i])
                        print(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`)
                    } else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                        playerIsDone = true
                        quitUtils.quitGame(player[i].name)
                    } else if (hitOrStay === 'leave' || hitOrStay === 'l') {
                        playerIsDone = true
                        quitUtils.playerLeftTable(player[i])
                        bankUtils.isGameOver()
                    } else if (hitOrStay === 'stay' || hitOrStay === 's') {
                        print('You decided to stay')
                        playerIsDone = true
                    } else {
                        print(`Invalid resonse. Pick hit or stay`)
                    }
                }
            }
            // if player >= 21
            if (player[i].sum > 21) {
                print('Bust!')
            } else if (player[i].sum === 21) {
                print('Player stays')
            }
            print(space)
        }
    }
    //dealer section
    if (data.inactivePlayers.length !== data.numPlayers) {
        print(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
        if (dealer.sum === 21) {
            print(space)
            print('Blackjack!')
            data.dealerHand.isBlackJack = true;
        } else {
            while (dealer.sum < 17) {
                cardUtils.randomCardGen(1, dealer)
                print(`The dealer hit: ${dealer.hand} -- Total: ${dealer.sum} `)
            }
        } if (dealer.sum > 21) {
            print('Dealer bust!')
        } else if (dealer.sum >= 17 && dealer.sum < 21) {
            print('The dealer stays')
        } else {
        }
        print(space)
    }
    //results section
    //run functions to test players hands/deck/reset etc..
    if (data.inactivePlayers.length !== data.numPlayers) {
        resultsUtils.roundResults()
        bankUtils.isBankEmpty()
        bankUtils.isGameOver()
        betUtils.changeBetOptions()
        betUtils.setMinBet()
        resetUtils.handReset()
        shuffleUtils.shuffle()
    }
}