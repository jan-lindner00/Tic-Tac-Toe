import { describe, expect, test, vi} from "vitest"
import { screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import GameEndModal from "./GameEndModal"
import AppContextProvider from "../context/AppContextProvider"

describe("GameEndModal", ()=>{
    test("displays you have won", ()=>{
        render(
            <AppContextProvider>
                <GameEndModal
                    xHasWon={true}
                    oHasWon={false}
                    setGameState={vi.fn()}
                    setGameData={vi.fn()}
                    newRound={vi.fn()}
                />
            </AppContextProvider>
        )
        expect(screen.getByText("You won!")).toBeInTheDocument()
        expect(screen.getByText("Takes the round")).toBeInTheDocument()
    })

    test("displays you have lost", ()=>{
        render(
            <AppContextProvider>
                <GameEndModal
                    xHasWon={false}
                    oHasWon={true}
                    setGameState={vi.fn()}
                    setGameData={vi.fn()}
                    newRound={vi.fn()}
                />
            </AppContextProvider>
        )
        expect(screen.getByText("Oh no, you lost...")).toBeInTheDocument()
        expect(screen.getByText("Takes the round")).toBeInTheDocument()
    })

    test("displays it's a draw", ()=>{
        render(
            <AppContextProvider>
                <GameEndModal
                    xHasWon={false}
                    oHasWon={false}
                    setGameState={vi.fn()}
                    setGameData={vi.fn()}
                    newRound={vi.fn()}
                />
            </AppContextProvider>
        )
        expect(screen.getByText("Round tied")).toBeInTheDocument()
    })

    test("buttons display correct text", ()=>{
        render(
            <AppContextProvider>
                <GameEndModal
                    xHasWon={false}
                    oHasWon={false}
                    setGameState={vi.fn()}
                    setGameData={vi.fn()}
                    newRound={vi.fn()}
                />
            </AppContextProvider>
        )
        const buttons = screen.getAllByRole("button")
        expect(buttons[0].textContent).toBe("Quit")
        expect(buttons[1].textContent).toBe("Next Round")
    })
})