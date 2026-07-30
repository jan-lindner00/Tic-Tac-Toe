import { createContext } from "react"

export const AppContext = createContext({
    isComputer: undefined,
    setIsComputer: undefined,
    isX: undefined,
    setIsX: undefined
} as any) 