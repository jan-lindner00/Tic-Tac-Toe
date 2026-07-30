import {useEffect, useRef, memo} from "react"
import NextRoundBtn from "./NextRoundBtn"

function RestartModal({continueGame, newRound}: 
    {continueGame: () => void, newRound: () => void}
){
    const modalRef = useRef<HTMLDialogElement | null>(null)

    useEffect(()=>{
        modalRef?.current?.showModal()
    }, [])

    return(
        <dialog 
            ref={modalRef}
            className="absolute inset-0 m-auto border-none min-h-57 md:min-h-67 flex flex-col gap-6 md:gap-[1.875rem] items-center justify-center bg-slate-800 min-w-screen"
        >
            <h2
                className="text-[1.5rem] md:text-[2.5rem] font-bold leading-[1.25] tracking-[1.5px] md:tracking-[2.5px] text-slate-300"
            >
                Restart Game?
            </h2>
            <div 
                className="text-[1rem] leading-[1.25] tracking-[1px] font-bold rounded-[.625rem] border-none
                flex gap-4"
            >
                <button 
                    className="p-4 bg-slate-300 hover:bg-slate-100 text-slate-900 rounded-[.625rem] shadow-cancel-btn" 
                    onClick={continueGame}
                >
                    No, cancel
                </button>
                <NextRoundBtn
                    onClick={newRound}
                >
                        Yes, Restart
                </NextRoundBtn>
            </div>    
        </dialog>
    )
}

export default memo(RestartModal)