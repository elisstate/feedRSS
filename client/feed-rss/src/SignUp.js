import React, { useState } from 'react'
import { Box, Typography, Grid, TextField, Button, InputAdornment, IconButton, Divider} from '@material-ui/core'
import {AccountCircle, VpnKey} from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { useHistory } from "react-router-dom"

const SignUp = (props) => {

    const [username, setUserName] = useState([])
    const [password, setPassword] = useState([])
    const [password2, setPassword2] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [sourceError, setSourceError] = useState("")

    let history = useHistory()

    var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const cancelForm = () => {
        setErrorMessage("")
        props.setSignUpForm(false)
        setUserName("")
        setPassword("")
        setPassword2("")
        setSourceError("")
    }

    const checkEmail = (e) => {
        setUserName(e.target.value)
        if (e.target.value) {
            if (!emailRegex.test(e.target.value)) {
                setErrorMessage("Not a valid e-mail")
                setSourceError("email")
            } else {
                setErrorMessage("")
                setSourceError("")
            }
        } else {
            setErrorMessage("")
            setSourceError("")
        }

    }

    const checkPassword = (e) =>  {
        setPassword(e.target.value)
        if (e.target.value) {
            if (!passRegex.test(e.target.value)) {
                setErrorMessage("Password must contain at least 8 characters, 1 number, 1 capital letter & 1 lowercase letter")
                setSourceError("pass")
            } else {
                setErrorMessage("")
                setSourceError("")
            }
        } else {
            setErrorMessage("")
            setSourceError("")
        }
    }

    const confirmPassword = (e) => {
        setPassword2(e.target.value)

        if (e.target.value !== password) {
            setErrorMessage("The passwords do not match")
            setSourceError("pass2")
        } else {
            setErrorMessage("")
            setSourceError("")
        }
    }

    const loginAction = () => {
        axios.post('/api/user/create', {body: {email: username, pass: password}}).then(res => {
            cancelForm()
            props.setSnackbar(res.data.message)

        }).catch((err, ras) => {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message ? err.response.data.message : err.response.data)
            }
        })
    }

    return (

        <Dialog open={props.open} onClose={cancelForm}>
            <DialogTitle style={{textAlign: 'center', maxWidth: '300px'}}>
                Please introduce your e-mail and a password
                <Divider orientation="horizontal" />
            </DialogTitle>
            <DialogContent>
                    <Grid direction="column" justify="space-between" spacing={4}>
                        <Grid item xs={12} style={{margin: '20px'}}>
                            <TextField
                                variant="outlined"
                                onChange={checkEmail}
                                value={username}
                                error={sourceError === 'email'}
                                placeholder="E-mail"
                                InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                      >
                                        <AccountCircle />
                                      </IconButton>
                                    </InputAdornment>
                                  }}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={12}  style={{margin: '20px'}}>
                            <TextField
                                type="password"
                                variant="outlined"
                                onChange={checkPassword}
                                value={password}
                                error={sourceError === 'pass'}
                                placeholder="Password"
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                          >
                                            <VpnKey />
                                          </IconButton>
                                        </InputAdornment>
                                      }}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={12}  style={{margin: '20px'}}>
                            <TextField
                                type="password"
                                variant="outlined"
                                onChange={confirmPassword}
                                value={password2}
                                placeholder="Confirm password"
                                error={sourceError === 'pass2'}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                          >
                                            <VpnKey />
                                          </IconButton>
                                        </InputAdornment>
                                      }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>

                <Box style={{maxWidth: '300px', textAlign: 'center'}}>
                {errorMessage && errorMessage.length && 
                    <Typography style={{color: 'red'}}>{errorMessage}</Typography>
                }
                </Box>

            </DialogContent>
            <DialogActions>
            <Button variant="contained" size="large" color="primary" onClick={loginAction}
                disabled={!username || !password || errorMessage.length}
            >
                Sign Up
            </Button>
            <Button variant="text" size="small" color="secondary" onClick={() => cancelForm()}>
                Cancel
            </Button>

            </DialogActions>
        </Dialog>
    )
}

export default SignUp
