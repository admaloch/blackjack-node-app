"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addPlayers_1 = require("./utils/addPlayers");
const betOptions_1 = require("./utils/betOptions");
const cardGen_1 = require("./utils/cardGen");
const dealer_1 = require("./utils/dealer");
const deck_1 = require("./utils/deck");
const endResults_1 = require("./utils/endResults");
const handReset_1 = require("./utils/handReset");
const hideDealer_1 = require("./utils/hideDealer");
const print_1 = require("./utils/print");
const roundResults_1 = require("./utils/roundResults");
const shuffle_1 = require("./utils/shuffle");
const testBank_1 = require("./utils/testBank");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
let player = [];
let inactivePlayers = [];
let dealer = dealer_1.dealerObject;
let initCardAmount = 0;
let deck = deck_1.mainDeck;
// Begin game
const space = '--------------------------------------------------';
(0, print_1.print)(space);
(0, print_1.print)('Welcome to the Blackjack table');
(0, print_1.print)(space);
//num players section
//ask for number of players and confirm it is valid
let isPlayerNumValid = false;
let numPlayers = 0;
while (!isPlayerNumValid) {
    numPlayers = parseInt(prompt("How many players? "));
    (0, print_1.print)(space);
    if (numPlayers > 0 && numPlayers <= 5) {
        player = (0, addPlayers_1.addPlayers)(numPlayers);
        isPlayerNumValid = true;
        initCardAmount = (numPlayers * 4) + 4;
    }
    else if (numPlayers > 5) {
        (0, print_1.print)('Invalid response. Maximum number of players is 5');
        (0, print_1.print)(space);
    }
    else {
        (0, print_1.print)('Invalid response. Make sure you pick between 1 and 5 players');
    }
}
//asks players if ready to start 
let isLeaveIntro = false;
let isGameActive = false;
while (!isLeaveIntro) {
    let begin = '';
    (0, print_1.print)(space);
    if (numPlayers > 1) {
        begin = prompt(`Are all players ready to enter the table? (Yes or No) `).trim().toLowerCase();
    }
    else {
        begin = prompt(`Are you ready to enter the table? (Yes or No) `).trim().toLowerCase();
    }
    if (begin == 'yes' || begin == 'y') {
        (0, print_1.print)(space);
        (0, print_1.print)('Type leave anytime to leave the table or quit to end the game');
        (0, print_1.print)(space);
        (0, print_1.print)(`${dealer.name} has entered the table`);
        (0, print_1.print)(space);
        for (let i = 0; i < player.length; i++) {
            (0, print_1.print)(`${player[i].name} has entered the table`);
            player[i].isPlayerActive = true;
        }
        (0, print_1.print)(space);
        deck = (0, shuffle_1.shuffle)(deck, initCardAmount);
        isLeaveIntro = true;
        isGameActive = true;
    }
    else if (begin == 'no' || begin == 'n' || begin == 'quit' || begin == 'q') {
        (0, print_1.print)(space);
        (0, print_1.print)('Feel free to return and play again later');
        isLeaveIntro = true;
        (0, print_1.print)(space);
    }
    else {
        (0, print_1.print)(space);
        (0, print_1.print)('Invalid response. Respond with (Yes or No)');
    }
}
// begin game. 
//game active until all players run out of money, leave the table, or someone quits.
let roundNum = 0;
while (isGameActive) {
    roundNum++;
    (0, print_1.print)(`Begin round ${roundNum}`);
    (0, print_1.print)(space);
    // bet section
    for (let i = 0; i < player.length; i++) {
        if (player[i].isPlayerActive === true) {
            (0, print_1.print)(`${player[i].name}:`);
            (0, print_1.print)(`Current bank: $${player[i].bank} -- Minimum bet: $${player[i].minBet}`);
            let isBetValid = false;
            let betNotNum = prompt(`Place your bet using any combination of the available chips (${player[i].betOptions}) `);
            while (!isBetValid) {
                player[i].bet = parseInt(betNotNum.replace(/\D/g, ""));
                if (player[i].bet % 5 === 0 && player[i].bet >= player[i].minBet && player[i].bet <= player[i].bank || betNotNum === 'all') {
                    if (betNotNum === 'all')
                        player[i].bet = player[i].bank;
                    player[i].bank -= player[i].bet;
                    (0, print_1.print)(`Current bet: $${player[i].bet} -- Current bank: $${player[i].bank}`);
                    (0, print_1.print)(space);
                    isBetValid = true;
                }
                else {
                    if (betNotNum === 'quit' || betNotNum === 'q') {
                        player.forEach(players => players.isPlayerActive = false);
                        inactivePlayers = player;
                        isBetValid = true;
                        isGameActive = false;
                    }
                    else if (betNotNum === 'leave' || betNotNum === 'l') {
                        (0, print_1.print)(space);
                        (0, print_1.print)(`${player[i].name} left the table.`);
                        player[i].isPlayerActive = false;
                        inactivePlayers.push(player[i]);
                        isBetValid = true;
                        (0, print_1.print)(space);
                    }
                    else {
                        (0, print_1.print)(space);
                        if (player[i].minBet === 5 && player[i].bet < 5) {
                            (0, print_1.print)('--- Bet amount is too low. $5 is the minimum bid');
                        }
                        else if (player[i].minBet > 5 && player[i].bet < player[i].minBet) {
                            (0, print_1.print)(`--- Minimum bet: $${player[i].minBet}. Amount can't be lower than the bet from the previous round.`);
                        }
                        else if (player[i].bet > player[i].bank) {
                            (0, print_1.print)('--- Bet is too high. The amount cannot exceed the value in your bank');
                        }
                        else {
                            (0, print_1.print)('--- Invalid input. Make sure your bet is a valid number and is a combination of the available chips');
                        }
                        betNotNum = prompt('Please place a new bet -- ');
                    }
                }
            }
        }
    }
    //dealer draws 2 cards
    if (inactivePlayers.length !== numPlayers) {
        (0, print_1.print)('Dealing cards:');
        (0, print_1.print)(space);
        dealer = (0, cardGen_1.dealCards)(deck, dealer, 2);
        deck = (0, cardGen_1.removeFromDeck)(deck, cardGen_1.cardNamesArr);
        (0, print_1.print)(`The dealer's hand: ${(0, hideDealer_1.hideDealerCards)(dealer.hand)}`);
        (0, print_1.print)(space);
    }
    //players draw 2 cards
    if (inactivePlayers.length !== numPlayers) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive === true) {
                player[i] = (0, cardGen_1.dealCards)(deck, player[i], 2);
                deck = (0, cardGen_1.removeFromDeck)(deck, cardGen_1.cardNamesArr);
                if (player[i].sum === 21) {
                    player[i].isBlackjack = true;
                    (0, print_1.print)(`${player[i].name}'s hand: ${player[i].hand} -- Blackjack!`);
                }
                else {
                    (0, print_1.print)(`${player[i].name}'s hand: ${player[i].hand} -- Total: ${player[i].sum}`);
                }
            }
        }
        (0, print_1.print)(space);
    }
    //Player round section
    for (let i = 0; i < player.length; i++) {
        if (player[i].sum < 21 && player[i].isPlayerActive === true) {
            let playerCanHit = false;
            (0, print_1.print)(`${player[i].name}:`);
            (0, print_1.print)(`Hand: ${player[i].hand} -- Total: ${player[i].sum}`);
            (0, print_1.print)(`Current bet: $${player[i].bet} -- Current bank: $${player[i].bank}`);
            // double up section
            if (player[i].bet <= player[i].bank) {
                let doubleUp = prompt("Double up? (Yes or No) ").trim().toLowerCase();
                let isDoubleUpValid = false;
                while (isDoubleUpValid === false) {
                    if (doubleUp === 'yes' || doubleUp === 'y') {
                        player[i].betDoubled = true;
                        player[i].bank -= player[i].bet;
                        player[i].bet = player[i].bet * 2;
                        (0, print_1.print)(`Doubled bet: $${player[i].bet} -- Current bank: $${player[i].bank}`);
                        player[i] = (0, cardGen_1.dealCards)(deck, player[i], 1);
                        deck = (0, cardGen_1.removeFromDeck)(deck, cardGen_1.cardNamesArr);
                        (0, print_1.print)(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`);
                        isDoubleUpValid = true;
                    }
                    else if (doubleUp === 'no' || doubleUp === 'n') {
                        playerCanHit = true;
                        isDoubleUpValid = true;
                    }
                    else if (doubleUp === 'quit' || doubleUp === 'q') {
                        player.forEach(players => players.isPlayerActive = false);
                        inactivePlayers = player;
                        isDoubleUpValid = true;
                        isGameActive = false;
                    }
                    else if (doubleUp === 'leave' || doubleUp === 'l') {
                        (0, print_1.print)(space);
                        (0, print_1.print)(`${player[i].name} left the table.`);
                        player[i].isPlayerActive = false;
                        inactivePlayers.push(player[i]);
                        isDoubleUpValid = true;
                    }
                    else {
                        doubleUp = prompt("Invalid response. Pick (Yes or No) ");
                    }
                }
            }
            else {
                playerCanHit = true;
            }
            // hit or stay section
            if (playerCanHit === true) {
                let hitOrStay = '';
                let playerIsDone = false;
                while (playerIsDone === false && player[i].sum < 21) {
                    hitOrStay = prompt('Hit or stay? ').trim().toLowerCase();
                    if (hitOrStay === 'hit' || hitOrStay === 'h') {
                        player[i] = (0, cardGen_1.dealCards)(deck, player[i], 1);
                        deck = (0, cardGen_1.removeFromDeck)(deck, cardGen_1.cardNamesArr);
                        (0, print_1.print)(`You hit: ${player[i].hand} -- Total: ${player[i].sum}`);
                    }
                    else if (hitOrStay === 'quit' || hitOrStay === 'q') {
                        player.forEach(players => players.isPlayerActive = false);
                        inactivePlayers = player;
                        playerIsDone = true;
                        isGameActive = false;
                    }
                    else if (hitOrStay === 'leave' || hitOrStay === 'l') {
                        (0, print_1.print)(space);
                        (0, print_1.print)(`${player[i].name} left the table.`);
                        player[i].isPlayerActive = false;
                        inactivePlayers.push(player[i]);
                        playerIsDone = true;
                    }
                    else if (hitOrStay === 'stay' || hitOrStay === 's') {
                        (0, print_1.print)('You decided to stay');
                        playerIsDone = true;
                    }
                    else {
                        (0, print_1.print)(`Invalid resonse. Pick hit or stay`);
                    }
                }
            }
            // if player >= 21
            if (player[i].sum > 21)
                (0, print_1.print)('Bust!');
            else if (player[i].sum === 21)
                (0, print_1.print)('Player stays');
            (0, print_1.print)(space);
        }
    }
    //dealer section
    if (inactivePlayers.length !== numPlayers) {
        (0, print_1.print)(`The dealer's hand: ${dealer.hand} -- Total: ${dealer.sum} `);
        if (dealer.sum === 21) {
            (0, print_1.print)(space);
            (0, print_1.print)('Blackjack!');
            dealer.isBlackjack = true;
        }
        else {
            while (dealer.sum < 17) {
                dealer = (0, cardGen_1.dealCards)(deck, dealer, 1);
                deck = (0, cardGen_1.removeFromDeck)(deck, cardGen_1.cardNamesArr);
                (0, print_1.print)(`The dealer hit: ${dealer.hand} -- Total: ${dealer.sum} `);
            }
        }
        if (dealer.sum > 21) {
            (0, print_1.print)('Dealer bust!');
        }
        else if (dealer.sum >= 17 && dealer.sum < 21) {
            (0, print_1.print)('The dealer stays');
        }
        (0, print_1.print)(space);
    }
    if (inactivePlayers.length !== numPlayers) {
        (0, print_1.print)(`Round ${roundNum} results: `);
        (0, print_1.print)(space);
        if (dealer.isBlackjack) {
            (0, print_1.print)(`Dealer: Blackjack`);
        }
        else if (dealer.sum > 21) {
            (0, print_1.print)('Dealer bust');
        }
        else {
            (0, print_1.print)(`Dealer sum: ${dealer.sum}`);
        }
        (0, print_1.print)(space);
    }
    //results section
    //run functions to test players hands/deck/reset etc..
    if (inactivePlayers.length !== numPlayers) {
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive) {
                player[i] = (0, roundResults_1.roundResults)(player[i], dealer);
                player[i].betOptions = (0, betOptions_1.changeBetOptions)(player[i]);
                player[i].minBet = (0, betOptions_1.setMinBet)(player[i]);
                player[i] = (0, handReset_1.handReset)(player[i]);
                if (!player[i].isPlayerActive)
                    inactivePlayers.push(player[i]);
            }
        }
        (0, print_1.print)(space);
        for (let i = 0; i < player.length; i++) {
            if (player[i].isPlayerActive) {
                player[i] = (0, testBank_1.isBankEmpty)(player[i]);
                if (!player[i].isPlayerActive)
                    inactivePlayers.push(player[i]);
            }
        }
        dealer = (0, handReset_1.handReset)(dealer);
        deck = (0, shuffle_1.shuffle)(deck, initCardAmount);
        (0, print_1.print)(space);
    }
    if (inactivePlayers.length === numPlayers) {
        (0, print_1.print)('All players have left the table');
        (0, print_1.print)(space);
        isGameActive = false;
        (0, endResults_1.endGameResults)(player, roundNum);
    }
}
