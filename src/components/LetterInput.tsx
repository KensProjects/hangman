import { TWordStore, useWordStore } from '../zustand/store'
import useFetchInitialWord from '../hooks/useFetchInitialWord'
import { FormEvent } from 'react'
import useRemoveLetterFromWord from '../hooks/useRemoveLetterFromWord'

export default function LetterInput() {

    // const initialWord = useWordStore((state: TWordStore) => state.initialWord)
    const activeKey = useWordStore((state: TWordStore) => state.activeKey)
    const setActiveKey = useWordStore((state: TWordStore) => state.setActiveKey)
    const roundsLeft = useWordStore((state: TWordStore) => state.roundsLeft)

    const gameIsntOver = roundsLeft > 0

    const { isLoading, isFetching, error, isError } = useFetchInitialWord()

    const { mutate: removeLetter } = useRemoveLetterFromWord()

    function handleLetterInputSubmit(e: FormEvent) {
        e.preventDefault()
        removeLetter(activeKey)
    }

    if (isLoading || isFetching) {

        return <div>Loading</div>
    }

    else if (isError) {

        return <div>{JSON.stringify(error)}</div>

    } else {

        return (
            <section className="flex flex-col w-full h-full justify-center items-center gap-8 border border-black">
                <div className="w-1/4 h-fit flex flex-col justify-center items-center gap-4 mt-4">
                    {gameIsntOver && <div className='bg-green-400 w-32 h-12 rounded-sm flex justify-center items-center'>Rounds Left: {roundsLeft}</div>}
                    <form onSubmit={handleLetterInputSubmit} className='flex flex-col justify-center items-center gap-4 mb-4'>
                        <input type='text' name='activeKey' value={activeKey.toUpperCase()} onChange={e => setActiveKey(e.target.value)} maxLength={1} required className='border-2 border-black p-1 rounded-md' />
                        <button type="submit" className='bg-blue-300 hover:bg-blue-200 duration-75 ease-in-out w-20 h-8 rounded-md '>Submit</button>
                    </form>
                </div>

            </section>
        )
    }
}