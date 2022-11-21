const dataUtils = require("./data")

const player = dataUtils.playerHands

// updates bet options based on amount in players bank
function changeBetOptions() {
    let betOptions = dataUtils.betOptions
    betOptions = ['$5', '$25', '$50', '$100', '$500', '$1000', 'All']
    for (let i = 0; i < player.length; i++) {
        if (player[i].bank < 1000) {
            betOptions = betOptions.map(x => parseInt(x.replace(/\D/g, "")))
                .filter(x => x <= player[i].bank).map(x => '$' + x)
            betOptions.push('All')
        }
    }
}

// updates min bet for player based on previous bet/amount in bank
function setMinBet() {
    for (let i = 0; i < player.length; i++) {
        if (player[i].bet <= player[i].bank && player[i].betDoubled === false) {
            player[i].minBet = player[i].bet
        } else if (player[i].bet <= player[i].bank && player[i].betDoubled === true) {
            player[i].minBet = player[i].bet / 2
        } else {
            player[i].minBet = 5
        }
    }


}

module.exports = { changeBetOptions, setMinBet }