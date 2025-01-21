const request = require("request");

const wikisearch = (haku, callback) => {
  const url =
    "https://fi.wikipedia.org/w/api.php?action=query&titles=" +
    encodeURIComponent(haku) +
    "&format=json&formatversion=2&prop=extracts&exintro&explaintext&exsentences=4";
  request({ uri: url, json: true }, (error, response, body) => {
    if (error) {
      callback("ei yhteyttä darkboxiin", undefined);
    } else if (body.error) {
      callback("Ei oo paikkaa", undefined);
    } else {
      //callback(undefined, body.query.pages[0].extract);
      callback(undefined, body.query.pages);
    }
  });
};

module.exports = {
    wikisearch,
};

/*const request = require("request");

const wikisearch = (haku, callback) => {
  const url =
    "https://fi.wikipedia.org/w/api.php?action=query&titles=" +
    encodeURIComponent(haku) +
    "&format=json&formatversion=2&prop=extracts|pageprops&explaintext";

  request({ uri: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Ei yhteyttä Wikipediaan", undefined);
    } else if (body.error) {
      callback("Tietoa ei löydy", undefined);
    } else {
      const page = body.query.pages[0];
      if (page.missing) {
        callback(`Hakusanalla "${haku}" ei löytynyt tuloksia.`, undefined);
      } else {
        const info = {
          title: page.title,
          extract: page.extract,
          disambiguation: page.pageprops?.disambiguation || null,
        };
        callback(undefined, info);
      }
    }
  });
};

module.exports = {
  wikisearch,
};*/
