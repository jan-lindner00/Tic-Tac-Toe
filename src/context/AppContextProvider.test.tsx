import { describe, expect, test, beforeEach} from "vitest"
import { screen, render} from "@testing-library/react"
import { useAppContext } from "../lib/hooks/useContext"
import AppContextProvider from "./AppContextProvider"
import userEvent from "@testing-library/user-event"

beforeEach(() => {
  localStorage.clear();
})

function TestConsumer(){
    const {isComputer, isX, setIsComputer, setIsX, isGame, setIsGame} = useAppContext()
    return(
        <div>
            <span data-testid="isComputer">{String(isComputer)}</span>
            <span data-testid="isX">{String(isX)}</span>
            <span data-testid="isGame">{String(isGame)}</span>
            <button onClick={()=>setIsComputer((prev:boolean) => !prev)}>
                Toggle isComputer
            </button>
            <button onClick={()=>setIsX((prev:boolean) => !prev)}>
                Toggle isX
            </button>
             <button onClick={()=>setIsGame((prev:boolean) => !prev)}>
                Toggle isGame
            </button>
        </div>
    )
}

describe("AppContextProvider", ()=>{
    test("provides default values", ()=>{
        render(
            <AppContextProvider>
                <TestConsumer />
            </AppContextProvider>
        )
        expect(screen.getByTestId("isComputer")).toHaveTextContent("true")
        expect(screen.getByTestId("isX")).toHaveTextContent("true")
        expect(screen.getByTestId("isGame")).toHaveTextContent("false")
    })
    test("setIsComputer toggles value of isComputer", async()=>{
        const user = userEvent.setup()
        
        render(
            <AppContextProvider>
                <TestConsumer />
            </AppContextProvider>
        )

        await user.click(screen.getByRole("button", {name: "Toggle isComputer"}))
        expect(screen.getByTestId("isComputer")).toHaveTextContent("false")
    })
    test("setIsX toggles value of isX", async()=>{
        const user = userEvent.setup()
        
        render(
            <AppContextProvider>
                <TestConsumer />
            </AppContextProvider>
        )

        await user.click(screen.getByRole("button", {name: "Toggle isX"}))
        expect(screen.getByTestId("isX")).toHaveTextContent("false")
    })
     test("setIsGame toggles value of isGame", async()=>{
        const user = userEvent.setup()
        
        render(
            <AppContextProvider>
                <TestConsumer />
            </AppContextProvider>
        )

        await user.click(screen.getByRole("button", {name: "Toggle isGame"}))
        expect(screen.getByTestId("isGame")).toHaveTextContent("true")
    })
    test("initializes values from local storage", ()=>{
        localStorage.setItem("game-state", JSON.stringify({
            isGame: true,
            isX: false,
            isComputer: false
        }))
        
        render(
            <AppContextProvider>
                <TestConsumer />
            </AppContextProvider>
        )

        expect(screen.getByTestId("isComputer")).toHaveTextContent("false")
        expect(screen.getByTestId("isX")).toHaveTextContent("false")
        expect(screen.getByTestId("isGame")).toHaveTextContent("true")
    })
     test("initializes default values from local storage if value of game-state is unexpected", ()=>{
        localStorage.setItem("game-state", JSON.stringify({}))
        
        render(
            <AppContextProvider>
                <TestConsumer />
            </AppContextProvider>
        )

        expect(screen.getByTestId("isComputer")).toHaveTextContent("true")
        expect(screen.getByTestId("isX")).toHaveTextContent("true")
        expect(screen.getByTestId("isGame")).toHaveTextContent("false")
    })
})