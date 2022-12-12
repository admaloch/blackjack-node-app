const dataUtils = require("./data")
const player = dataUtils.playerHands

// updates bet options based on amount in players bank
function changeBetOptions(player) {

    for (let i = 0; i < player.length; i++) {
        player[i].betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
        if (player[i].bank < 1000) {
            const strToNums = player[i].betOptions.map(x => parseInt(x.replace(/\D/g, "")))
            const filterBank = strToNums.filter(x => x <= player[i].bank)
            const returnToStr = filterBank.map(x => '$' + x)
            returnToStr.push('All')
            
        }
    }
    return returnToStr
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet(player) {
    for (let i = 0; i < player.length; i++) {
        if (player[i].bet <= player[i].bank && !player[i].betDoubled) {
            player[i].minBet = player[i].bet
        } else if (player[i].bet <= player[i].bank && player[i].betDoubled === true) {
            player[i].minBet = player[i].bet / 2
        } else player[i].minBet = 5
    }
}
module.exports = { changeBetOptions, setMinBet }