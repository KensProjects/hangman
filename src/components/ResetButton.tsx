import useClearGameState from '../hooks/useClearGameState'
import useFetchInitialWord from '../hooks/useFetchInitialWord'
import { TWordStore, useWordStore } from '../zustand/store'

export default function ResetButton({ gameState }: { gameState: "You Won! Try Again?" | "Sorry, You Lost! Try Again?" }) {
    
  const initialWord = useWordStore((state: TWordStore) => state.initialWord)

  const { refetch:restartGame } = useFetchInitialWord()
  const { mutate:clearGame } = useClearGameState()

  function handleReset() {
    clearGame()
    restartGame()
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full border border-black gap-8 mt-4 p-1'>
      <span>{initialWord.toUpperCase()}</span>
      <span>{gameState}</span>
      <button type='button' onClick={handleReset} className='bg-emerald-400 hover:bg-emerald-300 duration-75 ease-in-out border-none w-60 h-16 rounded-lg text-white'>Reset</button>
    </div>
  )
}
