import { addPlayers } from "./utils/addPlayers"
import { changeBetOptions, setMinBet } from './utils/betOptions';
import { dealCards, cardNamesArr, removeFromDeck } from './utils/cardGen';
import { dealerObject } from './utils/dealer';
import { mainDeck } from './utils/deck';
import { endGameResults } from './utils/endResults';
import { handReset } from './utils/handReset';
import { hideDealerCards } from './utils/hideDealer';
import { Players } from "./utils/interfaces"
import { print } from './utils/print';
import { roundResults } from './utils/roundResults';
import { shuffle } from './utils/shuffle';
import { isBankEmpty } from './utils/testBank';
import promptSync from 'prompt-sync';

const prompt = promptSync();
let player: Players[] = []
let inactivePlayers: Players[] = []
let dealer = dealerObject;
let initCardAmount = 0;
let deck = mainDeck;

// Begin game
const space = '--------------------------------------------------'
print(space)
print('Welcome to the Blackjack table')
print(space)

//num players section
//ask for number of players and confirm it is valid
let isPlayerNumValid = false;
let numPlayers: string | number = 0
while (!isPlayerNumValid) {
    numPlayers = parseInt(prompt("How many players? "));
    print(space)
    if (numPlayers > 0 && numPlayers <= 5) {
        player = addPlayers(numPlayers)
        isPlayerNumValid = true;
        initCardAmount = (numPlayers * 4) + 4
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
    let begin: string = ''
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
        print(space)
        for (let i = 0; i < player.length; i++) {
            print(`${player[i].name} has entered the table`)
            player[i].isPlayerActive = true
        }
        print(space)
        deck = shuffle(deck, initCardAmount)
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
            let isBetValid = false
            let betNotNum: string = prompt(`Place your bet using any combination of the available chips (${player[i].betOptions}) `)
            while (!isBetValid) {
                player[i].bet = parseInt(betNotNum.replace(/\D/g, ""))
                if (player[i].bet % 5 === 0 && player[i].bet >= player[i].minBet && player[i].bet <= player[i].bank || betNotNum === 'all') {
                    if (betNotNum === 'all') player[i].bet = player[i].bank
                    player[i].bank -= player[i].bet
                    print(`Current bet: $${player[i].bet} -- Current bank: $${player[i].bank}`)
                    print(space)
                    isBetValid = true
                } else {
                    if (betNotNum === 'quit' || betNotNum === 'q') {
                        player.forEach(players => players.isPlayerActive = false)
                        inactivePlayers = player;
                        isBetValid = true;
                        isGameActive = false;
                    } else if (betNotNum === 'leave' || betNotNum === 'l') {
                        print(space)
                        print(`${player[i].name} left the table.`)
                        player[i].isPlayerActive = false;
                        inactivePlayers.push(player[i])
                        isBetValid = true;
                        print(space)
                    } else {
                        print(space)
                        if (player[i].minBet === 5 && player[i].bet < 5) {
                            print('--- Bet amount is too low. $5 is the minimum bid')
                        } else if (player[i].minBet > 5 && player[i].bet < player[i].minBet) {
                            print(`--- Minimum bet: $${player[i].minBet}. Amount can't be lower than the bet from the previous round.`)
                        } else if (player[i].bet > player[i].bank) {
                            print('--- Bet is too high. The amount cannot exceed the value in your bank')
                        } else {
                            print('--- Invalid input. Make sure your bet is a valid number and is a combination of the available chips')
                        }
                        betNotNum = prompt('Please place a new bet -- ')
                    }
                }
            }
        }
    }

    //dealer draws 2 cards
    if (inactivePlayers.length !== numPlayers) {
        print('Dealing cards:')
        print(space)
        dealer = dealCards(deck, dealer, 2)
        deck = removeFromDeck(deck, cardNamesArr)
        print(`The dealer's hand: ${hideDealerCards(dealer.hand)}`)
        print(space)
    }

    //players draw 2 cards
    if (inactivePlayers.length !== numPlayers) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive === true) {
                player[i] = dealCards(deck, player[i], 2)
                deck = removeFromDeck(deck, cardNamesArr)
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
                let doubleUp: string = prompt("Double up? (Yes or No) ").trim().toLowerCase()
                let isDoubleUpValid = false
                while (isDoubleUpValid === false) {
                    if (doubleUp === 'yes' || doubleUp === 'y') {
                        player[i].betDoubled = true
                        player[i].bank -= player[i].bet
                        player[i].bet = player[i].bet * 2
                        print(`Doubled bet: $${player[i].bet} -- Current bank: $${player[i].bank}`)
                        player[i] = dealCards(deck, player[i], 1)
                        deck = removeFromDeck(deck, cardNamesArr)
                        print(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`)
                        isDoubleUpValid = true;
                    } else if (doubleUp === 'no' || doubleUp === 'n') {
                        playerCanHit = true
                        isDoubleUpValid = true;
                    } else if (doubleUp === 'quit' || doubleUp === 'q') {
                        player.forEach(players => players.isPlayerActive = false)
                        inactivePlayers = player;
                        isDoubleUpValid = true;
                        isGameActive = false
                    } else if (doubleUp === 'leave' || doubleUp === 'l') {
                        print(space)
                        print(`${player[i].name} left the table.`)
                        player[i].isPlayerActive = false;
                        inactivePlayers.push(player[i])
                        isDoubleUpValid = true;
                    } else {
                        doubleUp = prompt("Invalid response. Pick (Yes or No) ")
                    }
                }
            } else {
                playerCanHit = true
            }

            // hit or stay section
            if (playerCanHit === true) {
                let hitOrStay: string = ''
                let playerIsDone = false
                while (playerIsDone === false && player[i].sum < 21) {
                    hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
                    if (hitOrStay === 'hit' || hitOrStay === 'h') {
                        player[i] = dealCards(deck, player[i], 1)
                        deck = removeFromDeck(deck, cardNamesArr)
                        print(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`)
                    } else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                        player.forEach(players => players.isPlayerActive = false)
                        inactivePlayers = player;
                        playerIsDone = true
                        isGameActive = false
                    } else if (hitOrStay === 'leave' || hitOrStay === 'l') {
                        print(space)
                        print(`${player[i].name} left the table.`)
                        player[i].isPlayerActive = false;
                        inactivePlayers.push(player[i])
                        playerIsDone = true
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
            dealer.isBlackjack = true;
        } else {
            while (dealer.sum < 17) {
                dealer = dealCards(deck, dealer, 1)
                deck = removeFromDeck(deck, cardNamesArr)
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
        print(`Round ${roundNum} results: `)
        print(space)
        if (dealer.isBlackjack) {
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
    if (inactivePlayers.length !== numPlayers) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive) {
                player[i] = roundResults(player[i], dealer)
                player[i].betOptions = changeBetOptions(player[i])
                player[i].minBet = setMinBet(player[i])
                player[i] = handReset(player[i])
                if (!player[i].isPlayerActive) inactivePlayers.push(player[i])
            }
        }
        print(space)
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive) {
                player[i].isPlayerActive = isBankEmpty(player[i])
            }
        }
        dealer = handReset(dealer)
        deck = shuffle(deck, initCardAmount)
        print(space)
    }

    if (inactivePlayers.length === numPlayers) {
        print('All players have left the table')
        print(space)
        isGameActive = false;
        endGameResults(player, roundNum)
    }
}
