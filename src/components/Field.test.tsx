import { describe, expect, test, vi} from "vitest"
import { screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import Field from "./Field"
import { useAppContext } from "../lib/hooks/useContext"

vi.mock('../lib/hooks/useContext', () => ({
  useAppContext: vi.fn()
}))

const mockAppContext = vi.mocked(useAppContext)

describe("Field", ()=>{
    test("displays X svg when played", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
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
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("fieldPlayedX")).toBeInTheDocument()
    })

    test("displays O svg when played", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
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
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("fieldPlayedO")).toBeInTheDocument()
    })

    test("displays X svg in different color if gameWinningCombo", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
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
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("gameWinningComboX")).toBeInTheDocument()
    })

    test("displays O svg in different color if gameWinningCombo", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
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
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
        expect(screen.getByTestId("gameWinningComboO")).toBeInTheDocument()
    })

    test("button is disabled if gameOver", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
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
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
    })

    test("button is disabled when field is played", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
        render(
            <Field 
                field={1}
                xTurn={true}
                xHasWon={false}
                oHasWon={false}
                gameOver={false}
                fieldsX={[1]}
                fieldsO={[]}
                gameWCombo={[]}
                playedFields={[1]}
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
    })

    test("button is disabled when other player's turn", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
        render(
            <Field 
                field={1}
                xTurn={false}
                xHasWon={false}
                oHasWon={false}
                gameOver={false}
                fieldsX={[]}
                fieldsO={[]}
                gameWCombo={[]}
                playedFields={[]}
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
    })

    test("button is disabled when other player's turn", ()=>{
        mockAppContext.mockReturnValue({isComputer: true, isX: false})
        render(
            <Field 
                field={1}
                xTurn={true}
                xHasWon={false}
                oHasWon={false}
                gameOver={false}
                fieldsX={[]}
                fieldsO={[]}
                gameWCombo={[]}
                playedFields={[]}
                takeTurn={vi.fn()}
            />
        )
        expect(screen.getByRole("button")).toBeDisabled()
    })

    test("function takeTurn is called when button is clicked", async()=>{
        const user = userEvent.setup()
        const takeTurn = vi.fn()
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
        render(
            <Field
                field={1}
                xTurn={true}
                xHasWon={false}
                oHasWon={false}
                gameOver={false}
                fieldsX={[]}
                fieldsO={[]}
                gameWCombo={[]}
                playedFields={[]}
                takeTurn={takeTurn}
            />
        )

        await user.click(screen.getByRole("button"))
        expect(takeTurn).toHaveBeenCalledWith(1)
        expect(takeTurn).toHaveBeenCalledTimes(1)
    })

    test("field has background image when hovered", async()=>{
        const user = userEvent.setup()
        mockAppContext.mockReturnValue({isComputer: true, isX: true})
        render(
                <Field
                    field={1}
                    xTurn={true}
                    xHasWon={false}
                    oHasWon={false}
                    gameOver={false}
                    fieldsX={[]}
                    fieldsO={[]}
                    gameWCombo={[]}
                    playedFields={[]}
                    takeTurn={vi.fn()}
                />
        )

        const button = screen.getByRole("button") as HTMLButtonElement
        await user.hover(button)
        expect(button).toHaveClass("hover:bg-[url('/src/assets/icon-x-outline.svg')]", "hover:bg-no-repeat", "hover:bg-center")
    })

    test("field has background image when hovered", async()=>{
        const user = userEvent.setup()
        mockAppContext.mockReturnValue({isComputer: false, isX: true})
        render(
                <Field
                    field={1}
                    xTurn={true}
                    xHasWon={false}
                    oHasWon={false}
                    gameOver={false}
                    fieldsX={[]}
                    fieldsO={[]}
                    gameWCombo={[]}
                    playedFields={[]}
                    takeTurn={vi.fn()}
                />
        )

        const button = screen.getByRole("button") as HTMLButtonElement
        await user.hover(button)
        expect(button).toHaveClass("hover:bg-[url('/src/assets/icon-x-outline.svg')]", "hover:bg-no-repeat", "hover:bg-center")
    })

    test("field has background image when hovered", async()=>{
        const user = userEvent.setup()
        mockAppContext.mockReturnValue({isComputer: true, isX: false})
        render(
                <Field
                    field={1}
                    xTurn={false}
                    xHasWon={false}
                    oHasWon={false}
                    gameOver={false}
                    fieldsX={[]}
                    fieldsO={[]}
                    gameWCombo={[]}
                    playedFields={[]}
                    takeTurn={vi.fn()}
                />
        )

        const button = screen.getByRole("button") as HTMLButtonElement
        await user.hover(button)
        expect(button).toHaveClass("hover:bg-[url('/src/assets/icon-o-outline.svg')]", "hover:bg-no-repeat", "hover:bg-center")
    })

    test("field has background image when hovered", async()=>{
        const user = userEvent.setup()
        mockAppContext.mockReturnValue({isComputer: false, isX: false})
        render(
                <Field
                    field={1}
                    xTurn={false}
                    xHasWon={false}
                    oHasWon={false}
                    gameOver={false}
                    fieldsX={[]}
                    fieldsO={[]}
                    gameWCombo={[]}
                    playedFields={[]}
                    takeTurn={vi.fn()}
                />
        )

        const button = screen.getByRole("button") as HTMLButtonElement
        await user.hover(button)
        expect(button).toHaveClass("hover:bg-[url('/src/assets/icon-o-outline.svg')]", "hover:bg-no-repeat", "hover:bg-center")
    })
})