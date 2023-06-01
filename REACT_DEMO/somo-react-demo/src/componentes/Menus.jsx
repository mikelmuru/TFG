import { MenuOption } from "./MenuOption"

export function Navegacion() {

    return(
        <div className='appElement appMenu' style={{ borderRight: '.5px solid var(--borderColor)' }}>
                <MenuOption
                    iconName='AiFillHome' pathTo='Home'
                    linkPath='/' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='AiOutlineFilePdf' pathTo='Examenes'
                    linkPath='/examenes' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='TbNotes' pathTo='Apuntes'
                    linkPath='/apuntes' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='AiOutlineWechat' pathTo='Foro'
                    linkPath='/foro' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='BsRobot' pathTo='IAs'
                    linkPath='/ias' menuSide='appMenuIzq'
                />
                <MenuOption
                    iconName='BsPersonCircle' pathTo='Mi Cuenta'
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