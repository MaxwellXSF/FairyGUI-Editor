import CustomPlugin from "./view/CustomPlugin";

const FairyEditor = CS.FairyEditor;
const App = FairyEditor.App;

export default class Plugin {
  public constructor() {
    let menu = App.menu.GetSubMenu("tool");
    menu.AddItem(
      "自定义插件",
      "CustomPlugin",
      this.onOpenCustomPlugin.bind(this),
    );
  }

  private onOpenCustomPlugin() {
    CustomPlugin.show();
    console.log("----------onOpenCustomPlugin");
  }

  onDestroy() {
    let menu = App.menu.GetSubMenu("tool");
    menu.RemoveItem("CustomPlugin");
  }
}
