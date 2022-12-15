export interface CardObj {
    cardName: string;
    cardValue: number;
    numInDeck: number;
    index?: number;
}

export interface Dealer {
    name: string;
    hand: string[];
    handValues: number[];
    sum: number;
    isBlackjack: Boolean;
}

export interface Players extends Dealer {
    bank: number;
    bet: number;
    minBet: number;
    betDoubled: Boolean;
    isPlayerActive: Boolean;
    betOptions: string[];
    roundsWon: number;
}

export interface CardObj {
    cardName: string;
    cardValue: number;
    numInDeck: number;
    index?: number;
}



