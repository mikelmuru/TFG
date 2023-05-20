import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';
import * as apuntesMock from "../../mocks/apuntes.json";
import filterListaDinamicaData, { filterUsuarioApuntes } from '../../utils/filterData';
import { AiOutlineFileText } from 'react-icons/ai'
import '../../css/usuarioApuntes.css'
import { SearchBar } from '../../utils/SearchBar';
import { Archivo } from './Archivo'


export function UsuarioApuntes() {
    console.log('UsuarioApuntes')

    // ESTADO PARA CONTROLAR LA VISUALIZACION O NO DE UN ELEMENTO DE LA LISTA DE APUNTES-EXAMENES
    const [archivo, setArchivo] = useState(null)

    // ESTADOS SOBRE LA INFO DEL PROPIO USUARIO: FILTRO PARA LA LISTA, LISTA DE APUNTES, USUARIO
    const [filtro, setFiltro] = useState(null)
    const [apuntes, setApuntes] = useState([''])

    const { usuario } = useParams()

    const location = useLocation()
    const objectoUsuario = location.state.data ? location.state.data : usuario

    // aqui se hara una llamada al servicio que comunica con el back
    const listaApuntes = apuntesMock.apuntes


    // AQUI FUNCION A LAS QUE SE LLAMA PARA CAMBIAR LOS ESTADOS
    const handleState = (lista) => {
        setApuntes(lista)
    }

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)

    }

    const handleArchivo = (data) => {
        setArchivo(data)
    }


    useEffect(() => {
        handleState(listaApuntes);
    }, [listaApuntes])

    useEffect(() => {
        let filteredData = filtro ? filterListaDinamicaData(listaApuntes, filtro) : listaApuntes;
        let filtered = filterUsuarioApuntes(filteredData, objectoUsuario.nickname);
        handleState(filtered);
    }, [filtro])

    return (
        <>
            <Header title={`${location.state.data.nickname}`} />
            {
                !archivo
                &&
                <div className='apuntesUsuario'>
                    <p className='apuntesUsuarioTitle'>
                        Estos son los apuntes disponibles que tiene <b>{objectoUsuario.nickname}</b>
                    </p>
                    <SearchBar
                        filterType={'busqueda'}
                        handleFilter={handleFiltro}
                    />
                    <section className='apuntesUsuarioApunteContainer'>
                        {
                            apuntes.map((apunte, indice) => {
                                return (
                                    <article
                                        key={indice}
                                        className='apuntesUsuarioApunte'
                                        onClick={() => handleArchivo(apunte)}
                                    >
                                        <AiOutlineFileText size={30} className='apuntesUsuarioApunteIcon' />
                                        <span className='apuntesUsuarioApunteNombre'>
                                            {apunte.nombre}
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
    );
}
