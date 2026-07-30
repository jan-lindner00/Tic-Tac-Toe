import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router"
import AppContextProvider from "./context/AppContextProvider.tsx"
import {router} from "./router.tsx"
import { StrictMode } from "react";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <AppContextProvider>
            <RouterProvider router={router} />
        </AppContextProvider>
    </StrictMode>
)