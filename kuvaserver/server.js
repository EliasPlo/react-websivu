const express = require('express');
const path = require('path');
const app = express();
const port = 3050;

// Määritetään, että kuvat löytyvät 'photos' kansiosta
app.use('/photos', express.static(path.join(__dirname, 'photos')));

// Pääsivu
app.get('/', (req, res) => {
  res.send('Tervetuloa kuvaserveriin! Käy selaamassa kuvia /photos/ kautta.');
});

// Käynnistä serveri
app.listen(port, () => {
  console.log(`Kuvaserveri toimii osoitteessa http://localhost:${port}`);
});
