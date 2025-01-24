import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Card, CardContent, CardActions, Container, Box } from "@mui/material";

const NewsPanel = () => {
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newFullContent, setNewFullContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(""); // Lisätty tila kuvalle
  const [newCreatedBy, setNewCreatedBy] = useState(""); // Lisätty tila tekijälle
  const [newTags, setNewTags] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        tags: newTags.split(",").map((tag) => tag.trim()), // Lisätään tagit
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
        tags: newTags.split(",").map((tag) => tag.trim()), // Päivitetään tagit
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
    setNewImageUrl(item.imageUrl || "");
    setNewCreatedBy(item.createdBy || "");
    setNewTags(item.tags ? item.tags.join(", ") : "");
    setEditId(item._id);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setNewFullContent("");
    setNewImageUrl(""); // Nollaa kuvalinkki
    setNewCreatedBy(""); // Nollaa tekijä
    setNewTags("");
    setEditId(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  const handleDeleteComment = async (newsId) => {
    try {
      const isConfirmed = window.confirm("Haluatko varmasti poistaa kaikki kommentit tästä uutisesta?");
      if (isConfirmed) {
        await axios.delete(`http://localhost:5000/news/${newsId}/comments`);
        fetchNews(); // Päivitetään uutislista kommenttien poistamisen jälkeen
        alert("Kommentit poistettu!");
      }
    } catch (error) {
      console.error("Virhe kommenttien poistamisessa", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredNews = news.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchTermLower) ||
      item.content.toLowerCase().includes(searchTermLower)
    );
  });

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
          {/* Form Fields */}
          <Box mb={2}>
            <TextField label="Otsikko" variant="outlined" fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
          </Box>
          {/* Other form fields here... */}
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginRight: 2 }}>
              {editId ? "Päivitä" : "Lisää"}
            </Button>
            {editId && (
              <Button variant="outlined" color="secondary" onClick={resetForm}>
                Peruuta
              </Button>
            )}
          </Box>
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          Uutiset
        </Typography>
        <Box my={2} display="flex" justifyContent="center">
          <TextField
            label="Hae uutisia"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            sx={{ maxWidth: 400 }}
          />
        </Box>

        <Box mt={4} display="flex" flexWrap="wrap" justifyContent="center" gap={4}>
          {filteredNews.map((item) => (
            <Box key={item._id} sx={{ width: "100%", maxWidth: "400px" }}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {item.content}
                  </Typography>
                  {/* Other content */}
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
