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
  createdAt: { type: Date, default: Date.now }, // Luontipäivämäärä
  updatedAt: { type: Date, default: Date.now }  // Päivitetty päivämäärä
  }
);

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


// Lisää uusi uutinen
app.post("/news", async (req, res) => {
  const { title, content, fullContent } = req.body; // Lisää fullContent
  const newNews = new News({
    title,
    content,
    fullContent, // Tallenna fullContent
    imageUrl, // Tallenna imageUrl
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  try {
    const savedNews = await newNews.save();
    res.json(savedNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Päivitä uutinen
app.put("/news/:id", async (req, res) => {
  const { title, content, fullContent, imageUrl } = req.body; // Lisää fullContent
  const { id } = req.params;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, content, fullContent, imageUrl, updatedAt: new Date() }, // Päivitä fullContent
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

// Palvelimen käynnistys
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Palvelin käynnistyi portissa ${PORT}`);
});
 