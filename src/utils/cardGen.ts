
import { CardObj } from "./interfaces"

// test for and generates an array of empty cards from the main deck
export const testForEmptyCards = (deck: CardObj[]): number[] => {
    const addDeckIndex = deck.map((obj, i) => Object.assign(obj, { index: i }))
    const filterEmptyCards = addDeckIndex.filter(x => x.numInDeck == 0)
    const mapEmptyCards = filterEmptyCards.map(y => (y.index + 1))
    return mapEmptyCards
}

//generates a random arry based on number input
export const genCards = (numCards: number, emptyCards: number[]): number[] => {
    let randomNums: number[] = []
    for (let i = 0; i < numCards; i++) {
        emptyCards.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCards))
    }
    return randomNums;
}

// --- return number/numbers 
//takes array of empty numbers from the deck
//loops from 1-13 and adds the indexes that are not in the empty array to a new array
// ex. empty array = [4,6] nums = [1,2,3,5,7,8,9,10,11,12,13]
//save a random number to var randomIndex based on length of nums[]
//return nums[randomIndex] - this will gen a random number that was not included in the empty array input
const randomExcluded = (emptyCardArr: number[]): number => {
    const nums = [];
    for (let i = 1; i <= 13; i++) {
        if (!emptyCardArr.includes(i)) {
            nums.push(i);
        }
        // if (nums.length === 0) return false; 
    }
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}
