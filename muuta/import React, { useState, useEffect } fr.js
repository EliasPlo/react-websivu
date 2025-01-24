import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Card, CardContent, CardActions, CardMedia, Container, Box, Button, TextField, Chip, IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';

const Uutiset = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsVisible, setTagsVisible] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news");
      setNews(response.data);
      const allTags = response.data.reduce((acc, item) => {
        item.tags.forEach(tag => {
          if (!acc.includes(tag)) acc.push(tag);
        });
        return acc;
      }, []);
      setTags(allTags);
    } catch (error) {
      console.error("Virhe uutisten hakemisessa", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTagFilter = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevTags, tag]
    );
  };

  const removeSelectedTag = (tag) => {
    setSelectedTags(prevTags => prevTags.filter((selectedTag) => selectedTag !== tag));
  };

  const toggleTagsVisibility = () => {
    setTagsVisible(!tagsVisible);
  };

  const filteredNews = news.filter((item) =>
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTags.length > 0 ? selectedTags.some(tag => item.tags.includes(tag)) : true)
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" align="center">Uutislista</Typography>
        <Box my={2} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" href="/#/news/admin">
            Muokkaa uutisia
          </Button>
        </Box>

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

        {/* Valitut tagit näkyviin */}
        {selectedTags.length > 0 && (
          <Box my={2} display="flex" justifyContent="center" flexWrap="wrap">
            <Typography variant="body2" sx={{ marginRight: 2 }}>Valitut kategoriat:</Typography>
            {selectedTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => removeSelectedTag(tag)}
                color="primary"
                deleteIcon={<CancelIcon />}
                sx={{ margin: 0.5 }}
              />
            ))}
          </Box>
        )}

        {/* Toggle Tags Filter */}
        <Box my={2} display="flex" justifyContent="center">
          <IconButton onClick={toggleTagsVisibility}>
            <ExpandMoreIcon />
          </IconButton>
          <Typography variant="body2">Näytä kategoriat</Typography>
        </Box>

        {tagsVisible && (
          <Box my={2} display="flex" justifyContent="center" flexWrap="wrap">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                color={selectedTags.includes(tag) ? "primary" : "default"}
                onClick={() => handleTagFilter(tag)}
                sx={{ margin: 0.5 }}
              />
            ))}
          </Box>
        )}

        <Box mt={4}>
          {filteredNews.map((item) => (
            <Card key={item._id} sx={{ marginBottom: 3, boxShadow: 3 }}>
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
                <Typography variant="body2" color="textSecondary" mt={1}>
                  <strong>Tekijä:</strong> {item.createdBy}
                </Typography>
                {item.tags && item.tags.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Kategoriat:</strong> {item.tags.join(", ")}
                    </Typography>
                  </Box>
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
};

export default Uutiset;

  /*const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await axios.post(`http://localhost:5000/news/${id}/comments`, {
        comment,
      });
      setComment(""); // Tyhjennetään tekstikenttä lähetyksen jälkeen
      alert("Kommentti lisätty!"); // Ilmoitus käyttäjälle
    } catch (error) {
      console.error("Virhe kommentin lisäämisessä", error);
    }
  };*/