import { create } from "zustand";
import axios from "axios";
import { apiEndpoint } from "../utils/endpoint";

export type TWordinGame = {
    letter: string, isPicked: boolean
}

export type TWordStore = {
    initialWord: string,
    activeKey: string,
    wordInGame: TWordinGame[],
    usedLetters: string[],
    gameWon: boolean,
    gameFailed: boolean,
    roundsLeft: number,
    setInitialWord: () => Promise<any>,
    removeLetterFromWord: (string: string) => Promise<any>,
    setActiveKey: (keyPressed: string) => void,
    clearGameState: () => Promise<any>,
}

const initialRoundCount = 5

const initialState = {
    initialWord: "",
    activeKey: "",
    wordInGame: [],
    gameWon: false,
    gameFailed: false,
    roundsLeft: initialRoundCount,
}

export const useWordStore = create<TWordStore>()((set, get) => ({
    initialWord: "",
    activeKey: "",
    wordInGame: [],
    gameWon: false,
    gameFailed: false,
    roundsLeft: initialRoundCount,
    usedLetters: [],
    setActiveKey: (keyPressed: string) => {
        set({ activeKey: keyPressed })
    },
    setInitialWord: async () => {
        try {
                 const res = await axios.get(apiEndpoint)
        const data = await res.data[0]
        set({ initialWord: data })
        set({
            wordInGame: data.split("").map((letter: any) => {
                return { letter: letter, isPicked: false }
            })
        })
        return data
        } catch (error) {
            console.error(error)
        }
   
    },
    removeLetterFromWord: (letterString: string) => {
        return new Promise((resolve) => {
            const usedLetters = get().usedLetters
            const letterAlreadyUsed = usedLetters.includes(letterString)
            if (letterAlreadyUsed) {
               return set({activeKey:""})
            }
            const prevWordInGame = get().wordInGame
            const letterExists = prevWordInGame.some((letterObj: TWordinGame) => {
                return letterObj.letter === letterString
            })
            if (letterExists) {
                const updatedWordInGame = prevWordInGame.map((letterObj: TWordinGame) => {
                    if (letterObj.letter === letterString) {
                        return { ...letterObj, isPicked: true }
                    } else {
                        return letterObj
                    }
                })
                set({ wordInGame: updatedWordInGame })
                const wordInGameAfterUpdate = get().wordInGame
                const isGameWon = wordInGameAfterUpdate.every((letterObj: TWordinGame) => {
                    return letterObj.isPicked
                })
                set({ usedLetters: [...usedLetters, letterString] })
                if (isGameWon) {
                    setTimeout(() => {
                        set({ gameWon: true, usedLetters: [] })
                    }, 800)
                }
            }
            else {
                set({ usedLetters: [...usedLetters, letterString] })

                set((state) => ({
                    roundsLeft: state.roundsLeft - 1
                }))
                const roundsLeft = get().roundsLeft

                if (roundsLeft < 1) {
                    set({ gameFailed: true, usedLetters: [] },)
                }
            }
            set({ activeKey: "" })
            resolve
        })
    },
    clearGameState: () => {
        return new Promise((resolve) => {
            set({
                gameWon: initialState.gameWon,
                gameFailed: initialState.gameFailed,
                initialWord: initialState.initialWord,
                wordInGame: initialState.wordInGame,
                activeKey: initialState.activeKey,
                roundsLeft: initialState.roundsLeft,
            })
            resolve
        })

    }
})

)


