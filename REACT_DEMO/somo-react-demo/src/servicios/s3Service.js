import axios from "axios"

const urlBase = 'http://localhost:8080/somotfg/s3'

const urlGetFile = urlBase + '/getfile'


export async function getFile(jwt, cod) {

    const token = 'Bearer ' + jwt

    try {
        const requestResponse = await axios.get(
            urlGetFile,
            {
                params: { 'filecod': cod },
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