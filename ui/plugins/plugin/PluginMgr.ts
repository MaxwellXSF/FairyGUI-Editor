const FairyEditor = CS.FairyEditor;
const System = CS.System;
const App = FairyEditor.App;

export default class PluginMgr {
  static listAutoClearItems(
    item: CS.FairyEditor.FPackageItem,
    list: any[],
  ): void {
    let xml = CS.FairyEditor.XMLExtension.Load(item.file);
    let rootElements = xml.Elements();
    for (let index = 0; index < rootElements.Count; index++) {
      let child = rootElements.get_Item(index);
      if (child.name != "displayList") {
        continue;
      }

      let childElements = child.Elements();
      for (let index = 0; index < childElements.Count; index++) {
        const element = childElements.get_Item(index);
        if (element.name == FairyEditor.FObjectType.LIST) {
          if (element.GetAttribute("autoClearItems")) {
            continue;
          }

          let txt =
            item.owner.name +
            "=======>" +
            item.name +
            "=======>" +
            element.GetAttribute("name") +
            "未发布清空";
          if (list.indexOf(txt) === -1) {
            list.push(txt);
          }
        } else {
          let url = element.GetAttribute("url");
          if (!url) {
            continue;
          }

          let packageItem = App.project.GetItemByURL(url);
          if (packageItem) {
            if (
              packageItem &&
              packageItem.type == FairyEditor.FPackageItemType.COMPONENT
            ) {
              this.listAutoClearItems(packageItem, list);
            }
          }
        }
      }
    }
  }

  /**拼接fgui url */
  static joinUrl(pkg: string, res: string) {
    return `ui://${pkg}/${res}`;
  }

  static sleep(delay: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, delay);
    });
  }
}
