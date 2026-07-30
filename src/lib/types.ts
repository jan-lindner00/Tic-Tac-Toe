export type GameState = {
    isX: boolean,
    isComputer: boolean,
    isGame: boolean
}

export type GameData = {
    fieldsO: number[],
    fieldsX: number[],
    xTurn: boolean,
    gamesWonX: number,
    gamesWonO: number,
    gamesDraw: number
}