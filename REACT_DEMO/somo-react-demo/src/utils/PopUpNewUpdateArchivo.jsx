import '../css/popUps.css'
import * as AiIcons from 'react-icons/ai'
import * as usuarios from '../mocks/usuarios.json'
import * as grados from '../mocks/grados.json'
import { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

export default function NewUpdateFile({ archivo = null, handleClose, tipo }) {
    console.log('Render PopUp')
    console.log(archivo)

    const defTipoArchivMsg = 'Tipo de archivo'
    const defGradoMsg = archivo ? archivo.grado : 'Elige un grado'
    const defAsignaturaMsg = archivo ? archivo.asignatura : 'Elige una asignatura'
    const defArchivo = archivo ? archivo : null

    const [tipoArchivo, setTipoArchivo] = useState(defTipoArchivMsg)
    const [grado, setGrado] = useState(defGradoMsg)
    const [asignatura, setAsignatura] = useState(defAsignaturaMsg)
    const [miArchivo, setMiArchivo] = useState(defArchivo)

    const [isTipoArchivoOpen, setIsTipoArchivoOpen] = useState(false)
    const [isGradoOpen, setIsGradoOpen] = useState(false)
    const [isAsignaturaOpen, setIsAsignaturaOpen] = useState(false)

    // ESTA INFO SE SACARA DE UN CONTEXTO TRAS EL LOGIN -- USERCONTEXT ENVOLVERA TODA LA APP
    const usuario = usuarios.usuarios[0]

    const handleIsTipoArchivoOpen = () => {
        setIsTipoArchivoOpen(!isTipoArchivoOpen)
    }
    const handleIsGradoOpen = () => {
        setIsGradoOpen(!isGradoOpen)
    }
    const handleIsAsignaturaOpen = () => {
        setIsAsignaturaOpen(!isAsignaturaOpen)
    }
    const handleTipoArchivo = (tipo) => {
        setTipoArchivo(tipo)
        setIsTipoArchivoOpen(!isTipoArchivoOpen)
    }
    const handleGrado = (info) => {
        setIsGradoOpen(!isGradoOpen)
        setGrado(info)
    }
    const handleAsignatura = (info) => {
        setIsAsignaturaOpen(!isAsignaturaOpen)
        setAsignatura(info)
    }
    const handleMiArchivo = (myfile) => {
        myfile.target.files[0]
        ?   setMiArchivo(myfile.target.files[0])
        :   setMiArchivo(myfile)
    }
    const handleFileName = (data) => {
        entity.nombre = data
    }

    const uploadFile = () => {
        // COMPROBAMOS QUE TODOS LOS CAMPOS ESTEN ESPECIFICADOS ANTES DE LLAMAR AL SERVICIO
        if (tipo == 'new') {
            if (tipoArchivo !== defTipoArchivMsg && grado !== defGradoMsg && asignatura !== defAsignaturaMsg && miArchivo) {
                handleClose()
                console.log('Exito')
            } else {
                console.log('Fail')
            }
        } else {
            handleClose()
            console.log('Exito')
        }
    }

    useEffect(() => {
        setTipoArchivo(defTipoArchivMsg)
        setGrado(defGradoMsg)
        setAsignatura(defAsignaturaMsg)
    }, [])

    return (
        <>
            <div className="popUpContainer">
                <section className="popUpForm">

                    {/* CABECERA DEL POP-UP: BOTON CLOSE & TITULO SEGUN TIPO DE POP-UP */}
                    {/* ============================================================== */}
                    <section className='closePopUp'>
                        <span className='closePopUpSpan hoverSecundarioIcono' onClick={() => handleClose()}>
                            <AiIcons.AiOutlineCloseCircle size={25} />
                        </span>
                    </section>
                    {
                        tipo === 'new' ? <p className='popUpTitle'>Publica tu archivo</p> : <p className='popUpTitle'>{archivo.nombre}</p>
                    }

                    {/* FORMULARIO DEL POP-UP --> TIPO ARCHIVO // GRADO & ASIGNATURA // SUBIR O NOMBRE */}
                    {/* ============================================================================== */}

                    <section className='formModuloInfo'>
                        <span className='formOptTitle'>
                            Tipo de archivo:
                        </span>
                        <section className="formOptContainer">
                            <button onClick={() => handleIsTipoArchivoOpen()} className='formDropDownBtn'>
                                {tipoArchivo}
                            </button>
                            {
                                isTipoArchivoOpen
                                &&
                                <section className='formSelect'>
                                    <span className='formOpt' onClick={() => handleTipoArchivo('apunte')}>
                                        Apunte
                                    </span>
                                    <span className='formOpt' onClick={() => handleTipoArchivo('examen')}>
                                        Examen
                                    </span>
                                </section>
                            }
                        </section>
                    </section>

                    <section className='formModuloInfo'>
                        <span className='formOptTitle'>
                            Grado y Asignatura:
                        </span>
                        <section className='formOptContainer'>
                            <button onClick={() => handleIsGradoOpen()} className='formDropDownBtn'>
                                {grado.nombre ? grado.nombre : grado}
                            </button>
                            {
                                isGradoOpen
                                &&
                                <section className='formSelect'>
                                    {
                                        grados.grados.map((gradoElemento, indice) => {
                                            return (
                                                <span className='formOpt' onClick={() => handleGrado(gradoElemento)} key={indice}>
                                                    {gradoElemento.nombre}
                                                </span>
                                            )
                                        })
                                    }
                                </section>
                            }
                            <button onClick={() => handleIsAsignaturaOpen()} className='formDropDownBtn'>
                                {asignatura.nombre ? asignatura.nombre : asignatura}
                            </button>
                            {
                                isAsignaturaOpen
                                &&
                                <section className='formSelect'>
                                    {
                                        grados.grados.map((gradoElemento, indice) => {
                                            if (gradoElemento.nombre == grado.nombre) {
                                                return (
                                                    // SALTA EL WARNING DE LA KEY PERO CUANDO LA INFO VENGA DE BBDD SOLO SE HARA UN MAP
                                                    // DE ESTA MANERA SE EVITA DIV EXTRA
                                                    <>
                                                        {
                                                            gradoElemento.curso1.map((asignatura, indice) => (
                                                                <span className='formOpt' onClick={() => handleAsignatura(asignatura)} key={indice}>
                                                                    {asignatura.nombre}
                                                                </span>
                                                            ))
                                                        }
                                                        {
                                                            gradoElemento.curso2.map((asignatura, indice) => (
                                                                <span className='formOpt' onClick={() => handleAsignatura(asignatura)} key={indice}>
                                                                    {asignatura.nombre}
                                                                </span>
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </section>
                            }
                        </section>
                    </section>

                    <section className='formModuloInfo'>
                        <span className='formOptTitle'>
                            {
                                tipo === 'new'
                                ?   <>Elige tu archivo:</>
                                :   <>Actualiza el nombre de tu archivo:</>
                            }
                        </span>
                        <section className='formOptContainer'>
                            {
                                archivo
                                    ?   <input
                                            type='text'
                                            defaultValue={archivo.nombre}
                                            onChange={(event) => {archivo.nombre = event.target.value}}
                                            className='updateNameInput'
                                        />
                                    :   !miArchivo
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
            </div>
        </>
    )
}