import { describe, expect, test, vi} from "vitest"
import { screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import GameHeader from "./GameHeader"

describe("GameHeader", ()=>{
    test("Player's turn is displayed correctly (X)", ()=>{
        render(
            <GameHeader
                xTurn={true}
                setRestartModal={vi.fn()}
            />
        )
        expect(screen.getByTestId("xTurn")).toBeInTheDocument()
        expect(screen.getByText("Turn")).toBeInTheDocument()
    })
    test("Player's turn is displayed correctly (O)", ()=>{
        render(
            <GameHeader
                xTurn={false}
                setRestartModal={()=>{}}
            />
        )
        expect(screen.getByTestId("oTurn")).toBeInTheDocument()
        expect(screen.getByText("Turn")).toBeInTheDocument()
    })
    test("button is displayed correctly", ()=>{
        render(
            <GameHeader
                xTurn={true}
                setRestartModal={()=>{}}
            />
        )
        expect(screen.getByRole("button").ariaLabel).toBe("Restart game")
        expect(screen.getByRole("img")).toBeInTheDocument()
    })
})