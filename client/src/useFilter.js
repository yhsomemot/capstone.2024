import { FilterContext } from "./components/FilterContext";
import { useContext } from "react";

export function useFilter() {
    return useContext(FilterContext)
}