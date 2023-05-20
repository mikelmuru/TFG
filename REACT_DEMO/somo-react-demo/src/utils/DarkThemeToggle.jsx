import { useState } from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export function DarkToggle() {

    const DARK_CLASS = 'dark'
    const LIGHT_CLASS = 'light'

    const [darkTheme, setDarkTheme] = useState(true)

    const handleTheme = () => {
        setDarkTheme(!darkTheme)
        if (darkTheme) {
            document.documentElement.classList.add(DARK_CLASS)
            document.documentElement.classList.remove(LIGHT_CLASS)
        } else {
            document.documentElement.classList.add(LIGHT_CLASS)
            document.documentElement.classList.remove(DARK_CLASS)
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