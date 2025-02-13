"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App = CS.FairyEditor.App;

App.pluginManager.LoadUIPackage(
  App.pluginManager.basePath + "/" + eval("__dirname") + "/Plugin",
);
App.pluginManager.LoadUIPackage(
  App.pluginManager.basePath + "/" + eval("__dirname") + "/Basic",
);

const Plugin1 = require("./Plugin");
const plugin = new Plugin1.default();

function onDestroy() {
  plugin.onDestroy();
}
exports.onDestroy = onDestroy;
