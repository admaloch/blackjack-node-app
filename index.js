const prompt = require('prompt-sync')()
const print = require('./utils/print')
const cardUtils = require("./utils/cardGen")
const updatePlayerUtils = require("./utils/updatePlayer")
const removeCardsUtils = require("./utils/removeCards")
const shuffleUtils = require("./utils/shuffle")
const data = require("./utils/data")
const quitUtils = require("./utils/playerQuit")
const printEndResults = require("./utils/endResults")
const betUtils = require("./utils/betOptions")
const resetUtils = require("./utils/handReset")
const bankUtils = require("./utils/testBank")
const hideDealerUtils = require("./utils/hideDealer")
const addPlayersUtils = require('./utils/addPlayers')
const resultsUtils = require("./utils/roundResults")
const dealer = require("./utils/dealer")
const alterAceUtils = require('./utils/alterAce')
// const player = data.playerHands
// const data.dealer = data.data.dealer

let player = []
let inactivePlayers = []

// Begin game
const space = '--------------------------------------------------'
print(space)
print('Welcome to the Blackjack table')
print(space)

//num players section
//ask for number of players and confirm it is valid
let isPlayerNumValid = false;
let numPlayers = 0;
while (!isPlayerNumValid) {
    numPlayers = parseInt(prompt("How many players? "));
    print(space)
    if (numPlayers > 0 && numPlayers <= 5) {
        player = addPlayersUtils.addPlayers(numPlayers)
        isPlayerNumValid = true;
    } else if (numPlayers > 5) {
        print('Invalid response. Maximum number of players is 5')
        print(space)
    } else {
        print('Invalid response. Make sure you pick between 1 and 5 players')
    }
}


//asks players if ready to start 
let isLeaveIntro = false;
let isGameActive = false;
while (!isLeaveIntro) {
    let begin = '';
    print(space)
    if (numPlayers > 1) {
        begin = prompt(`Are all players ready to enter the table? (Yes or No) `).trim().toLowerCase()
    } else {
        begin = prompt(`Are you ready to enter the table? (Yes or No) `).trim().toLowerCase()
    }
    if (begin == 'yes' || begin == 'y') {
        print(space)
        print('Type leave anytime to leave the table or quit to end the game');
        print(space)
        print(`${dealer.name} has entered the table`)
        for (let i = 0; i < player.length; i++) {
            print(`${player[i].name} has entered the table`)
            player[i].isPlayerActive = true
        }
        print(space)
        isLeaveIntro = true;
        isGameActive = true;
    } else if (begin == 'no' || begin == 'n' || begin == 'quit' || begin == 'q') {
        print(space)
        print('Feel free to return and play again later')
        isLeaveIntro = true;
        print(space)
    } else {
        print(space)
        print('Invalid response. Respond with (Yes or No)')
    }
}
// begin game. 
//game active until all players run out of money, leave the table, or someone quits.
let roundNum = 0;
while (isGameActive) {
    roundNum++
    print(`Begin round ${roundNum}`)
    print(space)
    // bet section
    for (let i = 0; i < player.length; i++) {
        if (player[i].isPlayerActive === true) {
            print(`${player[i].name}:`)
            print(`Current bank: $${player[i].bank} -- Minimum bet: $${player[i].minBet}`)
            player[i].bet = prompt(`Place your bet using any combination of the available chips (${player[i].betOptions}) `)
            let isBetValid = false
            let betNotNum = ''
            while (!isBetValid) {
                betNotNum = player[i].bet.trim().toLowerCase()
                player[i].bet = parseInt(player[i].bet.replace(/\D/g, ""))
                if (player[i].bet % 5 === 0 && player[i].bet >= player[i].minBet && player[i].bet <= player[i].bank || betNotNum === 'all') {
                    if (betNotNum === 'all') { player[i].bet = player[i].bank }
                    player[i].bank -= player[i].bet
                    print(`Current bet: $${player[i].bet} -- Current bank: $${player[i].bank}`)
                    print(space)
                    isBetValid = true
                } else {
                    if (betNotNum === 'quit' || betNotNum === 'q') {
                        inactivePlayers = quitUtils.removePlayers(player)
                        isBetValid = true;
                        isGameActive = false;
                    } else if (betNotNum === 'leave' || betNotNum === 'l') {
                        inactivePlayers.push(quitUtils.playerLeftTable(player[i]))
                        isBetValid = true;
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
    //dealer draws 2 cards
    if (inactivePlayers.length !== numPlayers) {
        print('Dealing cards:')
        print(space)
        const newCardsArr = cardUtils.genCards(2)
        dealer = updatePlayerUtils.updatePlayerObj(newCardsArr, dealer)
        data.cardPossibilities = removeCardsUtils.removeFromDeck(data.cardPossibilities, newCardsArr)
        print(`The dealer's hand: ${hideDealerUtils.hideDearlerCards(dealer.hand)}`)
    }
    //players draw 2 cards
    if (inactivePlayers.length !== numPlayers) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive === true) {
                const newCardsArr = cardUtils.genCards(2)
                player[i] = updatePlayerUtils.updatePlayerObj(newCardsArr, player[i])
                data.cardPossibilities = removeCardsUtils.removeFromDeck(data.cardPossibilities, newCardsArr)
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
    for (let i = 0; i < player.length; i++) {
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
                        const newCardsArr = cardUtils.genCards(1)
                        player[i] = updatePlayerUtils.updatePlayerObj(newCardsArr, player[i])
                        data.cardPossibilities = removeCardsUtils.removeFromDeck(data.cardPossibilities, newCardsArr)
                        player[i] = alterAceUtils.alterAceValue(player[i])
                        print(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`)
                        isDoubleUpValid = true;
                    } else if (doubleUp === 'no' || doubleUp === 'n') {
                        playerCanHit = true
                        isDoubleUpValid = true;
                    } else if (doubleUp === 'quit' || doubleUp === 'q') {
                        inactivePlayers = quitUtils.removePlayers(player)
                        print(quitUtils.quitGame(player[i].name))
                        isDoubleUpValid = true;
                        isGameActive = false
                    } else if (doubleUp === 'leave' || doubleUp === 'l') {
                        isDoubleUpValid = true;
                        inactivePlayers.push(quitUtils.playerLeftTable(player[i]))
                    } else {
                        doubleUp = prompt("Invalid response. Pick (Yes or No) ")
                    }
                }
            } else {
                playerCanHit = true
            }
            // hit or stay section
            if (playerCanHit === true) {
                let hitOrStay = ''
                let playerIsDone = false
                while (playerIsDone === false && player[i].sum < 21) {
                    hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
                    if (hitOrStay === 'hit' || hitOrStay === 'h') {
                        const newCardsArr = cardUtils.genCards(1)
                        player[i] = updatePlayerUtils.updatePlayerObj(newCardsArr, player[i])
                        data.cardPossibilities = removeCardsUtils.removeFromDeck(data.cardPossibilities, newCardsArr)
                        player[i] = alterAceUtils.alterAceValue(player[i])
                        print(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`)
                    } else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                        inactivePlayers = quitUtils.removePlayers(player)
                        playerIsDone = true
                        isGameActive = false
                    } else if (hitOrStay === 'leave' || hitOrStay === 'l') {
                        playerIsDone = true
                        inactivePlayers.push(quitUtils.playerLeftTable(player[i]))
                    } else if (hitOrStay === 'stay' || hitOrStay === 's') {
                        print('You decided to stay')
                        playerIsDone = true
                    } else {
                        print(`Invalid resonse. Pick hit or stay`)
                    }
                }
            }
            // if player >= 21
            if (player[i].sum > 21) print('Bust!')
            else if (player[i].sum === 21) print('Player stays')
            print(space)
        }
    }
    //dealer section
    if (inactivePlayers.length !== numPlayers) {
        print(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
        if (dealer.sum === 21) {
            print(space)
            print('Blackjack!')
            dealer.isBlackJack = true;
        } else {
            while (dealer.sum < 17) {
                const newCardsArr = cardUtils.genCards(1)
                dealer = updatePlayerUtils.updatePlayerObj(newCardsArr, dealer)
                data.cardPossibilities = removeCardsUtils.removeFromDeck(data.cardPossibilities, newCardsArr)
                dealer = alterAceUtils.alterAceValue(dealer)
                print(`The dealer hit: ${dealer.hand} -- Total: ${dealer.sum} `)
            }
        } if (dealer.sum > 21) {
            print('Dealer bust!')
        } else if (dealer.sum >= 17 && dealer.sum < 21) {
            print('The dealer stays')
        }
        print(space)
    }

    if (inactivePlayers.length !== numPlayers) {
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
    }

    //results section
    //run functions to test players hands/deck/reset etc..
    for (let i = 0; i < player.length; i++) {
        if (player[i].isPlayerActive) {
            player[i] = resultsUtils.roundResults(player[i])
            bankUtils.isBankEmpty(player[i])
            betUtils.changeBetOptions(player[i])
            betUtils.setMinBet(player[i])
            resetUtils.handReset()
        }
    }

    shuffleUtils.shuffle()
    bankUtils.isGameOver(inactivePlayers, numPlayers, isGameActive)

    if (inactivePlayers.length === numPlayers) {
        printEndResults.endGameResults(player, roundNum)
    }
}