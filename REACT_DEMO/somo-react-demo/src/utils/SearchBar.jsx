import { useContext, useState } from "react"
import '../css/searchBar.css'
import { BsSearch } from 'react-icons/bs'
import { I18nContext } from "../context/I18nContext"

export function SearchBar({ filterType, handleFilter, handleTipoBusqueda, actualTipo }) {

    const actualModulo = actualTipo ? actualTipo : null

    const [selectionDisplay, setSelectionDisplay] = actualTipo ? useState('usuarios') : useState('')
    const { language, i18n, setLanguage } = useContext(I18nContext)


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
                                {i18n[language].searchBarOptGrado}
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
                                {i18n[language].searchBarOptUsuario}
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