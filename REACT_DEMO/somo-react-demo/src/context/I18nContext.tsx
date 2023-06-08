import React, { createContext, useState, ReactNode } from 'react'

export type Language = 'es' | 'eu' | 'en'

export interface I18nContextType {
    language: Language
    setLanguage: (language:Language) => void
    i18n: {
        [key in Language]: {
            logout: string,

            menuHome: string,
            menuExamenes: string,
            menuApuntes: string,
            menuForo: string,
            menuIAs: string,
            menuMyAccount: string,

            homeHeaderTitle: string,
            homeTextChatGPT: string,
            homeTextP1: string,
            homeTextP2: string,
            homeTextP3: string,
            homeTextP4: string,
            homeTextP5: string,
            homeTextP6: string,
        }
    }
}

const i18n: I18nContextType['i18n'] = {
    es: {
        logout: 'Cerrar Sesion',

        menuHome: 'Inicio',
        menuExamenes: 'Examenes',
        menuApuntes: 'Apuntes',
        menuForo: 'Foro',
        menuIAs: 'IAs',
        menuMyAccount: 'Mi Cuenta',

        homeHeaderTitle: 'Inicio',
        homeTextChatGPT: '(Bienvenida escrita por ChatGPT)',
        homeTextP1: '¡Te damos una calurosa bienvenida al portal Somorrostro para estudiantes!',
        homeTextP2: 'Nuestro sitio web es el lugar perfecto para que puedas encontrar todo lo que necesitas para complementar tus estudios en el centro escolar Somorrostro. Aquí podrás acceder a una amplia variedad de recursos educativos, que incluyen exámenes de cualquier asignatura de cualquier grado profesional y apuntes subidos por otros estudiantes.',
        homeTextP3: 'Además, contamos con una sección de foro donde los estudiantes pueden conectarse para intercambiar ideas y resolver dudas. En este espacio, podrás interactuar con tus compañeros de clase y colaborar para abordar los temas que te interesan. La sección de foro también es una excelente manera de mantenerte al día con las últimas noticias y tendencias en el mundo de la educación.',
        homeTextP4: 'Además de nuestros recursos educativos, en Somorrostro también tenemos una sección dedicada a la inteligencia artificial (IA), donde podrás interactuar con diferentes IAs, como ChatGpt o DALL E. Estas IAs están diseñadas para ayudarte a mejorar tus habilidades en áreas como la escritura, la resolución de problemas y la creatividad. ¡Incluso podrías encontrar inspiración para tu próximo proyecto escolar!',
        homeTextP5: 'En Somorrostro, nuestra misión es ayudarte a alcanzar tus objetivos educativos y hacer que el proceso de aprendizaje sea lo más divertido y efectivo posible. Estamos comprometidos en brindarte la mejor experiencia educativa posible, por lo que si tienes alguna sugerencia o comentario, no dudes en hacérnoslo saber.',
        homeTextP6: 'Gracias por unirte a la comunidad Somorrostro. ¡Esperamos que encuentres todo lo que necesitas aquí para tener éxito en tus estudios!'
    },
    eu: {
        logout: 'Saioa Itxi',

        menuHome: 'Hasiera',
        menuExamenes: 'Azterketak',
        menuApuntes: 'Apunteak',
        menuForo: 'Foroa',
        menuIAs: 'IAk',
        menuMyAccount: 'Nire profila',

        homeHeaderTitle: 'Hasiera',
        homeTextChatGPT: '(Welcome written by ChatGPT)',
        homeTextP1: 'Ongi etorria ematen dizuegu ikasleentzako Somorrostro atarian!',
        homeTextP2: 'Gure webgunea leku ezin hobea da Somorrostro ikastetxean zure ikasketak osatzeko behar duzun guztia aurki dezazun. Hemen hezkuntza-baliabide ugari eskuratu ahal izango dituzu, edozein lanbide-mailatako edozein ikasgairen azterketak eta beste ikasle batzuek igotako apunteak barne.',
        homeTextP3: 'Gainera, foro-atal bat dugu, ikasleek ideiak trukatzeko eta zalantzak argitzeko aukera izan dezaten. Gune honetan, ikaskideekin elkarreragin ahal izango duzu eta interesatzen zaizkizun gaiak lantzen lagundu ahal izango duzu. Foroaren atala, halaber, hezkuntza munduko azken albiste eta joerekin eguneratuta egoteko modu bikaina da.',
        homeTextP4: 'Gure hezkuntza-baliabideez gain, Somorrostron adimen artifizialari (IA) buruzko atal bat ere badugu. Bertan, hainbat AArekin (ChatGpt edo DALL E.) interakzioan jardun ahal izango duzu. Zure hurrengo eskola-proiekturako inspirazioa ere aurki zenezake!',
        homeTextP5: 'Somorrostron, gure egitekoa da zure hezkuntza-helburuak lortzen laguntzea eta ikaskuntza-prozesua ahalik eta dibertigarriena eta eraginkorrena izatea. Ahalik eta hezkuntza-esperientziarik onena eskaintzeko konpromisoa hartu dugu; beraz, iradokizunen bat edo iruzkinen bat baduzu, jakinarazi iezaguzu.',
        homeTextP6: 'Eskerrik asko Somorrostro komunitatean sartzeagatik. Espero dugu hemen behar duzun guztia aurkituko duzula zure ikasketetan arrakasta izateko!'
    },
    en: {
        logout: 'Log Out',

        menuHome: 'Home',
        menuExamenes: 'Exams',
        menuApuntes: 'Notes',
        menuForo: 'Forum',
        menuIAs: 'IA',
        menuMyAccount: 'My Account',

        homeHeaderTitle: 'Home',
        homeTextChatGPT: '(Welcome written by ChatGPT)',
        homeTextP1: 'We warmly welcome you to the Somorrostro portal for students!',
        homeTextP2: 'Our website is the perfect place for you to find everything you need to complement your studies at Somorrostro School. Here you will be able to access a wide variety of educational resources, including exams for any subject of any professional degree and notes uploaded by other students.',
        homeTextP3: 'In addition, we have a forum section where students can connect to exchange ideas and resolve doubts. In this space, you will be able to interact with your classmates and collaborate to address the topics that interest you. The forum section is also a great way to keep up to date with the latest news and trends in the world of education.',
        homeTextP4: 'In addition to our educational resources, in Somorrostro we also have a section dedicated to artificial intelligence (AI), where you can interact with different AIs, such as ChatGpt or DALL E. These AIs are designed to help you improve your skills in areas such as writing, problem solving and creativity - you might even find inspiration for your next school project!',
        homeTextP5: 'At Somorrostro, our mission is to help you achieve your educational goals and make the learning process as fun and effective as possible. We are committed to providing you with the best educational experience possible, so if you have any suggestions or comments, please let us know.',
        homeTextP6: 'Thank you for joining the Somorrostro community - we hope you find everything you need here to succeed in your studies!'
    }
}

export const I18nContext = createContext<I18nContextType>({
    language: 'es',
    setLanguage: () => {},
    i18n: i18n
})

interface I18nProviderProps {
    children: ReactNode
}

export const I18nProvider = ({children}: I18nProviderProps) => {
    const [language, setLanguage] = useState((navigator.language.slice(0,2) as Language) || 'en')

    return (
        <I18nContext.Provider value={{language, setLanguage, i18n}}>
            {children}
        </I18nContext.Provider>
    )
}