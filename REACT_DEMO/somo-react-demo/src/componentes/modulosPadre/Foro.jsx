import React, { useContext, useEffect, useState } from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';
import * as gradoService from '../../servicios/gradosService';
import { I18nContext } from '../../context/I18nContext';


export function Foro() {
    console.log('Cargo Foro')

    const [filtro, setFiltro] = useState(null)
    const [data, setData] = useState([])
    const { language, i18n, setLanguage } = useContext(I18nContext)

    const jwtToken = readLocalStorageNoRender('user')

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    const getAllGrados = async () => {
        try {
            const response = await gradoService.getGradosAll(jwtToken.access_token)

            if (response.data.code === 200) {
                setData(response.data?.result)
            }
            setTmpBusqueda(tipoBusqueda)
        } catch (error) {

        }
    }

    const getGradosByFiltro = async () => {
        try {
            const response = await gradoService.getGradosByFiltro(jwtToken.access_token, filtro)

            if (response.data.code === 200) {
                setData(response.data?.result)
            }
            setTmpBusqueda(tipoBusqueda)
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllGrados()
    }, [])

    useEffect(() => {
        if (filtro != null) {
            filtro !== '' ? getGradosByFiltro() : getAllGrados()
        }
    }, [filtro])

    return (
        <>
            <Header title={i18n[language].menuForo} />
            <SearchBar
                filterType={'busqueda'}
                handleFilter={handleFiltro}
            />
            <ListaDinamicaContext.Provider value={data}>
                <ListaDinamica
                    claveBusqueda={'chats'}
                    baseUrlLink={'foro'}
                />
            </ListaDinamicaContext.Provider>
        </>
    )
}