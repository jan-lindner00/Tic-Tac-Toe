import {memo} from "react"
import Logo from "../assets/logo.svg"
import Restart from "../assets/icon-restart.svg"
import IconO from "../components/IconO.tsx"
import IconX from "../components/IconX.tsx"
import type { SetStateAction, Dispatch } from "react"

function GameHeader({xTurn, setRestartModal}:{xTurn: boolean, setRestartModal: Dispatch<SetStateAction<boolean>>}){
    return (
        <section 
            className="w-full max-w-[calc(327rem/16)] md:max-w-[calc(461rem/16)] flex justify-between 
            items-center"
        >
            <img src={Logo} alt="Game Logo X O" />
            <div 
                className="min-h-10 md:min-h-12 min-w-[calc(96rem/16)] flex justify-center items-center gap-2 md:gap-[.625rem]
                text-[.875rem] md:text-[1rem] leading-[1.3] md:leading-[1.25] tracking-[.9px] md:tracking-[1px]
                font-bold text-slate-300 bg-slate-800 rounded-[.375rem] md:min-w-35 rounded-[.625rem] shadow-game-header"
                >
                {xTurn ?  (
                    <IconX className="w-4 h-4 md:w-5 md:h-5 fill-slate-300" aria-label="X."/>
                ) : ( 
                    <IconO className="w-4 h-4 md:w-5 md:h-5 fill-slate-300" aria-label="O."/>
                )}
                <span>Turn</span>
            </div>
            <button 
                className="w-10 h-10 md:w-13 md:h13 flex items-center flex justify-center items-center border-none rounded-[3.75rem]
                md:rounded-[.625rem] bg-slate-300 hover:bg-slate-100 shadow-restart-btn" 
                aria-label="Restart game"
                onClick={() => setRestartModal(prev=>!prev)}
            >
                <img src={Restart}/>
            </button>
        </section>
    )
}

export default memo(GameHeader)