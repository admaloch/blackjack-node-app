const hideDearlerCards = arr => (
    [arr[0], ...arr.slice(1).map(x => x = 'X')]
)

module.exports = { hideDearlerCards }