import React, { createContext, useState } from 'react'

export const ModuloContext = createContext(['modulo', () => {}])

export const ListaDinamicaContext = createContext({})

// export const ModuloContextProvider = ({children}) => {
//     const [modulo, setModulo] = useState('modulo')

//     const handleSetModulo = (modulo) => {
//         setModulo(modulo)
//     }

//     return (
//         <ModuloContext.Provider value={[modulo,handleSetModulo]}>
//             {children}
//         </ModuloContext.Provider>
//     )
// }