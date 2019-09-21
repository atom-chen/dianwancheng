var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameResultPanel = (function (_super) {
    __extends(GameResultPanel, _super);
    function GameResultPanel(data, cb) {
        var _this = _super.call(this) || this;
        _this.data = null;
        _this.cb = null;
        _this.tt = 0;
        _this.skinName = "resource/skins/other/GameResultPanelSkin.exml";
        _this.data = data;
        _this.cb = cb;
        return _this;
    }
    GameResultPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        this.bg.source = GlobalData.cdnResUrl + "resource/assets/noload/noloding.gameresult.png";
        this.imgGold.source = GlobalData.cdnResUrl + "resource/assets/noload/noloding.gamegold.png";
        this.guang.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.guang.png";
        this.tt = setTimeout(this.dispose.bind(this), 3000);
        this.guang.anchorOffsetX = 250;
        this.guang.anchorOffsetY = 250;
        this.guang.x += 250;
        this.guang.y += 250;
        TimerManager.getInstance().setFrame("GameResultPanel.gogo", this.gogo.bind(this), this);
        this.setData();
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    };
    GameResultPanel.prototype.gogo = function () {
        this.guang.rotation += 5;
    };
    GameResultPanel.prototype.setData = function () {
        var data = this.data;
        this.imgResult.source = data.res;
        this.txtYing.text = "+" + data.win;
        this.txtCaiJing.text = "本局获得彩金为: " + data.caijing;
        if (data.max.name != "") {
            this.txtTips.visible = false;
            this.maxWin.visible = true;
            this.txtVip.text = "VIP" + data.max.vip;
            this.txtName.text = data.max.name;
            this.txtMaxGold.text = data.max.maxGold;
            this.head.source = data.max.headurl;
        }
        else {
            this.txtTips.visible = true;
            this.maxWin.visible = false;
        }
        if (parseInt(data.win + "") > 0) {
            MusicManage.playMuisc("fruit_win");
            this.imgTishi.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.txt2.png";
        }
        else {
            MusicManage.playMuisc("fruit_fail");
            this.imgTishi.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.txt3.png";
        }
    };
    GameResultPanel.prototype.dispose = function () {
        if (this.cb) {
            this.cb();
        }
        TimerManager.getInstance().remove("GameResultPanel.gogo");
        clearTimeout(this.tt);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    GameResultPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return GameResultPanel;
}(eui.Component));
__reflect(GameResultPanel.prototype, "GameResultPanel", ["fany.IDispose"]);
