import axios from 'axios'
import { readLocalStorageNoRender } from '../custom-hooks/useLocalStorage'

const jwtToken = 'Bearer ' + readLocalStorageNoRender('user')?.access_token

const urlBase = 'http://localhost:8080/somotfg/examen'

const urlGetAll = urlBase + '/getall'
const urlGetById = urlBase + '/getbyid'
const urlGetByUsername = urlBase + '/getbyusername'
const urlGetByAsignatura = urlBase + '/getbyasignatura'
const urlGetByFiltro = urlBase + '/getbyfiltro'
const urlCreate = urlBase + '/profesor/create'
const urlUpdate = urlBase + '/profesor/update'
const urlDeleteById = urlBase + '/profesor/deletebyid'
const urlDeleteAll = urlBase + '/admin/deleteall'

export async function getExamenesAll(jwt) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer ' + jwt

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

export async function getExamenById(jwt, id) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetById,
            {
                params: { 'apunteid': id },
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

export async function getExamenesByUsername(jwt, username) {

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

export async function getExamenesByAsignatura(jwt, asignatura) {
    console.log('Servicio grado --> getByGrado')

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetByAsignatura,
            {
                params: { 'asignaturacod': asignatura },
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

export async function getExamenesByFiltro(jwt, filtro) {
    console.log('Servicio grado --> getByGrado')

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

export async function createExamen(jwt, examendto, file) {

    const token = 'Bearer ' + jwt

    const formData = new FormData()
    formData.append('file',file,file.name)
    formData.append('newExamen',JSON.stringify(examendto))

    try {
        const requestResponse = await axios.post(
            urlCreate,
            formData,
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

export async function updateExamen(jwt, examen) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.post(
            urlUpdate,
            examen,
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

export async function deleteExamenesById(jwt, ids) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.delete(
            urlDeleteById,
            {
                data: ids,
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

export async function deleteExamenesAll(jwt) {

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