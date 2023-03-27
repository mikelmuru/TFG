# PROYECTO FINAL - CLOUD NATIVE


## RESUMEN DEL PROYECTO

La idea principal del proyecto se basa en una aplicación web, con una funcionalidad principal, compartir de manera pública apuntes y exámenes resueltos de los diferentes grados que ofrece el centro Somorrostro.

Por otro lado, esta aplicación web dispondrá también de más opciones para el usuario, entre ellas un chatbot asistido por IA, un foro donde podrán interactuar entre ellos o un generador de imágenes, también asistido por IA. Todo esto estará disponible en más de un idioma, con el objetivo de que cualquier persona pueda utilizar la información que proporcionaremos.

Cada usuario tendrá su propia cuenta, y un registro tanto de las conversaciones con el chatbot, en caso de que desee guardarlas para más adelante revisarlas; como de las imágenes generadas.

El objetivo final de esta aplicación es interconectar a diferentes estudiantes del centro y de fuera del centro para entre todos poder compartir información sobre diferentes temas o apuntes de asignaturas, y resolver dudas en el foro, además de poder acceder a exámenes resultados que nosotros mismo proporcionaremos.


## ARQUITECTURA

La arquitectura de nuestra aplicación dispondrá de un servidor de AWS, una base de datos S3, para la persistencia de las imágenes generadas por los usuarios, y un servidor local (el portátil de uno de los integrantes del equipo).

En este servidor local montaremos tanto los microservicios como la página web como una base de datos para la persistencia de los datos de los usuarios y demás datos de la aplicación. Por un lado, en el back-end, tendremos varios microservicios.

El micro principal, será el encargado de gestionar los repositorios de nuestra aplicación y de implementar la mayor parte de la lógica de negocio. En esta lógica de negocio, entran las peticiones relacionadas a los diferentes archivos disponibles en la web, tanto como exámenes, apuntes o incluso temarios enteros; por otro lado, también gestionará las conversaciones que se desarrollen en el foro entre los usuarios. Además de esto, este micro nos servirá como conexión o puente a la hora de hacer peticiones a otros microservicios, como el del chatbot o el generador de imágenes.

Los microservicios encargados de gestionar el chatbot y la generación de imágenes serán muy similares. Serán servicios muy sencillos, donde se recibirá un prompt especificando aquello que el usuario esté pidiendo, y una petición a una API externa donde la IA resolverá este prompt. En ambos casos esta API nos la proporciona OpenAI.


## FUNCIONALIDADES

Entre las funcionalidades de nuestra web se encuentran:

#### Acceso a exámenes
Esta es la funcionalidad principal y la que motiva este proyecto. Nuestro objetivo es que los alumnos de los diferentes grados tengan acceso a exámenes resueltos de años anteriores, dándoles de esta manera una gran ayuda a la hora de estudiar.

Posibilidad de compartir conocimiento
Los usuarios podrán compartir con el resto toda la información que quieran compartir. Desde nuestro equipo, queremos, además de proporcionar ayuda nosotros mismos, impulsar la comunicación entre alumnos y que entre ellos puedan ayudarse también. Por eso, tendrán la oportunidad de compartir sus apuntes con el resto de usuarios, o  resolverse dudas mutuamente.

#### El foro
Un apartado de la página con un funcionamiento muy sencillo. Un usuario añade una duda en el foro, abriendo así una conversación donde los demás usuarios podrán interactuar. Los usuarios que crean poder ayudar tendrán la oportunidad de responder y así entre todos resolver dudas de cualquier ámbito.

#### Chabot inteligente
La página incluye un chatbot, donde los usuarios podrán consultar dudas sobre cualquier ámbito académico. Este chatbot estará soportado por una IA, concretamente, de la API de OpenAI, utilizaremos la parte de gpt-3, un modelo de lenguaje capaz de interactuar con un humano con una alta coherencia y resolviendo dudas de varios tipos.

#### Generación de imágenes
Por último, añadiremos un apartado, donde los usuarios a partir de una simple línea de texto podrán generar imágenes de alta calidad. Esta funcionalidad también está soportada con una IA de la API de OpenAI. En este caso, utilizamos la parte de generación de imágenes (generations). Esto dará visibilidad a la gran capacidad que están demostrando tener los últimos modelos de inteligencia artificial que están saliendo al mercado, y de esta manera se impulsará su desarrollo.

#### Internacionalización
Cada vez más alumnos viajan por el mundo realizando todo tipo de estudios: formación profesional, universidad… Por ello, hemos decidido que una de las funcionalidades más importantes que debe de tener nuestra página era la de disponer de la información en varios idiomas, para así facilitar la usabilidad de la misma. En principio solo estará disponible en Castellano e Inglés, una lista de idiomas que aumentará con el tiempo.


## TECNOLOGÍAS

De cara a las tecnologías que vamos a utilizar, como base del proyecto utilizaremos Java con Spring Boot para el desarrollo de los microservicios y Angular con TypeScript para el desarrollo de la web.

Con Spring Boot desarrollaremos la gran mayoría del back-end, incluyendo la lógica de negocio, la gestión de las bases de datos y la seguridad. Utilizaremos adicionalmente dependencias externas para funciones concretas, como JWT para la gestión de tokens para securizar la aplicación.

En cuanto a la parte de Angular, además de todo lo que el framework ofrece ya de por sí, implementaremos componentes de Angular Material, una librería que ofrece una gran cantidad de elementos para mejorar la usabilidad de la página y la experiencia del usuario. También trabajaremos con hojas de estilos CSS para estilizar la web y que a simple vista se vean los colores y la estética de la empresa.

Para la persistencia de los datos, utilizaremos en paralelo una base de datos PostgreSQL y un bucket S3.
En el PostgreSQL guardaremos toda la información relacionada a los usuarios, por un lado, los propios usuarios, y por otro lado información que podrán ir generando como conversaciones con el chatbot.
En el bucket de S3, guardaremos archivos más grandes, como las imágenes que los usuarios pueden generar o archivos de información como apuntes o exámenes. Estas imágenes estarán referenciadas en PostgreSQL, ahí entra el funcionamiento en paralelo.

Además de esto, crearemos pequeños scripts en Python para acciones concretas.
