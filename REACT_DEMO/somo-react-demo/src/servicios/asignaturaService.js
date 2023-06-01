import axios from 'axios'
import { readLocalStorageNoRender } from '../custom-hooks/useLocalStorage'

const jwtToken = 'Bearer ' + readLocalStorageNoRender('user')?.access_token

const urlBase = 'http://localhost:8080/somotfg/asignatura'

const urlGetAll = urlBase + '/getall'
// const urlGetById = urlBase + '/getbyid'
const urlGetByCod = urlBase + '/getbycod'
const urlGetByGrado = urlBase + '/getbygrado'
const urlGetByFiltro = urlBase + '/getbyfiltro'
const urlCreate = urlBase + '/admin/create'
const urlUpdate = urlBase + '/admin/update'
const urlDeleteById = urlBase + '/admin/deletebyid'
const urlDeleteAll = urlBase + '/admin/deleteall'


export async function getAsignaturaAll(jwt) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer '+jwt

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

export async function getAsignaturaByCod(jwt, cod) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer '+jwt

    try {
        const requestResponse = await axios.get(
            urlGetByCod,
            {
                params: { 'asignaturacod': cod },
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

export async function getAsignaturasByGrado(jwt, grado) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer '+jwt

    try {
        const requestResponse = await axios.get(
            urlGetByGrado,
            {
                params: { 'gradocod': grado },
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error.message)
    }
}

export async function getAsignaturasByFiltro(jwt, filtro) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer '+jwt

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

export async function createAsignatura(jwt, asignaturas) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.post(
            urlCreate,
            asignaturas,
            {
                headers: { 'AUTHORIZATION': token }
            }
        )
        return requestResponse
    } catch (error) {
        console.log(error)
        const response = error.response // codigo de la respuesta (401 normalmente)
        // return response
    }
}

export async function updateAsignatura(jwt, asignatura) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.post(
            urlUpdate,
            asignatura,
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

export async function deleteAsignaturaById(jwt, ids) {

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

export async function deleteAsignaturaAll(jwt) {

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