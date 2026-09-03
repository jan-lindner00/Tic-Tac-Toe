import { describe, expect, test} from "vitest"
import { screen, render} from "@testing-library/react"
import Statistics from "./Statistics"
import AppContextProvider from "../context/AppContextProvider"

describe("Statistics", ()=>{
    test("text ist displayed correctly", ()=>{
        render(
            <AppContextProvider>
                <Statistics />
            </AppContextProvider>
        )
        expect(screen.getByText("X (You)")).toBeInTheDocument()
        expect(screen.getByText("O (CPU)")).toBeInTheDocument()
        expect(screen.getByText("Draw")).toBeInTheDocument()
    })
})