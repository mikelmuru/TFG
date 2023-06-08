import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';
import { filterApuntes } from '../../servicios/filterData';
import { AiOutlineFileText } from 'react-icons/ai'
import '../../css/usuarioApuntes.css'
import { SearchBar } from '../../utils/SearchBar';
import { Archivo } from './Archivo'
import * as usuarioService from '../../servicios/userService';
import * as apuntesService from '../../servicios/apunteService'
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import { I18nContext } from '../../context/I18nContext';


export function UsuarioApuntes() {
    console.log('UsuarioApuntes')

    // ESTADO PARA CONTROLAR LA VISUALIZACION O NO DE UN ELEMENTO DE LA LISTA DE APUNTES-EXAMENES
    const [archivo, setArchivo] = useState(null)

    // ESTADOS SOBRE LA INFO DEL PROPIO USUARIO: FILTRO PARA LA LISTA, LISTA DE APUNTES, USUARIO
    const [filtro, setFiltro] = useState(null)
    const [apuntes, setApuntes] = useState([])
    const { language, i18n, setLanguage } = useContext(I18nContext)
    const jwtToken = readLocalStorageNoRender('user')

    const { usuario } = useParams()

    const getAllApuntes = async () => {
        let response = await apuntesService.getApuntesByUsername(jwtToken.access_token, usuario)

        if (filtro) {
            filterApuntes(response, filtro)
        }

        response.data?.code === 200
            ? setApuntes(response)
            : console.log(response)
    }

    // AQUI FUNCION A LAS QUE SE LLAMA PARA CAMBIAR LOS ESTADOS

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    const handleArchivo = (data) => {
        setArchivo(data)
    }

    useEffect(() => {
        getAllApuntes()
    }, [])

    useEffect(() => {
        filtro ? getAllApuntes() : null
    }, [filtro])

    return (
        <>
            <Header title={usuario} />
            {
                !archivo
                &&
                <div className='apuntesUsuario'>
                    <p className='apuntesUsuarioTitle'>
                        {i18n[language].userApuntesTitulo} <b>{usuario}</b>
                    </p>
                    <SearchBar
                        filterType={'busqueda'}
                        handleFilter={handleFiltro}
                    />
                    <section className='apuntesUsuarioApunteContainer'>
                        {
                            apuntes.data?.result.length > 0
                            ?
                            apuntes.data?.result.map((apunte) => {
                                const date = new Date(apunte.fecha)
                                return (
                                    <article
                                        key={apunte.id}
                                        className='apuntesUsuarioApunte'
                                        onClick={() => handleArchivo(apunte)}
                                    >
                                        <AiOutlineFileText size={30} className='apuntesUsuarioApunteIcon' />
                                        <span
                                            className='apuntesUsuarioApunteNombre'
                                            style={{'fontSize':'14px','fontWeight':'bold'}}
                                        >
                                            {apunte.cod}
                                        </span>
                                        <span
                                            style={{'fontSize':'12px'}}
                                        >
                                            {apunte.asignaturaCod}
                                        </span>
                                        <span
                                            style={{'fontSize':'12px'}}
                                        >
                                        {`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}
                                        </span>
                                    </article>
                                )
                            })
                            :
                            <span>{usuario} {i18n[language].userApuntesVacio}</span>
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
    );
}
