const dataUtils = require("./data")

// updates bet options based on amount in players bank
function changeBetOptions() {
    dataUtils.betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
    if (dataUtils.playerHands[0].bank < 1000) {
        dataUtils.betOptions = dataUtils.betOptions.map(x => parseInt(x.replace(/\D/g, "")))
            .filter(x => x <= dataUtils.playerHands[0].bank).map(x => '$' + x)
        dataUtils.betOptions.push('All')
    }
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet() {
    if (dataUtils.playerHands[0].bet <= dataUtils.playerHands[0].bank && dataUtils.playerHands[0].betDoubled === false) {
        dataUtils.playerHands[0].minBet = dataUtils.playerHands[0].bet
    } else if (dataUtils.playerHands[0].bet <= dataUtils.playerHands[0].bank && dataUtils.playerHands[0].betDoubled === true) {
        dataUtils.playerHands[0].minBet = dataUtils.playerHands[0].bet / 2
    } else {
        dataUtils.playerHands[0].minBet = 5
    }
}

module.exports = { changeBetOptions, setMinBet }