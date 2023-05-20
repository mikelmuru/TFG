import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';

export function Chat () {

    const location = useLocation()
    const objectoChat = location.state?.data
    const pathChat = location.pathname
    
    console.log(location.state?.data)

    return (
        <>
            <Header title={objectoChat.nombre} />
            <p>Hola soy el comp Chat</p>
        </>
    )
}