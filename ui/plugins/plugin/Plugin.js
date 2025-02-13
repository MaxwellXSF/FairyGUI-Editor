Object.defineProperty(exports, "__esModule", { value: true });

const FairyEditor = CS.FairyEditor;
const App = FairyEditor.App;

const CustomPlugin1 = require("./view/CustomPlugin");

class Plugin {
  constructor() {
    let menu = App.menu.GetSubMenu("tool");
    menu.AddItem(
      "自定义插件",
      "CustomPlugin",
      this.onOpenCustomPlugin.bind(this),
    );
  }

  onOpenCustomPlugin() {
    CustomPlugin1.default.show();
    // console.log("----------onOpenCustomPlugin");
  }

  onDestroy() {
    let menu = App.menu.GetSubMenu("tool");
    menu.RemoveItem("CustomPlugin");
  }
}

exports.default = Plugin;
