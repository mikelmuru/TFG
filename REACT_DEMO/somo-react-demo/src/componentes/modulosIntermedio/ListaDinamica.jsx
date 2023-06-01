import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { setLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'
import * as BsIcons from 'react-icons/bs'
import '../../css/listaDinamica.css'
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';


export function ListaDinamica({ claveBusqueda, baseUrlLink }) {
    console.log('Cargo ListaDinamica')

    setLocalStorageNoRender('modulo', baseUrlLink.split('/')[0])
    setLocalStorageNoRender('apuntesFilteredBy', claveBusqueda)

    const listaObjetos = useContext(ListaDinamicaContext)

    var Icon = null

    switch (claveBusqueda) {
        case 'grados':
            Icon = IoIcons.IoSchoolSharp
            break;
        case 'usuarios':
            Icon = FaIcons.FaUserGraduate
            break;
        case 'chats':
            Icon = BsIcons.BsFillChatSquareDotsFill
            break;
        case 'ias':
            Icon = BsIcons.BsRobot
            break;
    }


    // Devuelve la lista filtrada de las opciones que ofrece cada modulo:
    // Examenes: Grados - Apuntes: Grados/Usuarios - Foro: Chats - IAs: Ias
    return (
        <div className='listaDinamicaContainer' id='listaDInCont'>
            {
                listaObjetos.map((elemento) => {
                    const strSinEspacios = elemento.cod ? elemento.cod?.replace(/\s+/g, '') : elemento.username?.replace(/\s+/g, '') // Elimina los espacios con una expresión regular
                    const strEnMinusculas = strSinEspacios.toLowerCase()
                    const rutaCompleta = '/' + baseUrlLink + '/' + strEnMinusculas

                    return (
                        <Link
                            to={{ pathname: rutaCompleta }}
                            state={{ data: elemento }}
                            key={elemento.id}
                            className='listaDinamicaLink'
                        >
                            {
                                Icon ? <Icon size={40} className='listaDinamicaIcon' /> : null
                            }
                            <span className='listaDinamicaSpan'>
                                {
                                    elemento.username
                                        ? elemento.username
                                        : elemento.nombre
                                }
                            </span>
                        </Link>
                    )
                })
            }
        </div>
    )
}
