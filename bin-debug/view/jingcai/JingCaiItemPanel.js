var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JingCaiItemPanel = (function (_super) {
    __extends(JingCaiItemPanel, _super);
    function JingCaiItemPanel() {
        var _this = _super.call(this) || this;
        _this.answerNum = "";
        _this.skinName = "resource/skins/jingcai/JingCaiItemPanelSkin.exml";
        return _this;
    }
    JingCaiItemPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.txtGold, egret.Event.CHANGE, this.txtGoldChange.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.btnSureHandle.bind(this));
        EventManage.addEvent(this, this.itemA, egret.TouchEvent.TOUCH_TAP, this.itemClick.bind(this, 1));
        EventManage.addEvent(this, this.itemB, egret.TouchEvent.TOUCH_TAP, this.itemClick.bind(this, 2));
        this.txtGold.restrict = "0-9";
    };
    JingCaiItemPanel.prototype.itemClick = function (num) {
        switch (num) {
            case 1:
                this.itemA.scaleX = 1.1;
                this.itemA.scaleY = 1.1;
                this.itemB.scaleX = 1;
                this.itemB.scaleY = 1;
                this.answerNum = this.itemA.name;
                break;
            case 2:
                this.itemA.scaleX = 1;
                this.itemA.scaleY = 1;
                this.itemB.scaleX = 1.1;
                this.itemB.scaleY = 1.1;
                this.answerNum = this.itemB.name;
                break;
        }
    };
    JingCaiItemPanel.prototype.btnSureHandle = function () {
        if (this.answerNum == "") {
            TipsManage.showTips("请选择一个答案!");
            return;
        }
        if (this.txtGold.text == "") {
            TipsManage.showTips("请输入下注金额!");
            return;
        }
        var num = parseInt(this.txtGold.text);
        if (num == 0) {
            TipsManage.showTips("请输入下注金额!");
            return;
        }
        var data = { competitionId: this.idd, aorb: this.answerNum, gold: num * 10000 };
        console.log(JSON.stringify(data));
        Net.send(Protocol.SEND_JINGCAI, data, this.jingcaicallback.bind(this));
    };
    JingCaiItemPanel.prototype.jingcaicallback = function (r) {
        if (r.code == 200) {
            // TipsManage.showTips("请输入下注金额!");
            if (this.answerNum == this.itemA.name) {
                this.txtA.text = "已下注:" + r.data.max_bet;
            }
            else {
                this.txtB.text = "已下注:" + r.data.max_bet;
            }
        }
        else {
            console.log(JSON.stringify(r));
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    JingCaiItemPanel.prototype.txtGoldChange = function () {
        var num = parseInt(this.txtGold.text);
        this.txtGold.text = num + "万";
    };
    JingCaiItemPanel.prototype.setData = function (data) {
        this.idd = data._id;
        this.img.source = 'http://c.hiphotos.baidu.com/zhidao/pic/item/c8177f3e6709c93d72318d2d993df8dcd000542c.jpg'; //data.image_url;
        this.txtA.text = "已下注:" + data.answer[0].max_bet;
        this.txtB.text = "已下注:" + data.answer[1].max_bet;
        this.answera.text = "A:" + data.answer[0].title;
        this.answerb.text = "B:" + data.answer[1].title;
        this.itemA.name = "" + data.answer[0]._id;
        this.itemB.name = "" + data.answer[1]._id;
        if (data.result != undefined) {
            if (data.result == 1) {
                console.log('win A');
            }
            else {
                console.log('win B');
            }
        }
    };
    JingCaiItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    JingCaiItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return JingCaiItemPanel;
}(eui.Component));
__reflect(JingCaiItemPanel.prototype, "JingCaiItemPanel", ["fany.IDispose"]);
