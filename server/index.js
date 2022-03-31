//  ignore-styles est un ignorer qui ignore les styles de l'application.
require("ignore-styles");

// babel est un transpiler
require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

// ./server est le chemin absolu vers le dossier server.
require("./server");
