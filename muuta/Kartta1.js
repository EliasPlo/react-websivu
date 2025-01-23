import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
//import L from 'leaflet';
import { Button, Typography, Container, Box } from '@mui/material';

function LocationMarker() {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        // Hae tallennetut merkinnät backendistä
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

    useMapEvents({
        click(e) {
            const newMarker = {
                latlng: e.latlng,
                text: "",
                name: "", // Pakollinen vain luontivaiheessa
                createdate: new Date().toISOString(),
                editdate: null
            };
            setMarkers([...markers, newMarker]);
        }
    });

    const saveText = async (idx, editorName) => {
        const updatedMarkers = [...markers];
        const marker = updatedMarkers[idx];

        if (!marker.name) {
            alert("Nimi on pakollinen kenttä luontivaiheessa!");
            return;
        }

        if (marker.editdate && marker.editorName && marker.editorName !== editorName) {
            const isSameUser = window.confirm(
                `Edellinen muokkaaja oli ${marker.editorName}. Käytetäänkö nyt nimeä ${editorName}?`
            );
            if (!isSameUser) return;
        }

        marker.editdate = new Date().toISOString();
        marker.editorName = editorName;

        try {
            const response = await axios.post('http://localhost:3001/api/markers', marker);
            if (!marker.id) {
                // Aseta ID backendin palauttamasta vastauksesta
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

    return (
        <>
            {markers.map((marker, idx) => (
                <Marker key={idx} position={marker.latlng}>
                    <Popup>
                        <div className="popup-content">
                            <label>Nimi (pakollinen vain luontivaiheessa):</label>
                            <input
                                type="text"
                                value={marker.name}
                                onChange={(e) => {
                                    if (marker.id) {
                                        alert("Luojan nimeä ei voi muuttaa enää.");
                                        return;
                                    }
                                    const updatedMarkers = [...markers];
                                    updatedMarkers[idx].name = e.target.value;
                                    setMarkers(updatedMarkers);
                                }}
                                required
                                disabled={!!marker.id} // Estä muokkaus, jos merkintä on tallennettu
                            />
                        </div>
                        <div className="popup-content">
                            <label>Teksti:</label>
                            <textarea
                                value={marker.text}
                                onChange={(e) => {
                                    const updatedMarkers = [...markers];
                                    updatedMarkers[idx].text = e.target.value;
                                    setMarkers(updatedMarkers);
                                }}
                                style={{ width: '200px', height: '100px' }}
                            />
                        </div>
                        <div className="popup-content">
                            <button
                                onClick={() => {
                                    const editorName = prompt("Anna nimesi (muokkaaja):", "");
                                    if (editorName) {
                                        saveText(idx, editorName);
                                    }
                                }}
                                style={{ margin: '5px' }}
                            >
                                Tallenna
                            </button>
                            <button
                                onClick={() => deleteMarker(marker.id)}
                                style={{ margin: '5px', color: 'red' }}
                            >
                                Poista
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
}

const Kartta = () => {
    const position = [62.6050, 29.7417];
    return (
        <Container maxWidth="80%" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, p: 3 }}>
                <Button variant="contained" color="primary" href="/#/kartta/info">Merkintälista</Button>
                <Typography variant="h4" align="center" sx={{ mb: 3, color: 'primary.main' }}>
                    Karttanäkymä
                </Typography>
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <MapContainer center={position} zoom={13} style={{ height: '700px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker />
                    </MapContainer>
                </Box>
            </Box>
        </Container>
    );
};

export default Kartta;
