const FairyGUI = CS.FairyGUI;
const FairyEditor = CS.FairyEditor;
import PluginMgr from "../PluginMgr";
import UIWind, { WindData } from "./UIWind";
const App = FairyEditor.App;

export default class CustomPlugin extends UIWind {
  constructor() {
    super(new WindData("Plugin", "CustomPlugin"));
  }

  static show() {
    let url = PluginMgr.joinUrl("Plugin", "CustomPlugin");
    if (UIWind.FindUrl(url) == undefined) {
      UIWind.add(new this());
    }
    super.show(url);
  }

  private list: CS.FairyGUI.GList;
  private listData = [];
  protected onInit(): void {
    super.onInit();
    let closeBtn = this.contentPane.GetChild("btnClose").asButton;
    closeBtn.onClick.Add(this.onCloseClick.bind(this));

    let checkListBtn = this.contentPane.GetChild("btnCheckList").asButton;
    checkListBtn.onClick.Add(this.onCheckListClick.bind(this));

    this.list = this.contentPane.GetChild("list").asList;
    this.list.itemRenderer = this.onItemRenderer.bind(this);
    this.list.SetVirtual();
  }

  protected onShown(): void {
    super.onShown();
  }

  protected onHide(): void {
    super.onHide();
  }

  private onCloseClick() {
    let self = this;
    this.Hide();
    FairyGUI.Timers.inst.Add(0.05, 1, () => {
      UIWind.remove(self);
    });
  }

  private sleep(delay: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, delay);
    });
  }

  private async onCheckListClick() {
    this.listData = [];
    let pkgs = App.project.allPackages;
    for (let i = 0; i < pkgs.Count; i++) {
      let pkg = pkgs.get_Item(i);
      if (!pkg || !pkg.items) {
        continue;
      }
      let count = pkg.items.Count;
      for (let index = 0; index < count; index++) {
        let item = pkg.items.get_Item(index);

        //if (!item.exported) continue;
        if (item.type != FairyEditor.FPackageItemType.COMPONENT) {
          continue;
        }

        if (index % 50 == 0) {
          await this.sleep(0);
        }

        PluginMgr.listAutoClearItems(item, this.listData);
      }
    }

    this.list.numItems = this.listData.length;
  }

  private onItemRenderer(index: number, obj: CS.FairyGUI.GComponent): void {
    let data = this.listData[index];
    obj.GetChild("title").text = data;

    obj.__onDispose = () => {
      obj.GetChild("title").text = "";
    };
  }
}
