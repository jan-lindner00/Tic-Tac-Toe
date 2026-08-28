import { describe, expect, test} from "vitest"
import { screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import Field from "./Field"

describe("Field", ()=>{
    test("displays X svg when played", ()=>{
        render(
            <Field 
                field={1}
                xTurn={false}
                xHasWon={false}
                oHasWon={false}
                gameOver={false}
                fieldsX={[1]}
                fieldsO={[]}
                gameWCombo={[]}
                playedFields={[1]}
                takeTurn={()=>{}}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("fieldPlayedX")).toBeInTheDocument()
    })

    test("displays O svg when played", ()=>{
        render(
            <Field 
                field={1}
                xTurn={false}
                xHasWon={false}
                oHasWon={false}
                gameOver={false}
                fieldsX={[]}
                fieldsO={[1]}
                gameWCombo={[]}
                playedFields={[1]}
                takeTurn={()=>{}}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("fieldPlayedO")).toBeInTheDocument()
    })

    test("displays X svg in different color if gameWinningCombo", ()=>{
        render(
            <Field 
                field={1}
                xTurn={false}
                xHasWon={true}
                oHasWon={false}
                gameOver={false}
                fieldsX={[1,2,3]}
                fieldsO={[4,7,8]}
                gameWCombo={[1,2,3]}
                playedFields={[1,2,3,4,7,8]}
                takeTurn={()=>{}}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("gameWinningComboX")).toBeInTheDocument()
    })

    test("displays O svg in different color if gameWinningCombo", ()=>{
        render(
            <Field 
                field={1}
                xTurn={true}
                xHasWon={false}
                oHasWon={true}
                gameOver={false}
                fieldsX={[4,7,8]}
                fieldsO={[1,2,3]}
                gameWCombo={[1,2,3]}
                playedFields={[1,2,3]}
                takeTurn={()=>{}}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("gameWinningComboO")).toBeInTheDocument()
    })

    test("button is disabled if gameOver", ()=>{
        render(
            <Field 
                field={1}
                xTurn={true}
                xHasWon={false}
                oHasWon={false}
                gameOver={true}
                fieldsX={[]}
                fieldsO={[]}
                gameWCombo={[]}
                playedFields={[]}
                takeTurn={()=>{}}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
    })
})