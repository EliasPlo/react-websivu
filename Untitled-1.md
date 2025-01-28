EXTRA12: Kolmen kielen sivusto
Tehdään React-sovellus, joka tukee kielten vaihtoa (suomi, englanti ja ruotsi) ja sisältää kolme sivua: Home, History ja Contact. Käyttäjä voi vaihtaa kieltä valitsemalla lippukuvakkeen.
Käytämme:
•	React Router sivunavigointiin
•	react-intl kirjasto monikielisyyteen
•	Context API kielivalinnan hallintaan
Rakenne ja ulkoasu
       

public/index.html


src/index.js


src/App.js



src/components- kansioon (Contact.js, History.js, Home.js, LanguageSelector.js ja Navigation.js)
Contact.js



History.js



Home.js


LanguageSelector.js


Navigation.js


src/context-kansioon (LanguageContext.js)


src/locales-kansioon (messages_en.js, messages_se.js ja messages_fi.js)
messages_en.js


messages_fi.js


messages_se.js



