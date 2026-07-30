import IconO from "../components/IconO.js"
import IconX from "../components/IconX.js"
import { useAppContext } from "../lib/hooks/useContext.js"
import { useEffect, type ChangeEvent } from "react"
import { useNavigate } from "react-router"
import type { GameState } from "../lib/types.js"
import useLocalStorage from "../lib/hooks/useLocalStorage.js"

export default function StartScreen(){
    const {isX, setIsX, isComputer, setIsComputer, isGame, setIsGame} = useAppContext()
    const [_, setGameState] = useLocalStorage<GameState | null>("game-state", null)
    const navigate = useNavigate()

    function toggleIsX(e: ChangeEvent<HTMLInputElement>){
        if(!setIsX){
            return
        }
        if(e.target.value === "x"){
            setIsX(true)
        }else{
            setIsX(false)
        }
    }

    function startGameVsCPU(){
        if(!setIsComputer){
            return
        }
        setIsComputer(true)
        setIsGame(true)
    }

    useEffect(()=>{
        function startGame(){
            const newGameState = {
                isX,
                isComputer,
                isGame: true
            }

            setGameState({
                ...newGameState
            })
            navigate("/game")
        }
        if(isGame){
            startGame()
        }
    }, [isGame])

    function startGameVsPlayer(){
         if(!setIsComputer){
            return
        }
        setIsComputer(false)
        setIsGame(true)
    }

    return (
        <main className="w-full min-h-dvh p-6 flex flex-col items-center justify-center">
            <div className="flex justify-center gap-2 mb-8 md:mb-10" aria-label="Game Logo X O">
                <IconX className="w-8 h-8 fill-teal-400" />
                <IconO className="w-8 h-8 fill-amber-400"/>
            </div>
            <section 
                className="w-full max-w-[calc(327rem/16)] md:max-w-[calc(460rem/16)] bg-slate-800 px-6 pt-6 pb-8 rounded-[1rem]
                shadow-toggle-container flex flex-col items-center mb-8 md:mb-10"
            >
                <h1 className="leading-[1.25] tracking-[1px] font-bold text-slate-300">
                    Pick player 1's mark
                </h1>
                <section 
                    className="w-full mt-6 mb-4 md:my-6 py-[calc(9rem/16)] px-[calc(7.5rem/16)] rounded-[.625rem] bg-slate-900 flex"
                >
                    <label 
                        className="w-1/2 min-h-18 relative cursor-pointer [&:has(div.selected)]:bg-slate-300 
                        [&:not(:has(div.selected))]:hover:bg-slate-850 flex items-center justify-center rounded-[.5rem]"
                    >
                        <input 
                        className="absolute opacity-0"
                        type="radio" 
                        name="pick-starter" 
                        aria-label="Select to play as X" 
                        value="x"
                        onChange={toggleIsX} 
                        />
                        <div className={isX ? "selected" : "not-selected"}>
                            <IconX className={`w-8 h-8 ${isX ? "fill-slate-900" : "fill-slate-300"}`}/>
                        </div>
                    </label>
                    <label 
                        className="w-1/2 min-h-18 relative cursor-pointer [&:has(div.selected)]:bg-slate-300 
                        [&:not(:has(div.selected))]:hover:bg-slate-850 flex items-center justify-center rounded-[.5rem]"
                    >
                        <input 
                            className="absolute opacity-0"
                            type="radio" 
                            name="pick-starter" 
                            aria-label="Select to play as O" 
                            value="o"
                            onChange={toggleIsX}
                        />
                        <div className={!isX  ? "selected" : "not-selected"}>
                            <IconO className={`w-8 h-8 ${isX ? "fill-slate-300" : "fill-slate-900"}`}/>
                        </div>
                    </label>
                </section>
                <p className="text-[.875rem] font-medium leading-[1.3] tracking-[0.9px] text-slate-300">Remember: X goes first</p> 
            </section>
            <section className="w-full max-w-[calc(327rem/16)] md:max-w-115 flex flex-col gap-4 md:gap-5">
                <button 
                    className="pt-4 md:pt-[0.8rem] pb-5 md:pb-[1.625rem] rounded-[1rem] md:text-[1.25rem] text-slate-900 text-[1rem] leading-[1.25] 
                    tracking-[1px] md:tracking-[1.25px] font-bold shadow-btn-singleplayer bg-amber-400 hover:bg-amber-300"
                    onClick={startGameVsCPU}
                >
                    New Game (vs CPU)
                </button>
                <button 
                    className="pt-4 md:pt-[0.8rem] pb-5 md:pb-[1.625rem] rounded-[1rem] md:text-[1.25rem] text-slate-900 text-[1rem] leading-[1.25] 
                    tracking-[1px] md:tracking-[1.25px] font-bold shadow-btn-multiplayer bg-teal-400 hover:bg-teal-300"
                    onClick={startGameVsPlayer}
                >
                    New Game (vs player)
                </button>
            </section>
        </main>
    )
}