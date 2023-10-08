export default function LetterInWord({ letter }: { letter?: string | null }) {
    return (
        <div className='flex flex-col justify-center items-center w-8 sm:w-12 h-12 bg-gray-100 border border-b-2 border-black'>
            {letter && <span>{letter.toUpperCase()}</span>}
        </div>
    )
}
