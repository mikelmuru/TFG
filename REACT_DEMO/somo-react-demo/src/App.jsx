import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MenuOption } from './componentes/MenuOption'
import './App.css'
import { MisRutas } from './componentes/MisRutas'
import { cleanLocalStorage } from './custom-hooks/useLocalStorage'

function App() {

  // HAY QUE REPASAR LA LIMPIEZA DEL LOCALSTORAGE --> DEBERIA DEPENDER DEL LOGIN / LOGOUT
  // cleanLocalStorage('modulo')
  // cleanLocalStorage('moduloFilteredBy')

  return (
    <BrowserRouter>
      <header className='appHeader'>
        <h1 className='webTitle'>
          <span className="webTitleText">SOMO.pdf</span>
        </h1>
      </header>
      {/* <hr style={{ width: '80%' }} className='hr' /> */}

      <div className='fullApp'>
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


        <div className='appElement appContent'>
          <MisRutas />
        </div>


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
      </div>
    </BrowserRouter>
  )
}

export default App
