import { useNavigate } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { I18nContext } from '../context/I18nContext'
import { useContext } from 'react'

export function Header({ title }) {

    const { language, i18n, setLanguage } = useContext(I18nContext)

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="contentHeader">
            {
                title != i18n[language].menuHome
                    ?   <span onClick={goBack} className='goBackNav hoverSecundarioIcono'>
                            <BsArrowLeftCircle size={15} className='menuOptionIcon' />
                        </span>
                    :   null
            }
            <span className='headerTitle'>
                {title}
            </span>
            <br />
        </div>
    )
}