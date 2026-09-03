import { describe, expect, test, beforeEach, vi} from "vitest"
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
    test('returns fallback when key is absent', () => {
        const { result } = renderHook(() => useLocalStorage('test', ["test"]));
        expect(result.current[0][0]).toEqual("test");
    })
    test("hook sets value in local storage", ()=>{
        const dispatchSpy = vi.spyOn(window, "dispatchEvent")
        const {result} = renderHook(()=> useLocalStorage<string[]>("test", []))

        act(()=>{
            result.current[1](["test2"])
        })
        expect(dispatchSpy).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'storage' })
        )
        expect(result.current[0][0]).toBe("test2")
    })
    test('returns the same reference when data has not changed', () => {
        localStorage.setItem('test', JSON.stringify(["test"]))
        const { result, rerender } = renderHook(() => useLocalStorage('test', []))

        const first = result.current[0]
        rerender()
        expect(result.current[0]).toBe(first)
    })
    test("falls back to initialValue when key is removed", () => {
        localStorage.setItem("test", JSON.stringify(["stored"]))
        const { result } = renderHook(() => useLocalStorage<string[]>("test", ["fallback"]))
        expect(result.current[0]).toEqual(["stored"])

        act(() => {
            localStorage.removeItem("test")
            window.dispatchEvent(new Event("storage"))
        })

        expect(result.current[0]).toEqual(["fallback"])
    })
})