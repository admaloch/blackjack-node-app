import { CardObj, Dealer } from "./interfaces"

export const dealCards = <T extends Dealer>(deck: CardObj[], player: T, numCards: number): T => {
    const emptyCardArr = testForEmptyCards(deck)
    const randNumsArr = genRandomNums(numCards, emptyCardArr);
    const updatedPlayer = updatePlayerObj(randNumsArr, deck, player);
    return updatedPlayer
}

// test for and generates an array of empty cards from the main deck
const testForEmptyCards = (deck: CardObj[]): number[] => {
    const addDeckIndex = deck.map((obj, i) => Object.assign(obj, { index: i }))
    const filterEmptyCards = addDeckIndex.filter(x => x.numInDeck == 0)
    const mapEmptyCards = filterEmptyCards.map(y => (y.index + 1))
    return mapEmptyCards
}

//generates a random arry based on numCards, and filters empty cards if needed
const genRandomNums = (numCards: number, emptyCardArr: number[]): number[] => {
    let randomNums: number[] = []
    for (let i = 0; i < numCards; i++) {
        emptyCardArr.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCardArr))
    }
    return randomNums;
}

// --- returns random number that excludes empty cards in deck-- only runs in the unlikely event any cards run out
//takes array of empty numbers from the deck
//loops from 1-13 and adds the indexes that are not in the empty array to a new array
// ex. empty array = [4,6] nums = [1,2,3,5,7,8,9,10,11,12,13]
//save a random number to var randomIndex based on length of nums[]
//return nums[randomIndex] - this will gen a random number that was not included in the empty array input

const randomExcluded = (emptyCardArr: number[]): number => {
    const nums: number[] = [];
    for (let i = 1; i <= 13; i++) {
        if (!emptyCardArr.includes(i)) nums.push(i);
    }
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}

//use the randNumsArr to interate over the deck and determine the correct cardNames
const genCardNames = (randNumsArr: number[], deck: CardObj[]) => {
    const cardNamesArr = randNumsArr.map(nums => deck[nums - 1].cardName);
    return cardNamesArr;
}

//does the same but for card values ^
const genCardValues = (randNumsArr: number[], deck: CardObj[]) => {
    const cardValuesArr = randNumsArr.map(nums => deck[nums - 1].cardValue);
    return cardValuesArr;
}

export let cardNamesArr: string[] = [];

// runs whenever cards are dealt and returns an updated object for the inputted player
const updatePlayerObj = <T extends Dealer>(randNumsArr: number[], deck: CardObj[], player: T): T => {
    cardNamesArr = genCardNames(randNumsArr, deck)
    const cardValuesArr = genCardValues(randNumsArr, deck)
    player.hand = [...player.hand, ...cardNamesArr]
    player.handValues = [...player.handValues, ...cardValuesArr]
    player.sum = player.handValues.reduce((a, b) => a + b)
    player = alterAceValue(player)
    return player;
}

//changes the last index of ace from 11 to 1 as long as the players sum is > 21
const alterAceValue = <T extends Dealer> (player: T): T => {
    if (player.hand.includes('Ace')) {
        while (player.sum > 21) {
            let lastIndex = player.handValues.lastIndexOf(11);
            player.handValues[lastIndex] = 1
            player.sum = player.handValues.reduce((p, c) => p + c)
            if (!player.handValues.includes(11)) break;
        }
    }
    return player;
}

// subtract the cards that get delt from the deck
export const removeFromDeck = (deck: CardObj[], cardNamesArr: string[]): CardObj[] => {
    const updatedDeck = deck;
    updatedDeck.forEach(a =>
        cardNamesArr.forEach(b =>
            a.cardName === b ? a.numInDeck-- : a))
    return updatedDeck
}