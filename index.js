console.log('Welcome to the Blackjack table')
const prompt = require('prompt-sync')()
let name = prompt('What is your name? ')
name = name[0].toUpperCase() + name.slice(1).trim()
let numPlayers = prompt(`Hello, ${name}. How many players would you like to play with? `)
numPlayers = parseInt(numPlayers)
console.log(`${numPlayers} players have entered the game.`)
const cardPossibilities = ['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']
let isGameActive = false;
const opponents = [];

const playerHands = [
    { name: name, hand: [], sum() { return this.hand[0] + this.hand[1] }, money: 2000 }
    
]

for (let i = 0; i < numPlayers; i++) {
    opponents.push(`Player ${i + 1}`)
    console.log(`${opponents[i]} has joined the table`)
    playerHands.push({ name: opponents[i], hand: [], sum() { return this.hand[0] + this.hand[1] } })
}

let begin = prompt('Are you ready to start the game? Yes or No ')
if (begin.trim().toLowerCase() == 'yes' || begin.trim().toLowerCase() == 'ya' || begin.trim().toLowerCase() == 'y') {
    isGameActive = true
}
console.log('Great lets begin')

// while (isGameActive) {
//     console.log('Great lets begin. Type quit anytime to exit the game')

// }




