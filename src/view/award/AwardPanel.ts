class AwardPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/award/AwardPanelSkin.exml";
    }

    public btnExchange: eui.Image;
    public btnMyGift: eui.Image;
    public btnRecord: eui.Image;
    public grpSecond: eui.Group;
    public subBtnClose: eui.Image;
    public subImgTitle: eui.Image;
    public subGrpContent: eui.Group;
    public grpTips: eui.Group;
    public grpTipsTitle: eui.Label;
    public grpTipsInfo: eui.Label;
    public tipsBtnClose: eui.Image;
    public btnClose: eui.Image;
    public btnSureBuy: eui.Image;
    public labShop: eui.Label;
    public labUser: eui.Label;
    public labGold: eui.Label;

    private giftArr = [];
    private awardArr = [];
    private curSelectAward: string = '';
    private addressGroup: eui.Group;
    private btnAddress: eui.Image;
    private scroll: eui.Scroller;
    private btnSure: eui.Image;
    private txtPhone: eui.EditableText;
    private txtName: eui.EditableText;
    private txtAddress: eui.EditableText;
    private bggGrp: eui.Rect;
    private bggGrp1: eui.Rect;
    protected childrenCreated(): void {
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
    }
    private bggGrpHide(): void {
        this.grpSecond.visible = false;
    }
    private bggGrp1Hide(): void {
        this.grpTips.visible = false;
    }
    private btnAddressOpen(flag): void {
        this.addressGroup.visible = flag;
        this.scroll.visible = !flag;
        if (flag == false) {
            Net.send(Protocol.UPDATE_ADDRESS, { address: this.txtName.text + "&" + this.txtPhone.text + "&" + this.txtAddress.text }, this.updateSucc.bind(this));
        } else {
            Net.send(Protocol.GET_ADDRESS, {}, this.getAddressSucc.bind(this));
        }
    }
    private getAddressSucc(r): void {
        if (r.code == 200) {
            if (r.address != "") {
                var arr = r.address.split("&");
                this.txtName.text = arr[0];
                this.txtPhone.text = arr[1];
                this.txtAddress.text = arr[2];
            }
        } else {
            TipsManage.showTips(JSON.stringify(r));
        }
    }
    private updateSucc(r): void {
        if (r.code == 200) {
            TipsManage.showTips('修改成功！');
            this.addressGroup.visible = false;
            this.scroll.visible = true;
        } else {
            TipsManage.showTips(JSON.stringify(r));
        }
    }
    private initData(): void {
        this.giftArr = [{ name: '喜从天降', gold: 2000 }, { name: '时来运转', gold: 2000 }, { name: '财运亨通', gold: 2000 },
        { name: '鸿运当头', gold: 5000 }, { name: '好运连连', gold: 5000 }, { name: '天降财神', gold: 8888 }];
        this.grpSecond.visible = false;
        this.grpTips.visible = false;
        this.labGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
    }

    private updateDataGold(): void {
        this.labGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold))
    }

    private init(msg): void {
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
    }

    private updateDataTicket(data): void {
        this.labUser.text = data.param.userticket;
    }

    private onTouchGame(index): void {
        this.grpTips.visible = true;
        this.grpTipsInfo.text = '花费' + QuickManage.moneyStr(this.awardArr[index].gold) + '金币购买?';
        this.grpTipsTitle.text = this.giftArr[index].name;
        this.curSelectAward = this['game' + index].name;
    }

    private onTouchSureBuy(): void {
        console.log('onTouchSure to buy!');
        Net.send(Protocol.HALL_GIFT_GET_LOTTERY, { drawId: this.curSelectAward }, this.onTouchBuyCB.bind(this));
    }

    private onTouchBuyCB(msg): void {
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
    }

    //兑换奖品
    private onTouchExchange(): void {
        this.addressGroup.visible = false;
        this.scroll.visible = true;
        this.grpSecond.visible = true;
        this.subImgTitle.source = 'award.title0';
        Net.send(Protocol.HALL_GIFT_LIST, {}, this.exchangeCB.bind(this));
    }

    private exchangeCB(msg): void {
        if (msg.code == 200) {
            this.setItem(msg.data, 1);
        }
        else {
            ErrorMessage.errorMsg(msg.msg);
        }
    }

    //我的奖品
    private onTouchMyGift(): void {
        this.grpSecond.visible = true;
        this.subImgTitle.source = 'award.title1';
        Net.send(Protocol.HALL_GIFT_SELF_RECORD, {}, this.myGiftCB.bind(this));
    }

    private myGiftCB(msg): void {
        if (msg.code == 200) {
            this.setItem(msg.data, 2);
        }
        else {
            ErrorMessage.errorMsg(msg.msg);
        }
    }

    //兑换记录
    private onTouchRecord(): void {
        this.addressGroup.visible = false;
        this.scroll.visible = true;
        this.grpSecond.visible = true;
        this.subImgTitle.source = 'award.title2';
        Net.send(Protocol.HALL_GIFT_ALL_RECORD, {}, this.recordCB.bind(this));
    }

    private recordCB(msg): void {
        if (msg.code == 200) {
            this.setItem(msg.data, 3);
        }
        else {
            ErrorMessage.errorMsg(msg.msg);
        }
    }

    private onTouchTipsclose(): void {
        this.grpTips.visible = false;
    }

    private onTouchSecondClose(): void {
        while (this.subGrpContent.numChildren > 0) {
            var item: AwardItem = this.subGrpContent.removeChildAt(0) as AwardItem;
            item.dispose();
        }
        this.clearItems();
        this.grpSecond.visible = false;
    }

    private setItem(data, type): void {
        for (var i = 0; i < data.length; i++) {
            var item = ObjManage.getObj('AwardItem');
            item.y = i * item.height;
            this.subGrpContent.addChild(item);
            item.setData(data[i], type);
        }
    }


    private clearItems(): void {
        while (this.subGrpContent.numChildren > 0) {
            ObjManage.addObj('AwardPanel', this.subGrpContent.removeChildAt(0));
        }
        this.subGrpContent.scrollV = 0;
    }

    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}