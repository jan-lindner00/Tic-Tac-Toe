import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router"
import AppContextProvider from "./context/AppContextProvider.tsx"
import {router} from "./router.tsx"

createRoot(document.getElementById("root") as HTMLElement).render(
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
)