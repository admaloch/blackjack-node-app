
const print = require('./print')
const space = '--------------------------------------------------'

// when player leaves or runs out of money
function isBankEmpty(player) {
    if (player.bank < 5) {
        print(`${player.name} ran out of money and has left the table`)
        print(space)
        return false;
    } else{
        return true;
    }
}


module.exports = { isBankEmpty }