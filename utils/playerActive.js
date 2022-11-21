const dataUtils = require("./data")

    const checkIfActive = () => {
        dataUtils.playerGotBlackjack = dataUtils.playerHands.filter(x => x.isPlayerActive === false)
        dataUtils.playerHands = dataUtils.playerHands.filter(x => x.isPlayerActive === true)
    }

module.exports = {checkIfActive }
