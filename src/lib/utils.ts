export function gameEndModalText(isComputer: boolean, isX: boolean, xHasWon: boolean){
    if(isComputer){
        if(isX){
            return xHasWon ? "You won!" : "Oh no, you lost..."
        }else{
            return xHasWon ? "Oh no, you lost..." : "You won!"
        }
    }else{
        if(isX){
            return xHasWon ? "Player 1 Wins!" : "Player 2 Wins!"
        }else{
            return xHasWon ? "Player 2 Wins!": "Player 1 Wins!"
        }
    }
}

export function statisticsTextX(isComputer: boolean, isX: boolean){
    switch(isX){
        case false: 
            return isComputer ? "(CPU)" : "(P2)"
        default:
            return isComputer ? "(You)" : "(P1)"
    }  
}

export function statisticsTextO(isComputer: boolean, isX: boolean){
    switch(isX){
        case true: 
            return isComputer ? "(CPU)" : "(P2)"
        default:
            return isComputer ? "(You)" : "(P1)"
    }
}