var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PokerPanel = (function (_super) {
    __extends(PokerPanel, _super);
    function PokerPanel() {
        var _this = _super.call(this) || this;
        _this.flag = false;
        _this.skinName = "resource/skins/ddz/PokerPanelSkin.exml";
        return _this;
    }
    PokerPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    PokerPanel.prototype.setData = function (data) {
        //console.log("牌的资源是=="+data.res)
        this.poker.source = data.res;
    };
    PokerPanel.prototype.getData = function () {
        return this.poker.source;
    };
    PokerPanel.prototype.setSelect = function () {
        //this.hui.visible = !this.hui.visible;
        MusicManage.playMuisc("s004");
        if (this.hui.visible) {
            this.hui.visible = false;
            this.y = 800;
            this.removePoker();
        }
        else {
            this.hui.visible = true;
            this.y = 780;
            GlobalData.curData.push(this.poker.source);
        }
    };
    PokerPanel.prototype.removePoker = function () {
        var len = GlobalData.curData.length;
        for (var i = 0; i < len; i++) {
            if (GlobalData.curData[i] == this.poker.source) {
                GlobalData.curData.splice(i, 1);
            }
        }
    };
    PokerPanel.prototype.setSelect2 = function () {
        if (!this.hui.visible) {
            MusicManage.playMuisc("s004");
            this.hui.visible = true;
            this.y = 780;
            GlobalData.curData.push(this.poker.source);
        }
    };
    PokerPanel.prototype.setSelect3 = function () {
        if (this.hui.visible) {
            MusicManage.playMuisc("s004");
            this.hui.visible = false;
            this.y = 800;
            this.removePoker();
        }
    };
    PokerPanel.prototype.setHui = function () {
        this.hui.visible = false;
    };
    return PokerPanel;
}(eui.Component));
__reflect(PokerPanel.prototype, "PokerPanel");
