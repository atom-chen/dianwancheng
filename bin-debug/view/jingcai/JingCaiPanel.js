var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JingCaiPanel = (function (_super) {
    __extends(JingCaiPanel, _super);
    function JingCaiPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/jingcai/JingCaiPanelSkin.exml";
        return _this;
    }
    JingCaiPanel.prototype.childrenCreated = function () {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnJingcaitxt, egret.TouchEvent.TOUCH_TAP, this.btnJingcaiHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnWangqitxt, egret.TouchEvent.TOUCH_TAP, this.btnWangqiHandle.bind(this));
        Net.send(Protocol.GET_JINGCAI_LIST, {}, this.jingcailistcallback.bind(this));
    };
    JingCaiPanel.prototype.btnJingcaiHandle = function () {
        this.btnJingcai.visible = true;
        this.btnWangqi.visible = false;
        Net.send(Protocol.GET_JINGCAI_LIST, {}, this.jingcailistcallback.bind(this));
    };
    JingCaiPanel.prototype.btnWangqiHandle = function () {
        this.btnJingcai.visible = false;
        this.btnWangqi.visible = true;
        Net.send(Protocol.GET_JINGCAI_HISTORY_LIST, {}, this.historyCB.bind(this));
    };
    JingCaiPanel.prototype.jingcailistcallback = function (r) {
        if (r.code == 200) {
            this.clearItems();
            var list = r.data.competitionlist;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("JingCaiItemPanel");
                item.y = i * 335;
                this.itemGroup.addChild(item);
                item.setData(list[i]);
                this.arr.push(item);
            }
        }
    };
    JingCaiPanel.prototype.historyCB = function (data) {
        console.log(JSON.stringify(data));
        if (data.code == 200) {
            this.clearItems();
            var list = data.data;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("JingCaiItemPanel");
                item.y = i * 335;
                this.itemGroup.addChild(item);
                item.setData(list[i]);
                this.arr.push(item);
            }
        }
    };
    JingCaiPanel.prototype.clearItems = function () {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("JingCaiItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    };
    JingCaiPanel.prototype.dispose = function () {
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    JingCaiPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return JingCaiPanel;
}(eui.Component));
__reflect(JingCaiPanel.prototype, "JingCaiPanel", ["fany.IDispose"]);
