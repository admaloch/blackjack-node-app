const dataUtils = require("./data")
const print = require('./print')

// ends game when the player runs out of money :(
function isBankEmpty() {
    const player = dataUtils.playerHands
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (player[i].bank < 5) {
            print(`${dataUtils.playerHands[i]} ran out of money and has left the table`)
            dataUtils.playerLeftTable = [...dataUtils.playerLeftTable, ...dataUtils.playerHands.filter(x => x.name === player[i].name)]
            dataUtils.playerHands = dataUtils.playerHands.filter(x => x.name !== player[i].name)
        }
    }
    print('--------------------------------------------------')
}



module.exports = { isBankEmpty }