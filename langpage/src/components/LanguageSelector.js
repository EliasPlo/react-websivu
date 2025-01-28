import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Box, IconButton } from "@mui/material";

const LanguageSelector = () => {
  const { switchLanguage } = useContext(LanguageContext);

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1} sx={{ ml: "auto" }}>
      <IconButton onClick={() => switchLanguage("fi")} size="small">
        <img src="/flag-fi.png" alt="Suomi" style={{ width: 30, height: 20 }} />
      </IconButton>
      <IconButton onClick={() => switchLanguage("en")} size="small">
        <img src="/flag-en.png" alt="English" style={{ width: 30, height: 20 }} />
      </IconButton>
      <IconButton onClick={() => switchLanguage("se")} size="small">
        <img src="/flag-se.png" alt="Svenska" style={{ width: 30, height: 20 }} />
      </IconButton>
    </Box>
  );
};

export default LanguageSelector;
