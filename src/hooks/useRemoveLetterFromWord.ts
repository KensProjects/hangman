import { useMutation } from "@tanstack/react-query"
import { TWordStore, useWordStore } from "../zustand/store"

export default function useRemoveLetterFromWord() {

    const removeLetterFromWord = useWordStore((state: TWordStore) => state.removeLetterFromWord)

    return useMutation(
        ["word"], removeLetterFromWord,
    )
}
