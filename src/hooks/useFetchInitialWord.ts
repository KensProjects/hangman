import { useQuery } from "@tanstack/react-query"
import { TWordStore, useWordStore } from "../zustand/store"

export default function useFetchInitialWord() {

    const setInitialWord = useWordStore((state: TWordStore) => state.setInitialWord)

    return useQuery({
        queryKey: ["word"],
        queryFn: setInitialWord,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}