import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserWithEmailPassword } from "../../firebase/providers";

const formData = {email: 'pepe@gmail.com', password: '123456', displayName: 'Julian Alvarez'}
const formValidations = {
  email: [  (value) => value.includes('@')  , 'Email not valid.'],
  password: [  (value) => value.length >= 6  , 'Password must have 6 characters'],
  displayName: [  (value) => value.length >= 1  , 'Name is required.'],
}

export const RegisterPage = () => {
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, displayNameValid, emailValid, passwordValid, onInputChangeValid,
  } = useForm(formData, formValidations)

  function onSubmit(e) {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(registerUserWithEmailPassword(formState))
  }

  return (
    <>
      <AuthLayout title="Register">
        <h1>Form Valid {isFormValid ? 'Valido' : 'Incorrecto'}</h1>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Full Name"
                type="text"
                placeholder="Juan Perez"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={ !!displayNameValid && formSubmitted  }
                helperText={ displayNameValid }
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
                error={ !!emailValid && formSubmitted  }
                helperText={ emailValid }
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
                error={ !!passwordValid && formSubmitted  }
                helperText={ passwordValid }
              />
            </Grid>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'} sx={{ mt: 1}}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 2, ml: 0 }}>
              <Button variant="contained" type="submit" fullWidth disabled={isCheckingAuthentication}>
                  Register
                </Button>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{mr: 1}}>¿You Have a Account?</Typography>
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
