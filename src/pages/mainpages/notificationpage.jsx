import React, { useState, useEffect } from 'react';
import Sidenav from '../subordinatepages/sidenav';
import { Box, Typography, List, ListItem, ListItemText, Grid, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

function Notificationpage(props) {

    const notifications = useSelector(state => state.notificationreducer.notifications);
    console.log("domains", notifications)

    const [page, setPage] = useState(1);
    const notificationsPerPage = 25
    const pagesCount = Math.ceil(notifications.length / notificationsPerPage);
    const startIndex = (page - 1) * notificationsPerPage;
    const endIndex = page * notificationsPerPage;
    const currentNotifications = notifications.slice(startIndex, endIndex);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Sidenav />
            <Box component="main" sx={{ p: 3, marginTop: "55px", width: "100%" }}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                    Notifications
                </Typography>
                {currentNotifications.length === 0 ? (
                    <Typography variant="body1" sx={{ mt: 2 }}>No notifications available</Typography>
                ) : (
                    <Grid container sx={{ mt: 2, width: "100%" }}>
                        <Grid item xs={12} sm={8}>
                            <List>
                                {currentNotifications.map(notification => (
                                    <ListItem key={notification._id} sx={{ py: 1, px: 2 }}>
                                        <ListItemText
                                            primary={notification.message}
                                            secondary={new Date(notification.createdAt).toLocaleString()}
                                            sx={{ flexGrow: 1 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Pagination
                                count={pagesCount}
                                page={page}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
}
export default Notificationpage;

