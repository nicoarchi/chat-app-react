import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styles from './styles'
import { Link } from 'react-router-dom'
const firebase = require("firebase")

class LoginComponent extends Component {

    constructor() {
        super()
        this.state = {
            email: null,
            password: null,
            loginError: ""
        }
    }

    render() {

        const { classes } = this.props

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5' >Log In</Typography>

                    <form onSubmit={(e) => this.submitLogin(e)} className={classes.form}>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor='login-email-input'>Enter your email</InputLabel>
                            <Input autoComplete='email' onChange={(e) => this.userTyping('email', e)} id='login-email-input' autoFocus ></Input>
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor='login-password-input'>Enter your password</InputLabel>
                            <Input type='password' onChange={(e) => this.userTyping('password', e)} id='login-password-input'></Input>
                        </FormControl>

                        <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>
                    </form>

                    {
                        this.state.loginError ?
                            <Typography component='h5' variant='h6' className={classes.errorText}>
                                Incorrect login information.
                            </Typography>
                            : null
                    }

                    <Typography component='h5' variant='h6' className={classes.noAccountHeader}>Don't have an account?</Typography>
                    <Link className={classes.signUpLink} to='/signup'>Sign up</Link>

                </Paper>


            </main>
        )
    }


    userTyping = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({ email: e.target.value })
                break;
            case 'password':
                this.setState({ password: e.target.value })
                break;

            default:
                break;
        }
    }

    submitLogin = (e) => {
        e.preventDefault()

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('./dashboard')
            }, err => {
                this.setState({ loginError: "Server error" })
                console.log(err)
            })
    }
}

export default withStyles(styles)(LoginComponent)
