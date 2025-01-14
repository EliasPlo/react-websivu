import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Kartta = () => {
    const position = [62.6050, 29.7417];
    const position1 = [60.1650, 24.9500]
    return (
        <div className='map_container'>
        <MapContainer center={[62.6050, 29.7417]} zoom={13} style={{ height: '900px', width: '100%' }}>
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
                    testi
                </Popup>
            </Marker>
        </MapContainer>
        </div>
    );
};

export default Kartta;
