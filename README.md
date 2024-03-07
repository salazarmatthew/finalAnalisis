# Implementación de Autenticación en una Aplicación React con Firebase.

Este es un proyecto de aplicación web construido con React y Firebase. La aplicación permite a los usuarios iniciar sesión y navegar a través de diferentes rutas dependiendo de su estado de autenticación.

## Características
-Autenticación de usuarios con Firebase.
-Redirección de usuarios autenticados a la página de inicio.
-Redirección de usuarios no autenticados a la página de inicio de sesión.
-Uso de React Router para gestionar las rutas de la aplicación.

## Tecnologías Utilizadas
-React: Una biblioteca de JavaScript para construir interfaces de usuario.
-Firebase: Una plataforma de desarrollo de aplicaciones que proporciona servicios de backend como una base de datos en tiempo real, autenticación, almacenamiento, etc.
-React Router: Una biblioteca para gestionar las rutas en aplicaciones React.

## Configuración de Firebase
Para configurar Firebase en tu aplicación, sigue estos pasos:

Ve a la consola de Firebase y crea un nuevo proyecto.

Una vez que tu proyecto esté creado, selecciona "Agregar Firebase a tu aplicación web". Esto te proporcionará un objeto de configuración que se parece a esto:

const firebaseConfig = {
  apiKey: "AIzaSyA...ZjwizlH1c",
  authDomain: "my-app.firebaseapp.com",
  projectId: "my-app",
  storageBucket: "my-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

## Instala Firebase en tu proyecto con npm install firebase.

En tu archivo fb.js, inicializa Firebase con la configuración que obtuviste:

import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyA...ZjwizlH1c",
  authDomain: "my-app.firebaseapp.com",
  projectId: "my-app",
  storageBucket: "my-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
});

export { app };

## Implementación de la Autenticación
La autenticación se implementa utilizando el servicio de autenticación de Firebase. En tu componente App, se utiliza app.auth().onAuthStateChanged() para escuchar los cambios en el estado de autenticación del usuario. Cuando un usuario inicia o cierra sesión, esta función se dispara y actualiza el estado usuario con el usuario actual.

En tu componente Logueo, puedes usar app.auth().signInWithEmailAndPassword(email, password) para iniciar sesión con un correo electrónico y una contraseña.


### `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abra [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

