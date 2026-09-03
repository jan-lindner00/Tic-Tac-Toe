import { describe, expect, test} from "vitest"
import { screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import IconO from "./IconO"

describe("IconO", ()=>{
    test("className is passed down correctly and test-id is correct", ()=>{
        render(<IconO className="fill-amber-400" testId="test" />)
        expect(screen.getByTestId("test")).toBeInTheDocument()
        expect(screen.getByTestId("test")).toHaveClass("fill-amber-400")
    })
    test("defaults to empty data-testid when not provided", ()=>{
        const {container} = render(<IconO className="fill-amber-400" />)
        const svg = container.querySelector("svg")
        expect(svg).toHaveAttribute("data-testid", "")
    })
})