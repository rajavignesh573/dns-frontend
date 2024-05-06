import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Stack, Grid, } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchdomains } from '../../redux/actions/domainactions';
import { fetchnotifications } from '../../redux/actions/notificationactions';

function Login(props) {
    const [formdata, setFormdata] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(formdata.email) === false) {
            toast.error('Invalid email address!');
            return;
        }
        if (formdata.password.length < 6 || formdata.password.length > 18) {
            toast.error('Password must be between 6 and 18 characters long!');
            return;
        }

        axios.post(`https://dns-backend-sh8l.onrender.com/api/Login`, formdata)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                setFormdata({
                    email: '',
                    password: '',
                });
                dispatch(fetchdomains())
                dispatch(fetchnotifications())
                navigate('/dashboard');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
                setFormdata({
                    email: '',
                    password: '',
                });
                console.log(err);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'lightblue',
                width: '100vw',
                height: '100vh',
                fontFamily: 'Roboto',
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    mt: 20,
                    p: 2,
                    bgcolor: 'white',
                    boxShadow: 2,
                    borderRadius: 2,
                    height: 300,
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Stack spacing={1}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formdata.email}
                            onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formdata.password}
                            onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                        />

                        <Grid container spacing={3} alignItems="flex-end" justifyContent="space-between">
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item>
                                {/* Use Link component to navigate without full page reload */}
                                <Link to="/signup">
                                    <Button sx={{ mt: 3, mb: 2 }}>Don't have an account?</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Stack>
            </Container>
            <ToastContainer autoClose={3000} />
        </Box>
    );
}

export default Login;
