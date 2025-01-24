require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB yhteys
mongoose.connect(process.env.MONGO_URI, { 
    //useNewUrlParser: true, 
    //useUnifiedTopology: true 
})
  .then(() => console.log("Yhteys MongoDB:hen onnistui."))
  .catch(err => console.error("MongoDB virhe:", err));

// Mongoose malli uutiselle
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  fullContent: { type: String, required: false }, // Koko sisältö
  imageUrl: { type: String, required: false }, // Kuvan URL osoite (ei pakollinen)
  createdBy: { type: String, required: true }, // kuka loi uutisen
  createdAt: { type: Date, default: Date.now }, // Luontipäivämäärä
  updatedAt: { type: Date, default: Date.now }, // Päivitetty päivämäärä
  comments: [   // Kommentit                  
    {
      username: { type: String, required: false }, // Kuka kommentoi
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  tags: { type: [String], required: false }, // Tagit
});

const News = mongoose.model("News", newsSchema);

// Hae kaikki uutiset
app.get("/news", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hae yksittäinen uutinen id:n perusteella
app.get("/news/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Virheellinen ID" });
  }

  try {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ message: "Uutista ei löytynyt" });
    }
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hae uutiset tietyllä tagilla
app.get("/news/tags/:tag", async (req, res) => {
  const { tag } = req.params;
  
  try {
    const news = await News.find({ tags: tag });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Lisää uusi uutinen
app.post("/news", async (req, res) => {
  const { title, content, fullContent, imageUrl, createdBy, tags } = req.body; 

  if (!title || !content || !createdBy) {
    return res.status(400).json({ message: "Otsikko, sisältö ja tekijä vaaditaan" });
  }

  const newNews = new News({
    title,
    content,
    fullContent, // Tallenna fullContent
    imageUrl, // Tallenna imageUrl
    createdBy, // Talenna kuka loi uutisen
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: tags || [], // Tallenna tagit
  });

  try {
    const savedNews = await newNews.save();
    res.json(savedNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/news/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { comment, username } = req.body; // Oletetaan, että body:ssä on 'username' kenttä

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Virheellinen ID" });
  }

  try {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ message: "Uutista ei löytynyt" });
    }

    // Jos käyttäjänimi on tyhjä, käytetään 'Anonyymi'
    const userNameToUse = username && username.trim() !== "" ? username : "Anonyymi";

    // Lisää kommentti ja käyttäjänimi
    newsItem.comments.push({ text: comment, createdAt: new Date(), username: userNameToUse });
    await newsItem.save();

    res.status(201).json({ message: "Kommentti lisätty!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Päivitä uutinen
app.put("/news/:id", async (req, res) => {
  const { title, content, fullContent, imageUrl, createdBy, tags } = req.body; 
  const { id } = req.params;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, content, fullContent, imageUrl, createdBy, tags, updatedAt: new Date() },
      { new: true }
    );
    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Poista uutinen
app.delete("/news/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await News.findByIdAndDelete(id);
    res.json({ message: "Uutinen poistettu!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/news/:id/comments", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Virheellinen ID" });
  }

  try {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ message: "Uutista ei löytynyt" });
    }

    newsItem.comments = []; // Tyhjennetään kommentit
    await newsItem.save();

    res.json({ message: "Kaikki kommentit poistettu!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Poista yksittäinen kommentti
app.delete("/news/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Virheellinen ID" });
  }

  try {
    const newsItem = await News.findById(id);
    if (!newsItem) {
      return res.status(404).json({ message: "Uutista ei löytynyt" });
    }

    // Poista tietty kommentti
    newsItem.comments = newsItem.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await newsItem.save();

    res.json({ message: "Kommentti poistettu!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Palvelimen käynnistys
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnistyi portissa ${PORT}`);
  console.log(`http://localhost:${PORT}/news`);
});
 