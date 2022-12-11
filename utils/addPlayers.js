
const prompt = require('prompt-sync')()
// const player = dataUtils.playerHands

//add players at beginning of game
let playerArray = []
const addPlayers = (numPlayers) => {
    for (let i = 0; i < numPlayers; i++) {
        playerArray[i] = {
            name: '',
            hand: [],
            handValues: [],
            sum: 0,
            bank: 1000,
            bet: 0,
            minBet: 5,
            betDoubled: false,
            isPlayerActive: false,
            isBlackjack: false,
            betOptions: ['$5', '$25', '$50', '$100', '$500', '$1000', 'All'],
            roundsWon: 0,
        };
        let name = prompt(`Player ${i + 1}: Enter your name: `)
        name = name[0].toUpperCase() + name.slice(1).trim()
        playerArray[i].name = name
    }
   return playerArray
}
module.exports = { addPlayers }

