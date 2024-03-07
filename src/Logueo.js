import React from "react";
import { app } from "./fb";
import './Logueo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Logueo = (props) => {
  const [isRegistrando, setIsRegistrando] = React.useState(false);
  const [error, setError] = React.useState(null); // Nuevo estado para el error

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es correcto.';
      case 'auth/user-disabled':
        return 'Este usuario ha sido deshabilitado.';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con ese correo electrónico.';
      case 'auth/wrong-password':
        return 'La contraseña es incorrecta.';
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      default:
        return 'Credenciales inválidas.';
    }
  };
  

  const crearUsuario = (correo, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("usuario creado:", usuarioFirebase);
        props.setUsuario(usuarioFirebase);
      });
  };

  const iniciarSesion = (correo, password) => {
    app
      .auth()
      .signInWithEmailAndPassword(correo, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        props.setUsuario(usuarioFirebase);
      })
      .catch((error) => {
        setError(getErrorMessage(error.code)); 
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const correo = e.target.emailField.value;
    const password = e.target.passwordField.value;

    if (isRegistrando) {
      crearUsuario(correo, password);
    }

    if (!isRegistrando) {
      iniciarSesion(correo, password);
    }
  };

  return (
    <div className="form-container">
    <div className="Logueo">
    <h1> {isRegistrando ? "Regístrate" : "Inicia sesión"}</h1>
    <div class="icon-container">
  <i class="bi bi-person-vcard-fill custom-icon"></i>
</div>
    {error && <p className="error">{error}</p>}
    <form onSubmit={submitHandler}>
      <label htmlFor="emailField"> Correo </label>
      <input type="email" id="emailField" />
      <label htmlFor="passwordField"> Contraseña </label>
      <input type="password" id="passwordField" />
      <button type="submit">
        {" "}
        {isRegistrando ? "Regístrate" : "Inicia sesión"}{" "}
      </button>
    </form>
    <button className="button-toggle" onClick={() => setIsRegistrando(!isRegistrando)}>
  {isRegistrando
    ? "¿Ya tienes cuenta? ¡Inicia sesión"
    : "¿No tienes cuenta? ¡Regístrate gratis!"}
</button>
  </div>
  </div>
  );
};

export default Logueo;
