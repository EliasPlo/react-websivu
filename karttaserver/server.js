const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // For random ID generation

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data/markers.json');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// API Routes

// Fetch all markers
app.get('/api/markers', (req, res) => {
    try {
        const markers = JSON.parse(fs.readFileSync(DATA_FILE));
        res.status(200).json(markers);
    } catch (error) {
        console.error('Error reading markers:', error);
        res.status(500).json({ message: 'Error reading markers.' });
    }
});

// Add or update a marker
app.post('/api/markers', (req, res) => {
    try {
        const newMarker = req.body;

        // Ensure marker has latlng, name, and text
        if (!newMarker.latlng || !newMarker.latlng.lat || !newMarker.latlng.lng) {
            return res.status(400).json({ message: 'Invalid marker data. Latitude and longitude are required.' });
        }
        if (!newMarker.name || !newMarker.text) {
            return res.status(400).json({ message: 'Name and text are required for the marker.' });
        }

        const markers = JSON.parse(fs.readFileSync(DATA_FILE));

        // If the marker does not have an ID, generate one
        if (!newMarker.id) {
            newMarker.id = crypto.randomUUID();
        }

        const markerIndex = markers.findIndex((marker) => marker.id === newMarker.id);

        if (markerIndex > -1) {
            // Update existing marker
            markers[markerIndex] = { ...markers[markerIndex], ...newMarker, editdate: new Date().toISOString() };
        } else {
            // Add new marker
            newMarker.createdate = new Date().toISOString();
            markers.push(newMarker);
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(markers, null, 2));
        res.status(200).json({ message: 'Marker saved.', id: newMarker.id });
    } catch (error) {
        console.error('Error saving marker:', error);
        res.status(500).json({ message: 'Error saving marker.' });
    }
});

// Delete a marker
app.delete('/api/markers/:id', (req, res) => {
    try {
        const markerId = req.params.id;
        const markers = JSON.parse(fs.readFileSync(DATA_FILE));
        const updatedMarkers = markers.filter((marker) => marker.id !== markerId);

        if (updatedMarkers.length === markers.length) {
            return res.status(404).json({ message: 'Marker not found.' });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(updatedMarkers, null, 2));
        res.status(200).json({ message: 'Marker deleted.' });
    } catch (error) {
        console.error('Error deleting marker:', error);
        res.status(500).json({ message: 'Error deleting marker.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
