import { useState } from "react"
import '../css/searchBar.css'
import { BsSearch } from 'react-icons/bs'

export function SearchBar({ filterType, handleFilter, handleTipoBusqueda, actualTipo }) {

    const actualModulo = actualTipo ? actualTipo : null

    const [selectionDisplay, setSelectionDisplay] = actualTipo ? useState('usuarios') : useState('')

    const useHandleFilter = (busqueda) => {
        handleFilter(busqueda)
    }

    const useHandleTipoBusqueda = (tipobusqueda) => {
        actualModulo == tipobusqueda
            ? null
            : handleTipoBusqueda(tipobusqueda)
        handleSelectionDisplay(tipobusqueda)
    }

    const handleSelectionDisplay = (selection) => {
        setSelectionDisplay(selection)
    }

    return (
        <>
            <div className="searchBar">
                <div className="searchBarTextArea">
                    <input
                        type="text"
                        id="searchFilter"
                        className="searchBarTextAreaInput"
                        onChange={(event) => { useHandleFilter(event.target.value) }}
                    />
                    <BsSearch size={15} className="searchBarTextAreaIcon" />
                </div>
                {
                    filterType == 'seleccion'
                        ?
                        <div className="searchBarSelection">
                            <span
                                onClick={() => useHandleTipoBusqueda('grados')}
                                className={
                                    `${selectionDisplay === 'usuarios'
                                    ?   'searchBarSelectionDisplay'
                                    :   'searchBarSelectionHide'}
                                    searchBarSelectionOpt`
                                }
                            >
                                Grados
                            </span>
                            <span
                                onClick={() => useHandleTipoBusqueda('usuarios')}
                                className={
                                    `${selectionDisplay === 'grados'
                                    ?   'searchBarSelectionDisplay'
                                    :   'searchBarSelectionHide'}
                                    searchBarSelectionOpt`
                                }
                            >
                                Usuarios
                            </span>
                        </div>
                        : null
                }
            </div>
        </>
    )
}





/*

<Dropdown>
                                <DropdownToggle variant="succes" id="dropdown-basic">
                                    Filtrar por:
                                </DropdownToggle>

                                <DropdownMenu>
                                    <button onClick={useHandleTipoBusqueda('usuarios')}>usuarios</button>
                                    <br />
                                    <button onClick={useHandleTipoBusqueda('grados')}>grados</button>
                                </DropdownMenu>
                            </Dropdown>

*/