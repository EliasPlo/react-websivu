import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography, Container, Box, Button } from "@mui/material";

const NewsDetail = () => {
  const [newsItem, setNewsItem] = useState(null);
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

  return (
    <Container>
      {newsItem ? (
        <Box my={4}>
          {/* Kuva näytetään ylimpänä, jos kuvalinkki on olemassa */}
          {newsItem.imageUrl && (
            <Box mb={3}>
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                style={{
                  width: "80%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
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
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.history.back()}
            >
              Takaisin
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>Haetaan uutista...</Typography>
      )}
    </Container>
  );
};

export default NewsDetail;
