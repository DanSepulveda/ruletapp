# Aplicación web RuletApp

Este proyecto ha sido desarrollado utilizando el stack MERN (React y Redux para frontend, Node y Express para backend y MongoDB para base de datos, usando Mongoose.)

## Descripción

La aplicación consiste en una simulación de apuestas en el juego de la ruleta. Participan varios jugadores, y sus apuestas son realizadas aleatoriamente en base a datos climáticos de la ciudad de Santiago, obtenidos a través de la API de AccuWeather.

## Deployment

Para ejecturar el projecto localmente, los pasos son los siguientes:

1. Clonar repositorio en una carpeta local.
2. Ejecutar `npm install` tanto en el directorio raíz, como dentro de la carpeta frontend.
3. Crear archivo `.env` y agregar la variable `MONGODB` con su respectivo valor para conectarlo a la BBDD
4. Ejecutar `npm start` tanto en el directorio raíz, como dentro de la carpeta frontend.
