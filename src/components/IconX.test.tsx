import { describe, expect, test} from "vitest"
import { screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import IconX from "./IconX"

describe("IconX", ()=>{
    test("className is passed down correctly and test-id is correct", ()=>{
        render(<IconX className="fill-teal-400" testId="test" />)
        expect(screen.getByTestId("test")).toBeInTheDocument()
        expect(screen.getByTestId("test")).toHaveClass("fill-teal-400")
    })
    test("defaults to empty data-testid when not provided", ()=>{
        const {container} = render(<IconX className="fill-teal-400" />)
        const svg = container.querySelector("svg")
        expect(svg).toHaveAttribute("data-testid", "")
    })
})