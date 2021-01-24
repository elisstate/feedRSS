
import React, { useState, useEffect } from 'react'
import {
    Box, AppBar, Typography, Grid, ThemeProvider, Button
} from '@material-ui/core'

const HomePage = (props) => {
    const [loginForm, setLoginForm] = useState(false)

    return (
        <div style={{ height: '100%' }}>
            <Box style={{ margin: '50px', textAlign: 'center', zIndex: 100 }}>
                <Typography variant="h5">Please login or signup to acces your favourite Weather RSS Feeds!</Typography>
            </Box>
        </div>
    )
}

export default HomePage
