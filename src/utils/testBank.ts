
const print = require('./print')
const space = '--------------------------------------------------'
import { Players } from "./interfaces"

// when player leaves or runs out of money
function isBankEmpty(player:Players):boolean {
    if (player.bank < 5) {
        print(`${player.name} ran out of money and has left the table`)
        print(space)
        return false;
    } else{
        return true;
    }
}


module.exports = { isBankEmpty }