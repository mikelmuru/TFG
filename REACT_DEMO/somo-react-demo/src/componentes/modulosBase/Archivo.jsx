import React, { useEffect, useState } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs'
import { AiOutlineCloseCircle, AiOutlineCloudDownload } from 'react-icons/ai'
import '../../css/archivo.css'
import * as s3Service from '../../servicios/s3Service'
import { readLocalStorageNoRender } from '../../custom-hooks/useLocalStorage';

export function Archivo({ archivo, handleClose }) {
    console.log('Cargado Archivo')

    const [descargable, setDescargable] = useState(null)

    const date = new Date(archivo.fecha)
    const jwtToken = readLocalStorageNoRender('user')

    const getS3File = async () => {
        const response = await s3Service.getFile(jwtToken.access_token, archivo.cod)

        if (response.data) {
            const blob = new Blob([response.data?.bytes])
            const url = URL.createObjectURL(blob)

            setDescargable({ 'blob': blob, 'url': url })
        }

    }

    useEffect(() => {
        getS3File()
    }, [])

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
                    {archivo.cod}
                </p>

                <section className='archivoInfo'>
                    <span className='archivoInfoDato'>
                        {archivo.autor}
                    </span>
                    <span className='archivoInfoDato'>
                        {`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}
                    </span>
                    <span className='archivoInfoDato'>
                        {archivo.asignaturaNombre}
                    </span>
                </section>

                <article className='archivoDownloadContainer'>
                    <a
                        href={descargable?.url}
                        download={archivo.cod}
                        target='_blank'
                        type='application/pdf'
                        className='descargableLink'
                    >
                        <AiOutlineCloudDownload size={60} className='archivoDownloadIcon' />
                    </a>
                </article>
            </div>
        </>
    );
}
