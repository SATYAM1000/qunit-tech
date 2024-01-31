import React, { useState } from 'react'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'

const DarkModeToggler = () => {
    const [SwitchMode, Setswitchmode] = useState<boolean>(false)
    const ToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Setswitchmode(!SwitchMode)
        const element = document.getElementsByTagName('html')[0];
        const getClass = element.getAttribute('class')
        if (!getClass) {
            element.setAttribute('class', 'dark')
        }
        else {
            element.setAttribute('class', '')
        }
    }
    return (    
        <>
            <button className="bg-black p-2 rounded-full  " onClick={ToggleButton}>
                {!SwitchMode ? <MdOutlineLightMode color='white' size={25} /> : <MdDarkMode color='white' size={25} />}
            </button>
        </>
    )
}

export default DarkModeToggler