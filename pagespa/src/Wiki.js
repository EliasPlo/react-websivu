import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

// Luo axios-instanssi
const apiClient = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000, // Aseta aikakatkaisu (ms)
});

function Wiki() {
    const [data, setData] = useState();
    const [haku, setHaku] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (haku.length === 0) {
            setData(null); // Tyhjennetään data, jos haku on tyhjä
            return;
        }

        const fetchData = async () => {
            try {
                const response = await apiClient.get(`/wiki?haku=${haku}`);
                setData(response.data);
                setError(null); // Nollataan virheviesti onnistuneen haun jälkeen
            } catch (err) {
                console.error("Virhe haettaessa tietoja:", err);
                setError("Tietoja ei voitu hakea. Tarkista yhteys ja yritä uudelleen.");
            }
        };

        fetchData();
    }, [haku]);

    const clearData = () => {
        setData(null);
        setHaku('');
        setError(null);
    };

    return (
        <Box sx={{padding: 3}}>
            <Typography variant="h4" component="h2" gutterBottom>
                Wikipedia-haku
            </Typography>
            <Box sx={{display: "flex", gap: 2, marginBottom: 2}}>
                <TextField
                    label="Haku"
                    variant="outlined"
                    value={haku}
                    onChange={(e) => setHaku(e.target.value)}
                />
                <Button variant="contained" onClick={clearData}>Tyhjennä</Button>
            </Box>
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>)}
                {data?.[0]?.title && (
                    <Typography variant="h5" component="h1">
                        {data[0].title}
                    </Typography>
                )}
                {data?.[0]?.extract && (
                    <Typography variant="body1" sx={{marginTop: 2}}>
                        {data[0].extract}
                    </Typography>
                    )}
        </Box>
    );
}

export default Wiki;

/*import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

// Luo axios-instanssi
const apiClient = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
});

function Wiki() {
    const [data, setData] = useState(null);
    const [haku, setHaku] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (haku.trim().length === 0) {
            setData(null);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await apiClient.get(`/wiki?haku=${haku}`);
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error("Virhe haettaessa tietoja:", err);
                setError("Tietoja ei voitu hakea. Tarkista yhteys ja yritä uudelleen.");
            }
        };

        fetchData();
    }, [haku]);

    const clearData = () => {
        setData(null);
        setHaku('');
        setError(null);
    };

    // Funktio tekstin pilkkomiseen kappaleisiin
    const formatText = (text) => {
        return text.split(/\n+/).filter(paragraph => paragraph.trim() !== "");
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Wikipedia-haku
            </Typography>
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Haku"
                    variant="outlined"
                    value={haku}
                    onChange={(e) => setHaku(e.target.value)}
                />
                <Button variant="contained" onClick={clearData}>Tyhjennä</Button>
            </Box>
            {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>
            )}
            {data && (
                <>
                    <Typography variant="h5" component="h1">
                        {data.title}
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        {formatText(data.extract).map((paragraph, index) => (
                            <Typography key={index} variant="body1" paragraph>
                                {paragraph}
                            </Typography>
                        ))}
                    </Box>
                    {data.disambiguation && (
                        <Alert severity="info" sx={{ marginTop: 2 }}>
                            "{haku}" saattaa viitata useisiin eri aiheisiin. Tarkista tarkemmat tiedot Wikipediasta.
                        </Alert>
                    )}
                </>
            )}
        </Box>
    );
}

export default Wiki;*/
