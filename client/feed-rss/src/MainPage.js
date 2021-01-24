
import React, { useState, useEffect } from 'react'
import {
    Box, Grid, Typography, TextField, Button, IconButton, InputAdornment
} from '@material-ui/core'
import axios from 'axios'
import Dashboard from './Dashboard'
import { getUserData } from './userUtils'
import { RssFeed } from '@material-ui/icons'

const MainPage = (props) => {
    const [dashboardData, setDashboardData] = useState(null)
    const [newFeed, setNewFeed] = useState("")
    const user = getUserData()

    const addNewFeed = () => {
        axios.post('/api/rssUrl', {url: newFeed, userId: user.id}).then(res => {
            setNewFeed("")
            axios.get(`/api/rssUrl/${user.id}`).then(res =>
                setDashboardData(res.data))
            props.setSnackbar(res.data.message)
        }).catch((err, ras) => {
            if (err.response && err.response.data) {
               props.setSnackbar(err.response.data)
            }
        })
    }

    useEffect(() => {
        const user = getUserData()
        console.log(user)
        axios.get(`/api/rssUrl/${user.id}`).then(res =>
            setDashboardData(res.data))
    
        const interval = setInterval(() => {
            axios.get(`/api/rssUrl/${user.id}`).then(res =>
                setDashboardData(res.data))
        }, 30000)
        return () => clearInterval(interval);
    }, [])

    console.log(dashboardData)
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            alignContent="center"
        >
            <Typography variant="h5" style={{ padding: '60px' }}>
                Feed RSS pentru Avertizari Meteorologice
            </Typography>
            <Box display="inline-flex" textAlign="center" width="100%" marginLeft="20px" alignItems="center">
                <Typography variant="body" style={{ padding: '20px', textAlign: 'center' }}>
                    Add a new RSS Feed <br /> to your dashboard: 
                </Typography>
                <TextField
                    variant="outlined"
                    onChange={e => setNewFeed(e.target.value)}
                    value={newFeed}
                    placeholder="RSS Feed URL"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="feed"
                                    edge="end"
                                >
                                    <RssFeed />
                                </IconButton>
                            </InputAdornment>
                    }}
                >
                </TextField>
                <Button style={{marginLeft: '10px'}} onClick={addNewFeed} color="primary" variant="contained" size="small">
                    Add New RSS Feed
                </Button>
            </Box>
            <Grid container direction="row">
                {dashboardData && dashboardData.length &&
                    dashboardData.map(feed => <Grid item direction="column" xs={6}> <Dashboard data={feed} /> </Grid>)}
            </Grid>

        </Box>
    )
}

export default MainPage
