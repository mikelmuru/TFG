import React, { useContext, useState } from "react";
import { logIn, singUp } from "../servicios/loginService";
import '../css/LogIn.css'
import { DarkToggle } from "../utils/DarkThemeToggle";
import { I18nContext } from "../context/I18nContext";

export function LogIn({ setUserLocalStorage }) {

    const [userdto, setUserDTO] = useState({
        // id: "",
        username: "",
        nombre: "",
        apellido: "",
        mail: "",
        role: "alumno",
        password: "",
    })

    const [option, setOption] = useState('login')

    const [error, setError] = useState({code:'null'})

    const { language, i18n, setLanguage } = useContext(I18nContext)

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        sendRequest('login')
    }

    const handleSingUpSubmit = async (event) => {
        event.preventDefault()
        sendRequest('singup')
    }

    const sendRequest = async (tipo) => {

        let response = null

        tipo === 'login'
            ? response = await logIn(userdto)
            : response = await singUp(userdto)

        if (response.status == 200) {
            setUserLocalStorage(response.data)
        }
        else if (response.status == 201) {
            setOption('login')
        }
        else {
            setError({code: response.code})
        }
    }

    const handleOption = (option) => {
        setOption(option)
        setError({code: 'null'})
    }

    return (
        <>
            <div className="login">
                <p className="welcomeMsg">
                    {i18n[language].loginHeader}
                </p>
                {
                    error.code === 'ERR_BAD_REQUEST'
                        ?
                        <span className="errorMsg">
                            {i18n[language].loginError401}
                        </span>
                        : null
                }
                {
                    error.code === 400
                        ?
                        <span className="errorMsg">
                            {i18n[language].loginError400}
                        </span>
                        : null
                }
                {
                    error.code === 'ERR_NETWORK'
                        ?
                        <span className="errorMsg">
                            {i18n[language].loginErrorSingUp}
                        </span>
                        : null
                }
                {
                    option === 'login'
                        ?
                        <>
                            <form onSubmit={handleLoginSubmit} className="formulario">
                                <input
                                    type="text"
                                    value={userdto.username}
                                    name="username"
                                    placeholder={i18n[language].loginPlcHldUsername}
                                    onChange={({ target }) => setUserDTO({ ...userdto, username: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="password"
                                    value={userdto.password}
                                    name="password"
                                    placeholder={i18n[language].loginPlcHldPassword}
                                    onChange={({ target }) => setUserDTO({ ...userdto, password: target.value })}
                                    className="loginOpt"
                                />
                                <button className="loginBtn btn">
                                {i18n[language].loginBtnLogIn}
                                </button>
                            </form>
                            <p>{i18n[language].loginSingUpPregunta}</p>
                            <button onClick={() => handleOption('singup')} className="optionBtn btn">
                                <span className="optionBtnTxt">
                                    {i18n[language].loginBtnSingUp}
                                </span>
                            </button>
                        </>
                        :
                        <>
                            <form onSubmit={handleSingUpSubmit} className="formulario">
                                <input
                                    type="text"
                                    value={userdto.username}
                                    name="username"
                                    placeholder={i18n[language].loginPlcHldUsername}
                                    onChange={({ target }) => setUserDTO({ ...userdto, username: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="text"
                                    value={userdto.nombre}
                                    name="nombre"
                                    placeholder={i18n[language].loginPlcHldNombre}
                                    onChange={({ target }) => setUserDTO({ ...userdto, nombre: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="text"
                                    value={userdto.apellido}
                                    name="apellido"
                                    placeholder={i18n[language].loginPlcHldApellidos}
                                    onChange={({ target }) => setUserDTO({ ...userdto, apellido: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="mail"
                                    value={userdto.mail}
                                    name="mail"
                                    placeholder={i18n[language].loginPlcHldMail}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                                    onChange={({ target }) => setUserDTO({ ...userdto, mail: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="password"
                                    value={userdto.password}
                                    name="password"
                                    placeholder={i18n[language].loginPlcHldPassword}
                                    onChange={({ target }) => setUserDTO({ ...userdto, password: target.value })}
                                    className="loginOpt"
                                />
                                <button className="loginBtn btn">
                                {i18n[language].loginBtnSingUp}
                                </button>
                            </form>

                            <p>{i18n[language].loginLoginPregunta}</p>

                            <button onClick={() => handleOption('login')} className="optionBtn btn">
                                <span className="optionBtnTxt">
                                    {i18n[language].loginBtnLogIn}
                                </span>
                            </button>
                        </>
                }
                <DarkToggle />
            </div>

        </>
    )
}