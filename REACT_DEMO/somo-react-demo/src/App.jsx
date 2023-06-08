import { Routes } from 'react-router-dom'
import './App.css'
import { useLocalStorage, cleanLocalStorage } from './custom-hooks/useLocalStorage'
import { Contacto, Navegacion } from './componentes/Menus'
import { allRoutes } from './utils/Constantes'
import { HiLogout } from 'react-icons/hi'
import HandleLanguage from './utils/HandleLanguage'
import { I18nContext } from './context/I18nContext'
import { useContext } from 'react'

function App() {

  // HAY QUE REPASAR LA LIMPIEZA DEL LOCALSTORAGE --> DEBERIA DEPENDER DEL LOGIN / LOGOUT
  // cleanLocalStorage('modulo')
  // cleanLocalStorage('moduloFilteredBy')

  const { language, i18n, setLanguage } = useContext(I18nContext)

  const [user, setUser] = useLocalStorage('user', null)

  console.log("App")

  const fullappRutas = () => allRoutes(user, setUser)

  const logOut = () => {
    setUser(null)
    cleanLocalStorage()
  }

  return (
    <>
      <header className='appHeader'>
        <h1 className='webTitle'>
          <span className="webTitleText">SOMO.pdf</span>
        </h1>
        {
          user
          &&
          <section className="logOutSection">
            <HandleLanguage />
            <article className='logoutall' onClick={() => logOut()}>
              <button className='logOutBtn'>
                {i18n[language].logout}
              </button>
              <HiLogout size={20} />
            </article>
          </section>
        }
      </header>

      <div className='fullApp'>
        {
          user ? <Navegacion /> : null
        }
        <div className="appElement appContent">
          <Routes>
            {fullappRutas()}
          </Routes>
        </div>
        {
          user ? <Contacto /> : null
        }
      </div>

    </>
  )
}

export default App
