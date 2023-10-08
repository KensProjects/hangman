import Header from "./components/Header";
import LetterInput from "./components/LetterInput";
import ResetButton from "./components/ResetButton";
import UsedLetters from "./components/UsedLetters";
import WordComponent from "./components/WordComponent";
import { TWordStore, useWordStore } from "./zustand/store";

export default function App() {

  const gameFailed = useWordStore((state: TWordStore) => state.gameFailed)
  const gameWon = useWordStore((state: TWordStore) => state.gameWon)
  const gameNotOver = !gameWon && !gameFailed

  return (
    <>
      <Header />

      <main>

        <UsedLetters />

        {gameWon &&
          <>
            <ResetButton gameState="You Won! Try Again?" />
          </>
        }

        {gameFailed &&
          <>
            <ResetButton gameState="Sorry, You Lost! Try Again?" />
          </>}
          
        {gameNotOver &&
          <>
            <LetterInput />
            <WordComponent />
          </>}

      </main>
    </>

  )
}


