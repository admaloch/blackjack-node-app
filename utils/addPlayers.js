const dataUtils = require("./data")
const prompt = require('prompt-sync')()

const addPlayers = () => {
    const player = dataUtils.playerHands
    for (let i = 0; i < dataUtils.numPlayers; i++) {
        player[i] = {
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
        };
        let name = prompt(`Player ${i + 1}: Enter your name: `)
        name = name[0].toUpperCase() + name.slice(1).trim()
        player[i].name = name
    }
}

module.exports = { addPlayers }