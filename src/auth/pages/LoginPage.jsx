import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { loginWithEmailPassword } from "../../firebase/providers";


const formData = {email: '', password: ''}

export const LoginPage = () => {
  const {status, errorMessage} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const {email, password, onInputChange, onResetForm} = useForm(formData)

  const isAuthenticating = useMemo(() => status === 'Checking', [status])

  const onSubmit = (e) => {
    e.preventDefault(),
    dispatch(loginWithEmailPassword(email, password))
    console.log({email,password});
    onResetForm()
  }

  function onGoogleSignIn() {
    console.log('google');
    dispatch(startGoogleSignIn())
  }

  return (
    <>
      <AuthLayout title="Login">
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
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

            <Grid container display={!!errorMessage ? '' : 'none'} sx={{mt: 1}}>
              <Grid item xs={12} >
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>

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
