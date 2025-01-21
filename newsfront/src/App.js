import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, IconButton } from "@mui/material";
import { Add, Edit, Delete, Save, Cancel } from "@mui/icons-material";

function App() {
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
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
      });
      fetchNews(); // Hakee päivitetyt uutiset
      resetForm();
    } catch (error) {
      console.error("Virhe uutisen päivittämisessä", error);
    }
  };

  const deleteNews = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/news/${id}`);
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Virhe uutisen poistamisessa", error);
    }
  };

  const handleEdit = (item) => {
    setNewTitle(item.title);
    setNewContent(item.content);
    setEditId(item.id);
  };

  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
    setEditId(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  }

  return (
    <div>
      <h1>Uutislista</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <IconButton onClick={() => deleteNews(item.id)} color="error">
              <Delete />
            </IconButton>
            <IconButton onClick={() => handleEdit(item)} color="primary">
              <Edit />
            </IconButton>
          </li>
        ))}
      </ul>
      <h2>{editId ? "Muokkaa uutista" : "Lisää uutinen"}</h2>
      <TextField
        label="Otsikko"
        variant="outlined"
        fullWidth
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Sisältö"
        variant="outlined"
        fullWidth
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color={editId ? "success" : "primary"}
        startIcon={editId ? <Save /> : <Add />}
        onClick={handleSubmit}
      >
        {editId ? "Päivitä" : "Lisää"}
      </Button>
      {editId && (
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<Cancel />}
          onClick={resetForm}
          style={{ marginLeft: "10px" }}
        >
          Peruuta
        </Button>
      )}
    </div>
  );
}

export default App;

