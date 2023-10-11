import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startGoogleSignIn } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { loginWithEmailPassword } from "../../firebase/providers";


//! Este código representa el inicio de sesión usando Material-UI, Redux y Firebase.

// Creación de un objeto formData para almacenar los valores del formulario.
const formData = { email: '', password: '' }

export const LoginPage = () => {

  // Selecciona el estado de autenticación desde Redux.
  const { status, errorMessage } = useSelector(state => state.auth)
  
  const dispatch = useDispatch()
  
  // Extraer funciones y datos del formulario personalizado.
  const { email, password, onInputChange, onResetForm } = useForm(formData)

  // Usa useMemo para determinar si el estado es "Checking" (Osea, si esta autenticándose).
  const isAuthenticating = useMemo(() => status === 'Checking', [status])

  const onSubmit = (e) => {
    e.preventDefault()
    
    // Despachar la acción de inicio de sesión con correo y contraseña.
    dispatch(loginWithEmailPassword(email, password))
    
    // Limpiar el formulario después del envío.
    onResetForm()
  }

  // Función que maneja la autenticación con Google.
  function onGoogleSignIn() {
    // Despachar la acción para iniciar sesión con Google.
    dispatch(startGoogleSignIn())
  }

  return (
    <>
      <AuthLayout title="Login">
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            {/* Campos de entrada para correo y contraseña */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Clave"
                type="password"
                placeholder="Clave"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            {/* Sección de mensaje de error */}
            <Grid container display={!!errorMessage ? '' : 'none'} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>

            {/* Botones de inicio de sesión y Google */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button disabled={isAuthenticating} variant="contained" fullWidth onClick={onGoogleSignIn}>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            {/* Enlace para crear una cuenta */}
            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Create a Account
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
