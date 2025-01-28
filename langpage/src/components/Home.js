import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { IntlProvider, FormattedMessage } from "react-intl";
import { Container, Typography } from "@mui/material";

const getTitle = (page) => `${page}_title`;
const getContent = (page) => `${page}_content`;

const Home = () => {
  const { locale, messages } = useContext(LanguageContext);

  return (
    <IntlProvider key={locale} locale={locale} messages={messages[locale]}>
      <Container>
        <Typography variant="h4">
          <FormattedMessage id={getTitle("homePage")} defaultMessage="Tervetuloa!" />
        </Typography>
        <Typography variant="body1">
          <FormattedMessage id={getContent("homePage")} defaultMessage="Sisältö ei löytynyt." />
        </Typography>
      </Container>
    </IntlProvider>
  );
};

export default Home;
