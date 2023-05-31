import React, { useState } from "react";
import { logIn, singUp } from "../servicios/loginService";
import '../css/LogIn.css'
import { DarkToggle } from "../utils/DarkThemeToggle";

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

    const [error, setError] = useState(null)

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
            setError(response.status)
        }
    }

    const handleOption = (option) => {
        setOption(option)
        setError(null)
    }

    return (
        <>
            <div className="login">
                <p className="welcomeMsg">
                    SOMO.pdf es la red que conecta alumnos y profesores para compartir conocimiento entre todos.
                </p>
                {
                    error === 401
                        ?
                        <span className="errorMsg">
                            Tu usuario o contraseña no son correctas. Revisa tus credenciales.
                        </span>
                        : null
                }
                {
                    error === 400
                        ?
                        <span className="errorMsg">
                            Ha habido un error. Es posible que no hayas rellenado todos los campos necesarios.
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
                                    placeholder="Username"
                                    onChange={({ target }) => setUserDTO({ ...userdto, username: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="password"
                                    value={userdto.password}
                                    name="password"
                                    placeholder="Password"
                                    onChange={({ target }) => setUserDTO({ ...userdto, password: target.value })}
                                    className="loginOpt"
                                />
                                <button className="loginBtn btn">
                                    Log In
                                </button>
                            </form>
                            <p>¿Aun no tienes una cuenta?</p>
                            <button onClick={() => handleOption('singup')} className="optionBtn btn">
                                <span className="optionBtnTxt">
                                    Crear Cuenta
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
                                    placeholder="Username"
                                    onChange={({ target }) => setUserDTO({ ...userdto, username: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="text"
                                    value={userdto.nombre}
                                    name="nombre"
                                    placeholder="Nombre"
                                    onChange={({ target }) => setUserDTO({ ...userdto, nombre: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="text"
                                    value={userdto.apellido}
                                    name="apellido"
                                    placeholder="Apellidos"
                                    onChange={({ target }) => setUserDTO({ ...userdto, apellido: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="mail"
                                    value={userdto.mail}
                                    name="mail"
                                    placeholder="mail@mail.com"
                                    pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}"
                                    onChange={({ target }) => setUserDTO({ ...userdto, mail: target.value })}
                                    className="loginOpt"
                                />
                                <input
                                    type="password"
                                    value={userdto.password}
                                    name="password"
                                    placeholder="Password"
                                    onChange={({ target }) => setUserDTO({ ...userdto, password: target.value })}
                                    className="loginOpt"
                                />
                                <button className="loginBtn btn">
                                    Sing Up
                                </button>
                            </form>

                            <p>¿Ya tienes una cuenta?</p>

                            <button onClick={() => handleOption('login')} className="optionBtn btn">
                                <span className="optionBtnTxt">
                                    Log In
                                </span>
                            </button>
                        </>
                }
                <DarkToggle />
            </div>

        </>
    )
}