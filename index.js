const initCardAmount = 8;
const cardPossibilities = [
    { cardName: 'Ace', cardValue: 11, numInDeck: 8 },
    { cardName: '2', cardValue: 2, numInDeck: 8 },
    { cardName: '3', cardValue: 3, numInDeck: 8 },
    { cardName: '4', cardValue: 4, numInDeck: 8 },
    { cardName: '5', cardValue: 5, numInDeck: 8 },
    { cardName: '6', cardValue: 6, numInDeck: 8 },
    { cardName: '7', cardValue: 7, numInDeck: 8 },
    { cardName: '8', cardValue: 8, numInDeck: 8 },
    { cardName: '9', cardValue: 9, numInDeck: 8 },
    { cardName: '10', cardValue: 10, numInDeck: 8 },
    { cardName: 'Jack', cardValue: 10, numInDeck: 8 },
    { cardName: 'Queen', cardValue: 10, numInDeck: 8 },
    { cardName: 'King', cardValue: 10, numInDeck: 8 },
]

// Begin game
const space = '--------------------------------------------------'
console.log(space)
console.log('Welcome to the Blackjack table')
const prompt = require('prompt-sync')()
console.log(space)
let name = prompt('What is your name? ')
name = name[0].toUpperCase() + name.slice(1).trim()

// object with user and dealer data
let playerHands = [
    { name: 'The dealer', hand: [], handValues: [], sum: 0 },
    { name: name, hand: [], handValues: [], sum: 0, bank: 1000, minBet: 5, betDoubled: false },
]

const dealer = playerHands[0];
const mainPlayer = playerHands[1];

let betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
let roundNum = 0;
let isGameActive = false;
let isLeaveIntro = false;

while (!isLeaveIntro) {
    console.log(space)
    let begin = prompt(`Welcome ${name}. Are you ready to start the game? (Yes or No) `).trim().toLowerCase()
    if (begin == 'yes' || begin == 'ya' || begin == 'y') {
        console.log(space)
        console.log('Type quit anytime to leave the table');
        console.log(space)
        for (let i = 0; i < playerHands.length; i++) {
            console.log(`${playerHands[i].name} has entered the table`)
        }
        console.log(space)
        isLeaveIntro = true;
        isGameActive = true;
    } else if (begin == 'no' || begin == 'nope' || begin == 'n') {
        console.log(space)
        console.log('Feel free to return and play again later')
        isLeaveIntro = true;
        console.log(space)
    }
    else {
        console.log(space)
        console.log('Invalid response. Respond with (Yes or No)')
    }
}

const hideDearlerCards = (arr) => (
    [arr[0], ...arr.slice(1).map(x => x = 'X')]
)

let bet = 0
// begin game loop
while (isGameActive) {
    console.log(`Current bank: $${mainPlayer.bank} -- Minimum bet: $${mainPlayer.minBet}`)

    // Bets -- prompts the user for a bet until a valid bet is placed or the user quits the game
    let isBetValid = false
    while (isBetValid !== true) {
        bet = prompt(`Place your bet using any combination of the available chips (${betOptions}) `)
        console.log(space)
        let betNotNum = bet.trim().toLowerCase()
        bet = parseInt(bet.replace(/\D/g, ""))

        if (bet % 5 === 0 && bet >= mainPlayer.minBet && bet <= mainPlayer.bank || betNotNum === 'all') {

            if (betNotNum === 'all') {
                bet = mainPlayer.bank
            }
            roundNum++
            mainPlayer.bank -= bet
            console.log(`Current bet: $${bet} -- Current bank: $${mainPlayer.bank}`)
            randomCardGen(2, dealer)
            randomCardGen(2, mainPlayer)
            console.log(`The dealer's hand: ${hideDearlerCards(dealer.hand)}`)
            console.log(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
            console.log(space)
            isBetValid = true
        }
        else {
            if (betNotNum === 'quit' || betNotNum === 'q') {
                console.log('You left the table')
                endGameResults()
                isBetValid = true
                isGameActive = false
            } else if (mainPlayer.minBet === 5 && bet < 5) {
                console.log('Bet amount is too low. $5 is the minimum bid')
            } else if (mainPlayer.minBet > 5 && bet < mainPlayer.minBet) {
                console.log(`Minimum bet: $${mainPlayer.minBet}. Amount can't be lower than the bet from the previous round.`)
            } else if (bet > mainPlayer.bank) {
                console.log('Bet is too high. The amount cannot exceed the value in your bank')
            } else {
                console.log('Invalid input. Make sure your bet is a valid number and is a combination of the available chips')
            }
        }
    }

    //if mainplayer gets blackjack
    if (mainPlayer.sum === 21) {
        console.log('Blackjack!')
        console.log(space)
        console.log(`The dealer's hand revealed: ${dealer.hand} -- Total: ${dealer.sum} `)
        if (dealer.sum !== 21) {
            console.log(space)
            console.log('You win!')
            mainPlayer.bank += bet * 2.5
            console.log(space)
        } else {
            console.log(space)
            console.log('The dealer got a blackjack!')
            console.log(space)
            console.log('Push!')
            console.log(space)
            mainPlayer.bank += bet * 1
        }
    }

    // if player doesn't get blackjack and has to draw
    else {
        let hitOrStay = ''
        // determine if bank is big enough for doubleup
        if (bet <= mainPlayer.bank) {

            let doubleUp = prompt("Double up? (Yes or No) ").trim().toLowerCase()
            while (doubleUp !== 'yes' && doubleUp !== 'y' && doubleUp !== 'no' && doubleUp !== 'n' && doubleUp !== 'quit' && doubleUp !== 'q') {
                doubleUp = prompt("Invalid response. Pick (Yes or No) ")
            }
            if (doubleUp === 'yes' || doubleUp === 'y') {
                console.log(space)
                mainPlayer.betDoubled = true
                mainPlayer.bank -= bet
                bet = bet * 2
                console.log(`Doubled bet: $${bet} -- Current bank: $${mainPlayer.bank}`)
                randomCardGen(1, mainPlayer)
                console.log(`You hit: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
                hitOrStay = 'stay'
            } else if (doubleUp === 'quit' || doubleUp === 'q') {
                console.log('You have left the table')
                endGameResults()
                isGameActive = false
            }
            else {
                hitOrStay = ''
                console.log(space)
            }
        }  // loop option to hit or stay until player chooses stay or busts

        while (hitOrStay !== 'stay' && hitOrStay !== 's' && hitOrStay !== 'quit' && hitOrStay !== 'q'
            && mainPlayer.sum < 21 && isGameActive !== false) {

            hitOrStay = prompt('Hit or stay? ').trim().toLowerCase()
            if (hitOrStay === 'hit' || hitOrStay === 'h') {
                randomCardGen(1, mainPlayer)
                console.log(`You hit: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
            }
            else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                console.log('You have left the table')
                endGameResults()
                isGameActive = false
            } else if (hitOrStay === 'stay' || hitOrStay === 's') {
                console.log('You have decided to stay')
            }
            else {
                console.log(`Invalid resonse. Pick hit or stay`)
            }
        }

        // if player busts
        if (mainPlayer.sum > 21) {
            console.log(space)
            console.log('Bust!')
            console.log(space)
            console.log(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
            console.log('Dealer wins!')
            console.log(space)
        }

        // if user chooses to stay or gets 21 (non blackjack)
        else if (hitOrStay === 'stay' || hitOrStay === 's' || mainPlayer.sum === 21) {
            console.log(space)
            console.log(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `)
            console.log(space)
            // if blackjack.. dealer wins
            if (dealer.sum === 21) {
                console.log('Blackjack!')
                console.log(space)
                console.log('Dealer wins!')
                console.log(space)
            }
            else {
                // loop as long as the dealers sum is below 17 he has to draw
                while (dealer.sum < 17) {
                    randomCardGen(1, dealer)
                    console.log(`The dealer hit: ${dealer.hand} -- Total: ${dealer.sum} `)
                }
                if (dealer.sum > 21) {
                    console.log(space)
                    console.log('Dealer bust!')
                    console.log(space)
                    console.log(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum}`)
                    console.log('You win!')
                    console.log(space)
                    mainPlayer.bank += bet * 2
                }
                // if dealers sum is >= 17.. he has to stay and the hands are compared
                else if (dealer.sum >= 17) {
                    console.log('The dealer stays')
                    console.log(`Your total: ${mainPlayer.sum} -- Dealer total: ${dealer.sum} `)
                    if (mainPlayer.sum > dealer.sum) {
                        console.log(space)
                        console.log('You win!')
                        mainPlayer.bank += bet * 2
                    } else if (mainPlayer.sum === dealer.sum) {
                        console.log(space)
                        console.log('Push!')
                        mainPlayer.bank += bet * 1
                    } else {
                        console.log(space)
                        console.log('The dealer won!')
                    }
                    console.log(space)
                }
            }
        }
    }
    shuffle()
    changeBetOptions()
    setMinBet()
    handReset()
    isBankEmpty()
}

// runs whenever cards are dealt
// generates hands for players
// updates hand info in the playerHands array
//updates the cardPossibilities array
function randomCardGen(numCards, player) {
    let emptyCardArray = isCardEmpty()
    let randomNums = []
    genRandomNums(numCards, emptyCardArray, randomNums)
    let cardNames = randomNums.map(nums => cardPossibilities[nums - 1].cardName)
    let cardValues = randomNums.map(nums => cardPossibilities[nums - 1].cardValue)
    let cardSum = cardValues.reduce((p, c) => p + c)
    player.hand = [...player.hand, ...cardNames]
    player.handValues = [...player.handValues, ...cardValues]
    player.sum = player.sum += cardSum
    removeFromDeck(cardNames)
    alterAceValue(player)
}

// test if card type is empty before cards get dealt to avoid dealing these cards
function isCardEmpty() {
    return cardPossibilities.map((obj, i) => Object.assign(obj, { index: i }))
        .filter(x => x.numInDeck == 0).map(y => (y.index + 1))
}

//generate random nums
function genRandomNums(numCards, emptyCardArray, randomNums) {
    for (let i = 0; i < numCards; i++) {
        emptyCardArray.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCardArray))
    }
}

// generates cards but accepts an array of cards to exclude if they are empty in the card object
function randomExcluded(exclude) {
    const nums = [];
    for (let i = 1; i <= 13; i++) {
        if (!exclude.includes(i)) nums.push(i);
    }
    if (nums.length === 0) return false;
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}

// subtract cards that get delt from the cardPossibilities object
function removeFromDeck(cardNames) {
    return cardPossibilities.filter(item => cardNames.includes(item.cardName))
        .forEach(x => x.numInDeck -= 1)
}

//changes the last instance of ace from 11 to 1 as long as the players sum is > 21
function alterAceValue(player) {
    if (player.hand.includes('Ace')) {
        while (player.sum > 21) {
            let lastIndex = player.handValues.lastIndexOf(11);
            player.handValues[lastIndex] = 1
            player.sum = player.handValues.reduce((p, c) => p + c)
            if (player.handValues.includes(11) === false) break;
        }
    }
}

// reset card amount in card possibilities array once 1/2 of deck used
function shuffle() {
    const sum = cardPossibilities.map(x => x.numInDeck).reduce((p, c) => p + c)
    if (sum < 52) {
        cardPossibilities.forEach(cards => cards.numInDeck = initCardAmount)
        console.log('Deck is being shuffled')
        console.log(space)
    }
}

// ends game when the player runs out of money :(
function isBankEmpty() {
    if (mainPlayer.bank < 5) {
        console.log('You have run out of money')
        console.log('The dealer wins the game')
        endGameResults()
        isGameActive = false
    }
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet() {
    if (bet <= mainPlayer.bank && mainPlayer.betDoubled === false) {
        mainPlayer.minBet = bet
    } else if (bet <= mainPlayer.bank && mainPlayer.betDoubled === true) {
        mainPlayer.minBet = bet / 2
    } else {
        mainPlayer.minBet = 5
    }
}

// resets hand info in playerHands array
function handReset() {
    mainPlayer.hand = []
    mainPlayer.handValues = []
    mainPlayer.sum = 0
    mainPlayer.betDoubled = false
    dealer.hand = []
    dealer.handValues = []
    dealer.sum = 0
}

// updates bet options based on amount in players bank
function changeBetOptions() {
    betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
    if (mainPlayer.bank < 1000) {
        betOptions = betOptions.map(x => parseInt(x.replace(/\D/g, "")))
            .filter(x => x <= mainPlayer.bank).map(x => '$' + x)
        betOptions.push('All')
    }
}

// displays final stats when player loses or leaves the table
function endGameResults() {
    const loss = (1000 - mainPlayer.bank);
    const gain = (mainPlayer.bank - 1000);
    console.log(space)
    console.log('Game results:')
    console.log(space)
    console.log(`Rounds played: ${roundNum}`)
    console.log(`Current bank: $${mainPlayer.bank}`)
    if (mainPlayer.bank <= 1000) console.log(`Money lost: $${loss}`)
    if (mainPlayer.bank > 1000) console.log(`Money earned: $${gain}`)
    console.log(space)
}