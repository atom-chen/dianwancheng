var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var YaoQingPanel = (function (_super) {
    __extends(YaoQingPanel, _super);
    function YaoQingPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/yaoqing/YaoQingPanelSkin.exml";
        return _this;
    }
    YaoQingPanel.prototype.childrenCreated = function () {
        this.tuiguang.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.haibao.jpg";
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        // var sprite = QuickManage.getErSp();
        // sprite.y=460;
        // sprite.x=225;
        // this.addChild(sprite);
        this.erweima.source = GlobalData.configData.data.erweimaapi + GlobalData.configData.data.erweimaurl + "?yid=" + GlobalData.account;
        Net.send(Protocol.YAO_QING, {}, this.yaoqingHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnTiXian, egret.TouchEvent.TOUCH_TAP, this.btnTiXianHandle.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.tuiguangGroup, egret.TouchEvent.TOUCH_TAP, this.tuiguangHide.bind(this));
    };
    YaoQingPanel.prototype.tuiguangHide = function () {
        this.tuiguangGroup.visible = false;
    };
    YaoQingPanel.prototype.btnTiXianHandle = function () {
        this.tuiguangGroup.visible = true;
    };
    YaoQingPanel.prototype.yaoqingHandle = function (r) {
        if (r.code == 200) {
            this.txtHongBao.text = "已获得点券:" + (parseInt(r.data.backRmb + "") / 100);
            this.txtYaoNum.text = "已邀请:" + r.data.count;
        }
    };
    YaoQingPanel.prototype.updateData = function (data) {
        var hongbao = parseInt(this.txtHongBao.text);
        var tixian = parseInt(data.backRmb + "") / 100;
        var nowrmb = hongbao - tixian;
        if (nowrmb < 1) {
            nowrmb = 0;
        }
        this.txtHongBao.text = "已获得点券:" + nowrmb;
    };
    YaoQingPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    YaoQingPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return YaoQingPanel;
}(eui.Component));
__reflect(YaoQingPanel.prototype, "YaoQingPanel", ["fany.IDispose"]);
