
import React, { useState, useEffect } from 'react'
import {
  Box, AppBar, Typography, Grid, ThemeProvider, Button } from '@material-ui/core'
import axios from 'axios'
import theme from './theme'

const Dashboard = (props) => {

    return (
        <div style={{margin: '15px'}}>
            <Typography variant="h6" style={{textAlign: 'center'}}>
                {props.data.info.title}
            </Typography>

            <Typography variant="subtitle1" style={{textAlign: 'center'}}>
                {props.data.info.description}
            </Typography>
            {props.data.items.map(item =>  <div style={{border: '1px solid', margin: '5px', padding: '10px'}} dangerouslySetInnerHTML={{ __html: item.xml }} />)}
        </div>
    )
}

export default Dashboard
