import { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

const Yhteys = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Prepare the form data
      const formData = { name, number, message };

      try {
        const response = await fetch("http://localhost:5000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data.message); // Response message from the server

      } catch (error) {
        console.error("Error:", error);
      }
  };

  const handleClear = () => {
    setName('');
    setNumber('');
    setMessage('');
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
    <Typography variant="h4" gutterBottom>Yhteydenottolomake</Typography>
    <Typography variant="body1" gutterBottom>Täytä lomake ja lähetä yhteydenottopyyntö.</Typography>
    <form onSubmit={handleSubmit}>
      <Box mb={2}>
        <TextField label="Nimi" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)}/>
      </Box>
      <Box mb={2}>
        <TextField label="Puhelinnumero" variant="outlined" fullWidth type="tel" value={number} onChange={(e) => setNumber(e.target.value)}/>
      </Box>
      <Box mb={2}>
        <TextField label="Kirjoita aihe" variant="outlined" fullWidth multiline rows={4} value={message} onChange={(e) => setMessage(e.target.value)}/>
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <Button type="submit" variant="contained" color="primary">Lähetä</Button>
        <Button type="button" variant="contained" color="secondary" onClick={handleClear}>Tyhjennä</Button>
      </Box>
    </form>
    <Box mt={2}>
        <br />
      <Button type="button" variant="contained" color="default" href="/#/contacts">Näytä yhteydenotot</Button>
    </Box>
  </Box>
  );
}

export default Yhteys;
