import { useContext } from "react";
import { I18nContext } from "../context/I18nContext";
import { MenuOption } from "./MenuOption"

export function Navegacion() {

    const { language, i18n, setLanguage } = useContext(I18nContext)

    return(
        <div className='appElement appMenu' style={{ borderRight: '.5px solid var(--borderColor)' }}>
                <MenuOption
                    iconName='AiFillHome' pathTo={i18n[language].menuHome}
                    linkPath='/' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='AiOutlineFilePdf' pathTo={i18n[language].menuExamenes}
                    linkPath='/examenes' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='TbNotes' pathTo={i18n[language].menuApuntes}
                    linkPath='/apuntes' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='AiOutlineWechat' pathTo={i18n[language].menuForo}
                    linkPath='/foro' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='BsRobot' pathTo={i18n[language].menuIAs}
                    linkPath='/ias' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='BsPersonCircle' pathTo={i18n[language].menuMyAccount}
                    linkPath='/myaccount' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='AiFillHome' pathTo='Tema'
                    linkPath='/' menuSide='appMenuIzq' config
                />
            </div>
    )
}

export function Contacto() {

    return(
        <div className='appElement appMenu' style={{ borderLeft: '.5px solid var(--borderColor)' }}>
                <MenuOption
                    iconName='AiFillPhone' pathTo='Tlf: +34 66 66 666'
                    linkPath='/' menuSide='appMenuDer'
                />
                <MenuOption
                    iconName='AiFillMail' pathTo='somo@gmail.com'
                    linkPath='/' menuSide='appMenuDer'
                />
                <MenuOption
                    iconName='TbMapPin' pathTo='Ubicacion'
                    linkPath='/' menuSide='appMenuDer'
                />
            </div>
    )
}