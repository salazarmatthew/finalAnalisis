import React, { useState, useEffect } from "react";
import { app } from "./fb";
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc, onSnapshot} from 'firebase/firestore'
import { db } from "./fb";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './App.css';
import './Logueo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import loginObservable from './LoginObs';

const MySwal = withReactContent(Swal)

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState( [] )
  const productsCollection = collection(db, "products")


  useEffect(() => {
    const currentUser = app.auth().currentUser;
    if (currentUser) {
      setUser(currentUser.email);
    }
  }, []);



  const cerrarSesion = () => {
    app.auth().signOut();
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id)
    await deleteDoc(productDoc)
    // Remove the call to getProducts
  }

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        deleteProduct(id)               
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })    
  }

  const [loggedIn, setIsLoggedIn] = useState(false);

  const onLoginStateChanged = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
    console.log('Login state changed in Body', isLoggedIn);
  };


  useEffect(() => {
    const currentUser = app.auth().currentUser;
    if (currentUser) {
      setUser(currentUser.email);
    }
  }, []);
  useEffect(() => {
    const unsubscribe = app.auth().onAuthStateChanged((user) => {
      if (user) {
        // El usuario ha iniciado sesión
        setUser(user.email);
        loginObservable.notify(true);
      } else {
        // El usuario ha cerrado sesión
        setUser(null);
        loginObservable.notify(false);
      }
    });
  
    return unsubscribe;
  }, []);



  useEffect(() => {
    // Obtén los productos una vez al principio
    const getInitialProducts = async () => {
      const productSnapshot = await getDocs(productsCollection);
      setProducts(productSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInitialProducts();
  
    let unsubscribeFirestore = null;
  
    const subscriptionLogin = loginObservable.subscribe((isLoggedIn) => {
      onLoginStateChanged(isLoggedIn);
  
      // Si el usuario está suscrito, suscríbete a Firestore
      if (isLoggedIn) {
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
        }
        unsubscribeFirestore = onSnapshot(productsCollection, (snapshot) => {
          setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
      }
      // Si el usuario no está suscrito, cancela la suscripción a Firestore
      else if (unsubscribeFirestore) {
        unsubscribeFirestore();
        unsubscribeFirestore = null;
      }
    });
  
    // Cancela las suscripciones cuando el componente se desmonta
    return () => {
      if (subscriptionLogin) {
        subscriptionLogin.unsubscribe();
      }
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);

  return (
  <div>
    <div className='container'>
      <button className="myButton cerrarSesion" onClick={cerrarSesion}>Cerrar Sesión</button>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2 btlarge'>Create</Link>    
          </div>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td>{product.description}</td>
                  <td>{product.stock}</td>
                  <td>
                  {loggedIn ? (
                    <>
                      <Link to={`/edit/${product.id}`} className="btn btn-light"><FontAwesomeIcon icon={faPencilAlt} /></Link>
                      <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></button>
                    </>
                  ) : (
                    <div> No suscrito </div>
                  )}
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {loggedIn ? (
      <button
        onClick={() => {
          loginObservable.notify(false);
        }}
        className="myButton"
      >
        Desuscribirse
      </button>
    ) : (
      <button
        onClick={() => {
          loginObservable.notify(true);
        }}
        className="myButton"
      >
        Suscribirse
      </button>
    )}
  </div>
);

}
export default Home;