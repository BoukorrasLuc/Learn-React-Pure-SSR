const path = require("path");
const fs = require("fs");
const express = require("express");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
import App from "../src/App";

const PORT = 8080;
const app = express();
const router = express.Router();

// Nous allons dire à notre serveur express d'importer l'application du côté client.

const serverRenderer = (req, res, next) => {
  // Nous disons à notre serveur express de servir le dossier /build en tant que fichiers statiques.

  // Le chemin renvoyé sera ./build/index.html puis qu'il s'agit du premier chemin absolu pouvant être construit.
  fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        //la méthode renderToString de ReactDOMServer est responsable du rendu du contenu de notre application en chaîne html.
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
};

// ( path, function )
router.use("^/$", serverRenderer);

// Nous utilisons la méthode statique d'express pour fournir le dossier /build en tant que fichiers statiques.
// __dirname est une constante qui contient le chemin absolu du dossier courant.
// ".." est le chemin relatif vers le dossier parent.

router.use(express.static(path.resolve(__dirname, "..", "build")));

app.use(router);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
