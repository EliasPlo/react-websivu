import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Container, Box, Button, TextField } from "@mui/material";

const NewsDetail = () => {
  const [newsItem, setNewsItem] = useState(null);
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const { id } = useParams(); // Haetaan id URL:sta

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/news/${id}`);
      setNewsItem(response.data);
    } catch (error) {
      console.error("Virhe uutisen hakemisessa", error);
    }
  };

  const handleAddComment = async () => {
    try {
      await axios.post(`http://localhost:5000/news/${id}/comments`, {
        comment,
        username: username.trim() || "Anonyymi", // Käytetään 'Anonyymi', jos nimi on tyhjä
      });
      setComment(""); // Tyhjennetään kommenttikenttä
      setUsername(""); // Tyhjennetään käyttäjänimi
      fetchNews(); // Päivitetään kommentit
    } catch (error) {
      console.error("Virhe kommentin lisäämisessä", error);
    }
  };

  const handleDeleteSingleComment = async (newsId, commentId) => {
    try {
      const isConfirmed = window.confirm("Haluatko varmasti poistaa tämän kommentin?");
      if (isConfirmed) {
        await axios.delete(`http://localhost:5000/news/${newsId}/comments/${commentId}`);
        fetchNews(); // Päivitetään uutisdata kommentin poistamisen jälkeen
        alert("Kommentti poistettu!");
      }
    } catch (error) {
      console.error("Virhe kommentin poistamisessa", error);
    }
  };
  

  return (
    <Container>
      {newsItem ? (
        <Box my={4}>
          {newsItem.imageUrl && (
            <Box mb={3}>
              <img src={newsItem.imageUrl} alt={newsItem.title} style={{ width: "80%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", }}/>
            </Box>
          )}
          <Typography variant="h4" gutterBottom>
            {newsItem.title}
          </Typography>
            <Typography variant="body1" paragraph>
              {newsItem.fullContent}
            </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Julkaisupäivämäärä: </strong> {new Date(newsItem.createdAt).toLocaleString()}
              </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              <strong>Muokattu:</strong> {newsItem.updatedAt !== newsItem.createdAt ? new Date(newsItem.updatedAt).toLocaleString() : "Ei muokattu"}
            </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            <strong>Tekijä:</strong> {newsItem.createdBy}
          </Typography>
          {newsItem.tags && newsItem.tags.length > 0 && (
              <Typography variant="body2" color="textSecondary">
                <strong>Kategoriat: </strong>
                {newsItem.tags.join(", ")} {/* Liitetään tagit pilkulla */}
              </Typography>
          )}
          <Box mt={2}>
            <Button variant="outlined" color="primary" onClick={() => window.history.back()}>Takaisin</Button>
          </Box>
          {/* Kommenttikenttä */}
          <Box mt={4}>
            {/* Uuden kommentin lisääminen */}
            <Box mt={4}>
            <Typography variant="h5" gutterBottom>Kommentit</Typography>
            <TextField label="Käyttäjän nimi (valinnainen)" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} sx={{ marginTop: 2 }}/>
            <TextField label="Kommentti" variant="outlined" fullWidth multiline minRows={3} value={comment} onChange={(e) => setComment(e.target.value)}/>
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleAddComment}>Lisää kommentti</Button>
            </Box>
          </Box><br></br>

            {/* Tulostetaan kaikki kommentit */}
            <Box mb={2}>
              {newsItem.comments && newsItem.comments.length > 0 ? (
                newsItem.comments.map((comment, index) => (
                  <Box key={index} mb={2} p={2} sx={{ border: "1px solid #ddd", borderRadius: "3px", backgroundColor: "#f9f9f9",}}>
                    <Typography variant="body1" style={{}}>{comment.username}</Typography>
                    <Typography variant="body3" >{comment.text}</Typography>
                    <Typography variant="caption" color="textSecondary" display="block">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                    <Button variant="error" onClick={() => handleDeleteSingleComment(newsItem._id, comment._id)} sx={{ mt: 1 }}>poista</Button>
                  </Box>
                ))
              ) : (
                <Typography>Ei kommentteja vielä</Typography>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>Haetaan uutista...</Typography>
      )}
    </Container>
  );
};

export default NewsDetail;
