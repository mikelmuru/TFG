export default function filterListaDinamicaData(data, filter) {
    
    const filteredData = data.filter((elemento) => 
        elemento.nombre?.includes(filter)
        ||
        elemento.username?.includes(filter)
    )

    return filteredData
}

export function filterUsuarioApuntes(apuntes, usuario) {
    const filteredApuntes = apuntes.filter((apunte) => {
        return apunte.usuario === usuario
    })
    return filteredApuntes
}

export function filterApuntes(apuntes, filtro) {
    console.log(apuntes)
    const filtered = apuntes.data?.result.filter(apunte => {return apunte.cod.includes(filtro)})

    return filtered
}