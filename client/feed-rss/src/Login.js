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

const Login = (props) => {

    const [username, setUserName] = useState([])
    const [password, setPassword] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    let history = useHistory()

    const cancelForm = () => {
        setErrorMessage("")
        props.setLoginForm(false)
        setUserName("")
        setPassword("")

    }

    const loginAction = () => {
        axios.post('/api/user/login', {body: {email: username, pass: password}}).then(res => {
            if (res.data.accessToken) {
                const receivedinfo = JSON.stringify(res.data)
                localStorage.setItem("user", JSON.stringify(res.data));
                setUserName(receivedinfo.email)
                cancelForm()

                props.setUserName(res.data.email)
                history.push('/dashboard')
            }
        }).catch((err, ras) => {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message)
            }
        })
    }

    return (

        <Dialog open={props.open} onClose={cancelForm}>
            <DialogTitle style={{textAlign: 'center'}}>
                Please introduce your credentials
                <Divider orientation="horizontal" />
            </DialogTitle>
            <DialogContent>
                    <Grid direction="column" justify="space-between" spacing={4}>
                        <Grid item xs={12} style={{margin: '20px'}}>
                            <TextField
                                variant="outlined"
                                onChange={e => setUserName(e.target.value)}
                                value={username}
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
                                onChange={e => setPassword(e.target.value)}
                                value={password}
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
                    </Grid>

                {errorMessage && errorMessage.length && 
                    <Typography style={{color: 'red'}}>{errorMessage}</Typography>
                }
            </DialogContent>
            <DialogActions>
            <Button variant="contained" size="large" color="primary" onClick={loginAction}
                disabled={!username || !password}
            >
                Login
            </Button>
            <Button variant="text" size="small" color="secondary" onClick={() => cancelForm()}>
                        Cancel
            </Button>

            </DialogActions>
        </Dialog>
    )
}

export default Login
