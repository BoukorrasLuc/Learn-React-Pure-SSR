import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Remarques : ReactDOM.hydrate() est similaire à render(), mais sert à hydrater un conteneur dont le HTML a déjà été produit par ReactDOMServer. React tentera alors d’associer les gestionnaires d’événements au balisage existant.

ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
