"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

Object.defineProperty(exports, "__esModule", { value: true });
const FairyGUI = CS.FairyGUI;
const FairyEditor = CS.FairyEditor;
const UIWind_1 = require("./UIWind");
const PluginMgr_1 = require("../PluginMgr");
const App = FairyEditor.App;
class CustomPlugin extends UIWind_1.default {
  constructor() {
    super(new UIWind_1.WindData("Plugin", "CustomPlugin"));
  }
  static show() {
    let url = PluginMgr_1.default.joinUrl("Plugin", "CustomPlugin");
    if (UIWind_1.default.FindUrl(url) == undefined) {
      UIWind_1.default.add(new this());
    }
    super.show(url);
  }

  onInit() {
    super.onInit();
    let close = this.contentPane.GetChild("btnClose").asButton;
    close.onClick.Add(this.onCloseClick.bind(this));

    let checkListBtn = this.contentPane.GetChild("btnCheckList").asButton;
    checkListBtn.onClick.Add(this.onCheckListClick.bind(this));

    this.listData = ["1", "2", "3"];
    this.list = this.contentPane.GetChild("list").asList;
    this.list.itemRenderer = this.onItemRenderer.bind(this);
    this.list.SetVirtual();
  }
  onShown() {
    super.onShown();
  }
  onHide() {
    super.onHide();
  }
  onCloseClick() {
    let self = this;
    this.Hide();
    FairyGUI.Timers.inst.Add(0.05, 1, () => {
      UIWind_1.default.remove(self);
    });
  }

  sleep(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, delay);
    });
  }

  onCheckListClick() {
    return __awaiter(this, void 0, void 0, function* () {
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
          if (!item.exported) continue;
          if (item.type != FairyEditor.FPackageItemType.COMPONENT) {
            continue;
          }

          if (index % 50 === 0) {
            yield PluginMgr_1.default.sleep(0);
          }

          PluginMgr_1.default.listAutoClearItems(item, this.listData);
        }
      }

      this.list.data = this.listData;
      this.list.numItems = this.listData.length;
    });
  }

  onItemRenderer(index, obj) {
    let data = this.list.data[index];
    obj.data = data;
    obj.GetChild("title").text = data;

    obj.__onDispose = () => {
      obj.GetChild("title").text = "";
      obj.data = null;
    };
  }
}
exports.default = CustomPlugin;
