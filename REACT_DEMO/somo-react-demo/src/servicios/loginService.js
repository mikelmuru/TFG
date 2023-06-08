import axios from 'axios'

const urlBase = 'http://localhost:8080/somotfg/login'

const urlLogin = urlBase + '/open/login'
const urlSingUp = urlBase + '/open/singup'

function validateFormData(data) {
    return !Object.values(data).includes('');
}

export async function logIn(userdto) {

    let response = null

    try {
        response = await axios.post(urlLogin, userdto)
    } catch (error) {
        response = error // codigo de la respuesta (401 normalmente)
    }

    return response
}

export async function singUp(userdto) {

    let response = null

    try {
        validateFormData(userdto)
        ?
        response = await axios.post(urlSingUp, userdto)
        :
        response = {'code':400}
    } catch (error) {
        response = error // codigo de la respuesta (401 normalmente)
    }

    return response
}