import { memo } from "react"

function NextRoundBtn({children, onClick}: 
    {children: React.ReactNode, onClick: ()=> void}
){
    return (
        <button 
            className="p-4 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-[.625rem] shadow-next-btn" 
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default memo(NextRoundBtn)