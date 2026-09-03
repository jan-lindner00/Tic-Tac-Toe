import { describe, expect, test, beforeEach} from "vitest"
import { renderHook, act } from "@testing-library/react"
import useLocalStorage from "./useLocalStorage"

beforeEach(()=>{
    localStorage.clear()
})

describe("useLocalStorage", ()=>{
    test("hook reads value from local storage", ()=>{
        localStorage.setItem("test", JSON.stringify(["test"]))
        const {result} = renderHook(()=> useLocalStorage<string[]>("test", []))
        expect(result.current[0][0]).toBe("test")
    })
    test("hook sets value in local storage", ()=>{
        const {result} = renderHook(()=> useLocalStorage<string[]>("test", []))

        act(()=>{
            result.current[1](["test2"])
        })
        expect(result.current[0][0]).toBe("test2")
    })
})