import React from 'react';
import { BsFileEarmarkText } from 'react-icons/bs'
import { AiOutlineCloseCircle, AiOutlineCloudDownload } from 'react-icons/ai'
import '../../css/archivo.css'
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';

export function Archivo({ archivo, handleClose }) {
    console.log('Cargado Archivo')

    const modulo = readLocalStorageNoRender('modulo')

    return (
        <>
            <div className='archivoContainer'>
                <section className='archivoHeader'>
                    <span onClick={() => handleClose(null)} className='archivoHeaderCloseBtn hoverSecundarioIcono'>
                        <AiOutlineCloseCircle size={20} className='archivoHeaderCloseBtnIcon' />
                    </span>
                    <article className='archivoHeaderIconContainer'>
                        <BsFileEarmarkText size={80} />
                    </article>
                </section>
                <p className='archivoTitle'>
                    {/* {archivo.cod} */}archivo.cod
                </p>

                <section className='archivoInfo'>
                    <span className='archivoInfoDato'>
                        {/* {archivo.autor} */}archivo.autor
                    </span>
                    <span className='archivoInfoDato'>
                        {/* {archivo.anio} */}archivo.año
                    </span>
                    <span className='archivoInfoDato'>
                        {archivo.asignatura}
                    </span>
                    {
                        modulo == 'examenes'
                            ?
                            <span className='archivoInfoDato'>
                                {/* {archivo.trimestre} */} archivo.trimestre
                            </span>
                            : null
                    }
                </section>

                <article className='archivoDownloadContainer'>
                    <AiOutlineCloudDownload size={60} className='archivoDownloadIcon' />
                </article>
            </div>
        </>
    );
}
