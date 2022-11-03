const cardPossibilities = [
    { cardName: 'Ace', cardValue: 11, cardAltValue: 1 },
    { cardName: '2', cardValue: 2 },
    { cardName: '3', cardValue: 3 },
    { cardName: '4', cardValue: 4 },
    { cardName: '5', cardValue: 5 },
    { cardName: '6', cardValue: 6 },
    { cardName: '7', cardValue: 7 },
    { cardName: '8', cardValue: 8 },
    { cardName: '9', cardValue: 9 },
    { cardName: '10', cardValue: 10 },
    { cardName: 'Jack', cardValue: 10 },
    { cardName: 'Queen', cardValue: 10 },
    { cardName: 'King', cardValue: 10 },
]



// Begin game
console.log('Welcome to the Blackjack table')
const prompt = require('prompt-sync')()
let name = prompt('What is your name? ')
name = name[0].toUpperCase() + name.slice(1).trim()

// object with user and dealer data
let playerHands = [
    { name: 'The dealer', hand: [], handValues: [], sum: 0 },
    { name: name, hand: [], handValues: [], sum: 0, bank: 1000, minBet: 5 },
]

const dealer = playerHands[0];
const mainPlayer = playerHands[1];

let betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000']

let roundNum = 0;
const space = '--------------------------------------------------'
let isGameActive = false;
let isLeaveIntro = false;

while (!isLeaveIntro) {
    let begin = prompt(`Welcome ${name}. Are you ready to start the game? Yes or No `)
    if (begin.trim().toLowerCase() == 'yes' || begin.trim().toLowerCase() == 'ya' || begin.trim().toLowerCase() == 'y') {

        console.log('Type quit anytime to leave the table.');
        for (let i = 0; i < playerHands.length; i++) {
            console.log(`${playerHands[i].name} has entered the table.`)
        }
        isLeaveIntro = true;
        isGameActive = true;
    } else if (begin.trim().toLowerCase() == 'no' || begin.trim().toLowerCase() == 'nope' || begin.trim().toLowerCase() == 'n') {
        console.log('Feel free to return and play again later')
        isLeaveIntro = true;
    }
    else {
        console.log('Invalid response. Respond with (yes or no)')
    }
}

const hideDearlerCards = (arr) => (
    [arr[0], ...arr.slice(1).map(x => x = 'x')]
)

let bet = 0
// begin game loop
while (isGameActive) {
    //place bets
    console.log(`Current bank: $${mainPlayer.bank} -- Minimum Bet: $${mainPlayer.minBet}`)

    bet = prompt(`Place your bet using any combination of the available chips (${betOptions}) `)
    if (bet !== 'quit' && bet !== 'q') {

        bet = parseInt(bet.replace(/\D/g, ""))
        while (bet < mainPlayer.minBet || bet % 5 !== 0 || bet > mainPlayer.bank || isNaN(bet) === true) {
            if (mainPlayer.minBet === 5 && bet < 5) console.log('Bet amount is too low. $5 is the minimum bid')
            else if (mainPlayer.minBet > 5 && bet <= mainPlayer.minBet) console.log(`Minimum bet: $${mainPlayer.minBet}. Amount can't be lower than the bet from the previous round.`)
            else if (bet > mainPlayer.bank) console.log('Bet is too high. The amount cannot exceed the value in your bank')
            else if (isNaN(bet) === true) console.log('Invalid number. Make sure your bet is a number combining the values of the available chips.')
            else console.log('Invalid input. Make sure your bet is a valid number and is a combination of the available chips')
            bet = prompt(`Place your bet using any combination of the available chips (${betOptions}) `)
        }

        roundNum++
        mainPlayer.bank -= bet
        console.log(`Current bet: $${bet}. Current bank: $${mainPlayer.bank}`)
        randomCardGen(2, 0)
        randomCardGen(2, 1)
        // dealer.hand = [10, 11]
        // mainPlayer.hand = [5, 3]
        console.log(`The dealer's hand: ${hideDearlerCards(dealer.hand)}`)
        console.log(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)

        //if mainplayer gets blackjack
        if (mainPlayer.sum === 21) {
            console.log('Blackjack!')
            console.log(`The dealer's hand revealed: ${dealer.hand}. Total: ${dealer.sum} `)

            if (dealer.sum !== 21) {
                console.log('You win!')
                mainPlayer.bank += bet * 2.5

            } else {
                console.log('Dealer got a blackjack!')
                console.log('Push!')
                mainPlayer.bank += bet * 1
            }
        }

        // if player doesn't get blackjack and has to draw
        else {
            // loop option to hit or stay until player chooses stay or busts
            let hitOrStay = ''
            while (hitOrStay !== 'stay' && mainPlayer.sum < 21) {
                hitOrStay = prompt('Hit or Stay ')
                if (hitOrStay === 'hit') {
                    randomCardGen(1, 1)
                    console.log(`You hit: ${mainPlayer.hand}. Total: ${mainPlayer.sum}`)
                } else {
                    console.log(`You decided to stay.`)
                }
            }

            // if player busts
            if (mainPlayer.sum > 21) {
                console.log('Bust!')
                console.log(`The dealer's hand: ${dealer.hand}. Total: ${dealer.sum} `)
                console.log('Dealer wins!')
            }

            // if user chooses to stay or gets 21 (non blackjack)
            else if (hitOrStay === 'stay' || mainPlayer.sum === 21) {
                console.log(`The dealer's hand: ${dealer.hand}. Total: ${dealer.sum} `)
                // dealer uncovers card
                // if blackjack.. dealer wins
                if (dealer.sum === 21) {
                    console.log('Blackjack!')
                    console.log('Dealer wins.')
                }
                else {
                    // loop as long as the dealers sum is below 17 he has to draw
                    while (dealer.sum < 17) {
                        randomCardGen(1, 0)
                        console.log(`The dealer hit: ${dealer.hand}. Total: ${dealer.sum} `)
                    }
                    if (dealer.sum > 21) {
                        console.log('Dealer bust!')
                        console.log(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
                        console.log('You win!')
                        mainPlayer.bank += bet * 2
                    }
                    // if dealers sum is >= 17.. he has to stay and the hands are compared
                    else if (dealer.sum >= 17) {
                        console.log('The dealer stays.')
                        console.log(`Your total: ${mainPlayer.sum}. Dealer total: ${dealer.sum} `)
                        if (mainPlayer.sum > dealer.sum) {
                            console.log('You win!')
                            mainPlayer.bank += bet * 2
                        } else if (mainPlayer.sum === dealer.sum) {
                            console.log('Push!')
                            mainPlayer.bank += bet * 1
                        } else {
                            console.log('The dealer won.')
                        }
                    }
                }
            }
        }
    } else {
        console.log('You have left the table.')
        endGameResults()
        isGameActive = false
    }
    changeBetOptions()
    handReset()
    setMinBet()

    isBankEmpty()
}

function isBankEmpty() {
    if (mainPlayer.bank < 5) {
        console.log('You have run out of money')
        console.log('The dealer wins the game')
        endGameResults()
        isGameActive = false
    }
}

function setMinBet() {
    if (bet <= mainPlayer.bank) {
        mainPlayer.minBet = bet
    } else {
        mainPlayer.minBet = 5
    }
}

function handReset() {
    mainPlayer.hand = []
    mainPlayer.handValues = []
    mainPlayer.sum = 0
    dealer.hand = []
    dealer.handValues = []
    dealer.sum = 0
}

function changeBetOptions() {
    if (mainPlayer.bank < 1000) {
        betOptions = betOptions.map(x => parseInt(x.replace(/\D/g, "")))
            .filter(x => x <= mainPlayer.bank).map(x => '$' + x)
    } else {
        betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000']
    }
}

function endGameResults() {
    const loss = (1000 - mainPlayer.bank);
    const gain = (mainPlayer.bank - 1000);
    console.log(space)
    console.log('Game results:')
    console.log(`Rounds played: ${roundNum}`)
    console.log(`Current bank: $${mainPlayer.bank}`)
    if (mainPlayer.bank <= 1000) console.log(`Money lost: $${loss}`)
    if (mainPlayer.bank > 1000) console.log(`Money earned: $${gain}`)
}


function randomCardGen(num, player) {
    let randomNums = []
    for (let i = 0; i < num; i++) {
        randomNums.push(Math.floor(Math.random() * 13) + 1)
    }
    let cardNames = randomNums.map(nums => cardPossibilities[nums - 1].cardName)
    let cardValues = randomNums.map(nums => cardPossibilities[nums - 1].cardValue)
    let cardSum = cardValues.reduce((p, c) => p + c)
    playerHands[player].hand = [...playerHands[player].hand, ...cardNames]
    playerHands[player].handValues = [...playerHands[player].handValues, ...cardValues]
    playerHands[player].sum = playerHands[player].sum += cardSum

}

