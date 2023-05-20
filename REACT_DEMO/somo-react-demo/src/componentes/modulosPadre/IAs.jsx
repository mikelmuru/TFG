import React, {useState} from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';
import filterListaDinamicaData from '../../utils/filterData';
import * as ias from '../../mocks/ias.json'

export function IAs() {
    console.log('Cargo IA')

    const [filtro, setFiltro] = useState('')

    const filteredData = filtro ? filterListaDinamicaData(ias.ias, filtro) : ias.ias

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    return (
        <>
            <Header title='Servicios IAs' />
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