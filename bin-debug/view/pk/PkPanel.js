var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PkPanel = (function (_super) {
    __extends(PkPanel, _super);
    function PkPanel(r) {
        var _this = _super.call(this) || this;
        _this.r = null;
        _this.isCanTouch = true;
        _this.intVal = -1;
        _this.isJoin = false;
        _this.skinName = 'resource/skins/pk/PkSkin.exml';
        return _this;
    }
    PkPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnType0, egret.TouchEvent.TOUCH_TAP, this.onTouchType.bind(this, 0));
        EventManage.addButtonEvent(this, this.btnType1, egret.TouchEvent.TOUCH_TAP, this.onTouchType.bind(this, 1));
        EventManage.addButtonEvent(this, this.btnType2, egret.TouchEvent.TOUCH_TAP, this.onTouchType.bind(this, 2));
        EventManage.addButtonEvent(this, this.btnJoin, egret.TouchEvent.TOUCH_TAP, this.onTouchJoin.bind(this));
        EventManage.addButtonEvent(this, this.btnCreate, egret.TouchEvent.TOUCH_TAP, this.onTouchCreate.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.overToEnter.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.exit.bind(this));
        this.initEnter();
    };
    PkPanel.prototype.onTouchType = function (index) {
        if (this.isCanTouch) {
            Net.send(Protocol.PK_SETHAND, { type: index }, this.typeCallback.bind(this));
            this.isCanTouch = false;
        }
    };
    PkPanel.prototype.typeCallback = function (msg) {
        if (msg.code == 200) {
            this.btnType0.visible = false;
            this.btnType1.visible = false;
            this.btnType2.visible = false;
            TipsManage.showTips('请等待对方出拳！');
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
        this.isCanTouch = true;
    };
    PkPanel.prototype.onTouchJoin = function () {
        var room = this.editRoom.text;
        if (room == '') {
            TipsManage.showTips('抱歉，房间号不能为空！');
            return;
        }
        var pwd = this.editPwdJoin.text;
        if (pwd == '') {
            TipsManage.showTips('抱歉，密码不能为空！');
            return;
        }
        Net.send(Protocol.PK_JOIN, { room: room, password: pwd }, this.joinCallback.bind(this));
    };
    PkPanel.prototype.joinCallback = function (msg) {
        if (msg.code == 200) {
            this.isJoin = true;
            this.initGameOther(msg.data);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    PkPanel.prototype.onTouchCreate = function () {
        var money = this.editMoney.text;
        if (money == '') {
            TipsManage.showTips('抱歉，金额不能为空！');
            return;
        }
        var pwd = this.editPwd.text;
        if (pwd == '') {
            TipsManage.showTips('抱歉，密码不能为空！');
            return;
        }
        Net.send(Protocol.PK_CREATE, { money: parseInt(money) * 10000, password: pwd }, this.createCallback.bind(this));
    };
    PkPanel.prototype.createCallback = function (msg) {
        if (msg.code == 200) {
            this.isJoin = false;
            this.initGame(msg.data);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    PkPanel.prototype.initEnter = function () {
        this.grpEnter.visible = true;
        this.grpGame.visible = false;
        this.grpOver.visible = false;
        this.editMoney.text = '';
        this.editPwd.text = '';
        this.editRoom.text = '';
        this.editPwdJoin.text = '';
        this.labPwd.text = '';
    };
    PkPanel.prototype.initGame = function (data) {
        this.btnType0.visible = true;
        this.btnType1.visible = true;
        this.btnType2.visible = true;
        this.grpEnter.visible = false;
        this.grpGame.visible = true;
        this.grpOver.visible = false;
        this.otherHead.source = '';
        this.labOtherName.text = '';
        this.labMoney.text = '金额： ' + QuickManage.moneyStr(data.money);
        this.curMoney = data.money;
        this.labRoom.text = '房间号：' + data.room;
        this.labPwd.text = '密码：' + data.password;
        this.setOtherReslut(-1);
        this.setSelfReslut(-1);
    };
    PkPanel.prototype.initGameOther = function (data) {
        this.btnType0.visible = true;
        this.btnType1.visible = true;
        this.btnType2.visible = true;
        this.grpEnter.visible = false;
        this.grpGame.visible = true;
        this.grpOver.visible = false;
        this.otherHead.source = '';
        this.labOtherName.text = '';
        this.labMoney.text = '金额： ' + QuickManage.moneyStr(data.money);
        this.curMoney = data.money;
        this.labRoom.text = '';
        this.labPwd.text = '';
        this.setOtherReslut(-1);
        this.setSelfReslut(-1);
    };
    PkPanel.prototype.messageOn = function (msg) {
        switch (msg.msg.type) {
            case 1:
                this.setOtherPeople(msg.msg.data);
                break;
            case 2:
                this.setResult(msg.msg);
                break;
            case 3:
                this.setOtherLeave(msg.msg);
                break;
        }
    };
    PkPanel.prototype.setOtherLeave = function (data) {
        // data.account;
        // data.name;
        this.labOtherName.text = '';
        this.otherHead.source = '';
    };
    PkPanel.prototype.setResult = function (data) {
        if (this.isJoin) {
            this.setJoinResult(data);
        }
        else {
            this.setCreateResult(data);
        }
        this.intVal = setInterval(this.setOver.bind(this), 4000);
    };
    PkPanel.prototype.setJoinResult = function (data) {
        this.setSelfReslut(data.hands[1]);
        this.setOtherReslut(data.hands[0]);
        if (data.result == 1) {
            this.labOverTitle.text = '恭喜 您' + '赢了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) + parseInt(this.curMoney) + '';
        }
        else if (data.result == 0) {
            this.labOverTitle.text = '非常遗憾 您' + '输了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) - parseInt(this.curMoney) + '';
        }
        else {
            this.labOverTitle.text = '平局';
        }
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
    };
    PkPanel.prototype.setCreateResult = function (data) {
        this.setSelfReslut(data.hands[0]);
        this.setOtherReslut(data.hands[1]);
        if (data.result == 0) {
            this.labOverTitle.text = '恭喜 您' + '赢了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) + parseInt(this.curMoney) + '';
        }
        else if (data.result == 1) {
            this.labOverTitle.text = '非常遗憾 您' + '输了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) - parseInt(this.curMoney) + '';
        }
        else {
            this.labOverTitle.text = '平局';
        }
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
    };
    PkPanel.prototype.setOver = function () {
        clearInterval(this.intVal);
        this.grpEnter.visible = false;
        this.grpGame.visible = false;
        this.grpOver.visible = true;
        // this.labOverTitle.text = '恭喜/非常遗憾 您' + '赢/输' + '了' + 'xxxxxxx 万';
    };
    PkPanel.prototype.setSelfReslut = function (type) {
        for (var i = 0; i < 3; i++) {
            if (type == i) {
                this['resultSelf' + i].visible = true;
                ;
            }
            else {
                this['resultSelf' + i].visible = false;
            }
        }
    };
    PkPanel.prototype.setOtherReslut = function (type) {
        for (var i = 0; i < 3; i++) {
            if (type == i) {
                this['resultOther' + i].visible = true;
                ;
            }
            else {
                this['resultOther' + i].visible = false;
            }
        }
    };
    PkPanel.prototype.setOtherPeople = function (data) {
        // var data = msg.msg.data;
        if (data.lenght == 1) {
            this.labOtherName.text = '';
            this.otherHead.source = '';
            return;
        }
        for (var i = 0; i < data.length; i++) {
            var user = data[i];
            if (GlobalData.user.nickname == user.name) {
            }
            else {
                this.labOtherName.text = user.name;
                this.otherHead.source = user.headurl;
                this.otherHead.width = this.otherHead.height = 74;
            }
        }
    };
    PkPanel.prototype.overToEnter = function () {
        this.initEnter();
    };
    PkPanel.prototype.exit = function () {
        Net.send(Protocol.PK_LEAVE, {}, this.exitCallback.bind(this));
    };
    PkPanel.prototype.exitCallback = function (msg) {
        if (msg.code == 200) {
            this.dispose();
        }
    };
    PkPanel.prototype.dispose = function () {
        this.removeChildren();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    PkPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return PkPanel;
}(eui.Component));
__reflect(PkPanel.prototype, "PkPanel", ["fany.IDispose"]);
