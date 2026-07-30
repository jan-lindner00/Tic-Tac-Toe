import { useMemo, useState, useEffect} from "react"
import useLocalStorage from "../lib/hooks/useLocalStorage"
import type { GameState } from "../lib/types"
import { AppContext } from "./context"

export default function AppContextProvider({children}: {children: React.ReactNode}){
    const [isComputer, setIsComputer] = useState<boolean>(true)
    const [isX, setIsX] = useState<boolean>(true)
    const [isGame, setIsGame] = useState<boolean>(false)

    const [gameState] = useLocalStorage<GameState | null>("game-state", null)
        
    useEffect(()=>{
        if(!gameState){
            return
        }
        function setState(){
            setIsX(gameState?.isX ?? true)
            setIsComputer(gameState?.isComputer ?? true)
            setIsGame(gameState?.isGame ?? false)
        }
        setState()
    }, [])


    const context = useMemo(()=> {
        return {
            isComputer,
            setIsComputer,
            isX,
            setIsX,
            isGame,
            setIsGame
        }
    }, [isComputer, isX, isGame])

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}
