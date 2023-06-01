const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST']
    }
});
const port = process.env.PORT || 3000;

var chats = []

app.get('/', (req, res) => {
    res.sendFile('<h1>Hola</h1>');
});

io.on('connection', (socket) => {

    console.log('Socket connected: ' + socket.id)

    // ========================================================================================
    // ESCUCHAMOS EN nuevoChat PARA CAMBIAR AL USUARIO DE SALA DE CHAT. CERRAMOS LAS CONEXIONES
    // ABIERTAS Y CREAMOS LA CONEXION CON LA SALA QUE DESEA CHATEAR
    socket.on('changeChat', (nuevoChat) => {

        // Obtener la lista de todas las salas a las que está conectado actualmente el socket
        const salasUsuario = socket.rooms

        // Desconectar al socket de todas las salas excepto la nueva sala a la que se va a unir
        salasUsuario.forEach((nombreSalaActual) => {
            if (nombreSalaActual !== socket.id && nombreSalaActual !== nuevoChat) {
                socket.leave(nombreSalaActual);
                console.log('Usuario: ' + socket.id + ' desconectado de sala: ' + nombreSalaActual)
            }
        });

        // Agregar al usuario a la nueva sala
        socket.join(nuevoChat);
        console.log('Usuario: ' + socket.id + ' conectado en la sala: ' + nuevoChat)
    });


    // ========================================================================================
    // SOCKET.ON RECIBIENDO MENSAJES EN SUPER Y ENVIANDO EN CHAT X
    socket.on('super', (info) => {

        console.log(info)
        var emiton = info.chatname + '_response'

        var tosend = { who: info.message.who, message: info.message.message, from: 'remote' }
        console.log(tosend)
        socket.broadcast.emit(emiton, tosend)
    });


    // ========================================================================================
    // SOCKET.ON RECIBIENDO AVISO DE CREACION DE NUEVO CHAT, REENVIA EL NUEVO CHAT A TODOS LOS SOCKET
    socket.on('newChat', (info) => {

        var tosend = { newChatName: info.chatName }
        socket.broadcast.emit('newChatCreation', tosend)
    });
});


http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
