import { Home } from '../componentes/modulosPadre/Home'
import { Examenes } from '../componentes/modulosPadre/Examenes'
import { Apuntes } from '../componentes/modulosPadre/Apuntes'
import { Foro } from '../componentes/modulosPadre/Foro'
import { IAs } from '../componentes/modulosPadre/IAs'
import { MyAccount } from '../componentes/modulosPadre/MyAccount'
import { Grado } from '../componentes/modulosBase/Grado'
import { UsuarioApuntes } from '../componentes/modulosBase/UsuarioApuntes'
import { Chat } from '../componentes/modulosBase/Chat'
import { Ia } from '../componentes/modulosBase/Ia'
import { Asignatura } from '../componentes/modulosBase/Asignatura'
import { Navigate, Route } from 'react-router'
import { LogIn } from '../componentes/LogIn'

export const allRoutes = (user, setUser) =>
    <>
        <Route
            path='/auth'
            element={!user ? <LogIn setUserLocalStorage={setUser} /> : <Navigate to={'/'} />}
        />

        <Route
            path='/'
            element={user ? <Home /> : <Navigate to={'/auth'} />}
        />
        <Route
            path='/examenes'
            element={user ? <Examenes /> : <Navigate to={'/auth'} />}
        />
        <Route
            path="/apuntes"
            element={user ? <Apuntes /> : <Navigate to="/auth" />}
        />
        <Route
            path="/foro"
            element={user ? <Foro /> : <Navigate to="/auth" />}
        />
        <Route
            path="/ias"
            element={user ? <IAs /> : <Navigate to="/auth" />}
        />
        <Route
            path="/myaccount"
            element={user ? <MyAccount /> : <Navigate to="/auth" />}
        />

        <Route
            path="/examenes/:grado"
            element={user ? <Grado /> : <Navigate to="/auth" />}
        />
        <Route
            path="/apuntes/grados/:grado"
            element={user ? <Grado /> : <Navigate to="/auth" />}
        />
        <Route
            path="/apuntes/usuarios/:usuario"
            element={user ? <UsuarioApuntes /> : <Navigate to="/auth" />}
        />
        <Route
            path="/foro/:chat"
            element={user ? <Chat /> : <Navigate to="/auth" />}
        />
        <Route
            path="/ias/:ia"
            element={user ? <Ia /> : <Navigate to="/auth" />}
        />

        <Route
            path="/examenes/:grado/:asignatura"
            element={user ? <Asignatura /> : <Navigate to="/auth" />}
        />
        <Route
            path="/apuntes/grados/:grado/:asignatura"
            element={user ? <Asignatura /> : <Navigate to="/auth" />}
        />
    </>
