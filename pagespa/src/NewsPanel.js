import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Card, CardContent, CardActions, Container, Box, } from "@mui/material";

const NewsPanel = () => {
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFullContent, setNewFullContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(""); // Lisätty tila kuvalle
  const [newCreatedBy, setNewCreatedBy] = useState(""); // Lisätty tila tekijälle
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news");
      setNews(response.data);
    } catch (error) {
      console.error("Virhe uutisten hakemisessa", error);
    }
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateNews(editId);
    } else {
      await addNews();
    }
  };

  const addNews = async () => {
    try {
      const response = await axios.post("http://localhost:5000/news", {
        title: newTitle,
        content: newContent,
        fullContent: newFullContent,
        imageUrl: newImageUrl, // Lähetetään kuvalinkki
        createdBy: newCreatedBy, // Lähetetään tekijä
      });
      setNews([...news, response.data]);
      resetForm();
    } catch (error) {
      console.error("Virhe uutisen lisäämisessä", error);
    }
  };

  const updateNews = async (id) => {
    try {
      await axios.put(`http://localhost:5000/news/${id}`, {
        title: newTitle,
        content: newContent,
        fullContent: newFullContent,
        imageUrl: newImageUrl, // Päivitetään kuvalinkki
        createdBy: newCreatedBy, // Päivitetään tekijä
      });
      fetchNews();
      resetForm();
    } catch (error) {
      console.error("Virhe uutisen päivittämisessä", error);
    }
  };

  const deleteNews = async (id) => {
    try {
      const isConfirmed = window.confirm("Haluatko varmasti poistaa uutisen?");
      if (isConfirmed) {
        await axios.delete(`http://localhost:5000/news/${id}`);
      setNews(news.filter((item) => item._id !== id));
        alert("Uutinen poistettu!");
    } else {
      console.log("Uutista ei poistettu.");
    }
    } catch (error) {
      console.error("Virhe uutisen poistamisessa", error);
    }
  };

  const handleEdit = (item) => {
    setNewTitle(item.title);
    setNewContent(item.content);
    setNewFullContent(item.fullContent || "");
    setNewImageUrl(item.imageUrl || ""); // Täytä kuvalinkki, jos olemassa
    setNewCreatedBy(item.createdBy || ""); // Täytä tekijä, jos olemassa
    setEditId(item._id);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setNewFullContent("");
    setNewImageUrl(""); // Nollaa kuvalinkki
    setNewCreatedBy(""); // Nollaa tekijä
    setEditId(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Uutisten Hallintapaneeli
        </Typography>
        <Typography variant="h6" align="center">
          {editId ? "Muokkaa uutista" : "Lisää uutinen"}
        </Typography>

        <Box mt={3} mb={5} component="form" noValidate autoComplete="off">
          <Box mb={2}>
            <TextField label="Otsikko" variant="outlined" fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
          </Box>
          <Box mb={2}>
            <TextField label="Sisältö (lyhyt versio)" variant="outlined" fullWidth multiline minRows={3} value={newContent} onChange={(e) => setNewContent(e.target.value)}/>
          </Box>
          <Box mb={2}>
            <TextField label="Laajempi sisältö" variant="outlined" fullWidth multiline minRows={5} value={newFullContent} onChange={(e) => setNewFullContent(e.target.value)}/>
          </Box>
          <Box mb={2}>
            <TextField label="Tekijä" variant="outlined" fullWidth value={newCreatedBy} onChange={(e) => setNewCreatedBy(e.target.value)}/>
          </Box>
          <Box mb={2}>
            <TextField label="Kuvan URL" variant="outlined" fullWidth value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} />
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: 2 }} >
              {editId ? "Päivitä" : "Lisää"}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={resetForm}>
                Peruuta
              </Button>
            )}
          </Box>
        </Box>

        <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
          {news.map((item) => (
            <Box key={item._id} sx={{ width: "100%", maxWidth: "400px" }}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {item.content}
                  </Typography>
                  {item.fullContent && (
                    <Typography variant="body2" paragraph>
                      <strong>Laajempi sisältö:</strong> {item.fullContent}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary">
                    <strong>Julkaisupäivämäärä:</strong> {formatDate(item.createdAt)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>Muokattu:</strong> {item.updatedAt !== item.createdAt ? formatDate(item.updatedAt) : "Ei muokattu"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>Kuva:</strong> {item.imageUrl ? "Kyllä" : "Ei"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>Tekijä:</strong> {item.createdBy}
                  </Typography>

                </CardContent>
                <CardActions>
                  <Button variant="outlined" color="error" onClick={() => deleteNews(item._id)}>Poista</Button>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(item)}>Muokkaa</Button>
                  <Button variant="outlined" color="primary" href={`/#/news/${item._id}`}>Näytä</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default NewsPanel;
