import { describe, expect, test, vi} from "vitest"
import { screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import RestartModal from "./RestartModal"

describe("RestartModal", ()=>{
    test("Text is displayed correctly", ()=>{
        render(
            <RestartModal
                continueGame={vi.fn()}
                newRound={vi.fn()}
            />
        )
        expect(screen.getByRole("heading", {level: 2}).textContent).toBe("Restart Game?")
        const buttons = screen.getAllByRole("button")
        expect(buttons[0].textContent).toBe("No, cancel")
        expect(buttons[1].textContent).toBe("Yes, Restart")
    })
})