import { createBrowserRouter } from "react-router"
import StartScreen from "./routes/StartScreen"
import Game from "./routes/Game"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: StartScreen
    },
    {
        path: "/game",
        Component: Game
    }
])
