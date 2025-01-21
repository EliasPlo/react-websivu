import React, { useState, useEffect } from "react";
import newsData from "./news.json";
function App() {
  const [news, setNews] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  useEffect(() => {
    setNews(newsData);
  }, []);
  const addNews = () => {
    const newNews = { id: Date.now(), title: newTitle, content: newContent };
    setNews([...news, newNews]);
    setNewTitle("");
    setNewContent("");
  };
  const updateNews = (id) => {
    const updatedNews = news.map((item) =>
     item.id === id ? { ...item, title: newTitle, content: newContent } : item
    );
    setNews(updatedNews);
    setNewTitle("");
    setNewContent("");
  };
  const deleteNews = (id) => {
    setNews(news.filter((item) => item.id !== id));
  };
  return (
    <div>
      <h1>Uutislista</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <button onClick={() => deleteNews(item.id)}>Poista</button>
            <button onClick={() => updateNews(item.id)}>Päivitä</button>
          </li>
       ))}
      </ul>
      <h2>Lisää uutinen</h2>
      <input
        type="text"
        placeholder="Otsikko"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sisältö"
        value={newContent}
        onChange={(e) => setNewContent(e.target.value)}
      />
      <button onClick={addNews}>Lisää</button>
    </div>
  );
}
export default App;
