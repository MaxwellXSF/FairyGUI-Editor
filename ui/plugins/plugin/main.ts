//FYI: https://github.com/Tencent/puerts/blob/master/doc/unity/manual.md

import Plugin from "./Plugin";
import FairyEditor = CS.FairyEditor;
const App = FairyEditor.App;

App.pluginManager.LoadUIPackage(
  App.pluginManager.basePath + "/" + eval("__dirname") + "/Plugin",
);
App.pluginManager.LoadUIPackage(
  App.pluginManager.basePath + "/" + eval("__dirname") + "/Basic",
);

const plugin = new Plugin();

function onDestroy() {
  plugin.onDestroy();
}

export { onDestroy };
