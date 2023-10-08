
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_API_ENDPOINT: "https://random-word-api.herokuapp.com/word?length=5";
    }
  }
}
export {};