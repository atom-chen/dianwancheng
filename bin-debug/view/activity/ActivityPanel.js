var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ActivityPanel = (function (_super) {
    __extends(ActivityPanel, _super);
    function ActivityPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/activity/ActivitySkin.exml";
        return _this;
    }
    ActivityPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        GlobalData.isHasShowActive = true;
        EventManage.addButtonEvent(this, this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnTurn, egret.TouchEvent.TOUCH_TAP, this.onpenLottery.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        this.arr = [];
        this.data = [];
        this.createItems();
    };
    ActivityPanel.prototype.createItems = function () {
        var arr = [{ stt: "游戏更新公告", state: "", content: "gengxin" }, { stt: "开服活动", state: "hd.hot", content: "kaifu" }, { stt: "首充活动公告", state: "hd.hot", content: "shouchong" }, { stt: "月卡终身卡", state: "hd.new", content: "yueka" }, { stt: "免费金币活动", state: "", content: "free" },
            { stt: "法律声明", state: "", content: "shengming" }];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var item = ObjManage.getObj("ActivityItemPanel");
            item.x = 0;
            item.y = 56 * i;
            this.itemGroup.addChild(item);
            item.setData(arr[i]);
            EventManage.addButtonEvent(this, item, egret.TouchEvent.TOUCH_TAP, this.clickItem.bind(this, item, arr[i].content));
            this.data.push(item);
            this.arr.push(item);
        }
        this.clickItem(this.arr[0], "gengxin");
    };
    ActivityPanel.prototype.clearItems = function () {
        ObjManage.clearItems("ActivityItemPanel");
    };
    ActivityPanel.prototype.clickItem = function (item, content) {
        this.txtScroller.viewport.validateNow();
        egret.Tween.get(this.txtScroller.viewport).to({ scrollV: 0 }, 200);
        var len = this.data.length;
        for (var i = 0; i < len; i++) {
            var obj = this.data[i];
            obj.click(false);
        }
        item.click(true);
        this.txtContent.text = GlobalData.configData.huodong["" + content];
        if (content == "kaifu") {
            this.btnTurn.visible = true;
        }
        else {
            this.btnTurn.visible = false;
        }
    };
    ActivityPanel.prototype.onpenLottery = function () {
        PanelManage.openLottery();
    };
    ActivityPanel.prototype.dispose = function () {
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ActivityPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ActivityPanel;
}(eui.Component));
__reflect(ActivityPanel.prototype, "ActivityPanel", ["fany.IDispose"]);
