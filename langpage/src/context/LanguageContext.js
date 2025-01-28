import React, { createContext, useState, useEffect } from "react";
import messages_fi from "../locales/messages_fi";
import messages_en from "../locales/messages_en";
import messages_se from "../locales/messages_se";

const LanguageContext = createContext();

const messages = {
    fi: messages_fi,
    en: messages_en,
    se: messages_se
};

const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState("fi");
    const [currentMessages, setCurrentMessages] = useState(messages[locale]);

    const switchLanguage = (lang) => {
        console.log("Vaihdetaan kieli:", lang);
        setLocale(lang);
    };

    useEffect(() => {
        setCurrentMessages(messages[locale]);
        console.log("LanguageProvider päivittää viestit:", messages[locale]);
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, switchLanguage, messages }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext, LanguageProvider };

