import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Paper, Typography, Stack, Grid, Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(props) {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    useEffect(() => {
        localStorage.clear()
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (formdata.name.length < 4) {
            toast.error('Name must be at least 4 characters long!');
            return
        }
        if (emailRegex.test(formdata.email) === false) {
            toast.error('Invalid email address!');
            return
        }
        if (formdata.phone.length !== 10 || isNaN(formdata.phone)) {
            toast.error('Phone number must be a 10 digit number');
            return;
        }
        if (formdata.password.length < 6 || formdata.password.length > 18) {
            toast.error('Password must be between 6 and 18 characters long!');
            return
        }
        console.log(formdata);
        axios.post('https://dns-backend-sh8l.onrender.com/api/signup', formdata)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message);
                setFormdata({
                    name: '',
                    email: '',
                    password: '',
                    phone: ''
                });
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
                setFormdata({
                    name: '',
                    email: '',
                    password: '',
                    phone: ''
                });
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
                    height: 460,

                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Stack spacing={2}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={formdata.name}
                                onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formdata.email}
                                onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                                value={formdata.phone}
                                onChange={(e) => setFormdata({ ...formdata, phone: e.target.value })}
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
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, mr: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button href="/login" sx={{ mt: 3, mb: 2 }}>Click here to Login</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Stack>
                </Paper>
            </Container>
            <ToastContainer autoClose={3000} />
        </Box>

    );
}
export default Signup;



