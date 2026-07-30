import {memo} from "react"
import { useAppContext } from "../lib/hooks/useContext"
import clsx from "clsx"
import IconO from "./IconO"
import IconX from "./IconX"


function Field({field, xTurn, xHasWon, oHasWon, gameOver, fieldsX, fieldsO, gameWCombo, playedFields, takeTurn}:
    {
        field: number, xTurn: boolean, xHasWon: boolean, oHasWon: boolean, gameOver: boolean, fieldsX: number[], fieldsO: number[], 
        gameWCombo: number[], playedFields:number[], takeTurn: (field: number) => void
    }
){
    const {isComputer, isX} = useAppContext()
    const classNameField = clsx(`h-24 w-24 md:w-35 md:h-35 border-none rounded-[.625rem] flex items-center 
        justify-center`,
        (xHasWon && gameWCombo.includes(field)) && "bg-teal-400 shadow-x-won",
        (oHasWon && gameWCombo.includes(field)) && "bg-amber-400 shadow-o-won",
        !gameWCombo.includes(field) && "bg-slate-800 shadow-field",
        (!gameOver && (isComputer && isX && xTurn || !isComputer && xTurn) && !playedFields.includes(field)) && "hover:bg-[url('/src/assets/icon-x-outline.svg')] hover:bg-no-repeat hover:bg-center",
        (!gameOver && (!isX && !xTurn || !isComputer && xTurn) && !playedFields.includes(field)) && "hover:bg-[url('/src/assets/icon-o-outline.svg')] hover:bg-no-repeat hover:bg-center"
    )
    return(
        <button 
            key={field}
            className={classNameField}
            disabled={gameOver || playedFields.includes(field) || isComputer && isX && !xTurn || isComputer && !isX &&  xTurn }
            onClick={(gameOver || playedFields.includes(field) || isComputer && isX && !xTurn || isComputer && !isX &&  xTurn) ? () => {} : () => takeTurn(field)}
            data-field={field}
            aria-label={`Field number ${field}: .${fieldsX.includes(field) ? "X" : fieldsO.includes(field) ? "O" : "Empty"}. ${!playedFields.includes(field) ? "Press to play." : ""}`}
        >
            {fieldsX.includes(field) && <IconX className={`${gameWCombo.includes(field) ?  "fill-slate-800" : "fill-teal-400"}`}/>}
            {fieldsO.includes(field) && <IconO className={`${gameWCombo.includes(field) ?  "fill-slate-800" : "fill-amber-400"}`}/>}
        </button>
    )
}

export default memo(Field)