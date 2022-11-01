let playerHands = [
    { name: 'The dealer', hand: [], sum() { return this.hand.reduce((p, c) => p + c) } },
    { name: name, hand: [], sum() { return this.hand.reduce((p, c) => p + c) }, bank: 1000 },
]
let dealer = playerHands[0];
let mainPlayer = playerHands[1];
let betOptions = [5, 25, 50, 100, 500]
let isGameActive = false;

// Begin game
console.log('Welcome to the Blackjack table')
const prompt = require('prompt-sync')()
let name = prompt('What is your name? ')
name = name[0].toUpperCase() + name.slice(1).trim()

begin = prompt(`Welcome ${name}. Are you ready to start the game? Yes or No `)
if (begin.trim().toLowerCase() == 'yes' || begin.trim().toLowerCase() == 'ya' || begin.trim().toLowerCase() == 'y') {
    isGameActive = true;
    console.log('The game has begun. Type quit anytime to leave the table.');
    for (let i = 0; i < playerHands.length; i++) {
        console.log(`${playerHands[i].name} has entered the table.`)
    }
    console.log(`${name}'s bank: ${mainPlayer.bank}`);
} else {
    console.log('Feel free to return and play later')
}

const hideDearlerCards = (arr) => (
    [arr[0], ...arr.slice(1).map(x => x = 'x')]
)

// begin game loop
while (isGameActive) {
    //place bets
    let bet = prompt(`Place your bet. (${betOptions}) `)
    mainPlayer.bank -= bet
    console.log(`Current bet: $${bet}. Current bank: $${mainPlayer.bank}`)
    randomCardGen(2, 0)
    randomCardGen(2, 1)
    // dealer.hand = [10, 11]
    // mainPlayer.hand = [5, 3]
    console.log(`The dealer's hand: ${hideDearlerCards(dealer.hand)}`)
    console.log(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum()}`)

    //if mainplayer gets blackjack
    if (mainPlayer.sum() === 21) {
        console.log('Blackjack!')
        console.log(`The dealer's hand revealed: ${dealer.hand}. Total: ${dealer.sum()} `)

        if (dealer.sum() !== 21) {
            console.log('You win!')
            mainPlayer.bank += bet * 2.5

        } else {
            console.log('Dealer got a blackjack!')
            console.log('Push!')
            mainPlayer.bank += bet * 1
        }
        console.log(`Current bank: $${mainPlayer.bank}`)
    }

    // if player doesn't get blackjack
    else if (mainPlayer.sum() !== 21) {
        // loop option to hit or stay until player chooses stay or busts
        let hitOrStay = ''
        while (hitOrStay !== 'stay' && mainPlayer.sum() < 21) {
            hitOrStay = prompt('Hit or Stay ')
            if (hitOrStay === 'hit') {
                randomCardGen(1, 1)
                console.log(`You hit: ${mainPlayer.hand}. Total: ${mainPlayer.sum()}`)
            } else {
                console.log(`You decided to stay. Total: ${mainPlayer.sum()}`)
            }
        }

        // if player busts
        if (mainPlayer.sum() > 21) {
            console.log('Bust!')
            console.log(`The dealer's hand: ${dealer.hand}. Total: ${dealer.sum()} `)
            console.log('Dealer wins!')
            console.log(`Current bank: $${mainPlayer.bank}`)
        }

        // if user chooses to stay or gets 21 (non blackjack)
        else if (hitOrStay === 'stay' || mainPlayer.sum() === 21) {
            console.log(`The dealer's hand: ${dealer.hand}. Total: ${dealer.sum()} `)
            // dealer uncovers card
            // if blackjack.. dealer wins
            if (dealer.sum() === 21) {
                console.log('Blackjack!')
                console.log('Dealer wins.')
                console.log(`Current bank: $${mainPlayer.bank}`)
            }
            else {
                // loop as long as the dealers sum is below 17 he has to draw
                while (dealer.sum() < 17) {
                    randomCardGen(1, 0)
                    console.log(`The dealer hit: ${dealer.hand}. Total: ${dealer.sum()} `)
                }
                if (dealer.sum() > 21) {
                    console.log('Dealer bust!')
                    console.log(`Your hand: ${mainPlayer.hand} -- Total: ${mainPlayer.sum()}`)
                    console.log('You win!')
                    mainPlayer.bank += bet * 2
                    console.log(`Current bank: $${mainPlayer.bank}`)
                }
                // if dealers sum is >= 17.. he has to stay and the hands are compared
                else if (dealer.sum() >= 17) {
                    console.log('The dealer stays.')
                    console.log(`Your total: ${mainPlayer.sum()}. Dealer total: ${dealer.sum()} `)
                    if (mainPlayer.sum() > dealer.sum()) {
                        console.log('You win!')
                        mainPlayer.bank += bet * 2
                    } else if (mainPlayer.sum() === dealer.sum()) {
                        console.log('Push!')
                        mainPlayer.bank += bet * 1
                    } else {
                        console.log('The dealer won.')
                    }
                    console.log(`Current bank: $${mainPlayer.bank}`)
                }
            }
        }
        isGameActive === false
    }
}

function randomCardGen(num, player) {
    let randomNums = []
    for (let i = 0; i < num; i++) {
        randomNums.push(Math.floor(Math.random() * 10) + 1)
    }
    playerHands[player].hand = [...playerHands[player].hand, ...randomNums]
}