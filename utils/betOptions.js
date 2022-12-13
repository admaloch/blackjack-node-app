
// updates bet options based on amount in players bank
function changeBetOptions(player) {
    let betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
    if (player.bank < 1000) {
        const strToNums = betOptions.map(x => parseInt(x.replace(/\D/g, "")))
        const filterBank = strToNums.filter(x => x <= player.bank)
        betOptions = filterBank.map(x => '$' + x)
        betOptions.push('All')
    }
    return betOptions
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet(player) {
    if (player.bet <= player.bank && !player.betDoubled) {
        return player.bet
    } else if (player.bet <= player.bank && player.betDoubled === true) {
        return player.bet / 2
    } else return 5
}
module.exports = { changeBetOptions, setMinBet }