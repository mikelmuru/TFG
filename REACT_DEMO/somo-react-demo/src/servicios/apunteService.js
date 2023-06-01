import axios from 'axios'
import { readLocalStorageNoRender } from '../custom-hooks/useLocalStorage'

const jwtToken = 'Bearer ' + readLocalStorageNoRender('user')?.access_token

const urlBase = 'http://localhost:8080/somotfg/apunte'

const urlGetAll = urlBase + '/getall'
const urlGetById = urlBase + '/getbyid'
const urlGetByUsername = urlBase + '/getbyusername'
const urlGetByAsignatura = urlBase + '/getbyasignatura'
const urlGetByFiltro = urlBase + '/getbyfiltro'
const urlCreate = urlBase + '/create'
const urlUpdate = urlBase + '/update'
const urlDeleteById = urlBase + '/deletebyid'
const urlDeleteAll = urlBase + '/admin/deleteall'


export async function getApuntesAll(jwt) {

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

export async function getApunteById(jwt, id) {

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

export async function getApuntesByUsername(jwt, username) {

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

export async function getApuntesByAsignatura(jwt, asignatura) {

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

export async function getApuntesByFiltro(jwt, filtro) {

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

export async function createApunte(jwt, apuntedto, file) {
    const token = 'Bearer ' + jwt

    console.log(apuntedto)

    const formData = new FormData()
    formData.append('file',file,file.name)
    formData.append('newApuntes',JSON.stringify(apuntedto))

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

export async function updateApunte(jwt, apuntedto) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.post(
            urlUpdate,
            apuntedto,
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

export async function deleteApuntesById(jwt, ids) {
    
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

export async function deleteApuntesAll(jwt) {

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