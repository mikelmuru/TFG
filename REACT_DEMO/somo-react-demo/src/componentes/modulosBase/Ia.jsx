import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';

export function Ia () {

    const location = useLocation()
    const objectoIa = location.state?.data
    const pathIa = location.pathname
    
    console.log(location.state?.data)

    return (
        <>
            <Header title={objectoIa.nombre} />
            <p>Hola soy el comp Ia</p>
        </>
    )
}