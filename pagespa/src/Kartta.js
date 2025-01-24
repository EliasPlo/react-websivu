import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Box, Typography, Container, Button, TextField, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function LocationMarker({ isAdding, onMarkerAdd }) {
    const [lastClickCoords, setLastClickCoords] = useState(null);

    useMapEvents({
        click(e) {
            if (!isAdding) {
                setLastClickCoords(e.latlng);
            }
            if (isAdding) {
                onMarkerAdd(e.latlng);
            }
        }
    });

    return lastClickCoords && !isAdding ? (
        <Popup position={lastClickCoords}>
            Koordinaatit: {lastClickCoords.lat.toFixed(4)}, {lastClickCoords.lng.toFixed(4)}
        </Popup>
    ) : null;
}

const Kartta = () => {
    const position = [62.6050, 29.7417];
    const [markers, setMarkers] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentEditingIdx, setCurrentEditingIdx] = useState(null);
    const [editorName, setEditorName] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Muokkaa-napin tila

    useEffect(() => {
        const fetchMarkers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/markers');
                setMarkers(response.data);
            } catch (error) {
                console.error('Virhe merkintöjen lataamisessa:', error);
            }
        };

        fetchMarkers();
    }, []);

    const handleMarkerAdd = (latlng) => {
        const newMarker = {
            latlng,
            text: "",
            name: "",
            title: "",
            createdate: new Date().toISOString(),
            editdate: null,
            editorName: ""
        };
        setMarkers([...markers, newMarker]);
    };

    const saveText = async (idx) => {
        const updatedMarkers = [...markers];
        const marker = updatedMarkers[idx];
        marker.editdate = new Date().toISOString();
        marker.editorName = editorName;
        try {
            const response = await axios.post('http://localhost:3001/api/markers', marker);
            if (!marker.id) {
                updatedMarkers[idx].id = response.data.id;
            }
            setMarkers(updatedMarkers);
        } catch (error) {
            console.error('Virhe merkinnän tallentamisessa:', error);
        }
    };

    const deleteMarker = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/markers/${id}`);
            setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.id !== id));
        } catch (error) {
            console.error('Virhe merkinnän poistamisessa:', error);
        }
    };

    const handleEditClick = (idx) => {
        setCurrentEditingIdx(idx);
        setIsEditing(true); // Tekstikentät näkyviin
    };

    const handleSaveClick = () => {
        setIsEditing(false); // Piilota tekstikentät
        setOpenDialog(true); // Näytä editorin nimi pop-up
    };

    const handleDialogClose = (save = false) => {
        if (save && currentEditingIdx !== null) {
            saveText(currentEditingIdx);
        }
        setEditorName("");
        setCurrentEditingIdx(null);
        setOpenDialog(false);
    };

    return (
        <Container maxWidth="80%" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Button variant="contained" color={isAdding ? "secondary" : "primary"} onClick={() => setIsAdding(!isAdding)}>{isAdding ? "Lisää merkintä" : "Näytä koordinaatit"}</Button>
                    <Button variant="contained" color="primary" href="/#/kartta/info">Merkkien tiedot</Button>
                </Box>
                <Typography variant="h4" align="center" gutterBottom>Karttanäkymä</Typography>
                <Box sx={{ height: 700, width: '100%', border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
                    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker isAdding={isAdding} onMarkerAdd={handleMarkerAdd} />
                        {markers.map((marker, idx) => (
                            <Marker key={idx} position={marker.latlng}>
                                <Popup>
                                    <Typography variant="h5" gutterBottom>{marker.title || "Ei otsikkoa"}</Typography>
                                    <Typography variant="h6" gutterBottom>{marker.text}</Typography>
                                    <Typography variant="subtitle1" gutterBottom>Luonut: {marker.name}</Typography>
                                    {isEditing && currentEditingIdx === idx ? (
                                        <>
                                            <TextField label="Otsikko" variant="outlined" fullWidth size="small" value={marker.title} onChange={(e) => {
                                                    const updatedMarkers = [...markers];
                                                    updatedMarkers[idx].title = e.target.value;
                                                    setMarkers(updatedMarkers);
                                                }}/>
                                            <TextField label="Teksti" variant="outlined" fullWidth size="small" value={marker.text} onChange={(e) => {
                                                    const updatedMarkers = [...markers];
                                                    updatedMarkers[idx].text = e.target.value;
                                                    setMarkers(updatedMarkers);
                                                }}/>
                                            <TextField label="Luojan nimi" variant="outlined" fullWidth size="small" value={marker.name} onChange={(e) => {
                                                    const updatedMarkers = [...markers];
                                                    updatedMarkers[idx].name = e.target.value;
                                                    setMarkers(updatedMarkers);
                                                }}/>
                                            <Button variant="contained" color="primary" size="small" onClick={handleSaveClick}>Tallenna</Button>
                                        </>
                                    ) : (
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(idx)}>Muokkaa</Button>
                                    )}
                                    <Button variant="outlined" color="error" size="small" onClick={() => deleteMarker(marker.id, idx)}>Poista</Button>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Box>

                {/* Dialog for editor name */}
                <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
                    <DialogTitle>Muokkaajan nimi</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Anna muokkaajan nimi. Voit jättää kentän tyhjäksi, jos et halua lisätä nimeä.
                        </DialogContentText>
                        <TextField autoFocus margin="dense" label="Muokkaajan nimi" type="text" fullWidth variant="outlined" value={editorName} onChange={(e) => setEditorName(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDialogClose(false)} color="error">Peruuta</Button>
                        <Button onClick={() => handleDialogClose(true)} color="primary">Tallenna</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default Kartta;
