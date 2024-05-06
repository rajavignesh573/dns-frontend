import React, { useEffect, useState } from 'react';
import Sidenav from '../subordinatepages/sidenav';
import { Box, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Dashboardpage(props) {
    const domains = useSelector(state => state.domainreducer.domains);
    const notifications = useSelector(state => state.notificationreducer.notifications);
    const totalNotifications = notifications.length;
    const navigate = useNavigate();

    console.log("domains", domains)
    console.log("notifications", notifications)

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'>
                                    Total Notifications
                                </Typography>
                                <Typography variant='h3'>
                                    {totalNotifications}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => { navigate('/notification') }}>View</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'>
                                    Total Domains
                                </Typography>
                                <Typography variant='h3'>
                                    {domains.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => { navigate('/dns') }}>View</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Dashboardpage;

