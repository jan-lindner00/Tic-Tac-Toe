"use client"
import { useSyncExternalStore, useCallback, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T ) => void]{
    const subscribe = useCallback((callback: () => void): (() => void) => {
        window.addEventListener("storage", callback)
        return () => { window.removeEventListener("storage", callback)}
    }, [])

    const getData = useCallback((): T => {
        const item = localStorage?.getItem(key)
        return item ? JSON.parse(item) : initialValue
    }, [key, initialValue])

    const [cachedDataSnapshot, setCachedDataSnapshot] = useState<T>(initialValue)

    const getSnapshot = useCallback((): T => {
        const currentData = getData()
        if((typeof currentData === "object" || currentData === null) && currentData?.toString() !== cachedDataSnapshot?.toString()){
            setCachedDataSnapshot(currentData)
        }
        return cachedDataSnapshot
    }, [cachedDataSnapshot, getData])

    const value: T = useSyncExternalStore(subscribe, getSnapshot)
    
    const setValue = useCallback((newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        window.dispatchEvent(new Event("storage"))
    }, [key])

    return [value, setValue]
}