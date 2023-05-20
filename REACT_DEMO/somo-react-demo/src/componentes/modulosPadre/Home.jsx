import { useEffect } from "react";
import { useLocalStorage } from "../../custom-hooks/useLocalStorage";
import { Header } from "../../utils/Header";

export function Home() {

    const MODULO = 'home'

    const [modulo, setModulo] = useLocalStorage('modulo',MODULO)

    useEffect(() => {
        setModulo(MODULO)
    }, [MODULO])

    return (
        <>
            <Header title={'Home'} />
            <div className="moduloContent">
                <p style={{fontSize:'12px'}}>(Bienvenida escrita por ChatGPT)</p>
                <p>
                    ¡Te damos una calurosa bienvenida al portal Somorrostro para estudiantes!
                    <br /><br />
                    Nuestro sitio web es el lugar perfecto para que puedas encontrar todo lo que necesitas para complementar tus estudios en el centro escolar Somorrostro. Aquí podrás acceder a una amplia variedad de recursos educativos, que incluyen exámenes de cualquier asignatura de cualquier grado profesional y apuntes subidos por otros estudiantes.
                    <br /><br />
                    Además, contamos con una sección de foro donde los estudiantes pueden conectarse para intercambiar ideas y resolver dudas. En este espacio, podrás interactuar con tus compañeros de clase y colaborar para abordar los temas que te interesan. La sección de foro también es una excelente manera de mantenerte al día con las últimas noticias y tendencias en el mundo de la educación.
                    <br /><br />
                    Además de nuestros recursos educativos, en Somorrostro también tenemos una sección dedicada a la inteligencia artificial (IA), donde podrás interactuar con diferentes IAs, como ChatGpt o DALL E. Estas IAs están diseñadas para ayudarte a mejorar tus habilidades en áreas como la escritura, la resolución de problemas y la creatividad. ¡Incluso podrías encontrar inspiración para tu próximo proyecto escolar!
                    <br /><br />
                    En Somorrostro, nuestra misión es ayudarte a alcanzar tus objetivos educativos y hacer que el proceso de aprendizaje sea lo más divertido y efectivo posible. Estamos comprometidos en brindarte la mejor experiencia educativa posible, por lo que si tienes alguna sugerencia o comentario, no dudes en hacérnoslo saber.
                    <br /><br />
                    Gracias por unirte a la comunidad Somorrostro. ¡Esperamos que encuentres todo lo que necesitas aquí para tener éxito en tus estudios!
                </p>
            </div>
        </>
    )
}