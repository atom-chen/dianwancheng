var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ClownRankPanel = (function (_super) {
    __extends(ClownRankPanel, _super);
    function ClownRankPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/clown/ClownRankSkin.exml";
        return _this;
    }
    ClownRankPanel.prototype.childrenCreated = function () {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.CLOWN_RANK_DAY, {}, this.ranklistcallback.bind(this));
        EventManage.addEvent(this, this.btnToday, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 1));
        EventManage.addEvent(this, this.btnWeek, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 2));
    };
    ClownRankPanel.prototype.clickBtn = function (num) {
        if (this.btnToday.source == "clown_king_daily" && num == 1) {
            return;
        }
        if (this.btnWeek.source == "clown_king_week" && num == 2) {
            return;
        }
        switch (num) {
            case 1:
                this.btnToday.source = "clown_king_daily";
                this.btnWeek.source = "clown_king_week_s";
                Net.send(Protocol.CLOWN_RANK_DAY, {}, this.ranklistcallback.bind(this));
                break;
            case 2:
                this.btnToday.source = "clown_king_daily_s";
                this.btnWeek.source = "clown_king_week";
                Net.send(Protocol.CLOWN_RANK_WEEK, {}, this.ranklistcallback.bind(this));
                break;
        }
    };
    ClownRankPanel.prototype.ranklistcallback = function (r) {
        if (r.code == 200) {
            this.clearItems();
            var list = r.list;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("ClownRankItemPanel");
                item.y = i * 100;
                this.itemGroup.addChild(item);
                item.setData({ name: list[i].name, vip: list[i].vip, gold: list[i].win, rank: i + 1, headurl: list[i].headurl });
                this.arr.push(item);
            }
        }
    };
    ClownRankPanel.prototype.clearItems = function () {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("ClownRankItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    };
    ClownRankPanel.prototype.dispose = function () {
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ClownRankPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ClownRankPanel;
}(eui.Component));
__reflect(ClownRankPanel.prototype, "ClownRankPanel", ["fany.IDispose"]);
