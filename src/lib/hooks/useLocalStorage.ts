"use client"
import { useSyncExternalStore, useCallback, useRef } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T ) => void]{
    const subscribe = useCallback((callback: () => void): (() => void) => {
        window.addEventListener("storage", callback)
        return () => { window.removeEventListener("storage", callback)}
    }, [])

    const cacheRef = useRef<{raw: string,value: T}>({raw: '', value: initialValue})

    const getSnapshot = useCallback((): T => {
        const raw = localStorage.getItem(key) ?? '';
        if (raw !== cacheRef.current.raw) {
            cacheRef.current = { raw, value: raw ? JSON.parse(raw) : initialValue }
        }
        return cacheRef.current.value
    }, [key, initialValue])

    const value: T = useSyncExternalStore(subscribe, getSnapshot)
    
    const setValue = useCallback((newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        window.dispatchEvent(new Event("storage"))
    }, [key])

    return [value, setValue]
}