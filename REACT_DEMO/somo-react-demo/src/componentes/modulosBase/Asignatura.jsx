import { useParams } from "react-router"
import { Header } from "../../utils/Header"
import { readLocalStorageNoRender, useLocalStorage } from "../../custom-hooks/useLocalStorage"
import { useContext, useEffect, useState } from "react"
import { AiOutlineFilePdf, AiOutlineFileText } from 'react-icons/ai'
import '../../css/asignatura.css'
import { Archivo } from "./Archivo"
import * as examenService from "../../servicios/examenService"
import * as apunteService from "../../servicios/apunteService"
import * as asignaturaService from "../../servicios/asignaturaService"
import { I18nContext } from "../../context/I18nContext"

export function Asignatura() {
    console.log('Cargo Asignatura')

    // ESTADOS RELATIVOS A LA INFORMACION DE LA PROPIA ASIGNATURA Y LISTA DE DATOS A MOSTRAR
    const [listaArchivos, setListaArchivos] = useState([])
    const [asignatura, setAsignatura] = useState({})
    // ESTADO PARA CONTROLAR LA VISUALIZACION O NO DE UN ELEMENTO DE LA LISTA DE APUNTES-EXAMENES
    const [archivo, setArchivo] = useState(null)

    const { language, i18n, setLanguage } = useContext(I18nContext)

    const jwtToken = readLocalStorageNoRender('user')

    const { asignatura: asignaturaCod } = useParams()
    const [modulo, setModulo] = useLocalStorage('modulo', '')

    const handleArchivo = (data) => {
        setArchivo(data)
    }

    const getAsignaturaByCod = async () => {
        const response = await asignaturaService.getAsignaturaByCod(jwtToken.access_token, asignaturaCod)

        response.data?.code === 200
            ? setAsignatura(response.data?.result)
            : console.log(response)
    }

    const getFilesByAsignatura = async (modulo) => {

        let response = []

        if (modulo == 'examenes') {
            response = await examenService.getExamenesByAsignatura(jwtToken.access_token, asignaturaCod)
        }
        if (modulo == 'apuntes') {
            response = await apunteService.getApuntesByAsignatura(jwtToken.access_token, asignaturaCod)
        }

        response.data?.code === 200
            ? setListaArchivos(response.data?.result)
            : console.log(response)
    }

    useEffect(() => {
        getAsignaturaByCod()
        getFilesByAsignatura(modulo)
    }, [])


    // =======================================================================
    // RETURN DEL COMPONENTE ASIGNATURA
    return (
        <>
            <Header title={asignaturaCod} />
            {
                !archivo
                &&
                <div className="asignatura">
                    <p className="asignaturaTitle">
                        {
                            listaArchivos.length > 0
                                ?
                                modulo === 'examenes'
                                    ? <span>{i18n[language].asignaturaExamenesDisponibles} <b>{asignatura.nombre}</b></span>
                                    : <span>{i18n[language].asignaturaApuntesDisponibles} <b>{asignatura.nombre}</b></span>
                                : <span>{i18n[language].asignaturaSinArchivos}</span>
                        }
                    </p>
                    <section className='asginaturaDataContainer'>
                        {
                            listaArchivos.map((elemento) => {
                                const date = new Date(elemento.fecha)
                                return (
                                    <article
                                        key={elemento.cod}
                                        className="asignaturaDataElement"
                                        onClick={() => handleArchivo(elemento)}
                                    >
                                        <AiOutlineFilePdf size={30} className='asignaturaDataElementIcon' />
                                        <span>
                                            {i18n[language].asignaturaArchivoCod}
                                        </span>
                                        <span style={{ 'fontSize': '14px', 'fontWeight': 'bold' }}>
                                            {elemento.cod}
                                        </span>
                                        <span>
                                            {i18n[language].asignaturaArchivoFecha}
                                        </span>
                                        <span style={{ 'fontSize': '14px', 'fontWeight': 'bold' }}>
                                            {`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}
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