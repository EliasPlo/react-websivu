import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { IntlProvider, FormattedMessage } from "react-intl";
import { Container, Typography, TextField, Button } from "@mui/material";

const getTitle = (page) => `${page}_title`;
const getContent = (page) => `${page}_content`;

const Contact = () => {
  const { locale, messages } = useContext(LanguageContext);

  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      <Container>
        {/* Otsikko */}
        <Typography variant="h4">
          <FormattedMessage id={getTitle("contactPage")} defaultMessage="Ota yhteyttä" />
        </Typography>

        {/* Kuvaus */}
        <Typography variant="body1" style={{ marginBottom: "20px" }}>
          <FormattedMessage id={getContent("contactPage")} defaultMessage="Sisältö ei löytynyt." />
        </Typography>

        {/* Lomakekentät */}
        <form>
          <TextField
            label={<FormattedMessage id="name" defaultMessage="Nimi" />}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={<FormattedMessage id="age" defaultMessage="Ikä" />}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={<FormattedMessage id="subject" defaultMessage="Aihe" />}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label={<FormattedMessage id="message" defaultMessage="Viesti" />}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          
          {/* Lähetä-nappi */}
          <Button variant="contained" color="primary" type="submit">
            <FormattedMessage id="submit" defaultMessage="Lähetä" />
          </Button>
        </form>
      </Container>
    </IntlProvider>
  );
};

export default Contact;
