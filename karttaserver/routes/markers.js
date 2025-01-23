const express = require('express');
const router = express.Router();
const Marker = require('../models/Marker'); // Ensure this model includes the necessary fields

// Hae kaikki merkinnät (Fetch all markers)
router.get('/', async (req, res) => {
    try {
        const markers = await Marker.find(); // Get all markers from the DB
        res.json(markers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lisää uusi merkintä (Add a new marker)
router.post('/', async (req, res) => {
    const { latlng, text, name, createdate, editdate, editorName } = req.body;

    // Validate input (ensure name is provided)
    if (!name) {
        return res.status(400).json({ error: 'Nimi on pakollinen.' }); // 'Name is required'
    }

    // Create a new marker
    const marker = new Marker({
        latlng, // { lat: <lat>, lng: <lng> }
        text,
        title,
        name,
        createdate: createdate || new Date().toISOString(),
        editdate,
        editorName
    });

    try {
        const savedMarker = await marker.save(); // Save the marker to the DB
        res.json(savedMarker); // Respond with the saved marker
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Päivitä merkintä (Update an existing marker)
router.put('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter
    const { text, name, editorName } = req.body; // Get data from the request body

    // Validate input (ensure name is provided)
    if (!name) {
        return res.status(400).json({ error: 'Otiskko on pakollinen.' }); // 'Name is required'
    }

    try {
        // Find the marker by ID
        const updatedMarker = await Marker.findById(id);
        if (!updatedMarker) {
            return res.status(404).json({ error: 'Merkintää ei löytynyt.' }); // 'Marker not found'
        }

        // Update the fields of the marker
        updatedMarker.text = text;
        updatedMarker.name = name;
        updatedMarker.editdate = new Date().toISOString(); // Set the edit date to current
        updatedMarker.editorName = editorName;

        // Save the updated marker
        const savedMarker = await updatedMarker.save();
        res.json(savedMarker); // Respond with the updated marker
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Poista merkintä (Delete a marker)
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameter

    try {
        // Delete the marker by ID
        const deletedMarker = await Marker.findByIdAndDelete(id);
        if (!deletedMarker) {
            return res.status(404).json({ error: 'Merkintää ei löytynyt.' }); // 'Marker not found'
        }

        res.json({ message: 'Merkintä poistettu onnistuneesti.' }); // 'Marker deleted successfully'
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
