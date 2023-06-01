import axios from 'axios'

const urlBase = 'http://localhost:8080/somotfg/grado'

const urlGetAll = urlBase + '/getall'
const urlGetById = urlBase + '/getbyid'
const urlGetByCod = urlBase + '/getbycod'
const urlGetByFiltro = urlBase + '/getbyfiltro'
const urlCreate = urlBase + '/admin/create'
const urlUpdate = urlBase + '/admin/update'
const urlDeleteById = urlBase + '/admin/deletebyid'
const urlDeleteAll = urlBase + '/admin/deleteall'

export async function getGradosAll(jwt) {

    const token = 'Bearer ' + jwt

    // const params = {
    //     'pageN':pageN ? pageN : null,
    //     'counts':counts ? counts : null,
    //     'fieldSort':fieldSort ? fieldSort : null
    // }

    try {
        const requestResponse = await axios.get(
            urlGetAll,
            {
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

export async function getGradoById(jwt, id) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetById,
            {
                params: { 'gradoid': id },
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

export async function getGradoByCod(jwt, cod) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetByCod,
            {
                params: { 'cod': cod },
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

export async function getGradosByFiltro(jwt, filtro) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetByFiltro,
            {
                params: { 'filtro': filtro },
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

// ============================= POST ===============================

export async function createGrado(jwt, grados) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.post(
            urlCreate,
            grados,
            {
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

export async function updateGrado(jwt, grado) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.post(
            urlUpdate,
            grado,
            {
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

// ============================= DELETE ===============================

export async function deleteGradoById(jwt, ids) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.delete(
            urlDeleteById,
            ids,
            {
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

export async function deleteGradoAll(jwt) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.delete(
            urlDeleteAll,
            {
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}