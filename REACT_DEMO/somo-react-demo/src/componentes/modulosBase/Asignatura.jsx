import { useLocation, useParams } from "react-router"
import { Header } from "../../utils/Header"
import * as grados from '../../mocks/grados.json'
import * as apuntes from '../../mocks/apuntes.json'
import * as examenes from '../../mocks/examenes.json'
import { useLocalStorage } from "../../custom-hooks/useLocalStorage"
import { useEffect, useState } from "react"
import { AiOutlineFilePdf, AiOutlineFileText } from 'react-icons/ai'
import '../../css/asignatura.css'
import { Archivo } from "./Archivo"

export function Asignatura() {
    console.log('Cargo Asignatura')

    // ESTADOS RELATIVOS A LA INFORMACION DE LA PROPIA ASIGNATURA Y LISTA DE DATOS A MOSTRAR
    const [listaArchivos, setListaArchivos] = useState([])
    const [asignatura, setAsignatura] = useState({})

    // ESTADO PARA CONTROLAR LA VISUALIZACION O NO DE UN ELEMENTO DE LA LISTA DE APUNTES-EXAMENES
    const [archivo, setArchivo] = useState(null)

    // const location = useLocation()

    const { asignatura: asignaturaCod } = useParams()
    const [modulo, setModulo] = useLocalStorage('modulo', '')

    const handleListaArchivos = (data) => {
        setListaArchivos(data)
    }

    const handleAsignatura = (asignatura) => {
        setAsignatura(asignatura)
    }

    const handleArchivo = (data) => {
        setArchivo(data)
    }


    // ESTO SE REEMPLAZARA POR LLAMADAS A LOS SERVICIOS BACKEND -- REQUEST ASIGNATURA BY COD / REQUEST EXAMENES / MODULOS BY ASIGNATURA
    useEffect(() => {
        var asignaturaObj = {}
        var data = []
        grados.grados.map((gradoMap) => {
            gradoMap.curso1.map((asignatura) => { asignatura.cod == asignaturaCod ? asignaturaObj = asignatura : null })
            gradoMap.curso2.map((asignatura) => { asignatura.cod == asignaturaCod ? asignaturaObj = asignatura : null })
        })
        if (modulo == 'examenes') {
            examenes.examenes.map((examen) => {
                examen.asignatura == asignaturaObj.nombre ? data.push(examen) : null
            })
        }
        if (modulo == 'apuntes') {
            apuntes.apuntes.map((apunte) => {
                apunte.asignatura == asignaturaObj.nombre ? data.push(apunte) : null
            })
        }

        handleListaArchivos(data)
        handleAsignatura(asignaturaObj)
    }, [modulo])



    // =======================================================================
    // RETURN DEL COMPONENTE ASIGNATURA
    return (
        <>
            <Header title={asignatura.cod} />
            {
                modulo == 'examenes'
                &&
                !archivo
                &&
                <div className="asignatura">
                    <p className="asignaturaTitle">
                        {
                            listaArchivos.length > 0
                                ? <span>Estos son los examenes disponibles para: <b>{asignatura.nombre}</b></span>
                                : <span>No hay examenes subidos aun</span>
                        }
                    </p>
                    <section className='asginaturaDataContainer'>
                        {
                            listaArchivos.map((elemento, indice) => {
                                return (
                                    <article
                                        key={indice}
                                        className="asignaturaDataElement"
                                        onClick={() => handleArchivo(elemento)}
                                    >
                                        <AiOutlineFilePdf size={30} className='asignaturaDataElementIcon' />
                                        <span>
                                            Año: {elemento.anio}
                                        </span>
                                        <span>
                                            Trimestre: {elemento.trimestre}
                                        </span>
                                    </article>
                                )
                            })
                        }
                    </section>
                </div>
            }
            {
                modulo == 'apuntes'
                &&
                !archivo
                &&
                <div className="asignatura">
                    <p className="asignaturaTitle">
                        {
                            listaArchivos.length > 0
                                ? <span>Estos son los apuntes disponibles para: <b>{asignatura.nombre}</b></span>
                                : <span>No hay apuntes subidos aun</span>
                        }
                    </p>
                    <section className='asginaturaDataContainer'>
                        {
                            listaArchivos.map((elemento, indice) => {
                                return (
                                    <article
                                        key={indice}
                                        className="asignaturaDataElement"
                                        onClick={() => handleArchivo(elemento)}
                                    >
                                        <AiOutlineFileText size={30} className='asignaturaDataElementIcon' />
                                        <span>
                                            {elemento.nombre}
                                        </span>
                                        <span>
                                            Autor:<br />{elemento.usuario}
                                        </span>
                                    </article>
                                )
                            })
                        }
                    </section>
                </div>
            }
            {
                archivo
                &&
                <Archivo archivo={archivo} handleClose={handleArchivo} />
            }
        </>
    )
}