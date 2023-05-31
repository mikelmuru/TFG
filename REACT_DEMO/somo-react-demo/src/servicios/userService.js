import axios from 'axios'

const urlBase = 'http://localhost:8080/somotfg/user'

const urlGetAll = urlBase + '/getall'
const urlGetById = urlBase + '/getbyid'
const urlGetByUsername = urlBase + '/getbyusername'
const urlGetByFiltro = urlBase + '/getbyfiltro'
const urlCreate = urlBase + '/admin/create'
const urlUpdate = urlBase + '/update'
const urlDeleteById = urlBase + '/deletebyid'
const urlDeleteAll = urlBase + '/admin/deleteall'

function validateFormData(data) {
    return !Object.values(data).includes('');
}


export async function getUsuariosAll(jwt) {

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

export async function getUsuarioById(jwt, id) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetById,
            {
                params: { 'userId': id },
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

export async function getUsuarioByUsername(jwt, username) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetByUsername,
            {
                params: { 'username': username },
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

export async function getUsuariosByFiltro(jwt, filtro) {

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

export async function createUsuario(jwt, usuario) {

    const token = 'Bearer ' + jwt

    let requestResponse = null

    try {
        if (validateFormData(usuario)) {
            requestResponse = await axios.post(
                urlCreate,
                usuario,
                {
                    headers: { 'AUTHORIZATION': token }
                }
            )
        }
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

export async function updateUsuario(jwt, usuario) {

    const token = 'Bearer ' + jwt

    let requestResponse = null

    try {
        if (validateFormData(usuario)) {
            requestResponse = await axios.post(
                urlUpdate,
                usuario,
                {
                    headers: { 'AUTHORIZATION': token }
                }
            )
        }
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        return response
    }
}

// ============================= DELETE ===============================

export async function deleteUsuarioById(jwt, ids) {

    const token = 'Bearer ' + jwt

    let requestResponse = null

    try {
        requestResponse = await axios.delete(
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

export async function deleteUsuariosAll(jwt) {

    const token = 'Bearer ' + jwt

    let requestResponse = null

    try {
        requestResponse = await axios.delete(
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