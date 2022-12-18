
 interface Dealer {
    name: string;
    hand: string[];
    handValues: number[];
    sum: number;
    isBlackjack: Boolean;
}

 interface Players extends Dealer  {
    bank: number;
    bet: number;
    minBet: number;
    betDoubled: Boolean;
    isPlayerActive: Boolean;
    betOptions: string[];
    roundsWon: number;
}

//changes the last instance of ace from 11 to 1 as long as the players sum is > 21
export const alterAceValue = (player: Players | Dealer): number[] => {
    if (player.hand.includes('Ace')) {
        while (player.sum > 21) {
            let lastIndex = player.handValues.lastIndexOf(11);
            player.handValues[lastIndex] = 1
    
            if (!player.handValues.includes(11)) break;
        }
    }
    return player.handValues
}


