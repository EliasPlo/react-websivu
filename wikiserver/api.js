const express = require('express');
var cors = require('cors');
const { wikisearch } = require('./wikisearch');

const app = express();
app.use(cors());

app.get("/wiki", (req, res, next) => {
  wikisearch(req.query.haku, (error, data) => {
    if (error) {
      res.end(error);
    } else {
      res.json(data);
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/wiki`);
});
  