import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserWithEmailPassword } from "../../firebase/providers";

// Este código, representa la página de registro en React, utilizando Material-UI, Redux y Firebase.

// Objeto con datos predeterminados para el formulario.
const formData = { email: 'pepe@gmail.com', password: '123456', displayName: 'Julian Alvarez' }

// Validaciones para cada campo del formulario.
const formValidations = {
  email: [(value) => value.includes('@'), 'Email not valid.'],
  password: [(value) => value.length >= 6, 'Password must have 6 characters'],
  displayName: [(value) => value.length >= 1, 'Name is required.'],
}

export const RegisterPage = () => {
  const dispatch = useDispatch()

  // Estado para controlar si el formulario se ha enviado.
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Seleccionar el estado de autenticación desde Redux.
  const { status, errorMessage } = useSelector(state => state.auth)

  // Utilizar useMemo para determinar si el estado es "checking" (verificando autenticación).
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  // Extraer funciones y datos del formulario personalizado.
  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid, onInputChangeValid,
  } = useForm(formData, formValidations)

  function onSubmit(e) {
    e.preventDefault()
    setFormSubmitted(true)
    
    // Verificar si el formulario es válido antes de enviar la acción de registro.
    if (!isFormValid) return
    
    // Despachar la acción de registro con correo, contraseña y nombre.
    dispatch(registerUserWithEmailPassword(formState))
  }

  return (
    <>
      <AuthLayout title="Register">
        {/* Visualizar si el formulario es válido o no */}
        <h1>Form Valid {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            {/* Campos de entrada para nombre completo, correo y contraseña */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                type="text"
                placeholder="Juan Perez"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Mail"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="Password123"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

            {/* Sección de mensaje de error */}
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'} sx={{ mt: 1 }}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            {/* Botón de registro */}
            <Grid container spacing={2} sx={{ mb: 2, mt: 2, ml: 0 }}>
              <Button variant="contained" type="submit" fullWidth disabled={isCheckingAuthentication}>
                Register
              </Button>
            </Grid>

            {/* Enlace para redirigir a la página de inicio de sesión */}
            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1 }}>¿You Have a Account?</Typography>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};

