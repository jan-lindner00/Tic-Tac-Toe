import { describe, expect, test, vi} from "vitest"
import { screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
    test("openModal function is called when restart button is clicked", async()=>{
        const user = userEvent.setup()
        const openModal = vi.fn()

        render(
            <GameHeader
                xTurn={true}
                setRestartModal={openModal}
            />
        )
        await user.click(screen.getByRole("button"))
        expect(openModal).toHaveBeenCalledWith(expect.any(Function))
        expect(openModal).toHaveBeenCalledTimes(1)
        const updaterFn = openModal.mock.calls[0][0]
        expect(updaterFn(false)).toBe(true)
        expect(updaterFn(true)).toBe(false)
    })
})