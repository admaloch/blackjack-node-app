const dataUtils = require("./data")
const print = require('./print')

// ends game when the player runs out of money :(
function isBankEmpty() {
    const player = dataUtils.playerHands
    for (let i = 0; i < player.length; i++) {
        if (player[i].bank < 5) {
            print(`${player[i]} ran out of money and has left the table`)
            player = player.filter(x => x.name !== player[i].name)
        }
    }
}

module.exports = { isBankEmpty }