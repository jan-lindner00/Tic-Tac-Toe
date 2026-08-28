import { describe, expect, test} from "vitest"
import { gameEndModalText, statisticsTextX, statisticsTextO } from "./utils"

describe("utils", ()=>{
    test("gameEndModalText function works as expected", ()=>{
        expect(gameEndModalText(true, true, true)).toBe("You won!")
        expect(gameEndModalText(true, true, false)).toBe("Oh no, you lost...")
        expect(gameEndModalText(true, false, true)).toBe("Oh no, you lost...")
        expect(gameEndModalText(true, false, false)).toBe("You won!")
        expect(gameEndModalText(false, true, true)).toBe("Player 1 Wins!")
        expect(gameEndModalText(false, true, false)).toBe("Player 2 Wins!")
        expect(gameEndModalText(false, false, true)).toBe("Player 2 Wins!")
        expect(gameEndModalText(false, false, false)).toBe("Player 1 Wins!")
    })

    test("statisticTextX function works as expected", ()=>{
        expect(statisticsTextX(true, true)).toBe("(You)")
        expect(statisticsTextX(true, false)).toBe("(CPU)")
        expect(statisticsTextX(false, true)).toBe("(P1)")
        expect(statisticsTextX(false, false)).toBe("(P2)")
    })

    test("statisticTextO function works as expected", ()=>{
        expect(statisticsTextO(true, true)).toBe("(CPU)")
        expect(statisticsTextO(true, false)).toBe("(You)")
        expect(statisticsTextO(false, true)).toBe("(P2)")
        expect(statisticsTextO(false, false)).toBe("(P1)")
    })
})