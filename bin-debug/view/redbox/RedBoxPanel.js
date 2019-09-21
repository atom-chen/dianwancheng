var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RedBoxPanel = (function (_super) {
    __extends(RedBoxPanel, _super);
    //  0,金鲨银鲨  1 炸金花  2 牛牛 0 抢红包   1 发红包       
    function RedBoxPanel(game, type, data) {
        var _this = _super.call(this) || this;
        //----------------------------------------------------
        _this.game = -1;
        _this.type = -1;
        _this.data = null;
        _this.isTouch = false;
        _this.level = 0;
        _this.levelArr = [1, 5, 10];
        _this.select = 0;
        _this.selectArr = [1000, 2000, 3000, 5000];
        _this.rid = '';
        _this.intval = -1;
        _this.sendTotalGold = 0;
        _this.skinName = "resource/skins/other/RedBoxPanelSkin.exml";
        _this.game = game;
        _this.type = type;
        _this.data = data;
        return _this;
    }
    RedBoxPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnPlus, egret.TouchEvent.TOUCH_TAP, this.onTouchPlus.bind(this));
        EventManage.addButtonEvent(this, this.btnReduce, egret.TouchEvent.TOUCH_TAP, this.onTouchReduce.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.onTouchSureSend.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.imgRedBox, egret.TouchEvent.TOUCH_TAP, this.onTouchRedBox.bind(this));
        for (var i = 0; i < 4; i++) {
            EventManage.addEvent(this, this['grpMoney' + i], egret.TouchEvent.TOUCH_TAP, this.onTouchMoney.bind(this, i));
        }
        this.level = 0;
        this.labNum.text = this.levelArr[this.level] + '份';
        this.select = 0;
        this['imgSelect' + this.select].source = 'c.labbg1';
        this.labName.text = '';
        this.labInfo.text = '';
        this.labName.touchEnabled = false;
        this.labInfo.touchEnabled = false;
        if (this.type == 0) {
            this.grpRobRed.visible = true;
            this.grpSendRed.visible = false;
            this.labTips.text = '';
            this.intval = setInterval(this.dispose.bind(this), 5000);
        }
        else {
            this.grpSendRed.visible = true;
            this.grpRobRed.visible = false;
        }
        if (this.data != null) {
            if (this.data.name == GlobalData.user.nickname)
                return;
            this.rid = this.data.rid;
            this.labName.text = '土豪' + this.data.name;
            this.labInfo.text = '发了' + QuickManage.moneyStr(this.data.total) + '的红包';
        }
    };
    RedBoxPanel.prototype.setRid = function (msg) {
        if (msg.name == GlobalData.user.nickname)
            return;
        this.rid = msg.rid;
        this.labName.text = '土豪' + msg.name;
        this.labInfo.text = '发了' + QuickManage.moneyStr(msg.total) + '的红包';
    };
    //抢红包
    RedBoxPanel.prototype.onTouchRedBox = function () {
        if (this.isTouch) {
            return;
        }
        this.isTouch = true;
        Net.send(Protocol.GAME_GET_REDBOX, { rid: this.rid }, this.getRedBoxCallback.bind(this));
    };
    RedBoxPanel.prototype.getRedBoxCallback = function (msg) {
        if (msg.code == 200) {
            var str = '';
            if (msg.gold == 0) {
                str = '抱歉您这次没有抢到红包！';
            }
            else {
                str = '恭喜您抢到' + QuickManage.moneyStr(msg.gold);
                // GlobalData.user.gold = (parseInt(GlobalData.user.gold) + parseInt(msg.gold)) + '';
                PanelManage.hall.updateGold();
                lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.OPERTE_REDBOX_COMPLETE));
            }
            this.labTips.text = str;
        }
        else {
            TipsManage.showTips(msg.msg);
        }
        clearInterval(this.intval);
        this.intval = setInterval(this.dispose.bind(this), 500);
    };
    RedBoxPanel.prototype.onTouchPlus = function () {
        if (this.level == 2)
            return;
        this.level++;
        this.labNum.text = this.levelArr[this.level] + '份';
    };
    RedBoxPanel.prototype.onTouchReduce = function () {
        if (this.level == 0)
            return;
        this.level--;
        this.labNum.text = this.levelArr[this.level] + '份';
    };
    RedBoxPanel.prototype.onTouchMoney = function (index) {
        if (this.select == index)
            return;
        this['imgSelect' + this.select].source = 'c.labbg0';
        this.select = index;
        this['imgSelect' + this.select].source = 'c.labbg1';
    };
    //发红包
    RedBoxPanel.prototype.onTouchSureSend = function () {
        this.sendTotalGold = this.selectArr[this.select] * 10000;
        var countNum = this.levelArr[this.level];
        if (this.game == 0) {
            Net.send(Protocol.GAME_ANIMAL_REDBOX, { total: this.sendTotalGold, count: countNum }, this.sendCallback.bind(this));
        }
        else if (this.game == 1) {
            Net.send(Protocol.GAME_GOLD_REDBOX, { total: this.sendTotalGold, count: countNum }, this.sendCallback.bind(this));
        }
        else if (this.game == 2) {
            Net.send(Protocol.GAME_NIUNIU_REDBOX, { total: this.sendTotalGold, count: countNum }, this.sendCallback.bind(this));
        }
        else if (this.game == 3) {
            Net.send(Protocol.GAME_CLOWN_REDBOX, { total: this.sendTotalGold, count: countNum }, this.sendCallback.bind(this));
        }
    };
    RedBoxPanel.prototype.sendCallback = function (msg) {
        if (msg.code == 200) {
            GlobalData.user.gold = (parseInt(GlobalData.user.gold) - this.sendTotalGold) + '';
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.OPERTE_REDBOX_COMPLETE));
            TipsManage.showTips('发送红包成功!');
            this.dispose();
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    RedBoxPanel.prototype.dispose = function () {
        clearInterval(this.intval);
        EventManage.removeEvent(this);
        this.visible = false;
        this.labTips.text = '';
        this.isTouch = false;
        PopUpManager.removePopUp(this);
    };
    RedBoxPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return RedBoxPanel;
}(eui.Component));
__reflect(RedBoxPanel.prototype, "RedBoxPanel", ["fany.IDispose"]);
