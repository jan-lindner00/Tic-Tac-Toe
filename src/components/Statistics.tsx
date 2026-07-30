import { statisticsTextO, statisticsTextX } from "../lib/utils";
import type {GameData} from "../lib/types.ts"
import useLocalStorage from "../lib/hooks/useLocalStorage.ts"
import { useAppContext } from "../lib/hooks/useContext";

export default function Statistics(){
    const {isX, isComputer} = useAppContext()
    const [gameData] = useLocalStorage<GameData | null>("game-data", null)

    return (
        <section 
            className="w-full max-w-[calc(327rem/16)] md:max-w-[calc(461rem/16)] my-5 flex justify-between gap-5"
        >
            <div 
                className="w-24 md:w-35 py-3 px-5 flex flex-col items-center text-[.75rem] leading-[1.25] tracking-[.75px] bg-teal-400
                font-medium text-slate-900 rounded-[.75rem]"
            >
                <span>X {statisticsTextX(isComputer, isX)}</span>
                <span className="text-[1.25rem] md:text-[1.5rem] font-bold tracking-[1.25px] md:tracking-[1.5px]">
                    {gameData?.gamesWonX ?? 0}
                </span>
            </div>
            <div 
                className="w-24 md:w-35 py-3 px-5 flex flex-col items-center text-[.75rem] leading-[1.25] tracking-[.75px] bg-slate-300
                font-medium text-slate-900 rounded-[.75rem]"
            >
                <span>Draw</span>
                <span className="text-[1.25rem] md:text-[1.5rem] font-bold tracking-[1.25px] md:tracking-[1.5px]">
                    {gameData?.gamesDraw ?? 0}
                </span>
            </div>
            <div 
                className="w-24 md:w-35 py-3 px-5 flex flex-col items-center text-[.75rem] leading-[1.25] tracking-[.75px] bg-amber-400
                font-medium text-slate-900 rounded-[.75rem]"
            >
                <span>O {statisticsTextO(isComputer, isX)}</span>
                <span className="text-[1.25rem] md:text-[1.5rem] font-bold tracking-[1.25px] md:tracking-[1.5px]">
                    {gameData?.gamesWonO ?? 0}
                </span>
            </div>
        </section>
    )
}