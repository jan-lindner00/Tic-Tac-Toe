import { useContext } from "react";
import { AppContext } from "../../context/context";

export function useAppContext(){
    return useContext(AppContext)
}