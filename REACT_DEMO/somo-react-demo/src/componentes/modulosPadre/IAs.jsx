import React, {useContext, useState} from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';
import filterListaDinamicaData from '../../servicios/filterData';
import * as ias from '../../mocks/ias.json'
import { I18nContext } from '../../context/I18nContext';

export function IAs() {
    console.log('Cargo IA')

    const [filtro, setFiltro] = useState('')
    const { language, i18n, setLanguage } = useContext(I18nContext)


    const filteredData = filtro ? filterListaDinamicaData(ias.ias, filtro) : ias.ias

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    return (
        <>
            <Header title={i18n[language].iasTitle} />
            <SearchBar 
                filterType={'busqueda'} 
                handleFilter={handleFiltro} 
            />
            <ListaDinamicaContext.Provider value={filteredData}>
                <ListaDinamica
                    claveBusqueda={'ias'}
                    baseUrlLink={'ias'}
                />
            </ListaDinamicaContext.Provider>
        </>
    )
}