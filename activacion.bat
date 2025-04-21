@echo off
title INICIANDO SERVIDOR DE PELICULAS

:: Ir al directorio del proyecto
cd /d C:\Users\danil\Documents\proyecto pelicula

:: Iniciar el servidor Node.js
start cmd /k "node server.js"

:: Esperar un momento para que el servidor arranque
timeout /t 2 >nul

:: Ir al directorio de Ngrok
cd /d C:\Users\danil\Downloads\ngrok-v3-stable-windows-amd64

:: Iniciar Ngrok en el puerto 3000
start cmd /k "ngrok http 3000"
