var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VipPanel = (function (_super) {
    __extends(VipPanel, _super);
    function VipPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/vip/VipSkin.exml";
        return _this;
    }
    VipPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onTouchVipUp.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.GET_VIPS, {}, this.vipInfo.bind(this));
    };
    VipPanel.prototype.vipInfo = function (msg) {
        if (msg.code == 200) {
            var data = msg.data;
            var vip = data.vip;
            this.labVip.text = 'VIP ' + vip;
            this.clearItems();
            for (var i = 0; i < 15; i++) {
                var item = ObjManage.getObj('VipItem');
                item.x = -5;
                item.y = i * item.height;
                item.setVipMoney(data.vips[i]);
                this.grpContent.addChild(item);
            }
            if (vip == 15) {
                this.labLoading.text = (data.totalMoney / 100) + '/' + (data.vips[14].money / 100);
                this.imgBar.width = 400;
            }
            else {
                this.labLoading.text = (data.totalMoney / 100) + '/' + (data.vips[vip].money / 100);
                this.imgBar.width = 400 * (data.totalMoney / data.vips[vip].money);
            }
        }
    };
    VipPanel.prototype.clearItems = function () {
        var len = this.grpContent.numChildren;
        for (var i = 0; i < len; i++) {
            ObjManage.addObj("VipItem", this.grpContent.removeChildAt(i));
        }
    };
    VipPanel.prototype.onTouchVipUp = function () {
        //console.log('vip');
        this.dispose();
        PanelManage.openShop();
    };
    VipPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    VipPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return VipPanel;
}(eui.Component));
__reflect(VipPanel.prototype, "VipPanel", ["fany.IDispose"]);
