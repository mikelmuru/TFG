import React, {useState} from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import * as chats from '../../mocks/chats.json'
import filterListaDinamicaData from '../../utils/filterData';
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';

export function Foro() {
    console.log('Cargo Foro')

    const [filtro, setFiltro] = useState('')

    const filteredData = filtro ? filterListaDinamicaData(chats.chats, filtro) : chats.chats

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    return (
        <>
            <Header title='Foro' />
            <SearchBar 
                filterType={'busqueda'} 
                handleFilter={handleFiltro} 
            />
            <ListaDinamicaContext.Provider value={filteredData}>
                <ListaDinamica
                    claveBusqueda={'chats'}
                    baseUrlLink={'foro'}
                />
            </ListaDinamicaContext.Provider>
        </>
    )
}