
import React, {useEffect, useState} from 'react';
import { Header } from "../../utils/Header";
import { SearchBar } from "../../utils/SearchBar";
import { ListaDinamica } from '../modulosIntermedio/ListaDinamica';
import filterListaDinamicaData from '../../utils/filterData';
import * as grados from '../../mocks/grados.json'
import * as usuarios from '../../mocks/usuarios.json'
import { ListaDinamicaContext } from '../../context/ListaDinamicaContext';
import { useLocalStorage } from '../../custom-hooks/useLocalStorage';

export function Apuntes() {
    console.log('Cargo Apuntes')


    const [filtro, setFiltro] = useState('')
    const[tipoBusqueda, setTipoBusqueda] = useState('usuarios')


    const listaAllData = tipoBusqueda == 'grados'
                            ?   grados.grados
                            :   usuarios.usuarios

    const filteredData = filtro ? filterListaDinamicaData(listaAllData, filtro) : listaAllData

    const handleFiltro = (busqueda) => {
        setFiltro(busqueda)
    }

    const handleTipoBusqueda = (tipobusqueda) => {
        setTipoBusqueda(tipobusqueda)
    }


    return (
        <>
            <Header title='Apuntes' />
            <SearchBar 
                filterType={'seleccion'} 
                handleFilter={handleFiltro}
                handleTipoBusqueda={handleTipoBusqueda}
                actualTipo={tipoBusqueda}
            />
            <ListaDinamicaContext.Provider value={filteredData}>
                <ListaDinamica
                    claveBusqueda={tipoBusqueda}
                    baseUrlLink={'apuntes/' + tipoBusqueda}
                />
            </ListaDinamicaContext.Provider>
        </>
    )
}
