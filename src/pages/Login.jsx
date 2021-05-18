import { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect, useDispatch } from "react-redux"
import { login } from "../store/actions/userActions"




// class _Login extends Component {
export function Login({ history }) {

  const dispatch = useDispatch()

  const [errorMsg, setErrorMsg] = useState(false)
  const [credential, setCredential] = useState({
    nickName: '',
    password: ''
  })

  const handleChange = (ev) => {
    const { name, value, type, checked } = ev.target
    const val = (type !== 'checkbox') ? value : checked
    setCredential({ ...credential, [name]: val })
  }

  const doLoggin = async (ev) => {
    ev.preventDefault()
    const loggedUser = await dispatch(login(credential))
    if (!loggedUser) setErrorMsg(true), setCredential({ nickName: '', password: '' })
    else history.push(`/`)
  }

  // render() {
  return (
    <Container component="main" maxWidth="xs" >

      {errorMsg && <div>
          <h2>ERRORR</h2>
          <h2>ERRORR</h2>
      </div>}

      <CssBaseline />
      <div style={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar style={{
          margin: '10px',
          backgroundColor: 'blue',
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={doLoggin}
          style={{
            width: '100%',
            marginTop: '5px'
          }} noValidate>
          <TextField
            onChange={handleChange}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="nickName"
            label="nickName"
            name="nickName"
            autoFocus
            value ={credential.nickName}
            
          />
          <TextField
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value ={credential.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container >
  );
  // }

}
