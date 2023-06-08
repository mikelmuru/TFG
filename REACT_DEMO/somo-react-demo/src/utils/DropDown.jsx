import { useContext, useState } from "react"
import { I18nContext } from "../context/I18nContext"


export default function DropDown({ miArchivoInfo, grados, asignaturas, handleGrado, handleAsignatura }) {

    const [isGradoOpen, setIsGradoOpen] = useState(false)
    const [isAsignaturaOpen, setIsAsignaturaOpen] = useState(false)

    const { language, i18n, setLanguage } = useContext(I18nContext)

    const handleIsGradoOpen = () => setIsGradoOpen(!isGradoOpen)
    const handleIsAsignaturaOpen = () => setIsAsignaturaOpen(!isAsignaturaOpen)

    const useHandleGrado = (grado) => {
        setIsGradoOpen(!isGradoOpen)
        handleGrado(grado)
    }
    const useHandleAsignatura = (asignatura) => {
        setIsAsignaturaOpen(!isAsignaturaOpen)
        handleAsignatura(asignatura)
    }

    return (
        <section className='formModuloInfo'>
            <span className='formOptTitle'>
                {i18n[language].accountPopUpGradoAsig}
            </span>
            <section className='formOptContainer'>
                <button onClick={() => handleIsGradoOpen()} className='formDropDownBtn'>
                    {miArchivoInfo.gradoNombre}
                </button>
                {
                    isGradoOpen
                        ?
                        grados.length > 0
                            ?
                            <section className='formSelect'>
                                {
                                    grados.map((grado) => {
                                        return (
                                            <span className='formOpt' onClick={() => useHandleGrado(grado)} key={grado.id}>
                                                {grado.nombre}
                                            </span>
                                        )
                                    })
                                }
                            </section>
                            :
                            <section className="formSelect">
                                <span className="formOpt">{i18n[language].accountPopUpDrpDwnErrorGrado}</span>
                            </section>
                        :
                        null
                }
                <button onClick={() => handleIsAsignaturaOpen()} className='formDropDownBtn'>
                    {miArchivoInfo.asignaturaNombre}
                </button>
                {
                    isAsignaturaOpen
                        ?
                        asignaturas.length > 0
                            ?
                            <section className='formSelect'>
                                {
                                    asignaturas.map((asignatura) => {
                                        return (
                                            <span className='formOpt' onClick={() => useHandleAsignatura(asignatura)} key={asignatura.id}>
                                                {asignatura.nombre}
                                            </span>
                                        )
                                    })
                                }
                            </section>
                            :
                            <section className="formSelect">
                                <span className="formOpt">{i18n[language].accountPopUpDrpDwnErrorAsignatura}</span>
                            </section>
                        :
                        null
                }
            </section>
        </section>
    )
}