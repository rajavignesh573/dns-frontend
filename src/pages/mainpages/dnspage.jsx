import React, { useState } from 'react';
import Sidenav from '../subordinatepages/sidenav';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    AddCircleOutline as AddCircleOutlineIcon,
    Delete as DeleteIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adddomain, deletedomain } from '../../redux/actions/domainactions';

function Dnspage(props) {
    const [searchText, setSearchText] = useState('');
    const [newDomain, setNewDomain] = useState('');
    const domains = useSelector(state => state.domainreducer.domains);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleAddDomain = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmAddDomain = () => {
        if (newDomain.trim().includes('.') && newDomain.trim() !== '') {
            dispatch(adddomain({ name: newDomain }));
            setNewDomain('');
            setOpen(false);
            toast.success('Domain added successfully!');
        }
        else {
            toast.warning('Enter a valid domain!');
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this domain? , make sure u have deleted all records except default(NS / SOA)')) {
            dispatch(deletedomain({ Id: id }));
            toast.success('Domain deleted successfully!');
        }
    };

    const filteredDomains = domains.filter((domain) =>
        domain.Name && domain.Name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidenav />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <TextField
                        label="Search Domain"
                        variant="outlined"
                        value={searchText}
                        onChange={handleSearch}
                        sx={{ marginRight: 2 }}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Button
                            variant="contained"
                            onClick={handleAddDomain}
                            endIcon={<AddCircleOutlineIcon />}
                        >
                            Add Domain
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'lightblue' }}>
                                <TableCell>Id</TableCell>
                                <TableCell>Domain</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDomains.map(domain => (
                                <TableRow key={domain.Id}>
                                    <TableCell>{domain.Id}</TableCell>
                                    <TableCell>{domain.Name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(domain.Id)}
                                        >
                                            Delete
                                        </Button>
                                        <span style={{ margin: '0px 10px' }} />
                                        <Link to={`/view/${domain.Id}`}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                            >
                                                View DNS Records
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Domain</DialogTitle>
                    <DialogContent >
                        <TextField
                            sx={{ marginTop: 2 }}
                            label="Domain Name"
                            variant="outlined"
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleConfirmAddDomain}>Add</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <ToastContainer autoClose={2000} position="top-center" />
        </Box>
    );
}

export default Dnspage;
