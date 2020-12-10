# Aplicación web de búsqueda de series de TV

Este es el ejercicio de la **evaluación final del módulo 02 de Adalab**. El ejercicio consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite marcar y desmarcar las series como favoritas y guardarlas en localStorage. El ejercicio también tiene una parte de maquetación con HTML y Sass.

El desarrollo del ejercicio se ha llevado a cabo utilizando el Starter Kit de Adalab, creado en node y gulp. Se trata de una plantilla de proyecto con funcionalidades preinstaladas y preconfiguradas. Este Kit incluye un motor de plantillas HTML, el preprocesador SASS y un servidor local, además de otras herramientas como Gulp, que nos ayuda en la automatización de tareas.

## Demo

Para ver el resultado del desarrollo de la página web puedes visitar el siguiente enlace: https://crisgarm.github.io/series-finder/

## Desarrollo

### 1. Estructura básica:

La aplicación de búsqueda de series consta de varias partes:

- Una cabecera.
- Un campo de texto y un botón para buscar series por su título.
- Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

### 2. Búsqueda:

- En primer lugar, la aplicación recoge el término de búsqueda de la usuaria y hace una peticición a la [API de TVMaze para búsqueda de series](http://www.tvmaze.com/api#show-search).
- Por cada show contenido en el resultado de la búsqueda se pinta una tarjeta donde mostramos una imagen de la serie y el título.
- Algunas de las series que devuelve la API no tienen imagen. En ese caso mostramos una imagen por defecto.
- Para pintar la información en la página hemos elegido hacerlo manipulando de forma avanzada el DOM.

### 3. Favoritos:

Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son sus series favoritas. Para ello, al hacer clic sobre una serie pasa lo siguiente:

- El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
- En la parte izquierda de la pantalla se muestra el listado con las series favoritas.
- Las series favoritas siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda.

### 4. Almacenamiento local:

El listado de favoritos se almacena en el localStorage. De esta forma, al recargar la página la series favoritas se siguen mostrando.

## Instalación

Para poder usar este proyecto tienes que seguir estos pasos:

- Clonar el repositorio
- Instalar las dependencias con `npm install`
- Arrancar el proyecto con `npm start`

Este proyecto ha sido desarrollado por **Cristina García Martín**.
