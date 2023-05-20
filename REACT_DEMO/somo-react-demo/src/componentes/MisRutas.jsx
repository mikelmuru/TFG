import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./modulosPadre/Home";
import { Examenes } from "./modulosPadre/Examenes";
import { Apuntes } from "./modulosPadre/Apuntes";
import { Foro } from "./modulosPadre/Foro";
import { IAs } from "./modulosPadre/IAs";
import { MyAccount } from "./modulosPadre/MyAccount";
import { Grado } from "./modulosBase/Grado"
import { Chat } from "./modulosBase/Chat"
import { Ia } from "./modulosBase/Ia"
import { Asignatura } from './modulosBase/Asignatura'
import { UsuarioApuntes } from "./modulosBase/UsuarioApuntes";

export function MisRutas() {
    console.log('Cargo MisRutas')

    return (
        // <Switch>
        <Routes>
            <Route path='/' element={<Home/>}>
            </Route>
            <Route path='/examenes' element={<Examenes />}>
            </Route>
            <Route path='/apuntes' element={<Apuntes />}>
            </Route>
            <Route path='/foro' element={<Foro />}>
            </Route>
            <Route path='/ias' element={<IAs />}>
            </Route>
            <Route path='/myaccount' element={<MyAccount />}>
            </Route>

            <Route path="/examenes/:grado" element={<Grado />}/>
            <Route path="/apuntes/grados/:grado" element={<Grado />}/>
            <Route path="/apuntes/usuarios/:usuario" element={<UsuarioApuntes />}/>
            <Route path="/foro/:chat" element={<Chat />}/>
            <Route path="/ias/:ia" element={<Ia />}/>

            <Route path="/examenes/:grado/:asignatura" element={<Asignatura />}/>
            <Route path="/apuntes/grados/:grado/:asignatura" element={<Asignatura />}/>

            {/* <Route path="/examenes/:grado/:asignatura" element={<Asignatura />} />
            <Route path="/apuntes/:filtro/:asignatura" element={<Asignatura />} />
            <Route path="/examenes/:grado/:asignatura" element={<Asignatura />} />
            <Route path="/examenes/:grado/:asignatura" element={<Asignatura />} /> */}

        </Routes>
        // </Switch>
    )
}