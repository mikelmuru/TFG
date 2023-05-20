import React, { useState } from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import * as grados from '../../mocks/grados.json'
import filterListaDinamicaData from '../../utils/filterData';
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';


export function Examenes() {
    console.log('Cargo Examenes')

    const [filtro, setFiltro] = useState(null)

    const filteredData = filtro ? filterListaDinamicaData(grados.grados, filtro) : grados.grados

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    return (
        <>
            <Header title='Examenes' />
            <SearchBar 
                filterType={'busqueda'} 
                handleFilter={handleFiltro} 
            />
            <ListaDinamicaContext.Provider value={filteredData}>
                <ListaDinamica
                    claveBusqueda={'grados'}
                    baseUrlLink={'examenes'}
                />
            </ListaDinamicaContext.Provider>
        </>
    )
}