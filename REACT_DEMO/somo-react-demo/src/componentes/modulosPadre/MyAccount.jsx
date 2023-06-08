import React, { useContext, useEffect, useState } from 'react';
import { Header } from "../../utils/Header";
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import '../../css/myAccount.css'
import * as AiIcons from 'react-icons/ai'
import MisArchivos from '../modulosBase/MisArchivos';
import NewUpdateFile from '../../utils/PopUpNewUpdateArchivo'
import * as userService from '../../servicios/userService'
import * as apuntesService from '../../servicios/apunteService'
import * as examenesService from '../../servicios/examenService'
import { I18nContext } from '../../context/I18nContext';


export function MyAccount() {
    console.log('Cargo MyAccount')

    // AQUI DEFINIMOS LOS ESTADOS DE LOS QUE DEPENDE EL COMPONENTE
    const [isReadOnly, setIsReadOnly] = useState(true)

    // ESTA INFO SE PROPORCIONARA A TRAVES DE UN CONTEXTO O EL LOCALSTORAGE
    const [usuario, setUsuario] = useState({
        'username': '',
        'nombre': '',
        'apellido': '',
        'mail': '',
        'role': ''
    })
    const [tmpUsuario, setTmpUsuario] = useState({})     // se hace una copia del usuario cuando se habilita la edicion para recuperarla en caso de cancelar los cambios
    const [apuntes, setApuntes] = useState([])
    const [examenes, setExamenes] = useState([])

    const [popUpOpen, setPopUpOpen] = useState(false)
    const [tipoPopUp, setTipoPopUp] = useState('new')
    const [showArchivo, setShowArchivo] = useState(null)
    const [moduloPopUp, setModuloPopUp] = useState(null)
    
    const { language, i18n, setLanguage } = useContext(I18nContext)

    const userTokensNick = readLocalStorageNoRender('user')

    // LLAMADAS AL SERVICIO DE USUARIO
    const getUsuarioByUsername = async () => {
        try {
            const response = await userService.getUsuarioByUsername(
                userTokensNick.access_token,
                userTokensNick.username
            )
            if (response.data.code === 200){
                setUsuario(response.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateUser = async () => {
        try {
            const response = await userService.updateUsuario(
                userTokensNick.access_token,
                usuario
            )
            if (response.data.code === 200){
                setUsuario(response.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // LLAMADAS AL SERVICIO DE APUNTES Y EXAMENES
    const getApuntes = async () => {
        const response = await apuntesService.getApuntesByUsername(userTokensNick.access_token, userTokensNick.username)

        response.data?.code === 200
            ? setApuntes(response.data.result)
            : setApuntes([])
    }
    const getExamenes = async () => {
        const response = await examenesService.getExamenesByUsername(userTokensNick.access_token, userTokensNick.username)

        response.data?.code === 200
            ? setExamenes(response.data.result)
            : setExamenes([])
    }

    // MANEJO DE LOS INPUTS
    const handleUserData = (data, from) => {
        let newdata = { ...usuario }

        from === 'username' ? newdata.username = data : null
        from === 'nombre' ? newdata.nombre = data : null
        from === 'apellido' ? newdata.apellido = data : null
        from === 'mail' ? newdata.mail = data : null

        setUsuario(newdata)
    }
    const handleTxtArea = (operation) => {
        operation === 'open' ? setTmpUsuario(usuario) : null
        operation === 'cancel' ? setUsuario(tmpUsuario) : null
        operation === 'update' ? updateUser() : null

        setIsReadOnly(!isReadOnly)
    }
    const handlePopUp = (tipo, apunte = null, modulo = null) => {
        setTipoPopUp(tipo)
        setPopUpOpen(!popUpOpen)
        apunte ? setShowArchivo(apunte) : setShowArchivo(null)
        modulo ? setModuloPopUp(modulo) : null
        if (popUpOpen) {
            getApuntes()
            usuario.role === 'profesor' ? getExamenes() : null
        }
    }

    // CONTROL DE DELETE DE ARCHIVOS Y RECARGA DE LISTA DE ARCHIVOS
    const reloadAfterDelete = () => {
        console.log('after delete')
        getApuntes()
        usuario.role === 'profesor' ? getExamenes() : null
    }

    // USEEFFECT PARA MANEJAR LAS LLAMADAS INICIALES A LOS SERVICIOS
    useEffect(() => {
        getUsuarioByUsername()
        getApuntes()
    }, [])

    useEffect(() => {
        usuario.role === 'profesor' ? getExamenes() : null
    }, [usuario])



    return (
        <>
            <Header title={i18n[language].menuMyAccount} />
            <div className='myAccountContainer'>
                <section className='myAccountPersonalInfo'>
                    <div className='myAccountPersonalInfoHead'>
                        <input
                            type='textarea'
                            className='myAccountHeadTitle myAccountPersonalInfoDato'
                            value={usuario.username}
                            onChange={(event) => handleUserData(event.target.value, 'username')}
                            readOnly={true}
                        />

                        <span className='myAccountHeadIconContainer'>
                            {
                                isReadOnly
                                    ? <span className='myAccountHeadIcon moreMarginLeft'>
                                        <AiIcons.AiFillSetting size={25} onClick={() => handleTxtArea('open')} />
                                    </span>
                                    : <>
                                        <span className='myAccountHeadIcon'>
                                            <AiIcons.AiOutlineCloseCircle size={25} onClick={() => handleTxtArea('cancel')} />
                                        </span>
                                        <span className='myAccountHeadIcon'>
                                            <AiIcons.AiOutlineCheckCircle size={25} onClick={() => handleTxtArea('update')} />
                                        </span>
                                    </>
                            }
                        </span>
                    </div>
                    <input
                        type='text'
                        className={`myAccountPersonalInfoDato ${!isReadOnly ? 'canWrite' : ''}`}
                        value={usuario.nombre}
                        onChange={(event) => handleUserData(event.target.value, 'nombre')}
                        readOnly={isReadOnly}
                    />
                    <input
                        type='text'
                        className={`myAccountPersonalInfoDato ${!isReadOnly ? 'canWrite' : ''}`}
                        value={usuario.apellido}
                        onChange={(event) => handleUserData(event.target.value, 'apellido')}
                        readOnly={isReadOnly}
                    />
                    <input
                        type='text'
                        className={`myAccountPersonalInfoDato ${!isReadOnly ? 'canWrite' : ''}`}
                        value={usuario.mail}
                        onChange={(event) => handleUserData(event.target.value, 'mail')}
                        readOnly={isReadOnly}
                    />

                </section>
                {/* HASTA AQUI SE HA MOSTRADO LA INFO PERSONA JUNTO A LA OPCION DE EDITARLA */}
                <hr className='myAccountHr' />
                {/* EL SIGUIENTE BLOQUE MOSTRARA LOS ARCHIVOS DEL USUARIO. EN CASO DE SER PROFE/ADMIN MOSTRARA TAMBIEN SUS EXAMENES */}

                <MisArchivos
                    apuntes={apuntes}
                    titulo={i18n[language].accountMisApuntesTitulo}
                    modulo={'apuntes'}
                    handlePopUp={handlePopUp}
                    afterDel={reloadAfterDelete}
                />

                {
                    usuario.role == 'profesor'
                    &&
                    <MisArchivos
                        apuntes={examenes ? examenes : null}
                        titulo={i18n[language].accountMisExamenesTitulo}
                        modulo={'examenes'}
                        handlePopUp={handlePopUp}
                        afterDel={reloadAfterDelete}
                    />
                }
                <br />
                <section className='apuntesAddNew' onClick={() => handlePopUp('new', null, 'apuntes')}>
                    <AiIcons.AiFillFileAdd size={35} className='apuntesAddNewIcon' />
                </section>
            </div>
            {
                popUpOpen
                    ? showArchivo
                        ? <NewUpdateFile
                            handleClose={handlePopUp}   // cierra el popup
                            tipo={tipoPopUp}            // define si es un archivo nuevo o para actualizar
                            archivo={showArchivo}       // la info del propio archivo
                            tipoarchivo={moduloPopUp}          // apunte o examen
                        />
                        : <NewUpdateFile
                            handleClose={handlePopUp}
                            tipo={tipoPopUp}
                            tipoarchivo={moduloPopUp}
                        />
                    : null
            }
        </>
    )
}