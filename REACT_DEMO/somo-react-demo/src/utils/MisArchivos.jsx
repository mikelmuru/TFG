import React, { useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import * as TbIcons from 'react-icons/tb'
import NewUpdateFile from './PopUpNewUpdateArchivo'

export default function MisArchivos({ apuntes, titulo }) {
    console.log('Cargo MisArchivos')

    const [isApunteOpen, setIsApunteOpen] = useState(false)
    const [popUpOpen, setPopUpOpen] = useState(false)
    const [tipoPopUp, setTipoPopUp] = useState('new')
    const [showArchivo, setShowArchivo] = useState(null)

    const handleIsApuntesOpen = () => {
        setIsApunteOpen(!isApunteOpen)
    }

    const handlePopUp = (tipo, apunte = null) => {
        setTipoPopUp(tipo)
        setPopUpOpen(!popUpOpen)
        apunte ? setShowArchivo(apunte) : setShowArchivo(null)
    }

    return (
        <>
            <section className='myAccountApuntes'>
                <button onClick={() => { handleIsApuntesOpen() }} className='apuntesOpenBtn'>
                    <span className='apuntesOpenTitle'>
                        {titulo}
                    </span>
                    {
                        isApunteOpen
                            ? <AiIcons.AiOutlineUp className='apuntesOpenIcon' />
                            : <AiIcons.AiOutlineDown className='apuntesOpenIcon' />
                    }
                </button>
                {
                    isApunteOpen
                    &&
                    <div className='apuntesContainer'>
                        {
                            apuntes.apuntes.map((apunte, indice) => {
                                return (
                                    <article key={indice} className={`apuntesUnidad ${indice === 0 ? 'apuntesUnidadPrimero' : ''}`}>
                                        <AiIcons.AiOutlineFileText size={30} className='apuntesUnidadIcon' />
                                        <span className='apuntesUnidadNombre'>
                                            {apunte.nombre}
                                        </span>
                                        <span className='apuntesUnidadOpts'>
                                            <TbIcons.TbTrash
                                                size={20}
                                                className='apuntesUnidadOpt'
                                            />
                                            <AiIcons.AiFillEdit
                                                size={20}
                                                className='apuntesUnidadOpt'
                                                onClick={() => handlePopUp('update', apunte)}
                                            />
                                        </span>
                                    </article>
                                )
                            })
                        }
                        <section className='apuntesAddNew' onClick={() => handlePopUp('new')}>
                            <AiIcons.AiFillFileAdd size={35} className='apuntesAddNewIcon' />
                        </section>
                    </div>
                }
            </section>
            {
                popUpOpen
                ?   showArchivo
                    ?   <NewUpdateFile handleClose={handlePopUp} tipo={tipoPopUp} archivo={showArchivo} />
                    :   <NewUpdateFile handleClose={handlePopUp} tipo={tipoPopUp} />
                :   null
            }
        </>
    )
}