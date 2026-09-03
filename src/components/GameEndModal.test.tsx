import { describe, expect, test, vi} from "vitest"
import { screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

    test("quit function is called once when Quit button is clicked", async()=>{
        const user = userEvent.setup()
        const setGameState = vi.fn()
        const setGameData = vi.fn()
        render(
            <AppContextProvider>
                <GameEndModal
                    xHasWon={false}
                    oHasWon={false}
                    setGameState={setGameState}
                    setGameData={setGameData}
                    newRound={vi.fn()}
                />
            </AppContextProvider>
        )
        await user.click(screen.getByRole("button", {name: "Quit"}))
        expect(setGameState).toHaveBeenCalledWith(null)
        expect(setGameState).toHaveBeenCalledTimes(1)
        expect(setGameData).toHaveBeenCalledWith(null)
        expect(setGameData).toHaveBeenCalledTimes(1)
    })
})