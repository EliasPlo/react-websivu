import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Card, CardContent, CardActions, CardMedia, Container, Box, Button } from "@mui/material";

const Uutiset = () => {
  const [news, setNews] = useState([]);

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

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" align="center">Uutislista</Typography>
        <Box my={2} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" href="/#/news/admin">
            Muokkaa uutisia
          </Button>
        </Box>

        <Box mt={4}>
          {news.map((item) => (
            <Card key={item._id} sx={{ marginBottom: 3, boxShadow: 3 }}>
              {/* Näytetään kuva vain, jos imageUrl on määritetty */}
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl}
                  alt={item.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {item.content}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Julkaisupäivämäärä:</strong> {formatDate(item.createdAt)}
                </Typography>
                {item.updatedAt !== item.createdAt && (
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <strong>Muokattu:</strong> {formatDate(item.updatedAt)}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" href={`#/news/${item._id}`}>Lue lisää</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Uutiset;
