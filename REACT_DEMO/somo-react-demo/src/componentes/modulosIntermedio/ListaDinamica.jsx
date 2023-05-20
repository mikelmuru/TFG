import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useLocalStorage, setLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io5'
import * as BsIcons from 'react-icons/bs'
import '../../css/listaDinamica.css'
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';


export function ListaDinamica({ claveBusqueda, baseUrlLink }) {
    console.log('Cargo ListaDinamica')

    // MANEJO DE LA INFO GUARDADA EN LOCALSTORAGE -- PROVEE INFO SOBRE MODULO Y FILTRO ACTUAL
    // const [modulo, setModulo] = useLocalStorage('modulo', baseUrlLink)
    // const [apuntesFilteredBy, setApuntesFilteredBy] = useLocalStorage('apuntesFilteredBy', claveBusqueda)

    setLocalStorageNoRender('modulo', baseUrlLink.split('/')[0])
    setLocalStorageNoRender('apuntesFilteredBy', claveBusqueda)

    const listaObjetos = useContext(ListaDinamicaContext)

    // ESTADO DE LA LISTA: LISTA COMPLETA DE DATOS A MOSTRAR / FILTRAR Y MOSTRAR
    // const [listaObjetos, setListaObjetos] = useState(allData)

    // VARIABLES PARA GUARDAR ICONO DE LA LISTA // INFO TEMPORAL PARA EL FILTRADO DE OBJETOS
    // let objetos = null
    
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

    // USAMOS useEffect() PARA CREAR DEPENDENCIA ENTRE LA ACTUALIZACION DEL ESTADO Y LOS VALORES DE claveBusqueda o filter.
    // **solo se actualiza la lista cuando cambian los filtros, no cuando se re-renderiza -- evitamos bucle infinito de re-renderizados
    // useEffect(() => {
    //     if (claveBusqueda == 'grados') {
    //         filterElements(grados.grados)
    //     }
    //     if (claveBusqueda == 'usuarios') {
    //         filterElements(usuarios.usuarios)
    //     }
    //     if (claveBusqueda == 'chats') {
    //         filterElements(chats.chats)
    //     }
    //     if (claveBusqueda == 'ias') {
    //         filterElements(ias.ias)
    //     }
    //     if (claveBusqueda == '' || claveBusqueda == '*') {
    //         objetos = ['Not Found']
    //     }
    // }, [claveBusqueda, filter])

    // useEffect(() => {
    //     setListaObjetos(allData)
    // },[allData])


    // useEffect(() => {
    //     setModulo(baseUrlLink)
    // }, [baseUrlLink])
    // useEffect(() => {
    //     baseUrlLink == 'apuntes'
    //     ?   setApuntesFilteredBy(claveBusqueda)
    //     :   null
    // }, [claveBusqueda])


    // Devuelve la lista filtrada de las opciones que ofrece cada modulo:
    // Examenes: Grados - Apuntes: Grados/Usuarios - Foro: Chats - IAs: Ias
    return (
        <div className='listaDinamicaContainer'>
            {
                listaObjetos?.map((elemento) => {
                    const strSinEspacios = elemento.cod.replace(/\s+/g, ''); // Elimina los espacios con una expresión regular
                    const strEnMinusculas = strSinEspacios.toLowerCase();
                    const rutaCompleta = '/' + baseUrlLink + '/' + strEnMinusculas

                    return (
                        <Link
                            to={{ pathname: rutaCompleta }}
                            state={{ data: elemento }}
                            key={elemento.cod}
                            className='listaDinamicaLink'
                        >
                            {
                                Icon ? <Icon size={40} className='listaDinamicaIcon' /> : null
                            }
                            <span className='listaDinamicaSpan'>
                                {
                                    elemento.nickname
                                        ? elemento.nickname
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
