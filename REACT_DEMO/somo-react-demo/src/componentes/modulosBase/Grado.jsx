import { useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai'
import { Header } from '../../utils/Header';
import '../../css/grado.css'

export function Grado() {
    console.log('Grado')

    let { grado } = useParams()

    const [openCurso1, setOpenCurso1] = useState(false)
    const [openCurso2, setOpenCurso2] = useState(false)

    const location = useLocation()
    const objectoGrado = location.state.data ? location.state.data : grado

    const handleCurso1 = () => {
        setOpenCurso1(!openCurso1)
    }
    const handleCurso2 = () => {
        setOpenCurso2(!openCurso2)
    }

    return (
        <>
            <Header title={`${objectoGrado.nombre}`} />
            <div className='gradoContainer'>

                <button onClick={() => { handleCurso1() }} className='gradoOpenCursoBtn'>
                    <span>Curso 1</span>
                    {
                        openCurso1
                            ? <AiIcons.AiOutlineUp className='gradoOpenCursoIcon' />
                            : <AiIcons.AiOutlineDown className='gradoOpenCursoIcon' />
                    }
                </button>
                {
                    openCurso1 && <div className='gradoAsignaturasContainer'>
                        {
                            objectoGrado.curso1.map((asignatura, indice) => {
                                return (
                                    <Link to={location.pathname + '/' + asignatura.cod} className='gradoAsignaturasOpt' key={asignatura.cod}>
                                        {asignatura.nombre}
                                    </Link>
                                )
                            })
                        }
                    </div>
                }

                <button onClick={() => { handleCurso2() }} className='gradoOpenCursoBtn'>
                    <span>Curso 2</span>
                    {
                        openCurso2
                            ? <AiIcons.AiOutlineUp className='gradoOpenCursoIcon' />
                            : <AiIcons.AiOutlineDown className='gradoOpenCursoIcon' />
                    }
                </button>
                {
                    openCurso2 && <div className='gradoAsignaturasContainer'>
                        {
                            objectoGrado.curso2.map((asignatura, indice) => {
                                return (
                                    <Link to={location.pathname + '/' + asignatura.cod} className='gradoAsignaturasOpt' key={asignatura.cod}>
                                        {asignatura.nombre}
                                    </Link>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </>
    );
}
