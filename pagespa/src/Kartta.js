import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import L from 'leaflet';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Kartta = () => {
    const position = [62.6050, 29.7417];
    const position1 = [60.1650, 24.9500];

    return (
        <Container maxWidth="80%" sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, p: 3 }}>
                <Typography variant="h4" align="center" sx={{ mb: 3, color: 'primary.main' }}>
                    Karttanäkymä
                </Typography>
                <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <MapContainer center={position} zoom={13} style={{ height: '700px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                            <Popup>
                                Joensuu
                            </Popup>
                        </Marker>
                        <Marker position={position1}>
                            <Popup>
                                Testi
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>
            </Box>
        </Container>
    );
};

export default Kartta;
