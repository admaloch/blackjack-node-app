//changes the last instance of ace from 11 to 1 as long as the players sum is > 21
function alterAceValue(player) {
    if (player.hand.includes('Ace')) {
        while (player.sum > 21) {
            let lastIndex = player.handValues.lastIndexOf(11);
            player.handValues[lastIndex] = 1
            player.sum = player.handValues.reduce((p, c) => p + c)
            if (!player.handValues.includes(11)) break;
        }
    }
}
module.exports = {alterAceValue}