import { Box, Typography } from '@mui/material';
import React from 'react';

function Errorpage(props) {
    return (
        <Box sx={{ background: "#5375e2", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box>
                <Typography variant="h2" sx={{ color: "white" }}>Error 404: Page not found !</Typography>
            </Box>
        </Box>
    );
}

export default Errorpage;