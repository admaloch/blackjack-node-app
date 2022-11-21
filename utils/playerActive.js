const dataUtils = require("./data")

    const checkIfActive = () => {
        dataUtils.playerRoundComplete = dataUtils.playerHands.filter(x => x.isPlayerActive === false)
        dataUtils.playerHands = dataUtils.playerHands.filter(x => x.isPlayerActive === true)
    }

module.exports = {checkIfActive }
