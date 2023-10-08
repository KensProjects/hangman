import { TWordStore, TWordinGame, useWordStore } from "../zustand/store"
import LetterInWord from "./LetterInWord"

export default function WordComponent() {

    const wordInGame = useWordStore((state: TWordStore) => state.wordInGame)

    const gameInfo = wordInGame.map((letterObj: TWordinGame, i) => {
        if (!letterObj.isPicked) {
            return <LetterInWord key={i} />
        } else {
            return <LetterInWord letter={letterObj.letter} key={i} />
        }
    })

    return (
        <div className="flex justify-around items-center bg-gray-200 h-20 w-full text-white">
            {gameInfo}
        </div>
    )
}
