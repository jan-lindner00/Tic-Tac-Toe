# Frontend Mentor - Tic Tac Toe solution

This is a solution to the [Tic Tac Toe challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the game either solo vs the computer or multiplayer against another person
- **Bonus 1**: Save the game state in the browser so that it’s preserved if the player refreshes their browser
- **Bonus 2**: Instead of having the computer randomly make their moves, try making it clever so it’s proactive in blocking your moves and trying to win

### Screenshot

![](/public/start-screen.png)
![](/public/game-empty.png)
![](/public/game-over.png)

### Links

- Solution URL: [https://github.com/jan-lindner00/Tic-Tac-Toe](https://github.com/jan-lindner00/Tic-Tac-Toe)
- Live Site URL: [https://tic-tac-toe.gruppe-l.me/game](https://tic-tac-toe.gruppe-l.me/game)

## My process

### Built with

- Semantic HTML5 markup
- Tailwind CSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) - Bundler

### What I learned

During this project I really sharpened my problem solving skills by programming an intelligent CPU opponent, that makes it hard to win against.
I also practiced my React and Tailwind skills. In addition to that I used a little bit of React Router to navigate between the start and game screen. 

I am especially proud of my custom useLocalStorage hook that syncs local storage to my application.

```js
export default function useLocalStorage<T>(key: string, initialValue: T): [T, (newValue: T ) => void]{
    const subscribe = useCallback((callback: () => void): (() => void) => {
        window.addEventListener("storage", callback)
        return () => { window.removeEventListener("storage", callback)}
    }, [])

    const getData = useCallback((): T => {
        const item = localStorage?.getItem(key)
        return item ? JSON.parse(item) : initialValue
    }, [key, initialValue])

    const [cachedDataSnapshot, setCachedDataSnapshot] = useState<T>(initialValue)

    const getSnapshot = useCallback((): T => {
        const currentData = getData()
        if((typeof currentData === "object" || currentData === null) && currentData?.toString() !== cachedDataSnapshot?.toString()){
            setCachedDataSnapshot(currentData)
        }
        return cachedDataSnapshot
    }, [cachedDataSnapshot, getData])

    const value: T = useSyncExternalStore(subscribe, getSnapshot)
    
    const setValue = useCallback((newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        window.dispatchEvent(new Event("storage"))
    }, [key])

    return [value, setValue]
}
```

### Continued development

In the future I want to improve the accessibility of my project as this area is lacking the most. Other then that I am pretty happy with my app.

## Author

- Frontend Mentor - [@jn123l](https://www.frontendmentor.io/profile/jn123lyourusername)
- GitHub - [@jan-lindner00](https://github.com/jan-lindner00/)

