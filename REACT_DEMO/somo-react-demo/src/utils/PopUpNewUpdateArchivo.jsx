import '../css/popUps.css'
import * as AiIcons from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { readLocalStorageNoRender } from '../custom-hooks/useLocalStorage'
import * as gradoService from '../servicios/gradosService';
import * as asignaturaService from '../servicios/asignaturaService';
import * as apunteService from '../servicios/apunteService'
import * as examenService from '../servicios/examenService'
import DropDown from './DropDown';



export default function NewUpdateFile({ archivo = null, handleClose, tipo, tipoarchivo }) {
    console.log('Render PopUp')

    const defArchivo = archivo ? archivo : null
    const defArchivoInfo = archivo
        ? archivo
        : {
            'cod': 'Nombre Archivo',
            'asignaturaCod': 'Codigo Asignatura',
            'asignaturaNombre': 'Asignatura',
            'gradoCod': 'Codigo Grado',
            'gradoNombre': 'Grado',
            'autor': 'Autor'
        }

    const [tipoArchivo, setTipoArchivo] = useState(tipoarchivo)
    const [miArchivo, setMiArchivo] = useState(defArchivo)
    const [miArchivoInfo, setMiArchivoInfo] = useState(defArchivoInfo)
    const [grados, setGrados] = useState([])
    const [asignaturas, setAsignaturas] = useState([])
    const [actionResponse, setActionResponse] = useState(false)

    console.log(actionResponse)

    const usernameJwtToken = readLocalStorageNoRender('user')

    // HANDLES PARA ACTUALIZAR LA INFORMACION DE NUESTRO OBJETO MIARCHIVOINFO
    const handleTipoArchivo = () => {
        tipoArchivo === 'examenes' ? setTipoArchivo('apuntes') : setTipoArchivo('examenes')
    }
    const handleGrado = (info) => {
        const actual = { ...miArchivoInfo }
        actual.gradoCod = info.cod
        actual.gradoNombre = info.nombre
        setMiArchivoInfo(actual)
    }
    const handleAsignatura = (info) => {
        const actual = { ...miArchivoInfo }
        actual.asignaturaCod = info.cod
        actual.asignaturaNombre = info.nombre
        setMiArchivoInfo(actual)
    }
    const handleMiArchivo = (myfile) => {
        console.log(myfile.target.files[0])
        myfile.target.files[0]
            ? setMiArchivo(myfile.target.files[0])
            : setMiArchivo(myfile)
    }
    // ====================================================================================
    // LLAMADAS AL BACKEND ================================================================

    // PETICIONES GET -- BUSCAMOS TODOS LOS GRADOS Y ASIGNATURAS CORRESPONDIENTES AL GRADO
    const getAllGrados = async () => {
        try {
            const response = await gradoService.getGradosAll(usernameJwtToken.access_token, 0, 100, 'nombre')

            if (response.data?.code === 200) {
                setGrados(response.data.result)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const getAsignaturaByGrado = async (gradocod = null) => {
        try {
            const response = await asignaturaService.getAsignaturasByGrado(
                usernameJwtToken.access_token,
                gradocod ? gradocod : miArchivoInfo.gradoCod
            )

            response.data?.code === 200
                ? setAsignaturas(response.data.result)
                : console.log(response)
        } catch (error) {
            console.log(error.message)
            setAsignaturas([])
        }
    }

    // PETICIONES POST -- CREATES Y UPDATES DE APUNTES Y EXAMENES
    const createApunte = async () => {
        try {
            const response = await apunteService.createApunte(
                usernameJwtToken.access_token,
                {
                    'cod': miArchivo.name,
                    'asignaturaCod': miArchivoInfo.asignaturaCod,
                    'autor': usernameJwtToken.username
                },
                miArchivo
            )
            setActionResponse(response.status)
        } catch (error) {
            console.log('error: ' + error)
        }
    }
    const createExamen = async () => {
        try {
            const response = await examenService.createExamen(
                usernameJwtToken.access_token,
                {
                    'cod': miArchivo.name,
                    'asignaturaCod': miArchivoInfo.asignaturaCod,
                    'autor': usernameJwtToken.username
                },
                miArchivo
            )
            setActionResponse(response.status)
        } catch (error) {
            console.log(error)
        }
    }
    const updateApunte = async () => {
        try {
            const response = await apunteService.updateApunte(
                usernameJwtToken.access_token,
                miArchivoInfo,
                miArchivo
            )
            setActionResponse(response.status)
        } catch (error) {
            console.log(error)
        }
    }
    const updateExamen = async () => {
        try {
            const response = await examenService.updateExamen(
                usernameJwtToken.access_token,
                miArchivoInfo,
                miArchivo
            )
            setActionResponse(response.status)
        } catch (error) {
            console.log(error)
        }
    }

    // FILTRO DONDE CONTROLAMOS QUE TIPO DE ARCHIVO SE SUBE
    const uploadFile = () => {
        if (tipo == 'new') {
            if (miArchivoInfo != defArchivoInfo && miArchivo) {
                console.log(tipoArchivo)
                tipoArchivo === 'apuntes' ? createApunte() : createExamen()
            } else {
                window.alert('Rellena todos los campos anda.')
            }
        } else {
            tipoArchivo === 'apuntes' ? updateApunte() : updateExamen()
        }
    }

    // USEEFFECT PARA ACTUALIZAR LA INFORMACION DEL POPUP
    useEffect(() => {
        getAllGrados()
        archivo ? getAsignaturaByGrado(archivo.gradoCod) : null
    }, [])

    useEffect(() => {
        if (miArchivoInfo.gradoNombre !== defArchivoInfo.gradoNombre) {
            getAsignaturaByGrado();
        }
    }, [miArchivoInfo.gradoNombre])

    return (
        <>
            <div className="popUpContainer">
                {
                    !actionResponse
                    &&
                    <section className="popUpForm">

                        {/* CABECERA DEL POP-UP: BOTON CLOSE & TITULO SEGUN TIPO DE POP-UP */}
                        {/* ============================================================== */}
                        <section className='closePopUp'>
                            <span className='closePopUpSpan hoverSecundarioIcono' onClick={() => handleClose()}>
                                <AiIcons.AiOutlineCloseCircle size={25} />
                            </span>
                        </section>
                        {
                            tipo === 'new' ? <p className='popUpTitle'>Publica tu archivo</p> : <p className='popUpTitle'>{archivo.cod}</p>
                        }

                        {/* FORMULARIO DEL POP-UP --> TIPO ARCHIVO // GRADO & ASIGNATURA // SUBIR O NOMBRE */}
                        {/* ============================================================================== */}

                        <section className='formModuloInfo'>
                            <span className='formOptTitle'>
                                Tipo de archivo:
                            </span>
                            <section className="formOptContainer">
                                <button onClick={() => handleTipoArchivo()} className='formDropDownBtn'>
                                    {
                                        tipoArchivo === 'examenes' ? 'Examen' : 'Apunte'
                                    }
                                </button>
                            </section>
                        </section>

                        <DropDown
                            miArchivoInfo={miArchivoInfo}
                            grados={grados}
                            asignaturas={asignaturas}
                            handleGrado={handleGrado}
                            handleAsignatura={handleAsignatura}
                        />

                        <section className='formModuloInfo'>
                            <span className='formOptTitle'>
                                {
                                    tipo === 'new'
                                        ? <>Elige tu archivo:</>
                                        : <>Actualiza el nombre de tu archivo:</>
                                }
                            </span>
                            <section className='formOptContainer'>
                                {
                                    archivo
                                        ? <input
                                            type='text'
                                            defaultValue={archivo.cod}
                                            onChange={(event) => { archivo.cod = event.target.value }}
                                            className='updateNameInput'
                                        />
                                        : !miArchivo
                                            ?
                                            <label htmlFor="inputFile" className='formInputFile'>
                                                <span className='selectFileTitle'>
                                                    Selecciona un archivo pdf:
                                                </span>
                                                <span className='selectFileIconContainer'>
                                                    <AiIcons.AiFillFileAdd size={30} className='selectFileIcon' />
                                                </span>
                                                <input
                                                    id='inputFile'
                                                    type="file"
                                                    accept='.pdf'
                                                    onChange={(event) => handleMiArchivo(event)}
                                                    className='selectFileInput'
                                                />
                                            </label>
                                            :
                                            <article className='pdfView'>
                                                <span className='selectFileTitle'>
                                                    {miArchivo.name}
                                                    <AiIcons.AiOutlineCloseCircle
                                                        size={15}
                                                        className='pdfViewCancel'
                                                        onClick={() => setMiArchivo(null)}
                                                    />
                                                </span>
                                                <Document file={miArchivo}>
                                                    <Page pageNumber={1} height={120} />
                                                </Document>
                                            </article>
                                }
                            </section>
                        </section>

                        <span className='uploadContainer' onClick={() => uploadFile()}>
                            <AiIcons.AiOutlineCloudUpload size={50} className='uploadIcon' />
                        </span>
                    </section>
                }
                {
                    !isNaN(actionResponse)
                        ?
                        actionResponse === 201
                            ?
                            <section className="popUpForm">
                                <section className='closePopUp'>
                                    <span className='closePopUpSpan hoverSecundarioIcono' onClick={() => handleClose()}>
                                        <AiIcons.AiOutlineCloseCircle size={25} />
                                    </span>
                                </section>
                                <p>Tu archivo se ha subido y guardado correctamente</p>
                            </section>
                            :
                            actionResponse === 401 || actionResponse === 500
                                ?
                                <section className="popUpForm">
                                    <section className='closePopUp'>
                                        <span className='closePopUpSpan hoverSecundarioIcono' onClick={() => handleClose()}>
                                            <AiIcons.AiOutlineCloseCircle size={25} />
                                        </span>
                                    </section>
                                    <p>Ha habido un error! Vuelve a intentarlo.</p>
                                </section>
                                : null
                        : null
                }
            </div>
        </>
    )
}