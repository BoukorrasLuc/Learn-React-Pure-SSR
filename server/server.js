const path = require("path");
const fs = require("fs");
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
import App from "../src/App";

const PORT = 8080;
const app = express();
const router = express.Router();

// Nous disons à notre serveur express d'importer l'application du côté client.
// Nous disons à notre serveur express de servir le dossier /build en tant que fichiers statiques.
// où la méthode renderToString de ReactDOMServer est responsable du rendu du contenu de notre application en chaîne html.
// Remarques : ReactDOM.hydrate() est identique à render(), mais il est utilisé pour hydrater (attacher des écouteurs d'événement) un conteneur dont le contenu HTML a été rendu par      ReactDOMServer. React tentera d'attacher des écouteurs d'événement au balisage existant.

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
};

router.use("^/$", serverRenderer);

// __dirname est une constante qui contient le chemin absolu du dossier courant.
// ".." est le chemin relatif vers le dossier parent.
// Nous utilisons la méthode statique serve pour fournir le dossier /build en tant que fichiers statiques.

router.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
