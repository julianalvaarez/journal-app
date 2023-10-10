import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { login, logout } from "../store/auth";

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const user = result.user
        const {displayName, email, photoURL, uid} = user

        return {
            ok: true,
            // UserInfo
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`Numero de error: ${errorCode}, Error: ${errorMessage}`);
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {
      try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = res.user;
        await updateProfile(FirebaseAuth.currentUser, { displayName });
        
        // Despacha la acción 'login' después de un registro exitoso
        dispatch(login({ uid, displayName, email, photoURL }));
        
        return {
          ok: true,
          uid,
          photoURL,
          email,
          displayName,
        };
      } catch (error) {
        // Despacha la acción 'logout' en caso de un error
        dispatch(logout({ errorMessage: error.message }));
        
        return {
          ok: false,
          errorMessage: error.message,
        };
      }
    };
  };

  export const loginWithEmailPassword = ( email, password ) => {
    return async (dispatch) => {
      try {
        // Intenta iniciar sesión con correo electrónico y contraseña
        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = res.user;
        console.log(res);
        
        // Despacha la acción 'login' después de un inicio de sesión exitoso
        dispatch(login({ uid, displayName, email, photoURL }));
        
        return {
          ok: true,
          uid,
          photoURL,
          displayName,
        };
      } catch (error) {  
        return {
          ok: false,
          errorMessage: error.message,
        };
      }
    };
  };

  export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
  }
  