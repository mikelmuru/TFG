export default function filterListaDinamicaData(data, filter) {
    
    const filteredData = data.filter((elemento) => 
        elemento.nombre.includes(filter)
        ||
        elemento.nickname?.includes(filter)
    )

    return filteredData
}

export function filterUsuarioApuntes(apuntes, usuario) {
    const filteredApuntes = apuntes.filter((apunte) => {
        return apunte.usuario === usuario
    })
    return filteredApuntes
}