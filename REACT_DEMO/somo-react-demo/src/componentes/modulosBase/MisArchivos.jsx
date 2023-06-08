import React, { useContext, useState } from 'react'
import * as AiIcons from 'react-icons/ai'
import * as TbIcons from 'react-icons/tb'
import * as apuntesService from '../../servicios/apunteService'
import * as examenesService from '../../servicios/examenService'
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage'
import '../../css/popUps.css'
import { I18nContext } from '../../context/I18nContext'


export default function MisArchivos({ apuntes, titulo, modulo, handlePopUp, afterDel }) {
    console.log('Cargo MisArchivos')

    const [isApunteOpen, setIsApunteOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteResponse, setDeleteResponse] = useState(false)

    const { language, i18n, setLanguage } = useContext(I18nContext)

    const userTokensNick = readLocalStorageNoRender('user')

    const handleIsApuntesOpen = () => {
        setIsApunteOpen(!isApunteOpen)
    }
    const useHandlePopUp = (tipo, apunte) => {
        handlePopUp(tipo, apunte, modulo)
    }

    const handleConfirmDelete = () => setConfirmDelete(!confirmDelete)

    const handleAfterDel = () => {
        setDeleteResponse(false)
        afterDel()
    }

    const deleteApunte = async (id) => {
        const ids = [id]
        try {
            let deletion = null
            modulo === 'apuntes'
            ? deletion = await apuntesService.deleteApuntesById(userTokensNick.access_token, ids)
            : deletion = await examenesService.deleteExamenesById(userTokensNick.access_token, ids)
            console.log(deletion)
            setDeleteResponse(deletion.status)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className={`myAccountApuntes ${'tipo' + modulo}`}>
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
                            apuntes
                                ?
                                apuntes.map((apunte, indice) => {
                                    return (
                                        <article key={apunte.id} className={`apuntesUnidad ${indice === 0 ? 'apuntesUnidadPrimero' : ''}`}>
                                            <AiIcons.AiOutlineFileText size={30} className='apuntesUnidadIcon' />
                                            <span className='apuntesUnidadNombre'>
                                                {apunte.cod}
                                            </span>
                                            {
                                                !confirmDelete
                                                    ?
                                                    <span className='apuntesUnidadOpts'>
                                                        <TbIcons.TbTrash
                                                            size={20}
                                                            className='apuntesUnidadOpt'
                                                            onClick={() => handleConfirmDelete()}
                                                        />
                                                        <AiIcons.AiFillEdit
                                                            size={20}
                                                            className='apuntesUnidadOpt'
                                                            onClick={() => useHandlePopUp('update', apunte)}
                                                        />
                                                    </span>
                                                    :
                                                    <span className="apuntesUnidadOpts">
                                                        <span>
                                                            <TbIcons.TbTrash
                                                                size={20}
                                                                className='apuntesUnidadOpt'
                                                                onClick={() => deleteApunte(apunte.id)}
                                                            />
                                                        </span>
                                                        <AiIcons.AiFillCloseCircle
                                                            size={20}
                                                            className='apuntesUnidadOpt'
                                                            onClick={() => handleConfirmDelete()}
                                                        />
                                                    </span>
                                            }
                                        </article>
                                    )
                                })
                                : null
                        }
                    </div>
                }
                {
                    isApunteOpen
                    &&
                    apuntes.length == 0
                    &&
                    <span>{i18n[language].accountMisArchivosNull}</span>
                }
                {
                    deleteResponse
                    &&
                    <div className="popUpContainerAfterDel">
                        {
                            deleteResponse === 200
                                ?
                                <section className="popUpForm">
                                    <section className='closePopUp'>
                                        <span className='closePopUpSpan hoverSecundarioIcono' onClick={() => handleAfterDel()}>
                                            <AiIcons.AiOutlineCloseCircle size={25} />
                                        </span>
                                    </section>
                                    <p>{i18n[language].accountMisArchivosArchivoEliminado}</p>
                                </section>
                                :
                                deleteResponse === 401 || deleteResponse === 500
                                &&
                                <section className="popUpForm">
                                    <section className='closePopUp'>
                                        <span className='closePopUpSpan hoverSecundarioIcono' onClick={() => handleAfterDel()}>
                                            <AiIcons.AiOutlineCloseCircle size={25} />
                                        </span>
                                    </section>
                                    <p>{i18n[language].accountMisArchivosErrorEliminar}</p>
                                </section>
                        }
                    </div>
                }
            </section>
        </>
    )
}