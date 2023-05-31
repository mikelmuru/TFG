import {useState} from "react";

export function useLocalStorage (key, initialVal) {
    
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialVal
        } catch (error) {
            return initialVal
        }
    })

    const handleSetValue = (data) => {
        try {
            setValue(data)
            window.localStorage.setItem(key, JSON.stringify(data))

        } catch (error) {
            console.log(error)
        }
    }

    return [value, handleSetValue]
}

export function cleanLocalStorage (key) {
    try {
        key
        ?   window.localStorage.removeItem(key)
        :   window.localStorage.clear()
        
    } catch (error) {
        console.log(error)
    } 
}

export function setLocalStorageNoRender(key, data) {
    try {
        window.localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        console.log(error)
    }
}

export function readLocalStorageNoRender(key) {
    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    } catch (error) {
        console.log(error)
        return null
    }
}