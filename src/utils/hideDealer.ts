export const hideDealerCards = (arr:string[]) => (
    [arr[0], ...arr.slice(1).map(x => x = 'X')]
)

