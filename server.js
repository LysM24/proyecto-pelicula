const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const salas = {}; // Guarda el socket ID del anfitrión por sala

// Servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Conexión de sockets
io.on('connection', (socket) => {
  console.log('💬 Usuario conectado');

  // Unirse a una sala
  socket.on('unirseSala', (sala) => {
    socket.join(sala);
    socket.salaActual = sala;

    // Asignar anfitrión si no hay uno
    if (!salas[sala]) {
      salas[sala] = socket.id;
      socket.emit('asignadoAnfitrion');
      console.log(`🎬 Anfitrión asignado para la sala: ${sala}`);
    }

    console.log(`🔗 Usuario unido a sala: ${sala}`);
  });

  // Reproducir video (solo anfitrión puede emitir)
  socket.on('reproducir', (url) => {
    const sala = socket.salaActual;
    if (salas[sala] === socket.id) {
      io.to(sala).emit('reproducir', url);
      console.log(`▶ Reproducción emitida en sala: ${sala}`);
    }
  });

  // Pausar video (solo anfitrión)
  socket.on('pausar', () => {
    const sala = socket.salaActual;
    if (salas[sala] === socket.id) {
      io.to(sala).emit('pausar');
      console.log(`⏸ Pausa emitida en sala: ${sala}`);
    }
  });

  // Sincronizar tiempo de reproducción (solo anfitrión)
  socket.on('sync', (tiempo) => {
    const sala = socket.salaActual;
    if (salas[sala] === socket.id) {
      socket.to(sala).emit('sync', tiempo);
      // console.log(`⏱ Sync: ${tiempo}s en sala: ${sala}`);
    }
  });

  // Mensajes de chat
  socket.on('chat message', (msg) => {
    const sala = socket.salaActual;
    io.to(sala).emit('chat message', msg);
    console.log(`💬 Mensaje en sala ${sala}: ${msg}`);
  });

  // Desconexión del usuario
  socket.on('disconnect', () => {
    const sala = socket.salaActual;

    // Si el anfitrión se desconecta, se libera el rol
    if (sala && salas[sala] === socket.id) {
      delete salas[sala];
      console.log(`🚫 Anfitrión salió de la sala: ${sala}`);
    }

    console.log('⛔ Usuario desconectado');
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
