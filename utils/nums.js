

//generate random nums
function genRandomNums(numCards, emptyCardArray, randomNums) {
    for (let i = 0; i < numCards; i++) {
        emptyCardArray.length === 0
            ? randomNums.push(Math.floor(Math.random() * 13) + 1)
            : randomNums.push(randomExcluded(emptyCardArray))
    }
}

module.exports = {genRandomNums}