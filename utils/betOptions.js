const dataUtils = require("./data")

// updates bet options based on amount in players bank
function changeBetOptions() {
    dataUtils.betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (dataUtils.playerHands[i].bank < 1000) {
            dataUtils.betOptions = dataUtils.betOptions.map(x => parseInt(x.replace(/\D/g, "")))
                .filter(x => x <= dataUtils.playerHands[i].bank).map(x => '$' + x)
            dataUtils.betOptions.push('All')
        }
    }
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet() {
    for (let i = 0; i < dataUtils.playerHands.length; i++) {
        if (dataUtils.playerHands[i].bet <= dataUtils.playerHands[i].bank && dataUtils.playerHands[i].betDoubled === false) {
            dataUtils.playerHands[i].minBet = dataUtils.playerHands[i].bet
        } else if (dataUtils.playerHands[i].bet <= dataUtils.playerHands[i].bank && dataUtils.playerHands[i].betDoubled === true) {
            dataUtils.playerHands[i].minBet = dataUtils.playerHands[i].bet / 2
        } else {
            dataUtils.playerHands[i].minBet = 5
        }
    }


}

module.exports = { changeBetOptions, setMinBet }