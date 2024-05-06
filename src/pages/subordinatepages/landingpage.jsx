import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Landingpage() {

    const navigate = useNavigate();
    return (
        <Box sx={{ background: "linear-gradient(to bottom, #f6f7f8, #e9ebee)", height: "100vh", display: "flex", alignItems: "center" }}>
            <Container maxWidth="lg">
                <Typography variant="h2" sx={{ mb: 5, color: "#333", textAlign: "center", fontWeight: "bold" }}>Manage your DNS records with ease</Typography>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ background: "#fff", padding: 4, borderRadius: 8 }}>
                            <Typography variant="h4" gutterBottom style={{ color: "#333", marginBottom: "1.5rem" }}>Create / manage DNS records</Typography>
                            <Typography variant="body1" style={{ color: "#666" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eos.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ background: "#fff", padding: 4, borderRadius: 8 }}>
                            <Typography variant="h4" gutterBottom style={{ color: "#333", marginBottom: "1.5rem" }}>Efficient and easy to use</Typography>
                            <Typography variant="body1" style={{ color: "#666" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, eos.</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5, textAlign: "center" }}>
                    <Button variant="contained" color="primary" size="large" onClick={() => { navigate("/login") }}>Get started now !</Button>
                </Box>
            </Container>
        </Box>

    );
}

export default Landingpage;
