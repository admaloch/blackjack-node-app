import { Players } from "./interfaces"
import { print } from "./print"

const space = '--------------------------------------------------'

// displays final stats when game is over
export const endGameResults = (player: Players[], roundNum: number): void => {
    print('Game results:')
    print(space)
    print(`Total rounds played: ${roundNum}`)
    print(space)
    for (let i = 0; i < player.length; i++) {
        const loss = (1000 - player[i].bank);
        const gain = (player[i].bank - 1000);
        print(`${player[i].name}:`)
        print(`Bank: $${player[i].bank}`)
        print(`Rounds won: ${player[i].roundsWon}`)
        player[i].bank <= 1000
            ? print(`Money lost: $${loss}`)
            : print(`Money earned: $${gain}`)
        print(space)
    }
}

