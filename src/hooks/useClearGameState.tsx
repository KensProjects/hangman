import { TWordStore, useWordStore } from '../zustand/store'
import { useMutation } from '@tanstack/react-query'

export default function useClearGameState() {

    const clearGameState = useWordStore((state: TWordStore) => state.clearGameState)

    return (
        useMutation(
            ["word"], clearGameState
        )
    )
}
