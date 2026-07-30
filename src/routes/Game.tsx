import {useState, useEffect, useMemo, useCallback} from "react"
import { Navigate } from "react-router"
import useLocalStorage from "../lib/hooks/useLocalStorage.ts"
import type {GameData, GameState} from "../lib/types.ts"
import { useAppContext } from "../lib/hooks/useContext.ts"
import Statistics from "../components/Statistics.tsx"
import RestartModal from "../components/RestartModal.tsx"
import GameEndModal from "../components/GameEndModal.tsx"
import Field from "../components/Field.tsx"
import GameHeader from "../components/GameHeader.tsx"

export default function Game(){
    const {isX, isComputer, isGame} = useAppContext()
    const [_, setGameState] = useLocalStorage<GameState | null>("game-state", null)
    const [gameData, setGameData] = useLocalStorage<GameData | null>("game-data", null)
    const [xTurn, setXTurn] = useState<boolean>(true)
    const [fieldsX, setFieldsX] = useState<number[]>([])
    const [fieldsO, setFieldsO] = useState<number[]>([])
    const [restartModal, setRestartModal] = useState<boolean>(false)
    
    const winningCombos = useMemo(() => shuffleCombos(), [])
    // Derived states
    const playedFields = [...fieldsO, ...fieldsX]

    const unplayedFields = [1,2,3,4,5,6,7,8,9].filter(field => !playedFields.includes(field))
    const xHasWon = winningCombos.some(combo => combo.every(field => fieldsX.includes(field)))
    const oHasWon = winningCombos.some(combo => combo.every(field => fieldsO.includes(field)))
    const gameOver = xHasWon || oHasWon || playedFields.length === 9

    const gameWinningCombo= useCallback(()=>{
        if(!gameOver ){
            return []
        }
        if(xHasWon){
            for(let i=0; i < winningCombos.length; i++){
                if(winningCombos[i].every(field => fieldsX.includes(field))){
                    return winningCombos[i]
                }
            }
        }
        else if(oHasWon){
            for(let i=0; i < winningCombos.length; i++){
                if(winningCombos[i].every(field => fieldsO.includes(field))){
                    return winningCombos[i]
                }
            }
        }else{
            return []
        }
    }, [gameOver, xHasWon, oHasWon, winningCombos, fieldsO, fieldsX])

    const gameWCombo = useMemo(() => gameOver ? gameWinningCombo() ?? [] : [], [gameOver, gameWinningCombo])

// Functions
    function nextTurn(){
        setXTurn(prev => !prev)
    }

    function shuffleCombos(){
        const array = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function gameVsCPU(){
        if(gameOver) return
    
        const three = threeChance()
        if(three) return nextTurn()
    
        const stop = stopThree()
        if(stop) return nextTurn()
    
        const two = twoChance()
        if(two) return nextTurn()
    
        if(isComputer && isX && playedFields.length === 1 && playedFields[0]===5){
            const rand = Math.floor(Math.random()*4)
            const field = [1,3,7,9][rand]
            setFieldsO(prev => [...prev, field]) 
            return nextTurn()
        }
  
        const rand = Math.floor(Math.random() * unplayedFields.length)
        if(isX){
            setFieldsO(prev => [...prev, unplayedFields[rand]])
        }else{
            setFieldsX(prev => [...prev, unplayedFields[rand]])
        } 
        if(!gameOver){
            nextTurn()
        }
        
    }

    function stopThree(){
        if(isX && fieldsX.length < 2 || !isX && fieldsO.length < 2){
            return false
        }
        const stopFieldComboArr = winningCombos.map(combo=>{
            let countOpp = 0
            let countSelf = 0
            for(const field of combo){
                if((isX && fieldsX.includes(field)) || (!isX && fieldsO.includes(field))){
                    countOpp += 1
                }
                if((isX && fieldsO.includes(field)) || (!isX && fieldsX.includes(field))){
                    countSelf += 1
                }
            }
            const add = countOpp === 2 && countSelf === 0
            return add ? combo : []
        }).filter(combo => combo.length === 3)

        if(stopFieldComboArr.length === 0){
            return false
        }

        const stopField = stopFieldComboArr[0].filter(field => isX ? !fieldsX.includes(field) : !fieldsO.includes(field))[0]
        if(isX){
            setFieldsO(prev => [...prev, stopField])
        }else{
            setFieldsX(prev => [...prev, stopField])
        } 

        return true
    }

    function threeChance(){
        if(isX && fieldsO.length < 2 || !isX && fieldsX.length === 2){
            return false
        }
        const threeComboArr = winningCombos.map(combo=>{
            let countOpp = 0
            let countSelf = 0
            for(const field of combo){
                if((isX && fieldsX.includes(field)) || (!isX && fieldsO.includes(field))){
                    countOpp += 1
                }
                if((isX && fieldsO.includes(field)) || (!isX && fieldsX.includes(field))){
                    countSelf += 1
                }
            }
            const add = countOpp === 0 && countSelf === 2
            return add ? combo : []
        }).filter(combo => combo.length === 3)

        if(threeComboArr.length === 0){
            return false
        }

        const threeField = threeComboArr[0].filter(field => isX ? !fieldsO.includes(field) : !fieldsX.includes(field))[0]
        
        if(isX){
            setFieldsO(prev => [...prev, threeField])
        }else{
            setFieldsX(prev => [...prev, threeField])
        }

        return true
    }

    function twoChance(){
        if(isX && fieldsO.length === 0 || !isX && fieldsX.length === 0){
            return false
        }
        const remainingCombos = winningCombos.map((combo)=>{
            let add = true
            for(const field of combo){
                if(isX && fieldsX.includes(field)){
                    add = false
                    break
                }
                if(!isX && fieldsO.includes(field)){
                    add = false
                    break
                }
            }
            let hasOneField = false
            if(add && isX){
                for(const field of combo){
                    if(fieldsO.includes(field)){
                        hasOneField = true
                        break
                    }
                }
            }else if(add && !isX){
                for(const field of combo){
                    if(fieldsX.includes(field)){
                        hasOneField = true
                        break
                    }
                }
            }
            return (add && hasOneField) ? combo : []
        }).filter(combo => combo.length===3)

        if(remainingCombos.length === 0){
            return false
        }

        const rand = Math.floor(Math.random() * remainingCombos.length)
        const choosenCombo = remainingCombos[rand].filter(field => isX ? !fieldsO.includes(field) : !fieldsX.includes(field))

        const rand2 = Math.floor(Math.random() * choosenCombo.length)

        if(isX){
            setFieldsO(prev => [...prev, choosenCombo[rand2]])
        }else{
            setFieldsX(prev => [...prev, choosenCombo[rand2]])
        }

        return true
    }

    // EventListeners
    const takeTurn = (field: number) => {
        if(playedFields.includes(field)){
            return
        }
        
        if(isComputer){
            if(isX && xTurn){
                setFieldsX(prev => [...prev, field])
            }else if(!isX && !xTurn){
                setFieldsO(prev => [...prev, field])
            }else{
                return
            }
        }else{
            if(xTurn){
                setFieldsX(prev => [...prev, field])
            }else if(!xTurn){
                setFieldsO(prev => [...prev, field])
            }
        } 
        if(!gameOver){
            nextTurn()
        } 
    }

    const newRound = useCallback(()=>{
        setFieldsX([])
        setFieldsO([])
        setXTurn(true)
        if(restartModal){
            setRestartModal(false)
        }
    },[restartModal])

    const continueGame = useCallback(()=>{
        setRestartModal(false)
    }, [setRestartModal])

    // Effects
    useEffect(()=>{
        if(gameData === null){
            return
        }

        function setGame(){
            setXTurn(gameData?.xTurn ?? true)
            setFieldsX(gameData?.fieldsX ?? [])
            setFieldsO(gameData?.fieldsO ?? [])
        }
        
        setGame()
    }, [])

    useEffect(()=>{
        const newGameState = {
            isX,
            isComputer,
            isGame: true
        }

        setGameState({
            ...newGameState
        })
    }, [])

    useEffect(()=>{
        if(!isComputer || gameOver || isX && xTurn || !isX && !xTurn){
            return
        }
        
        function playCPUGame(){
            setTimeout(()=> gameVsCPU(), 800) 
        }

        playCPUGame()
    }, [xTurn, gameOver])

    useEffect(()=>{
        if(!gameOver){
            return
        }
        if(xHasWon){
            const gamesWonX = gameData?.gamesWonX ?? 0 + 1
            setGameData({
                ...gameData,
                gamesWonX
            } as GameData) 
        }
        if(oHasWon){
            const gamesWonO = gameData?.gamesWonO ?? 0 + 1
            setGameData({
                ...gameData,
                gamesWonO
            } as GameData) 
        }
        if(gameOver && !xHasWon && !oHasWon){
            const gamesDraw = gameData?.gamesDraw ?? 0 + 1
            setGameData({
                ...gameData,
                gamesDraw
            } as GameData) 
        }
    }, [gameOver])

    useEffect(()=>{
        const gameDataNew = {
            fieldsO: fieldsO,
            fieldsX: fieldsX,
            xTurn: xTurn
        }
        setGameData({
            ...gameData,
            ...gameDataNew
        } as GameData)
    }, [fieldsO, fieldsX, xTurn])

    if(!isGame){
        return (
            <Navigate to="/" replace/>
        )
    }

    return (
        <>
            <main className="min-h-dvh p-6 flex flex-col items-center justify-center">
                <GameHeader xTurn={xTurn} setRestartModal={setRestartModal}/>
                <section className="mt-16 md:mt-5w-full max-w-[calc(327rem/16)] md:max-w-[calc(461rem/16)] grid grid-cols-3 gap-5">
                    {[1,2,3,4,5,6,7,8,9].map(field => {
                        return(
                            <Field
                                key={field}
                                field={field}
                                xTurn={xTurn}
                                xHasWon={xHasWon}
                                oHasWon={oHasWon}
                                gameOver={gameOver}
                                fieldsO={fieldsO}
                                fieldsX={fieldsX}
                                playedFields={playedFields}
                                gameWCombo={gameWCombo}
                                takeTurn={takeTurn}
                            />
                        )
                    })}
                </section>
                <Statistics />
            </main>
            {gameOver && (
                <GameEndModal 
                    xHasWon={xHasWon}
                    oHasWon={oHasWon}
                    setGameState={setGameState}
                    setGameData={setGameData}
                    newRound={newRound}
                 />
            )}
            {restartModal && <RestartModal continueGame={continueGame} newRound={newRound}/>}
        </>
    )
}