var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DaShangPanel = (function (_super) {
    __extends(DaShangPanel, _super);
    function DaShangPanel() {
        var _this = _super.call(this) || this;
        _this.moneyArr = [100000, 200000, 1000000, 2000000, 5000000, 10000000];
        _this.lastSelectMoney = -1;
        _this.publishID = '';
        _this.skinName = "resource/skins/dashang/DashangSkin.exml";
        return _this;
    }
    DaShangPanel.prototype.childrenCreated = function () {
        this.grpSecond.visible = false;
        this.grpPublish.visible = false;
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        EventManage.addButtonEvent(this, this.btnSend, egret.TouchEvent.TOUCH_TAP, this.onTouchSend.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.onTouchSure.bind(this));
        EventManage.addButtonEvent(this, this.btnCloseSecond, egret.TouchEvent.TOUCH_TAP, this.onTouchSecondClose.bind(this));
        EventManage.addButtonEvent(this, this.btnPublishSure, egret.TouchEvent.TOUCH_TAP, this.onTouchPublishSure.bind(this));
        EventManage.addButtonEvent(this, this.btnClosePublish, egret.TouchEvent.TOUCH_TAP, this.onTouchPublishClose.bind(this));
        for (var i = 0; i < 6; i++) {
            EventManage.addEvent(this, this['grpMoney' + i], egret.TouchEvent.TOUCH_TAP, this.onTouchPublishNum.bind(this, i));
        }
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.DASHANG_NOTICE_PUBLISH, this.showPublishPanel.bind(this));
        Net.send(Protocol.HALL_REWARD_LIST, {}, this.rewardListCallBack.bind(this));
    };
    DaShangPanel.prototype.onTouchClose = function () {
        this.dispose();
    };
    DaShangPanel.prototype.onTouchSend = function () {
        this.grpSecond.visible = true;
    };
    DaShangPanel.prototype.onTouchSure = function () {
        Net.send(Protocol.HALL_RELEASE_REWARD, {}, this.touchSureCallback.bind(this));
        this.grpSecond.visible = false;
    };
    DaShangPanel.prototype.touchSureCallback = function (msg) {
        if (msg.code == 200) {
            Net.send(Protocol.HALL_REWARD_LIST, {}, this.rewardListCallBack.bind(this));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    DaShangPanel.prototype.sendCallback = function (msg) {
        if (msg.code == 200) {
            this.grpSecond.visible = false;
        }
    };
    DaShangPanel.prototype.onTouchSecondClose = function () {
        this.grpSecond.visible = false;
    };
    DaShangPanel.prototype.onTouchPublishClose = function () {
        this.grpPublish.visible = false;
    };
    DaShangPanel.prototype.showPublishPanel = function (data) {
        if (data.param == (GlobalData.openid + '@' + GlobalData.platform)) {
            TipsManage.showTips('不可以打赏自己！');
            return;
        }
        this.publishID = data.param;
        this.lastSelectMoney = 0;
        this['imgMoney' + this.lastSelectMoney].source = 'c.labbg1'; //select
        this.grpPublish.visible = true;
        this.grpPublishInput.visible = false;
        this.grpPublishSelect.visible = true;
    };
    DaShangPanel.prototype.showPublishInput = function () {
        this.grpPublishInput.visible = true;
        this.grpPublishSelect.visible = false;
    };
    DaShangPanel.prototype.onTouchPublishNum = function (index) {
        if (index == this.lastSelectMoney)
            return;
        this['imgMoney' + this.lastSelectMoney].source = 'c.labbg0'; //--select
        // if (index == 5) {
        //     this.showPublishInput();
        //     return;
        // }
        this['imgMoney' + index].source = 'c.labbg1'; //--select
        this.lastSelectMoney = index;
    };
    DaShangPanel.prototype.onTouchPublishSure = function () {
        var gold = 0;
        // if (this.grpPublishInput) {
        //     gold = parseInt(this.labInputGold.text) * 10000;
        // }
        // else {
        gold = this.moneyArr[this.lastSelectMoney];
        // }
        Net.send(Protocol.HALL_GIVE_REWARD, { dsId: this.publishID, gold: gold }, this.giveRewardCallback.bind(this));
    };
    DaShangPanel.prototype.giveRewardCallback = function (msg) {
        if (msg.code == 200) {
            this.grpPublish.visible = false;
            Net.send(Protocol.HALL_REWARD_LIST, {}, this.rewardListCallBack.bind(this));
            GlobalData.user.gold = msg.gold;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    DaShangPanel.prototype.rewardListCallBack = function (msg) {
        this.clearItems();
        for (var i = 0; i < msg.data.length; i++) {
            if (i > 20)
                return;
            var item = ObjManage.getObj('DaShangItem');
            item.x = 0;
            item.y = item.height * i;
            item.setInfo(msg.data[i]);
            this.grpItem.addChild(item);
        }
    };
    DaShangPanel.prototype.clearItems = function () {
        while (this.grpItem.numChildren > 0) {
            ObjManage.addObj("DaShangPanel", this.grpItem.removeChildAt(0));
        }
    };
    DaShangPanel.prototype.dispose = function () {
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    DaShangPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return DaShangPanel;
}(eui.Component));
__reflect(DaShangPanel.prototype, "DaShangPanel", ["fany.IDispose"]);
