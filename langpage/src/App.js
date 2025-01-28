import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from "./context/LanguageContext";
import Navigation from "./components/Navigation";
import LanguageSelector from "./components/LanguageSelector";
import Home from "./components/Home";
import History from "./components/History";
import Contact from "./components/Contact";
import { CssBaseline, Container } from "@mui/material";

function App() {
  return (
    <LanguageProvider>
      <CssBaseline />
      <Router>
        <LanguageSelector />
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </Router>
    </LanguageProvider>
  );
};

export default App;
