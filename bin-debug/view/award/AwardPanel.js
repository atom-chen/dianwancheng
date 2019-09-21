var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AwardPanel = (function (_super) {
    __extends(AwardPanel, _super);
    function AwardPanel() {
        var _this = _super.call(this) || this;
        _this.giftArr = [];
        _this.awardArr = [];
        _this.curSelectAward = '';
        _this.skinName = "resource/skins/award/AwardPanelSkin.exml";
        return _this;
    }
    AwardPanel.prototype.childrenCreated = function () {
        for (var i = 0; i < 6; i++) {
            // this['game' + i].source = '';
            // this['labMoney' + i].text = '';
            EventManage.addEvent(this, this['game' + i], egret.TouchEvent.TOUCH_TAP, this.onTouchGame.bind(this, i));
        }
        EventManage.addButtonEvent(this, this.btnExchange, egret.TouchEvent.TOUCH_TAP, this.onTouchExchange.bind(this));
        EventManage.addButtonEvent(this, this.btnMyGift, egret.TouchEvent.TOUCH_TAP, this.onTouchMyGift.bind(this));
        EventManage.addButtonEvent(this, this.btnRecord, egret.TouchEvent.TOUCH_TAP, this.onTouchRecord.bind(this));
        EventManage.addButtonEvent(this, this.tipsBtnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchTipsclose.bind(this));
        EventManage.addButtonEvent(this, this.subBtnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchSecondClose.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnSureBuy, egret.TouchEvent.TOUCH_TAP, this.onTouchSureBuy.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.GIFT_ON_EXCHANGE, this.updateDataTicket.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_MAIN, this.updateDataGold.bind(this));
        Net.send(Protocol.HALL_GIFT_LOTTERY_INFO, {}, this.init.bind(this));
        EventManage.addButtonEvent(this, this.btnAddress, egret.TouchEvent.TOUCH_TAP, this.btnAddressOpen.bind(this, true));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.btnAddressOpen.bind(this, false));
        EventManage.addEvent(this, this.bggGrp, egret.TouchEvent.TOUCH_TAP, this.bggGrpHide.bind(this, false));
        EventManage.addEvent(this, this.bggGrp1, egret.TouchEvent.TOUCH_TAP, this.bggGrp1Hide.bind(this, false));
    };
    AwardPanel.prototype.bggGrpHide = function () {
        this.grpSecond.visible = false;
    };
    AwardPanel.prototype.bggGrp1Hide = function () {
        this.grpTips.visible = false;
    };
    AwardPanel.prototype.btnAddressOpen = function (flag) {
        this.addressGroup.visible = flag;
        this.scroll.visible = !flag;
        if (flag == false) {
            Net.send(Protocol.UPDATE_ADDRESS, { address: this.txtName.text + "&" + this.txtPhone.text + "&" + this.txtAddress.text }, this.updateSucc.bind(this));
        }
        else {
            Net.send(Protocol.GET_ADDRESS, {}, this.getAddressSucc.bind(this));
        }
    };
    AwardPanel.prototype.getAddressSucc = function (r) {
        if (r.code == 200) {
            if (r.address != "") {
                var arr = r.address.split("&");
                this.txtName.text = arr[0];
                this.txtPhone.text = arr[1];
                this.txtAddress.text = arr[2];
            }
        }
        else {
            TipsManage.showTips(JSON.stringify(r));
        }
    };
    AwardPanel.prototype.updateSucc = function (r) {
        if (r.code == 200) {
            TipsManage.showTips('修改成功！');
            this.addressGroup.visible = false;
            this.scroll.visible = true;
        }
        else {
            TipsManage.showTips(JSON.stringify(r));
        }
    };
    AwardPanel.prototype.initData = function () {
        this.giftArr = [{ name: '喜从天降', gold: 2000 }, { name: '时来运转', gold: 2000 }, { name: '财运亨通', gold: 2000 },
            { name: '鸿运当头', gold: 5000 }, { name: '好运连连', gold: 5000 }, { name: '天降财神', gold: 8888 }];
        this.grpSecond.visible = false;
        this.grpTips.visible = false;
        this.labGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
    };
    AwardPanel.prototype.updateDataGold = function () {
        this.labGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
    };
    AwardPanel.prototype.init = function (msg) {
        if (msg.code == 200) {
            this.initData();
            this.labShop.text = '剩余库存:' + msg.data.shopticket;
            this.labUser.text = msg.data.userticket;
            this.awardArr = msg.data.awardArr;
            for (var i = 0; i < 6; i++) {
                this['labMoney' + i].text = QuickManage.moneyStr(this.awardArr[i].gold);
                this['game' + i].name = this.awardArr[i]._id;
            }
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    AwardPanel.prototype.updateDataTicket = function (data) {
        this.labUser.text = data.param.userticket;
    };
    AwardPanel.prototype.onTouchGame = function (index) {
        this.grpTips.visible = true;
        this.grpTipsInfo.text = '花费' + QuickManage.moneyStr(this.awardArr[index].gold) + '金币购买?';
        this.grpTipsTitle.text = this.giftArr[index].name;
        this.curSelectAward = this['game' + index].name;
    };
    AwardPanel.prototype.onTouchSureBuy = function () {
        console.log('onTouchSure to buy!');
        Net.send(Protocol.HALL_GIFT_GET_LOTTERY, { drawId: this.curSelectAward }, this.onTouchBuyCB.bind(this));
    };
    AwardPanel.prototype.onTouchBuyCB = function (msg) {
        if (msg.code == 200) {
            if (msg.data.count == 0) {
                TipsManage.showTips('抱歉您没有抽中奖券！');
            }
            else {
                TipsManage.showTips('抽中' + QuickManage.moneyStr(msg.data.count) + '张奖券');
            }
            this.labShop.text = '剩余库存:' + msg.data.shopticket;
            this.labUser.text = msg.data.userticket;
            this.grpTips.visible = false;
            GlobalData.user.gold = msg.data.gold;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    //兑换奖品
    AwardPanel.prototype.onTouchExchange = function () {
        this.addressGroup.visible = false;
        this.scroll.visible = true;
        this.grpSecond.visible = true;
        this.subImgTitle.source = 'award.title0';
        Net.send(Protocol.HALL_GIFT_LIST, {}, this.exchangeCB.bind(this));
    };
    AwardPanel.prototype.exchangeCB = function (msg) {
        if (msg.code == 200) {
            this.setItem(msg.data, 1);
        }
        else {
            ErrorMessage.errorMsg(msg.msg);
        }
    };
    //我的奖品
    AwardPanel.prototype.onTouchMyGift = function () {
        this.grpSecond.visible = true;
        this.subImgTitle.source = 'award.title1';
        Net.send(Protocol.HALL_GIFT_SELF_RECORD, {}, this.myGiftCB.bind(this));
    };
    AwardPanel.prototype.myGiftCB = function (msg) {
        if (msg.code == 200) {
            this.setItem(msg.data, 2);
        }
        else {
            ErrorMessage.errorMsg(msg.msg);
        }
    };
    //兑换记录
    AwardPanel.prototype.onTouchRecord = function () {
        this.addressGroup.visible = false;
        this.scroll.visible = true;
        this.grpSecond.visible = true;
        this.subImgTitle.source = 'award.title2';
        Net.send(Protocol.HALL_GIFT_ALL_RECORD, {}, this.recordCB.bind(this));
    };
    AwardPanel.prototype.recordCB = function (msg) {
        if (msg.code == 200) {
            this.setItem(msg.data, 3);
        }
        else {
            ErrorMessage.errorMsg(msg.msg);
        }
    };
    AwardPanel.prototype.onTouchTipsclose = function () {
        this.grpTips.visible = false;
    };
    AwardPanel.prototype.onTouchSecondClose = function () {
        while (this.subGrpContent.numChildren > 0) {
            var item = this.subGrpContent.removeChildAt(0);
            item.dispose();
        }
        this.clearItems();
        this.grpSecond.visible = false;
    };
    AwardPanel.prototype.setItem = function (data, type) {
        for (var i = 0; i < data.length; i++) {
            var item = ObjManage.getObj('AwardItem');
            item.y = i * item.height;
            this.subGrpContent.addChild(item);
            item.setData(data[i], type);
        }
    };
    AwardPanel.prototype.clearItems = function () {
        while (this.subGrpContent.numChildren > 0) {
            ObjManage.addObj('AwardPanel', this.subGrpContent.removeChildAt(0));
        }
        this.subGrpContent.scrollV = 0;
    };
    AwardPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    AwardPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return AwardPanel;
}(eui.Component));
__reflect(AwardPanel.prototype, "AwardPanel", ["fany.IDispose"]);
