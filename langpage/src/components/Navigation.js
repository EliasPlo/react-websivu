import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { IntlProvider, FormattedMessage } from "react-intl";
import { AppBar, Tabs, Tab, Toolbar } from "@mui/material";

const Navigation = () => {
  const { locale, messages } = useContext(LanguageContext);
  const location = useLocation();
  const routes = ["/", "/history", "/contact"];
  const [selectedTab, setSelectedTab] = useState(routes.indexOf(location.pathname));

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <AppBar position="static">
        <Toolbar>
          <Tabs value={selectedTab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
            <Tab label={<FormattedMessage id="home" />} component={Link} to="/" />
            <Tab label={<FormattedMessage id="history" />} component={Link} to="/history" />
            <Tab label={<FormattedMessage id="contact" />} component={Link} to="/contact" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </IntlProvider>
  );
};

export default Navigation;
