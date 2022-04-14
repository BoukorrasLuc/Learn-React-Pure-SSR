//  ignore-styles est fait pour ignorer les importations de style lors de l'exécution dans Node
require("ignore-styles");

// babel est un transpiler qui permet de transformer du Jsx en ES6//
require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  // @babel/preset-env est un préréglage intelligent qui vous permet d'utiliser le dernier JavaScript sans avoir besoin de microgérer les transformations de syntaxe
  // @babel/preset-react est un préréglage qui inclue plus plugins dont j'ai pas encore eu le temps de découvrir.
});

// ./server est le chemin absolu vers le dossier server.
require("./server");
