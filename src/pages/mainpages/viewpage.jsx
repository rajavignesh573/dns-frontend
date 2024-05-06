import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TableContainer, Paper, Typography, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import api from '../../config/axiosconfig';


function DomainRecordsPage() {
    const { id } = useParams();
    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const navigate = useNavigate();

    const [recordName, setRecordName] = useState('');
    const [recordType, setRecordType] = useState('');
    const [recordValue, setRecordValue] = useState('');

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const { data } = await api.get(`/api/records/${id}`);
                setRecords(data.ResourceRecordSets);
                setRecordName(data.ResourceRecordSets[0].Name);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };
        fetchRecords();
    }, [id]);
    console.log('records', records);

    const handleClose = () => {
        setRowToEdit(null);
        setRecordName('');
        setRecordType('');
        setRecordValue('');
        setOpen(false);
    };

    const handleEdit = (row) => {
        setRowToEdit(row);
        setRecordName(row.Name);
        setRecordType(row.Type);
        setRecordValue(row.ResourceRecords.map(record => record.Value).join('\n'));
        setOpen(true);
    };

    const handleDelete = async (row) => {
        if (row.Type === 'NS' || row.Type === 'SOA') {
            alert('NS and SOA records cannot be deleted');
            return;
        }
        try {
            const { data } = await api.delete(`/api/records`, {
                data: {
                    HostedZoneId: id,
                    name: row.Name,
                    type: row.Type,
                    value: row.ResourceRecords.map(record => record.Value)
                }
            });
            if (data.Status === 'SUCCESS') {
                setRecords(records.filter(record => record.Name !== row.Name || record.Type !== row.Type));
                alert('Record deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };


    const handleAdd = async () => {
        const newRecord = {
            Name: recordName,
            Type: recordType,
            TTL: 300,
            ResourceRecords: [{ Value: recordValue }]
        };
        try {
            const { data } = await api.post(`/api/records`, {
                HostedZoneId: id,
                name: recordName,
                type: recordType,
                value: recordValue.split('\n')
            });
            setOpen(false);
            if (data.Status === 'SUCCESS') {
                setRecords([...records, newRecord]);
                setRecordName('');
                setRecordType('');
                setRecordValue('');
                alert('Record added successfully');
            }
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };


    const handleUpdate = async () => {
        const updatedRecord = {
            Name: recordName,
            Type: recordType,
            TTL: 300,
            ResourceRecords: recordValue.split('\n').map(value => ({ Value: value }))
        };
        try {
            const { data } = await api.put(`/api/records`, {
                HostedZoneId: id,
                name: recordName,
                type: recordType,
                value: recordValue.split('\n')
            });
            setOpen(false);
            if (data.Status === 'SUCCESS') {
                const updatedRecords = records.map(record => {
                    if (record.Name === recordName && record.Type === recordType) {
                        return { ...record, ...updatedRecord };
                    }
                    return record;
                });
                setRecords(updatedRecords);
                setRecordName('');
                setRecordType('');
                setRecordValue('');
                alert('Record updated successfully');
            }
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
                <Typography variant='h4' sx={{ mb: 3 }}>
                    Records for Domain ID: {id}
                </Typography>

                <Button variant="contained" sx={{ mb: 2, mr: 2 }} onClick={() => setOpen(true)}>Add Record</Button>
                <Button variant="contained" sx={{ mb: 2 }} style={{ backgroundColor: 'red' }} onClick={() => navigate(-1)} >Back</Button>
                <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Domain</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>DNS Records</TableCell>
                                    <TableCell>TTL</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {records && records.map((row) => (
                                    <TableRow key={row.Name + row.Type}>
                                        <TableCell>{row.Name}</TableCell>
                                        <TableCell>{row.Type}</TableCell>
                                        <TableCell>
                                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                {row.ResourceRecords.map((record, index) => (
                                                    <li key={index}>{record.Value}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell>{row.TTL}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(row)}>Edit</Button>
                                            <Button onClick={() => handleDelete(row)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{rowToEdit ? 'Edit Record' : 'Add Record'}</DialogTitle>
                    <DialogContent>
                        <TextField label="Name" value={recordName} onChange={(e) => setRecordName(e.target.value)} fullWidth />
                        <TextField select label="Type" value={recordType} onChange={(e) => setRecordType(e.target.value)} fullWidth sx={{ marginTop: 2 }}>
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="AAAA">AAAA</MenuItem>
                            <MenuItem value="CNAME">CNAME</MenuItem>
                            <MenuItem value="MX">MX</MenuItem>
                            <MenuItem value="TXT">TXT</MenuItem>
                            <MenuItem value="NS">NS</MenuItem>
                            <MenuItem value="SOA">SOA</MenuItem>
                            <MenuItem value="SPF">SPF</MenuItem>
                            <MenuItem value="CAA">CAA</MenuItem>
                            <MenuItem value="PTR">PTR</MenuItem>
                        </TextField>
                        <TextField
                            label="Value"
                            multiline
                            rows={4}
                            value={recordValue}
                            onChange={(e) => setRecordValue(e.target.value)}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {rowToEdit ? (
                            <Button onClick={handleUpdate}>Update</Button>
                        ) : (
                            <Button onClick={handleAdd}>Add</Button>
                        )}
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default DomainRecordsPage;
