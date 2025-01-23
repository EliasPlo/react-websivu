import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, List, ListItemText, Button } from '@mui/material';

const KarttaMerkit = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchMarkers = async () => {
            const response = await axios.get('http://localhost:3001/api/markers');
            setMarkers(response.data);
        };
        fetchMarkers();
    }, []);

    const deleteMarker = async (id) => {
        await axios.delete(`http://localhost:3001/api/markers/${id}`);
        setMarkers(markers.filter((marker) => marker.id !== id));
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Merkkien tiedot
                </Typography>
                <List>
                    {markers.map((marker) => (
                        <Paper key={marker.id} elevation={1} sx={{ mb: 2, p: 2 }}>
                            <Container container spacing={2}>
                                <Container item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                        {marker.title || "Ei otsikkoa"}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        {marker.text}
                                    </Typography>
                                </Container>
                                <Container item xs={6}>
                                    <ListItemText
                                        primary={`Latitude: ${marker.latlng.lat}`}
                                    />
                                    <ListItemText
                                        primary={`Longitude: ${marker.latlng.lng}`}
                                    />
                                    <ListItemText
                                        primary={`Created: ${marker.createdate}`}
                                        secondary={`Creator Name: ${marker.name}`}
                                    />
                                </Container>
                                <Container item xs={6}>
                                    <ListItemText
                                        primary={`Edited: ${marker.editdate}`}
                                        secondary={`Editor Name: ${marker.editorName}`}
                                    />
                                </Container>
                                <Container item xs={12} sx={{ textAlign: 'right' }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteMarker(marker.id)}
                                    >
                                        Poista
                                    </Button>
                                </Container>
                            </Container>
                        </Paper>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default KarttaMerkit;
