import React, { useEffect, useState } from 'react';
import { Header } from "../../utils/Header";
import { useLocalStorage } from '../../custom-hooks/useLocalStorage';
import * as users from '../../mocks/usuarios.json'
import * as allApuntes from '../../mocks/apuntes.json'
import '../../css/myAccount.css'
import { filterUsuarioApuntes } from '../../utils/filterData';
import * as AiIcons from 'react-icons/ai'
import MisArchivos from '../../utils/MisArchivos';
import NewUpdateFile from '../../utils/PopUpNewUpdateArchivo';


/*
    VARAIBLES:
        **  HASTA QUE NO HACEMOS CLICK EN EL OK NO SE ENVIA LA PETICION POST
            CUIDADO CON EL CAMBIO DE NICKNAME --> SE PIERDE LA RELACION CON LOS APUNTES
                SOLUCIONES:
                    · NICKNAME INMUTABLE (OPCION QUE NO GUSTARIA)
                    · ACTUALIZAR NICKNAME EN T_USUARIOS --> ACTUALIZAR T_APUNTES.AUTOR

        - usuario: EL objeto usuario con toda su info *no contraseña*
        
        ** NO ** - isInfoUpdated: booleano para controlar accion de actualizar la info personal
        los textarea se habilitaran/deshabilitaran con una clase 'disabled'

*/

export function MyAccount() {
    console.log('Cargo MyAccount')

    // AQUI DEFINIMOS LOS ESTADOS DE LOS QUE DEPENDE EL COMPONENTE
    const [isReadOnly, setIsReadOnly] = useState(true)

    // ESTA INFO SE PROPORCIONARA A TRAVES DE UN CONTEXTO O EL LOCALSTORAGE
    const [usuario, setUsuario] = useState(users.usuarios[0])
    const [tmpUsuario, setTmpUsuario] = useState(users.usuarios[0])

    // AQUI SE LLAMARA AL BACK, BUSCAR_POR_NICKNAME
    const apuntes = filterUsuarioApuntes(allApuntes.apuntes, usuario.nickname)


    const handleUserData = (data, from) => {
        let newdata = {...usuario}

        from === 'nickname' ? newdata.nickname = data : null
        from === 'nombre' ? newdata.nombre = data : null
        from === 'apellidos' ? newdata.apellidos = data : null
        from === 'mail' ? newdata.mail = data : null

        setUsuario(newdata)
    }
    const handleTxtArea = (operation) => {
        operation === 'open' ? setTmpUsuario(usuario) : null
        operation === 'cancel' ? setUsuario(tmpUsuario) : null

        setIsReadOnly(!isReadOnly)
    }
    


    return (
        <>
            <Header title='My Account' />
            <div className='myAccountContainer'>
                <section className='myAccountPersonalInfo'>
                    <div className='myAccountPersonalInfoHead'>
                        <input
                            type='textarea'
                            className='myAccountHeadTitle myAccountPersonalInfoDato'
                            value={usuario.nickname}
                            onChange={(event) => handleUserData(event.target.value, 'nickname')}
                            readOnly={true}
                        />
                            
                        <span className='myAccountHeadIconContainer'>
                            {
                                isReadOnly
                                    ?   <span className='myAccountHeadIcon moreMarginLeft'>
                                            <AiIcons.AiFillSetting size={25} onClick={() => handleTxtArea('open')} />
                                        </span>
                                    :   <>
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
                        onChange={(event) => handleUserData(event.target.value,'nombre')}
                        readOnly={isReadOnly}
                    />
                    <input
                        type='text'
                        className={`myAccountPersonalInfoDato ${!isReadOnly ? 'canWrite' : ''}`}
                        value={usuario.apellidos}
                        onChange={(event) => handleUserData(event.target.value,'apellidos')}
                        readOnly={isReadOnly}
                    />
                    <input
                        type='text'
                        className={`myAccountPersonalInfoDato ${!isReadOnly ? 'canWrite' : ''}`}
                        value={usuario.mail}
                        onChange={(event) => handleUserData(event.target.value,'mail')}
                        readOnly={isReadOnly}
                    />

                </section>
                {/* HASTA AQUI SE HA MOSTRADO LA INFO PERSONA JUNTO A LA OPCION DE EDITARLA */}
                <hr className='myAccountHr' />
                {/* EL SIGUIENTE BLOQUE MOSTRARA LOS ARCHIVOS DEL USUARIO. EN CASO DE SER PROFE/ADMIN MOSTRARA TAMBIEN SUS EXAMENES */}
                
                <MisArchivos apuntes={allApuntes} titulo={'Mis Apuntes'} />

                {
                    usuario.role == 'admin'
                    &&
                    <MisArchivos apuntes={examenes ? examenes : null} titulo={'Mis Examenes'} />
                }
            </div>
            
        </>
    )
}