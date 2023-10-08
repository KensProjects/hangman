import { TWordStore, useWordStore } from "../zustand/store"

export default function UsedLetters() {

    const usedLetters = useWordStore((state: TWordStore) => state.usedLetters)

    return (
        <div className="flex h-16 w-full bg-yellow-200 justify-start items-center">Used Letters: {usedLetters.map((letter, i) => {
            return <div key={i}>{letter}</div>
        })}
        </div>
    )
}
