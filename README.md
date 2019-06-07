# Rehaciendo tu red social con React
## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
* [4. Avance esperado del proyecto](#4-avance-esperado-del-proyecto)
* [5. Entrega](#5-entrega)
* [6. Pistas, tips y lecturas complementarias](#6-pistas-tips-y-lecturas-complementarias)

***

## 1. Preámbulo

[React](https://reactjs.org/), [Angular](https://angular.io/) y [Vue](https://vuejs.org/)
son algunos de los _frameworks_ y _librerías_ de JavaScript más utilizados por
lxs desarrolladorxs alrededor del mundo, y hay una razón para eso.
En el contexto del navegador, [_mantener la interfaz sincronizada con el estado
es difícil_](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445).
Al elegir un _framework_ o _librería_ para nuestra interfaz, nos apoyamos en una
serie de convenciones e implementaciones _probadas_ y _documentadas_ para
resolver un problema común a toda interfaz web. Esto nos permite concentrarnos
mejor (dedicar más tiempo) en las caractrísticas _específicas_ de
nuestra aplicación.

Cuando elegimos una de estas tecnologías no solo importamos un pedacito de
código para reusarlo (lo cuál es un gran valor per se), si no que adoptamos una
**arquitectura**, una serie de **principios de diseño**, un **paradigma**, unas
**abstracciones**, un **vocabulario**, una **comunidad**, ...

Como desarrolladora Front-end, estos kits de desarrollo pueden resultarte
de gran ayuda para implementar rápidamente características de los proyectos en
los que trabajes.

![caracoles](http://www.animated-photography.com/images/portfolio/full/Evolution.jpg)

## 2. Resumen del proyecto

En este proyecto tendrás la oportunidad de _re-escribir_ tu anterior proyecto de
la _Red Social_, pero esta vez usando _React_.

Creemos que la mejor manera de enfrentarte a estas herramientas es
eliminando de la ecuación el hecho de que tengas que entender un proyecto desde
cero, su alcance, sus particularidades, el flujo, las validaciones, etc.

## 3. Objetivos de aprendizaje

El objetivo principal de aprendizaje es reforzar el desarrollo web
usando _React_, y todo lo que ello conlleva:
**documentación**, **arquitectura**, **principios de diseño**, **paradigma**,
**abstracciones**, **vocabulario**, **herramientas**, **comunidad**, ...

Por otro lado, tener que _re-escribir_ un programa es una experiencia de
aprendizaje muy valiosa en sí misma, llevándonos a re-evaluar e iterar sobre
un producto o prototipo. Dada la velocidad a la que evoluciona la tecnología
web, es muy común tener que enfrentarse a este tipo de escenario donde decidimos
(o alguien decide por nosotros) que lo mejor para seguir evolucionando una
aplicación es re-escribirla usando una nueva tecnología.


## 4. Avance esperado del proyecto

### 4.1 Implementación de Interfaz (UI)

La interfaz debe permitir lo siguiente:

#### Creación de cuenta de usuario e inicio de sesión

* Login con Firebase:
  - Para el login y las publicaciones en el muro puedes utilizar [Firebase](https://firebase.google.com/products/database/)
  - Autenticación con Facebook y/o Google y/o Email.
* Validaciones:
  - No pueden haber usuarios repetidos.
  - La cuenta de usuario debe ser un correo electrónico válido.
  - Lo que se escriba en el campo (_input_) de contraseña debe ser secreto.
* Comportamiento:
  - Al enviarse un formulario de registro o inicio de sesión, debe validarse.
  - En caso haya errores, el sistema debe mostrar mensajes de error para
    ayudar al usuario a corregirlos.
  - La aplicación solo permitirá el acceso a usuarios con cuentas válidas.
  - Al recargar la aplicación, se debe verificar si el usuario está
    logueado antes de mostrarle el contenido privado.
* Perspectiva de interfaz:

  ![Login](https://user-images.githubusercontent.com/9284690/40994765-c3cf9602-68c2-11e8-89ac-8254859b5ebb.png)

#### Muro/timeline de la red social

* Validaciones:
  - Al apretar el botón de publicar, debe validar que exista contenido en el input.
* Comportamiento:
  - Poder publicar un post.
  - Poder poner like a una publicación.
  - Llevar un conteo de los likes.
  - Poder eliminar un post específico.
  - Poder filtrar los posts sólo para mis amigos y para todo público.
  - Pedir confirmación antes de eliminar un post.
  - Al darle click en el botón editar, debe cambiar el texto por un input que
    permita editar el texto y cambiar el link por guardar.
  - Al darle guardar debe cambiar de vuelta a un texto normal pero con la
    información editada.
  - Al recargar la página debo de poder ver los textos editados
* Perspectiva de interfaz:

  ![Muro](https://user-images.githubusercontent.com/9284690/40994768-c52c3442-68c2-11e8-99a5-9e127e700dee.png)

#### Otras consideraciones

* La aplicación no debe dejar hacer publicaciones vacías de ningun tipo.
* El usuario debe poder agregar, editar y eliminar contenido de la red
  social.
* El usuario debe poder definir la privacidad de lo que pública.
* Al editar contenido, el contenido editado se verá automáticamente,
  inmediatamente después de guardar.
* Al recargar la página se deben poder ver los contenidos editados.

Personaliza estas guías con los colores y/o tipografías que creas convenientes.

## 5. Entrega

El proyecto será _entregado_ subiendo tu código a GitHub (`commit`/`push`) y la
interfaz será desplegada usando GitHub pages u otro servicio de hosting que
puedas haber encontrado en el camino.


## 6. Pistas, tips y lecturas complementarias

### React

* [React - docs oficiales](https://reactjs.org/)
* [React - tutorial](https://egghead.io/courses/the-beginner-s-guide-to-react)
* [create-react-app](https://github.com/facebook/create-react-app)
* [React js en español - tutorial básico, primeros pasos y ejemplos - frontendlabs.io](https://frontendlabs.io/3158--react-js-espanol-tutorial-basico-primeros-pasos-ejemplos)
