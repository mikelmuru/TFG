import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai'
import { Header } from '../../utils/Header';
import '../../css/grado.css'
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import * as asignaturaService from '../../servicios/asignaturaService';
import { I18nContext } from '../../context/I18nContext';


export function Grado() {
    console.log('Grado')

    const { grado } = useParams()

    const [openCurso1, setOpenCurso1] = useState(false)
    const [openCurso2, setOpenCurso2] = useState(false)
    const [asignaturas, setAsignaturas] = useState([])
    const { language, i18n, setLanguage } = useContext(I18nContext)


    const jwtToken = readLocalStorageNoRender('user')

    const handleCurso1 = () => {
        setOpenCurso1(!openCurso1)
    }
    const handleCurso2 = () => {
        setOpenCurso2(!openCurso2)
    }

    const getAsignaturaByGrado = async () => {
        try {
            const response = await asignaturaService.getAsignaturasByGrado(jwtToken.access_token, grado)

            if (response.data.code === 200) {
                setAsignaturas(response.data?.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAsignaturaByGrado()
    }, [openCurso1, openCurso2])

    return (
        <>
            <Header title={grado} />
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
                    openCurso1
                        ?
                        asignaturas.length > 0
                            ?
                            <div className='gradoAsignaturasContainer'>
                                {
                                    asignaturas.map((asignatura) => {
                                        return (
                                            asignatura.curso === 1
                                            &&
                                            <Link to={location.pathname + '/' + asignatura.cod} className='gradoAsignaturasOpt' key={asignatura.cod}>
                                                {asignatura.nombre}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="gradoAsignaturasContainer">
                                <span>{i18n[language].gradoNoAsignaturas}</span>
                            </div>
                        : null
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
                    openCurso2
                        ?
                        asignaturas.length > 0
                            ?
                            <div className='gradoAsignaturasContainer'>
                                {
                                    asignaturas.map((asignatura) => {
                                        return (
                                            asignatura.curso === 2
                                            &&
                                            <Link to={location.pathname + '/' + asignatura.cod} className='gradoAsignaturasOpt' key={asignatura.cod}>
                                                {asignatura.nombre}
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className="gradoAsignaturasContainer">
                                <span>{i18n[language].gradoNoAsignaturas}</span>
                            </div>
                        : null
                }
            </div>
        </>
    );
}
