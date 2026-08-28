import { useEffect, useRef, memo } from "react"
import type { GameData, GameState } from "../lib/types"
import NextRoundBtn from "./NextRoundBtn"
import { useAppContext } from "../lib/hooks/useContext"
import { gameEndModalText } from "../lib/utils"
import IconX from "../assets/icon-x.svg"
import IconO from "../assets/icon-o.svg"

function GameEndModal({xHasWon, oHasWon, setGameState, setGameData, newRound}: 
    {
        xHasWon: boolean, oHasWon: boolean, setGameState: (newValue: GameState | null)=>void,
        setGameData: (newValue: GameData | null)=>void, newRound: () => void
    }
){
    const {isX, isComputer, setIsGame} = useAppContext()
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    
    function quit(){
        setGameData(null)
        setGameState(null)
        setIsGame(false)
    }

    useEffect(()=>{
        dialogRef?.current?.showModal()
    }, [])

    return (
        <dialog ref={dialogRef} 
            className="absolute inset-0 m-auto border-none min-h-57 md:min-h-67 flex flex-col gap-6 items-center 
            justify-center bg-slate-800 min-w-screen font-bold text-slate-300"
        >
            {(xHasWon || oHasWon) && (
                <p
                    className="text-[.875rem] leading-[1.3] tracking-[0.9px] md:text-[1rem] md:leading-[1.25] md:tracking-[1px]"
                >
                    {gameEndModalText(isComputer, isX, xHasWon)}
                </p>
            )}
            <div 
                className={`my-4 mx-6 ${(!xHasWon && !oHasWon) ? "mt-[1.875rem]": ""} flex items-center gap-6 text-[1.5rem] 
                md:text-[2.5rem] leading-[1.25] tracking-[1.5px] md:tracking-[2.5px]`}
                style={{marginBottom: (!xHasWon && !oHasWon) ? "1.875rem" : "1.5rem"}}
            >
                {xHasWon && <img className="w-[1.625rem] md:w-16" src={IconX} alt="X"/>}
                {oHasWon && <img className="w-[1.625rem] md:w-16" src={IconO} alt="O"/>}
                <h2
                    className={`w-max my-auto ${xHasWon ? "text-teal-400": oHasWon ? "text-amber-400": "text-slate-300"}`}
                >
                    {(xHasWon || oHasWon) ? "Takes the round" : "Round tied"}
                </h2>
            </div>
            <div className="flex gap-4">
                <button className="p-4 bg-slate-300 hover:bg-slate-100 text-slate-900 rounded-[.625rem] shadow-cancel-btn" onClick={quit}>Quit</button>
                <NextRoundBtn onClick={newRound}>Next Round</NextRoundBtn>
            </div>
        </dialog>
    )
}

export default memo(GameEndModal)