//generate random nums.. if empty card array is empty runs normal else it runs randomExcluded
function genRandomNums(numCards, emptyCardArray, randomNums) {
    for (let i = 0; i < numCards; i++) {
        emptyCardArray.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCardArray))
    }
}

// generates cards but accepts an array of cards to exclude if they are empty in the card object
function randomExcluded(exclude) {
    const nums = [];
    for (let i = 1; i <= 13; i++) {
        if (!exclude.includes(i)) nums.push(i);
    }
    if (nums.length === 0) return false;
    const randomIndex = Math.floor(Math.random() * nums.length);
    return nums[randomIndex];
}

module.exports = {genRandomNums}