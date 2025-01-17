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

app.listen(4000, () => {
    console.log('Server is running on port 4000');
    console.log('http://localhost:4000/wiki');
});
  