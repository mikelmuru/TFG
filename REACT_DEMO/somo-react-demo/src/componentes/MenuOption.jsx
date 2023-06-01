import { Link } from "react-router-dom"
import { DarkToggle } from '../utils/DarkThemeToggle'
import * as AiIcons from 'react-icons/ai'
import * as BsIcons from 'react-icons/bs'
import * as TbIcons from 'react-icons/tb'
import '../css/menuOptionCss.css'

export function MenuOption({ iconName, pathTo, linkPath, config, menuSide }) {

    var Icon = null

    AiIcons[iconName] ? Icon = AiIcons[iconName] : null
    BsIcons[iconName] ? Icon = BsIcons[iconName] : null
    TbIcons[iconName] ? Icon = TbIcons[iconName] : null

    // const returnContent = null --- ESTO ERA PARA SEGUN EL TIPO DE
    // OPCION DE MENU MOSTRASE UN CODIGO U OTRO

    return (
        <>
            {
                !config
                    ?   <Link to={linkPath} className={`menuOption menuOptionText ${menuSide}`}>
                            {Icon ? <Icon size={20} className="menuOptionIcon" /> : null}
                            <span className="menuOptionLabel">
                                {pathTo}
                            </span>
                        </Link>
                    :   <DarkToggle />
            }
        </>
    )
}