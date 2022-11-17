const dataUtils = require("./data")

// updates bet options based on amount in players bank
function changeBetOptions() {
    dataUtils.betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
    if (dataUtils.mainPlayer.bank < 1000) {
        dataUtils.betOptions = dataUtils.betOptions.map(x => parseInt(x.replace(/\D/g, "")))
            .filter(x => x <= dataUtils.mainPlayer.bank).map(x => '$' + x)
        dataUtils.betOptions.push('All')
    }
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet() {
    if (dataUtils.mainPlayer.bet <= dataUtils.mainPlayer.bank && dataUtils.mainPlayer.betDoubled === false) {
        dataUtils.mainPlayer.minBet = dataUtils.mainPlayer.bet
    } else if (dataUtils.mainPlayer.bet <= dataUtils.mainPlayer.bank && dataUtils.mainPlayer.betDoubled === true) {
        dataUtils.mainPlayer.minBet = dataUtils.mainPlayer.bet / 2
    } else {
        dataUtils.mainPlayer.minBet = 5
    }
}

module.exports = { changeBetOptions, setMinBet }