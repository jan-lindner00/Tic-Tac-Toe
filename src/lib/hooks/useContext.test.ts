import { describe, expect, test} from "vitest"
import { renderHook } from "@testing-library/react"
import { useAppContext } from "./useContext"

describe("useContext", ()=>{
    test("context uses correct default values", ()=>{
        const {result} = renderHook(()=>useAppContext())
        expect(result.current).toEqual({
            isComputer: undefined,
            setIsComputer: undefined,
            isX: undefined,
            setIsX: undefined
        })
    })
})
