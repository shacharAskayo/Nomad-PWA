import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { connect } from 'react-redux';
import { login, signUp } from '../store/actions/userActions';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { cloudinaryService } from '../services/cloudinaryService';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function _SignUp(props) {

    const classes = useStyles();

    const [cred, setCred] = useState({ firstName: '', lastName: '', nickName: '', email: '', password: '', profileImg: '' })


    const uploadImg = async (ev) => {
        const img = ev.target.files[0]
        const uploadedImg = await cloudinaryService.uploadImg(img)
        if(uploadedImg) setCred({ ...cred, profileImg:uploadedImg.secure_url})
    }
    const onSignUp = async (ev) => {
        ev.preventDefault()
        const copyCred = JSON.parse(JSON.stringify(cred))
        await props.signUp(copyCred)
        const loggedUser = await props.login({ nickName: copyCred.nickName, password: copyCred.password })
        if (loggedUser) props.history.push(`/`)
    }


    const handleChange = ({ target }) => {
        const { name, value } = target
        setCred({ ...cred, [name]: value })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} onSubmit={onSignUp} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleChange}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="nickName"
                                label="NickName"
                                name="nickName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <label htmlFor="img-icon" style={{cursor:'pointer' , display:'flex', alignItems:'center'}}>
                            <PhotoLibraryIcon />
                            <span> Set Profile Img</span>
                            <input style={{ display: 'none' }} className="img-input" type="file" id="img-icon" onChange={uploadImg} />
                        </label>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignUp}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#/login" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    )
}


const mapGlobalStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    signUp,
    login
}
export const SignUp = connect(mapGlobalStateToProps, mapDispatchToProps)(_SignUp)