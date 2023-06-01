import { useState } from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export function DarkToggle() {

    const DARK_CLASS = 'dark'
    const LIGHT_CLASS = 'light'

    const [darkTheme, setDarkTheme] = useState(document.documentElement.className)

    const handleTheme = () => {
        if (darkTheme == LIGHT_CLASS) {
            document.documentElement.classList.add(DARK_CLASS)
            document.documentElement.classList.remove(LIGHT_CLASS)
            setDarkTheme(DARK_CLASS)
        } else {
            document.documentElement.classList.add(LIGHT_CLASS)
            document.documentElement.classList.remove(DARK_CLASS)
            setDarkTheme(LIGHT_CLASS)
        }
    }

    return (
        <span onClick={() => handleTheme()} className='menuOption menuOptionText themeHandleBtn'>
            <BsFillMoonFill size={20} className="menuOptionIcon" />
            /
            <BsFillSunFill size={20} className="menuOptionIcon" />
        </span>
    )
};