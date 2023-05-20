import { useNavigate } from 'react-router-dom'
import { BsArrowLeftCircle } from 'react-icons/bs'

export function Header({ title }) {

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className="contentHeader">
            {
                title != 'Home'
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