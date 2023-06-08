import { useContext, useState } from "react";
import * as MdIcons from 'react-icons/md'
import { I18nContext } from "../context/I18nContext";


export default function HandleLanguage() {

    const { language, i18n, setLanguage } = useContext(I18nContext);

    const [allLanguages, setAllLanguages] = useState(false)

    const showLanguages = () => {
        setAllLanguages(!allLanguages)
    }

    const handleLanguage = (language) => {
        setLanguage(language)
    }

    return (
        <>
            <article className="languages">
                <MdIcons.MdOutlineLanguage
                    size={20}
                    onClick={() => showLanguages()}
                    className="clickable langIcon"
                />
                {
                    allLanguages
                    &&
                    <section className="allLanguages">
                        <span
                            onClick={() => handleLanguage('en')}
                            className="clickable langOpt"
                        >
                            EN
                        </span>
                        <span
                            onClick={() => handleLanguage('eu')}
                            className="clickable langOpt"
                        >
                            EU
                        </span>
                        <span
                            onClick={() => handleLanguage('es')}
                            className="clickable langOpt"
                        >
                            ES
                        </span>
                    </section>
                }
            </article>
        </>
    )
}