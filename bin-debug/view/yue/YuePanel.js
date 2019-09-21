var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var YuePanel = (function (_super) {
    __extends(YuePanel, _super);
    function YuePanel() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        // private yid: number = 0;
        // private zid: number = 0;
        _this.yueeveryday = "";
        _this.zhongeveryday = "";
        _this.skinName = "resource/skins/yue/YueKaPanelSkin.exml";
        return _this;
    }
    YuePanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        this.quan1.touchEnabled = false;
        this.quan2.touchEnabled = false;
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.zhongshenka, egret.TouchEvent.TOUCH_TAP, this.btnZhongshenHandle.bind(this));
        EventManage.addButtonEvent(this, this.yueka, egret.TouchEvent.TOUCH_TAP, this.btnYueKaHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnJiHuo, egret.TouchEvent.TOUCH_TAP, this.btnJiHuoHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnget, egret.TouchEvent.TOUCH_TAP, this.btngetHandle.bind(this));
        Net.send(Protocol.YUE_KA, {}, this.yueHandle.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
    };
    YuePanel.prototype.updatePayData = function (r) {
        var data = r.param;
        if (data.msg.type == 2) {
            if (data.msg.id == this.yue.id) {
                this.yueisbuy.source = "yue.yesbuy";
                this.txtYueTime.visible = true;
                this.txtYueTime.text = "剩余" + data.msg.lastDay + "天";
            }
            else {
                this.zhongisbuy.source = "yue.yesbuy";
                this.txtZhongTime.text = "终身";
                this.txtZhongTime.visible = true;
            }
        }
        // GlobalData.user.gold = data.msg.gold + "";
        // GlobalData.user.vip = data.msg.vip + "";
    };
    YuePanel.prototype.btngetHandle = function () {
        if (this.count == 0) {
            Net.send(Protocol.GET_YUE, { shopId: this.yue.id }, this.getyueHandle.bind(this));
        }
        else {
            Net.send(Protocol.GET_YUE, { shopId: this.zhong.id }, this.getyueHandle.bind(this));
        }
    };
    YuePanel.prototype.getyueHandle = function (r) {
        if (r.code == 200) {
            if (this.count == 0) {
                GlobalData.user.gold = r.gold + "";
                TipsManage.showTips("领取成功! +" + this.yueeveryday);
            }
            else {
                GlobalData.user.gold = r.gold + "";
                TipsManage.showTips("领取成功! +" + this.zhongeveryday);
            }
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    YuePanel.prototype.yueHandle = function (r) {
        if (r.code == 200) {
            this.txtYueTime.visible = true;
            this.txtZhongTime.visible = true;
            if (r.list[0].name == "月卡") {
                this.yue = r.list[0];
                this.zhong = r.list[1];
            }
            else {
                this.yue = r.list[1];
                this.zhong = r.list[0];
            }
            this.yueeveryday = QuickManage.moneyStr(parseInt(this.yue.everyDay + ""));
            this.zhongeveryday = QuickManage.moneyStr(parseInt(this.zhong.everyDay + ""));
            this.txtYueStr1.text = "每日领取" + this.yueeveryday;
            this.txtYueStr2.text = "充值立送" + QuickManage.moneyStr(parseInt(this.yue.gold + ""));
            this.txtZhongStr1.text = "每日领取" + this.zhongeveryday;
            this.txtZhongStr2.text = "充值立送" + QuickManage.moneyStr(parseInt(this.zhong.gold + ""));
            this.txtYueRate.text = "系统手续费减少到" + (parseFloat(this.yue.rate) * 100) + "%";
            this.txtZhongRate.text = "系统手续费减少到" + (parseFloat(this.zhong.rate) * 100) + "%";
            if (this.yue.state == "0") {
                this.yueisbuy.source = "yue.nobuy";
                this.txtYueTime.visible = false;
            }
            else if (this.yue.state == "1") {
                this.yueisbuy.source = "yue.yesbuy";
                this.txtYueTime.text = "剩余" + this.yue.lastDay + "天";
            }
            else {
                this.yueisbuy.source = "yue.yilingqu";
                this.txtYueTime.text = "剩余" + this.yue.lastDay + "天";
            }
            if (this.zhong.state == "0") {
                this.zhongisbuy.source = "yue.nobuy";
                this.txtZhongTime.visible = false;
            }
            else if (this.yue.state == "1") {
                this.zhongisbuy.source = "yue.yesbuy";
                this.txtZhongTime.text = "终身";
            }
            else {
                this.zhongisbuy.source = "yue.yilingqu";
                this.txtZhongTime.text = "终身";
            }
        }
    };
    YuePanel.prototype.btnJiHuoHandle = function () {
        if (this.count == 1) {
            PayManage.getInstance().pay(this.zhong.id, "终身卡", this.zhong.rmb);
        }
        else {
            PayManage.getInstance().pay(this.yue.id, "月卡", this.yue.rmb);
        }
    };
    YuePanel.prototype.btnZhongshenHandle = function () {
        this.count = 1;
        this.quan1.visible = false;
        this.quan2.visible = true;
    };
    YuePanel.prototype.btnYueKaHandle = function () {
        this.count = 0;
        this.quan2.visible = false;
        this.quan1.visible = true;
    };
    YuePanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    YuePanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return YuePanel;
}(eui.Component));
__reflect(YuePanel.prototype, "YuePanel", ["fany.IDispose"]);
