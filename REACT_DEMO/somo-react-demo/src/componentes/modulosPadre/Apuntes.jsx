
import React, { useEffect, useState } from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import * as gradoService from '../../servicios/gradosService';
import * as usuarioService from '../../servicios/userService';


export function Apuntes() {
    console.log('Cargo Apuntes')

    const [filtro, setFiltro] = useState(null)
    const [data, setData] = useState([])
    const jwtToken = readLocalStorageNoRender('user')
    const [tipoBusqueda, setTipoBusqueda] = useState('usuarios')
    const [tmpBusqueda, setTmpBusqueda] = useState('usuarios')

    const getAll = async () => {
        try {
            let response = null

            tipoBusqueda === 'usuarios'
            ? response = await usuarioService.getUsuariosAll(jwtToken.access_token)
            : response = await gradoService.getGradosAll(jwtToken.access_token)

            if (response.data.code === 200) {
                setData(response.data?.result)
            }
            setTmpBusqueda(tipoBusqueda)
        } catch (error) {

        }
    }

    const getByFiltro = async () => {
        try {
            let response = null

            tipoBusqueda === 'usuarios'
                ? response = await usuarioService.getUsuariosByFiltro(jwtToken.access_token, filtro)
                : response = await gradoService.getGradosByFiltro(jwtToken.access_token, filtro)

            setData(response.data.result)
        } catch (error) {

        }
    }

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    const handleTipoBusqueda = (tipobusqueda) => {
        setTipoBusqueda(tipobusqueda)
    }


    useEffect(() => {
        getAll()
    }, [])

    useEffect(() => {
        if (tipoBusqueda != tmpBusqueda) {
            getAll()
        }
        if (filtro != null) {
            filtro !== '' ? getByFiltro() : getAll()
        }
    }, [tipoBusqueda, filtro])

    return (
        <>
            <Header title='Apuntes' />
            <SearchBar
                filterType={'seleccion'}
                handleFilter={handleFiltro}
                handleTipoBusqueda={handleTipoBusqueda}
                actualTipo={tipoBusqueda}
            />
            <ListaDinamicaContext.Provider value={data}>
                <ListaDinamica
                    claveBusqueda={tipoBusqueda}
                    baseUrlLink={'apuntes/' + tipoBusqueda}
                />
            </ListaDinamicaContext.Provider>
        </>
    )
}
