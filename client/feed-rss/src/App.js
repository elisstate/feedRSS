
import './App.css';
import React, { useState, useEffect } from 'react'
import {
  Box, AppBar, Typography, Toolbar, ThemeProvider, Button, Grid,
  Snackbar, Icon
} from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { isAuth, logOut, getUserData } from './userUtils'
import theme from './theme'
import HomePage from './HomePage'
import Login from './Login'
import SignUp from './SignUp'
import MainPage from './MainPage';
import mainLogo from'./logo-rss.png';
import './index.css';


const App = () => {
  const [userName, setUserName] = useState(null)
  const [loginForm, setLoginForm] = useState(false)
  const [signUpForm, setSignUpForm] = useState(false)
  const [snackbarmess, setSnackbar] = useState("")
  const user = getUserData()

  const logOutApp = () => {
    logOut()
    setUserName(null)
  }

  const closeSnackbar = () => {
    setSnackbar("")
  }

  console.log(isAuth())
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="bkg"
        >
          <AppBar position="static">
            <Toolbar style={{display: 'inline-flex', justifyContent: 'space-between'}}>
              <div style={{display: 'inline-flex', alignItems: 'center'}}>
              <img alt="Feed RSS" src={mainLogo} style={{height: '70px', width: '80px', cursor: 'pointer'}}/>
              <Typography>
                Weather Feed RSS
              </Typography>
              </div>
         
              {isAuth() ? (
                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                  <Typography style={{marginRight: '8px'}}>
                    You are logged in as {`${user.email}`}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={e => logOutApp()}>
                    Logout
              </Button>
              </div>

              ) : (
                  <div>
                    <Button variant="contained" color="primary" onClick={e => setLoginForm(true)}>
                      Login
                  </Button>
                    <Button variant="contained" color="secondary" onClick={e => setSignUpForm(true)}>
                      Sign Up
                  </Button>
                  </div>
                )}

            </Toolbar>
          </AppBar>
          <Login open={loginForm} setLoginForm={setLoginForm} setUserName={setUserName} />
          <SignUp open={signUpForm} setSignUpForm={setSignUpForm} setSnackbar={setSnackbar}/>
          <Snackbar open={snackbarmess && snackbarmess.length}
            autoHideDuration={6000}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            message={snackbarmess}
            >
          </Snackbar>

          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/dashboard">
              {isAuth() ? (
                <MainPage  setSnackbar={setSnackbar}/>
              ) : (
                <Box style={{margin: '50px', textAlign: 'center'}}>
                  <Typography variant="h5">Please login or signup to acces your favourite Weather RSS Feeds!</Typography>
                </Box>
                 
                )}
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App;
