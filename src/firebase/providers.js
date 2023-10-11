import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { login, logout } from "../store/auth";

import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Proveedor de Google para la autenticación con Google.
const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google.
export const signInWithGoogle = async () => {
    try {
        // Iniciar sesión con la ventana emergente de Google.
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;

        // Devolver los detalles del usuario en caso de éxito.
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        };
    } catch (error) {
        // Manejar errores y devolver un objeto con detalles del error.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error Code: ${errorCode}, Message: ${errorMessage}`);
        return {
            ok: false,
            errorMessage
        };
    }
};

// Función para registrar un nuevo usuario con correo electrónico y contraseña.
export const registerUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
        try {
            // Crear un nuevo usuario con correo electrónico y contraseña.
            const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, photoURL } = res.user;

            // Actualizar el perfil del usuario con el nombre proporcionado.
            await updateProfile(FirebaseAuth.currentUser, { displayName });

            // Despachar la acción de inicio de sesión después de un registro exitoso.
            dispatch(login({ uid, displayName, email, photoURL }));

            // Devolver detalles del usuario en caso de éxito.
            return {
                ok: true,
                uid,
                photoURL,
                email,
                displayName,
            };
        } catch (error) {
            // Despachar la acción 'logout' en caso de un error.
            dispatch(logout({ errorMessage: error.message }));

            // Devolver detalles del error en caso de fallo.
            return {
                ok: false,
                errorMessage: error.message,
            };
        }
    };
};

// Función para iniciar sesión con correo electrónico y contraseña.
export const loginWithEmailPassword = (email, password) => {
    return async (dispatch) => {
        try {
            // Iniciar sesión con correo electrónico y contraseña.
            const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, photoURL, displayName } = res.user;

            // Despachar la acción de inicio de sesión después de un inicio de sesión exitoso.
            dispatch(login({ uid, displayName, email, photoURL }));

            // Devolver detalles del usuario en caso de éxito.
            return {
                ok: true,
                uid,
                photoURL,
                displayName,
            };
        } catch (error) {
            // Devolver detalles del error en caso de fallo.
            return {
                ok: false,
                errorMessage: error.message,
            };
        }
    };
};

// Función para cerrar sesión.
export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};
